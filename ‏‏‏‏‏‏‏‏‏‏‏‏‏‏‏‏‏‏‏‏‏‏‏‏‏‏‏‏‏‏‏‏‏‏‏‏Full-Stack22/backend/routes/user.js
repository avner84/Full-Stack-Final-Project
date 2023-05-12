const router = require('express').Router();
const userController = require("../controllers/userController");
const crudMethods = require("../crud/crudMethods");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const regexConstants = require('../validation-forms/regexConstants');
const authUser = require('../middleware/authUser');



router.put("/delete",authUser.checkAuthHeader, async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await userController.deleteUser(email);
        if (!user){
            return res.status(404).send('לא נמצא משתמש למחיקה'); 
        } 
        const { password, ...others } = user._doc;
        console.log('others :', others);
        return res.status(200).json(others);
    } catch (error) {
        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');
    }
    
    

})


router.put("/editing",authUser.checkAuthHeader, async (req, res) => {
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