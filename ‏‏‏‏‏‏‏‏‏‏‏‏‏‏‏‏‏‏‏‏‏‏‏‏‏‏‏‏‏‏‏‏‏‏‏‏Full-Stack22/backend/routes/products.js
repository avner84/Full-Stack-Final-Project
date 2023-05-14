const router = require('express').Router();
const productController = require("../controllers/productController")
const authUser = require('../middleware/authUser');
const {upload} = require("../controllers/productController")


router.get("/fetchProducts", async (req, res) => {
  try {
    const products = await productController.fetchProducts();
    res.json(products);
    console.log("A fetchProducts request was received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});



router.post("/createProduct", authUser.checkAuthHeader, upload.single('file'), async (req, res) => {
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  const { title, description, price, category, selerId } = req.body;

  //Validation:

  if (typeof title !== 'string' || title.trim().length === 0) {
    console.log('כותרת המוצר חסרה או שהוזנה בפורמט לא תקין');
    return res.status(400).send('כותרת המוצר חסרה או שהוזנה בפורמט לא תקין');
  }

  if (typeof description !== 'string' || description.trim().length === 0) {
    console.log('תיאור המוצר חסר או שהוזן בפורמט לא תקין');
    return res.status(400).send('תיאור המוצר חסר או שהוזן בפורמט לא תקין');
  }

  if ((typeof price !== 'number' && typeof price !== 'string') || parseFloat(price) <= 0) {
    console.log('מחיר המוצר אינו תקין או שהוזן בפורמט שאינו תקני');
    return res.status(400).send('מחיר המוצר אינו תקין או שהוזן בפורמט שאינו תקני');
  }

  if (typeof category !== 'string' || category.trim().length === 0) {
    console.log('קטגוריית המוצר חסרה או שהוזנה בפורמט לא תקין');
    return res.status(400).send('קטגוריית המוצר חסרה או שהוזנה בפורמט לא תקין');
  }

  if (typeof selerId !== 'string' || selerId.trim().length === 0) {
    console.log('ה-selerId אינו תקין');
    return res.status(400).send('ה-selerId אינו תקין');
  }

  const imgUrl = req.file.filename;

  try {
  const createdProduct = await productController.createProduct(title, description, imgUrl, price, category, selerId);
  
  res.status(201).json(createdProduct);
  } catch (err) {
  res.status(400).json("Error: " + err);
  }
  })


router.put("/deleteProduct", authUser.checkAuthHeader, async (req, res) => {
  const { productId } = req.body;
  console.log('productId :', productId);

  try {
    const product = await productController.deleteProduct(productId);

    console.log("product :", product._doc);
    return res.status(200).json(product._doc);
  } catch (err) {
    console.error(err);
    return res.status(500).send("שגיאת שרת פנימית");
  }
});


router.put('/editProduct', authUser.checkAuthHeader, upload.single('file'), async (req, res) => {
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  const { title, description, price, category , productId } = req.body;
  const imgUrl = req.file.filename;

  try { 

    const editedProduct =  await productController.editProduct(title, description, imgUrl, price, category, productId);
    
    if (!editedProduct) {
      return res.status(404).send('לא נמצא מוצר לעדכון');
    }
    
    console.log('editedProduct :', editedProduct._doc);
    return res.status(200).json(editedProduct._doc);
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('שגיאת שרת פנימית');
  }
});


module.exports = router;