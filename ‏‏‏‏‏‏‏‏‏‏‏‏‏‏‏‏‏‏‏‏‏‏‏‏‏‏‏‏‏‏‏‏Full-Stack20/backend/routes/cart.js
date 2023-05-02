const router = require("express").Router();
const Cart = require("../models/Cart");
const authUser = require('../middleware/authUser');



router.post("/updateCartInDB", async (req, res) => {
  const { cartProducts, userId, totalAmount, totalPrice } = req.body;

  try {
    const existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      const newCart = await Cart.create({
        cartProducts,
        userId,
        totalAmount,
        totalPrice,
      });

      return res.status(200).json(newCart);
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { cartProducts, totalAmount, totalPrice },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).send(error.message || "שגיאת שרת פנימית");
  }
})


router.get("/fetchCartFromDB", async (req, res) => {
  const userId = req.query["userId"];
  const existingCart = await Cart.findOne({ userId });
  console.log("existingCart :", existingCart);

  let cart = {};

  if (existingCart) {


    //For some reason, the database stores the shopping cart as an object with numeric keys instead of an array of objects, so to get back to normal the next loop turns the shopping cart back into an array:
    let arr = [];
    for (let key in existingCart.cartProducts[0]) {
      arr[key] = existingCart.cartProducts[0][key];
    }

    cart = {
      cartProducts: arr,
      userId: existingCart.userId,
      totalAmount: existingCart.totalAmount,
      totalPrice: existingCart.totalPrice,
    };
  } else {
    cart = {
      cartProducts: [],
      userId: userId,
      totalAmount: 0,
      totalPrice: 0,
    };
  }

  return res.status(200).json(cart);
});


module.exports = router;
