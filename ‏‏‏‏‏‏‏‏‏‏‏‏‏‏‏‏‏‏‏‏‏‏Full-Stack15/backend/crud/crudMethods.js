const User = require("../models/User");
const Product = require("../models/Product");

function deleteUser(email, res) {
    try {
        User.findOneAndUpdate(
            { email },
            { isDeleted: true },
            { new: true },
            function (err, user) {

                if (err) {
                    console.error(err);
                    return res.status(500).send('שגיאת שרת פנימית');
                }
                if (!user) {
                    return res.status(404).send('לא נמצא משתמש למחיקה');
                }

                const { password, ...others } = user._doc;
                console.log('others :', others);
                return res.status(200).json(others);

            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');
    }
}

function userDeleteByServer (email){
    try {
        User.findOneAndUpdate(
            { email },
            { isDeleted: true },
            { new: true },
            function (err, user) {

                if (err) {
                    console.error(err);
                    return err;
                }
                if (!user) {
                    return {error: "No user found"};
                }

                const { password, ...others } = user._doc;
                console.log('others :', others);
                return "delete Successful";

            }
        );
    } catch (err) {
        console.error(err);
        return err;
    }
}


function deleteProduct(productId, res) {
    try {
        Product.findOneAndUpdate(
            { _id : productId},
            { isDeleted: true },
            { new: true },
            function (err, product) {

                if (err) {
                    console.error(err);
                    return res.status(500).send('שגיאת שרת פנימית');
                }
                if (!product) {
                    return res.status(404).send('לא נמצא מוצר למחיקה');
                }
                
                console.log('product :', product._doc);
                return res.status(200).json(product._doc);

            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');
    }
}

module.exports = {deleteUser,userDeleteByServer, deleteProduct}