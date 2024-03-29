const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const emailManager = require("../emailManager/emailManager");

const FIRST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}$/;
const LAST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}(\s[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30})?$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,24}$/;

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, pwd } = req.body;
    let lowerCaseEmail = email.toLowerCase();

    // Validate user inputs
    if (!FIRST_NAME_REGEX.test(firstName)) {
        return res.status(400).json({ message: "שם פרטי לא תקין" });
    }
    if (!LAST_NAME_REGEX.test(lastName)) {
        return res.status(400).json({ message: "שם משפחה לא תקין" });
    }
    if (!EMAIL_REGEX.test(lowerCaseEmail)) {
        return res.status(400).json({ message: "כתובת אימייל לא תקינה" });
    }
    if (!PASSWORD_REGEX.test(pwd)) {
        return res.status(400).json({ message: "סיסמה לא תקינה" });
    }

    //Checking if the email address is from gmail and if so it checks if there are dots before the @ and removes them

    if (/@gmail/.test(lowerCaseEmail)) {
        const [localPart, domain] = email.split('@');
        const normalizedLocalPart = localPart.replace(/\./g, '');
        lowerCaseEmail = `${normalizedLocalPart}@${domain}`;
    }

    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
        return res.status(409).json({ message: "כתובת הדואר האלקטרוני שסיפקת כבר קיימת במערכת." });
    }

    const newUser = new User({
        name: {
            firstName,
            lastName
        },
        email: lowerCaseEmail,
        password: await bcrypt.hash(pwd, 10)
    })
    try {
        const savedUser = await newUser.save();
        emailManager.accountVerificationEmail("avner84@gmail.com", "token123");
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.post("/login", async (req, res) => {
    const { email, pwd } = req.body;
    let lowerCaseEmail = email.toLowerCase();

    if (/@gmail/.test(lowerCaseEmail)) {
        const [localPart, domain] = email.split('@');
        const normalizedLocalPart = localPart.replace(/\./g, '');
        lowerCaseEmail = `${normalizedLocalPart}@${domain}`;
    }


    try {
        const user = await User.findOne({ email: lowerCaseEmail })
        if (!user) {
            return res.status(401).json({ error: "פרטי התחברות שגויים" });
        }

        if (user.isDeleted) {
            return res.status(404).json({ error: "חשבון זה אינו קיים יותר במערכת" });
        }
        const passwordFromClient = pwd;
        const passwordFromDB = user.password;

        const compareResult = await bcrypt.compare(passwordFromClient, passwordFromDB);
        if (!compareResult) {
            return res.status(401).json({ error: "פרטי התחברות שגויים" });
        }
        const { password, ...others } = user._doc;
       
        res.status(200).json(others);
        console.log('user :', user);

    } catch (err) {
        res.status(500).json({ error: "שגיאה פנימית בשרת" });
    }
})

router.put("/editing", async (req, res) => {
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

router.put("/delete", async (req, res) => {
    const { email } = req.body;

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

})

router.get("/confirmAccount", async (req, res) => {

    const query = req.query;
    console.log('query :', query);
})

module.exports = router;