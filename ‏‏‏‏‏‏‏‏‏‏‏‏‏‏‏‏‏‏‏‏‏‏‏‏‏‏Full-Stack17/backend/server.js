const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const port = process.env.PORT;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRouth = require("./routes/products");
const cartRouth = require("./routes/cart");

mongoose.set('strictQuery', false); // הוספנו פקודה זו לספק ל-Mongoose את ההגדרות המבוקשות

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
    console.log('got req: ', req.url, 'method :', req.method);
    next()
})
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(bodyParser.json());


app.use('/images', express.static('images'));
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRouth);
app.use("/api/cart", cartRouth);



app.listen(port || 3500, () => {
  console.log(`Server running on port ${port}`);
});