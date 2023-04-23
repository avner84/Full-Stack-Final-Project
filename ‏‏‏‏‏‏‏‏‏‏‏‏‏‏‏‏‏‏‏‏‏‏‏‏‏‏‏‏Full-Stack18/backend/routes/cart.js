const router = require("express").Router();
const Cart = require("../models/Cart");

router.post("/updateCartInDB", async (req, res) => {
  //console.log('Axios POST body: ', req.body);
  const { cartProducts, userId, totalAmount, totalPrice } = req.body;

  const existingCart = await Cart.findOne({ userId });
  if (existingCart) {
    try {
      Cart.findOneAndUpdate(
        { userId },
        { cartProducts, totalAmount, totalPrice },
        { new: true },
        function (err, cart) {
          if (err) {
            console.error(err);
            return res.status(500).send("שגיאת שרת פנימית");
          }
          if (!cart) {
            return res.status(404).send("לא נמצאה עגלת קניות לעדכון");
          }

          console.log("cart :", cart._doc);
          return res.status(200).json(cart._doc);
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send("שגיאת שרת פנימית");
    }
  } else {
    const newCart = new Cart({
      cartProducts,
      userId,
      totalAmount,
      totalPrice,
    });
    try {
      const savedCart = await newCart.save();
      console.log("savedCart :", savedCart._doc);
      res.status(201).json(savedCart._doc);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  //res.json(req.body);
  console.log("A update cart request was received");
});

router.get("/fetchCartFromDB", async (req, res) => {
  const userId = req.query["userId"];
  const existingCart = await Cart.findOne({ userId });
  console.log("existingCart :", existingCart);

  let cart = {};

  //For some reason, the database stores the shopping cart as an object with numeric keys instead of an array of objects, so to get back to normal the next loop turns the shopping cart back into an array:
  let arr = [];
  for (let key in existingCart.cartProducts[0]) {
    arr[key] = existingCart.cartProducts[0][key];
  }

  if (existingCart) {
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

// router.post("/updateCartInDB", async (req, res) => {
//   const { cartProducts, userId, totalAmount, totalPrice } = req.body;

//   try {
//     const existingCart = await Cart.findOne({ userId });

//     if (!existingCart) {
//       const newCart = await Cart.create({
//         cartProducts,
//         userId,
//         totalAmount,
//         totalPrice,
//       });

//       return res.status(200).json(newCart);
//     }

//     const updatedCart = await Cart.findOneAndUpdate(
//       { userId },
//       { cartProducts, totalAmount, totalPrice },
//       { new: true }
//     );

//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).send(error.message || "שגיאת שרת פנימית");
//   }
// })

module.exports = router;
