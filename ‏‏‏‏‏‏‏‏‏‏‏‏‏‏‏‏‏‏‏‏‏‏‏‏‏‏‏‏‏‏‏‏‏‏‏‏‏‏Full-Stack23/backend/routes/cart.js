const router = require("express").Router();
const authUser = require('../middleware/authUser');
const cartController = require("../controllers/cartController");

router.post("/updateCartInDB",  authUser.checkAuthHeader, async (req, res) => {
  const { cartProducts, userId, totalAmount, totalPrice } = req.body;

  //Validation:

  if (!Array.isArray(cartProducts) && typeof cartProducts !== 'object') {
    console.log('עדכון עגלת קניות במסד הנתונים נכשל: cartProducts אינו מערך או אובייקט');
    return res.status(400).send('עדכון עגלת קניות במסד הנתונים נכשל: cartProducts אינו מערך או אובייקט');
  }
  if (typeof totalAmount !== 'number' || totalAmount < 0) {
    console.log('עדכון עגלת קניות במסד הנתונים נכשל: totalAmount אינו מספר תקין או שהערך שלילי');
    return res.status(400).send('עדכון עגלת קניות במסד הנתונים נכשל: totalAmount אינו מספר תקין או שהערך שלילי');
  }
  
  if (typeof totalPrice !== 'number' || totalPrice < 0) {
    console.log('עדכון עגלת קניות במסד הנתונים נכשל: totalPrice אינו מספר תקין או שהערך שלילי');
    return res.status(400).send('עדכון עגלת קניות במסד הנתונים נכשל: totalPrice אינו מספר תקין או שהערך שלילי');
  }
  
  if (typeof userId !== 'string' || userId.trim().length === 0) {
    console.log('עדכון עגלת קניות במסד הנתונים נכשל: userId אינו מחרוזת תקינה');
    return res.status(400).send('עדכון עגלת קניות במסד הנתונים נכשל: userId אינו מחרוזת תקינה');
  }
  
    

  try {
    const updatedCart = await cartController.updateCartInDB(
      cartProducts,
      userId,
      totalAmount,
      totalPrice
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).send(error.message || "שגיאת שרת פנימית");
  }
});


router.get("/fetchCartFromDB", async (req, res) => {
  try {
    const userId = req.query["userId"];
    const cart = await cartController.fetchCart(userId);
    console.log("cart :", cart);

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});


module.exports = router;
