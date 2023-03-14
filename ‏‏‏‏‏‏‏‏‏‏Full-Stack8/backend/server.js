const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv').config();
const port = process.env.PORT;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")

mongoose.set('strictQuery', false); // הוספנו פקודה זו לספק ל-Mongoose את ההגדרות המבוקשות

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successfull"))
  .catch((err) => {
    console.log(err);
  });


  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(express.json())
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


app.listen(port || 3500, () => {
  console.log(`Server running on port ${port}`);
});