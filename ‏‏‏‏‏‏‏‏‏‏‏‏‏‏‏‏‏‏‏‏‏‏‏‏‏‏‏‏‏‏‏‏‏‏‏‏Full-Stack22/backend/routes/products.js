const router = require('express').Router();
const Product = require("../models/Product")
const multer = require('multer');
const path = require('path');
const jsonWebToken = require("../api/jsonWebToken");
const crudMethods = require("../crud/crudMethods");



router.get("/fetchProducts", async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });

    products.forEach(product => {
      product.imgUrl = `http://localhost:3500/images/${product.imgUrl}`;
    });

    res.json(products);
    console.log("A fetchProducts request was received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

//==========

const checkAuthHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (jsonWebToken.checkToken(token)) {           
          return next();
      } else {
          return res.status(403).send('Unauthorized');
      }
  } else {
      return res.status(401).send('Missing Authorization header');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../backend/images'); // התיקייה בה נרצה לאחסן את התמונה
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = req.body.selerId + '-' + Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage })


router.post("/createProduct",checkAuthHeader, upload.single('file'), async (req, res) => {
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  const { title, description, price, category, selerId } = req.body;
  
  const newProduct = new Product({
  title,
  description,
  imgUrl: req.file.filename,
  price,
  category,
  selerId,
  quantity: 1,
  isDummy: true,
  isDeleted: false
  })
  console.log('newProduct :', newProduct);
  
  try {
  await newProduct.save();
  res.json("Product added");
  } catch (err) {
  res.status(400).json("Error: " + err);
  }
  })


router.put("/deleteProduct",checkAuthHeader, async (req, res) => {
  const { productId } = req.body;
  console.log('productId :', productId);

  crudMethods.deleteProduct(productId, res);

})

router.put('/editProduct', checkAuthHeader, upload.single('file'), async (req, res) => {
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  const { title, description, price, category , productId } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { title, description, imgUrl: req.file.filename, price, category },
      { new: true }
    ).exec();

    if (!product) {
      return res.status(404).send('לא נמצא מוצר לעדכון');
    }
    
    console.log('product :', product._doc);
    return res.status(200).json(product._doc);
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('שגיאת שרת פנימית');
  }
});


module.exports = router;