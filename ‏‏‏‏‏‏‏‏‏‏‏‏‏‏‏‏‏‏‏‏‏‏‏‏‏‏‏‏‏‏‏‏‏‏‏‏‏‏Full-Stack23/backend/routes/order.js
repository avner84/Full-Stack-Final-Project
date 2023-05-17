const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const orderController = require('../controllers/orderController');


router.post('/pay', authUser.checkAuthHeader, orderController.createPayment);

router.get('/success', orderController.executePayment);

router.get('/cancel', (req, res) => res.send('Cancelled'));


router.post("/updateOrderInDB", authUser.checkAuthHeader, async (req, res) => {
    const { orders, userId } = req.body;
    console.log('userId :', userId);
    console.log('orders :', orders);

    //Validation:

    if (!Array.isArray(orders) && typeof orders !== 'object') {
        console.log('עדכון ההזמנות במסד הנתונים נכשל: orders אינו מערך או אובייקט');
        return res.status(400).send('עדכון ההזמנות במסד הנתונים נכשל: orders אינו מערך או אובייקט');
    }


    if (typeof userId !== 'string' || userId.trim().length === 0) {
        console.log('עדכון ההזמנות במסד הנתונים נכשל: userId אינו מחרוזת תקינה');
        return res.status(400).send('עדכון ההזמנות במסד הנתונים נכשל: userId אינו מחרוזת תקינה');
    }

    try {
        const updateOrders = await orderController.updateOrdersInDB(
            orders,
            userId
        );
        res.status(200).json(updateOrders);
    } catch (error) {
        res.status(500).send(error.message || "שגיאת שרת פנימית");
    }
});

router.get("/fetchOrdersFromDB", async (req, res) => {
    try {
        const userId = req.query["userId"];
        const orderDetails = await orderController.fetchOrders(userId);
        console.log('orders :', orderDetails);


        return res.status(200).json(orderDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router;


