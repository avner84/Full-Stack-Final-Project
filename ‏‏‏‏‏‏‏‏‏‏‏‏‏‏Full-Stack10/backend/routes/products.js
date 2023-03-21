const router = require('express').Router();
const Product = require("../models/Product")



// router.get("/create_product", async (req, res) => {

//     const newProduct = new Product({
//         title: "אם אשכחך ירושלים צבעוני- ד.יודאיקה",
//         description: "קוטר 30 ס”מ מתכת – חיתוך לייזר והדפסה צבעונית תכשיט קיר צבעוני – פריט קישוט ייחודי – במגזרת מתכת. הפריט מעוצב לתליה ב”ריחוף” מהקיר ונוצרת נוכחות מרשימה וצללית של הפריט על הקיר",
//         imgUrl: "image9.jpg",
//         price: 220,
//         category: "יודאיקה",
//         selerId: "6411b4e1debb70bfa1166760",
//         quantity: 1,
//         isDummy: true,
//         isDeleted: false

//     })

//    const saveProduct = await newProduct.save();
//    console.log('saveProduct :', saveProduct._doc);
//     res.send("secsess")

// })

router.get("/fetchProducts", async (req, res) => {

    const products = await Product.find({ isDeleted: false });
    
    products.forEach(product => {
        product.imgUrl = `http://localhost:3500/images/${product.imgUrl}`;
    });


      res.json(products);
    console.log("A fetchProducts request was received");
})


module.exports = router;