const router = require('express').Router();
const Product = require("../models/Product")
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../backend/images'); // התיקייה בה נרצה לאחסן את התמונה
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage })


router.post("/createProduct", upload.single('file'), (req, res)=>{
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  res.send('POST request recieved on server to /image-upload.');
})

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