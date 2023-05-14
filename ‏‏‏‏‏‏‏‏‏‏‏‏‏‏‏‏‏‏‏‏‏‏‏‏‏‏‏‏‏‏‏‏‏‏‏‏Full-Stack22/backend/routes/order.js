const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const orderController = require('../controllers/orderController');


router.post('/pay', authUser.checkAuthHeader, orderController.createPayment);

router.get('/success', orderController.executePayment);

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;


