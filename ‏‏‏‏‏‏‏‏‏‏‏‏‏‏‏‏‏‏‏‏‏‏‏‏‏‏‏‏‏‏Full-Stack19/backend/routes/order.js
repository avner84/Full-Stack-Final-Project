const router = require('express').Router();
const paypal = require('paypal-rest-sdk');

const SECRET_ID = "ELdWipjvpS_6lmn5YBDC-KzU9BhBG2QrX9e5lr7vxpaOAVaMRzikyptaed4Rs_pKuyv3CJkT5hpb-G81"
const CLIENT_ID = "AfXRdnXsyX5iFAhDgJYhiyYtMH-AHgVZ6HNu7ncq6QfmsALR1zIzruJ3to_rVU8DORRwTv51_w-rJ0ue"
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': CLIENT_ID,
    'client_secret': SECRET_ID
});

router.post('/pay', (req, res) => {
    console.log("req.body: ", req.body);

    const { cartProducts, totalAmount, totalPrice } = req.body;
    console.log('=>totalAmount :', totalAmount);
    const total = totalPrice.toFixed(2).toString();
    console.log('total :', total);


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3500/success",
            "cancel_url": "http://localhost:3500/cancel"
        },
        "transactions": [{
            // "item_list": {
            //     "items": [{
            //         "name": "Red Sox Hat",
            //         "sku": "001",
            //         "price": "28.00",
            //         "currency": "ILS",
            //         "quantity": 1
            //     },
            //     {
            //         "name": "handbag",
            //         "quantity": "1",
            //         "price": "15",
            //         "sku": "product34",
            //         "currency": "ILS"
            //     }
            //     ]
            // },
            "amount": {
                "currency": "ILS",
                "total": totalPrice
            },
            "description": "רכישה מאתר מיי-בסטה"
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
                    "currency": "ILS",
                    "total": total
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
                    // res.redirect(payment.links[i].href);
                    res.json({ forwardLink: payment.links[i].href });
                }
            }
        }
    });

})
router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;