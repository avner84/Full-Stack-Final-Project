const router = require('express').Router();
const crudMethods = require("../crud/crudMethods");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jsonWebToken = require("../api/jsonWebToken");

const FIRST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}$/;
const LAST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}(\s[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30})?$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,24}$/;



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



router.put("/delete",checkAuthHeader, async (req, res) => {
    const { email } = req.body;

    crudMethods.deleteUser(email, res);

})


router.put("/editing",checkAuthHeader, async (req, res) => {
    const { firstName, lastName, email, pwd } = req.body;

    // Validate user inputs
    if (!FIRST_NAME_REGEX.test(firstName)) {
        return res.status(400).json({ message: "שם פרטי לא תקין" });
    }
    if (!LAST_NAME_REGEX.test(lastName)) {
        return res.status(400).json({ message: "שם משפחה לא תקין" });
    }

    if (!PASSWORD_REGEX.test(pwd)) {
        return res.status(400).json({ message: "סיסמה לא תקינה" });
    }


    try {
        User.findOneAndUpdate(
            { email },
            { name: { firstName, lastName }, password: await bcrypt.hash(pwd, 10) },
            { new: true },
            function (err, user) {

                if (err) {
                    console.error(err);
                    return res.status(500).send('שגיאת שרת פנימית');
                }
                if (!user) {
                    return res.status(404).send('לא נמצא משתמש לעדכון');
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

})

module.exports = router;