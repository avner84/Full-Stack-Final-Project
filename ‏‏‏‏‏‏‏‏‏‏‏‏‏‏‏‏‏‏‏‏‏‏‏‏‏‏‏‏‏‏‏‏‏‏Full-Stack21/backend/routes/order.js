const router = require('express').Router();
const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv').config();
const authUser = require('../middleware/authUser');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.SECRET_ID
});

router.post('/pay', authUser.checkAuthHeader, (req, res) => {
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