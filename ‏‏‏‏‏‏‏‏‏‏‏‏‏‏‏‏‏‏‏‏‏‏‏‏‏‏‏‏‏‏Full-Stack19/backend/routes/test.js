const router = require('express').Router();
const paypal = require('paypal-rest-sdk');

const SECRET_ID = "ELdWipjvpS_6lmn5YBDC-KzU9BhBG2QrX9e5lr7vxpaOAVaMRzikyptaed4Rs_pKuyv3CJkT5hpb-G81"
const CLIENT_ID = "AfXRdnXsyX5iFAhDgJYhiyYtMH-AHgVZ6HNu7ncq6QfmsALR1zIzruJ3to_rVU8DORRwTv51_w-rJ0ue"
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': CLIENT_ID,
    'client_secret': SECRET_ID
});

router.get('/pay', (req, res) => {
    // res.send('Hello World, from test router + pay');


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };


    router.get('/success', (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        console.log(payerId)
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    });
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

})
router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;