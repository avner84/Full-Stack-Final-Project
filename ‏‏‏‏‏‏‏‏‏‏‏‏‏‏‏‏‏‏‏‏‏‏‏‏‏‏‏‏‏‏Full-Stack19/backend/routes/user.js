const router = require('express').Router();
const crudMethods = require("../crud/crudMethods");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jsonWebToken = require("../api/jsonWebToken");
const regexConstants = require('../validation-forms/regexConstants');


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
    if (!regexConstants.FIRST_NAME_REGEX.test(firstName)) {
        return res.status(400).json({ message: "שם פרטי לא תקין" });
    }
    if (!regexConstants.LAST_NAME_REGEX.test(lastName)) {
        return res.status(400).json({ message: "שם משפחה לא תקין" });
    }

    if (!regexConstants.PASSWORD_REGEX.test(pwd)) {
        return res.status(400).json({ message: "סיסמה לא תקינה" });
    }


    

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name: { firstName, lastName }, password: await bcrypt.hash(pwd, 10) },
            { new: true }
        ).exec();

        if (!updatedUser) {
            return res.status(404).send('לא נמצא משתמש לעדכון');
        }

        const { password, ...others } = updatedUser._doc;
        console.log('others :', others);
        return res.status(200).json(others);

    } catch (err) {

        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');

    }

})

module.exports = router;