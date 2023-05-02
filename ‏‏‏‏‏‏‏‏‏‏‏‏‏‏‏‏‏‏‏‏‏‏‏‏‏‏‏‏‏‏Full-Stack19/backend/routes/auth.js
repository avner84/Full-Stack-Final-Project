const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const emailManager = require("../emailManager/emailManager");
const jsonWebToken = require("../api/jsonWebToken");
const crudMethods = require("../crud/crudMethods");
const regexConstants = require('../validation-forms/regexConstants');


router.post("/register", async (req, res) => {
    const { firstName, lastName, email, pwd } = req.body;
    let lowerCaseEmail = email.toLowerCase();

    // Validate user inputs
    if (!regexConstants.FIRST_NAME_REGEX.test(firstName)) {
        return res.status(400).json({ message: "שם פרטי לא תקין" });
    }
    if (!regexConstants.LAST_NAME_REGEX.test(lastName)) {
        return res.status(400).json({ message: "שם משפחה לא תקין" });
    }
    if (!regexConstants.EMAIL_REGEX.test(lowerCaseEmail)) {
        return res.status(400).json({ message: "כתובת אימייל לא תקינה" });
    }
    if (!regexConstants.PASSWORD_REGEX.test(pwd)) {
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

    // const token = jsonWebToken.createToken()

    try {
        const savedUser = await newUser.save();
        const { password, ...others } = savedUser._doc;
        // console.log('others :', others);

        //In the event that the user does not verify the account within 30 minutes, the account is deleted. A unique method because you don't need to send a response to the customer
        setTimeout(async function () {
            try {
                const user = await User.findOne({ email: newUser.email })

                if (!user) { throw error }
                if (user.isActive === false) {
                    const resultUserDeleteByServer = crudMethods.userDeleteByServer(newUser.email)
                    console.log('resultUserDeleteByServer :', resultUserDeleteByServer);
                }

            } catch (error) {
                console.error(error);
            }

        }, 1800000);
        

        const token = jsonWebToken.createToken(others, "30m")
        emailManager.accountVerificationEmail("avner84@gmail.com", token);
        res.status(201).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.get("/confirmAccount", async (req, res) => {

    const token = req.query.token;

    const doseTokenMatch = await jsonWebToken.checkToken(token);
    console.log('doseTokenMatch :', doseTokenMatch);
    if (doseTokenMatch) {

        const tokenUserInformation = jsonWebToken.decryptToken(token);
        console.log('tokenUserInformation :', tokenUserInformation);
        const email = tokenUserInformation.email;

        User.findOneAndUpdate(
            { email },
            { isActive: true },
            { new: true },
            function (err, user) {

                if (err) {
                    console.error(err);
                    res.redirect('http://localhost:3000/account_unconfirmed');
                }
                if (!user) {

                    res.redirect('http://localhost:3000/account_unconfirmed');
                }

                const { password, ...others } = user._doc;
                console.log('others :', others);

            })

        res.redirect('http://localhost:3000/account_confirmed');
    }
    else {
        res.redirect('http://localhost:3000/account_unconfirmed');
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

        if (!user.isActive) {
            return res.status(401).json({ error: "החשבון לא אומת" });
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
        const token = jsonWebToken.createToken(others, "60m")
        res.status(200).cookie("loginVerification", token).json(others);
        console.log('user :', user);

    } catch (err) {
        res.status(500).json({ error: "שגיאה פנימית בשרת" });
    }
})

const checkAuthHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (jsonWebToken.checkToken(token)) {           
            res.locals.token = token;  
            
            
            return next();
        } else {
            return res.status(403).send('Unauthorized');
        }
    } else {
        return res.status(401).send('Missing Authorization header');
    }
};

router.get("/login_by_token", checkAuthHeader, (req, res) => {
   
    const userFromToken = jsonWebToken.decryptToken(res.locals.token);
    const newToken = jsonWebToken.createToken(userFromToken, "60m");
    res.status(200).cookie("loginVerification", newToken).json(userFromToken);
});





module.exports = router;