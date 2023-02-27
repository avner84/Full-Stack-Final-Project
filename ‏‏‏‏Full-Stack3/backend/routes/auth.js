const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {
    const newUser = new User({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    })
    try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}
catch(err){
    res.status(500).json(err);
}
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(401).json({error: "פרטי התחבות שגויים"});
        }
        const passwordFromClient = req.body.password;
        const passwordFromDB = user.password;

        const compareResult = await bcrypt.compare(passwordFromClient, passwordFromDB);
        if (!compareResult) {
            return res.status(401).json({error: "פרטי התחבות שגויים"});
        }
        const {password, ...others} = user._doc;

        res.status(200).json(others);
        console.log('user :', user);
        
    } catch (err) {
        res.status(500).json({error: "שגיאה פנימית בשרת"});
    }
})


module.exports = router;