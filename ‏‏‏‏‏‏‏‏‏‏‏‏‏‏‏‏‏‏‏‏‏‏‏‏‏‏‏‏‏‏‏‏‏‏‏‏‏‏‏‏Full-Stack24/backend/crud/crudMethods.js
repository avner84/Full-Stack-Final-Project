const User = require("../models/User");
const Product = require("../models/Product");

function deleteUser(email, res) {
    User.findOneAndUpdate({ email }, { isDeleted: true }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send('לא נמצא משתמש למחיקה');
            }
            const { password, ...others } = user._doc;
            console.log('others :', others);
            return res.status(200).json(others);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('שגיאת שרת פנימית');
        });
}


async function userDeleteByServer(email) {
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { isDeleted: true },
        { new: true }
      ).exec();
  
      if (!user) {
        return { error: "No user found" };
      }
  
      const { password, ...others } = user._doc;
      console.log("others :", others);
      return "delete Successful";
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  
  async function deleteProduct(productId, res) {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { isDeleted: true },
        { new: true }
      ).exec();
  
      if (!product) {
        return res.status(404).send("לא נמצא מוצר למחיקה");
      }
  
      console.log("product :", product._doc);
      return res.status(200).json(product._doc);
    } catch (err) {
      console.error(err);
      return res.status(500).send("שגיאת שרת פנימית");
    }
  }
  

module.exports = {deleteUser,userDeleteByServer, deleteProduct}