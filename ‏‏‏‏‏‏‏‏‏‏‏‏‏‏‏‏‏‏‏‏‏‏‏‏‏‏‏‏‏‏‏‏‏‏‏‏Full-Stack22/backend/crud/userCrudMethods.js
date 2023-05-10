const bcrypt = require('bcrypt');
const User = require("../models/User");

async function findUser(email) {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser;
    } catch (error) {
        throw new Error(`An error occurred while finding user by email ${email}: ${error}`);
    }
}


async function createUser(firstName, lastName, email, pwd) {
    try {
        let lowerCaseEmail = email.toLowerCase();
        const newUser = await User.create({
            name: {
                firstName,
                lastName,
            },
            email: lowerCaseEmail,
            password: await bcrypt.hash(pwd, 10),
        });

        const { password, ...others } = newUser._doc;
        return others;
    } catch (error) {
        console.error(error);
        throw error;
    }
   
}

async function deleteUser(email, res) {
    try {
        const user = await User.findOneAndUpdate({ email }, { isDeleted: true }, { new: true });
        if (!user) {
            return res.status(404).send('לא נמצא משתמש למחיקה');
        }
        const { password, ...others } = user._doc;
        console.log('others :', others);
        return res.status(200).json(others);
    } catch (err) {
        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');
    }
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
        console.log(err);
        return err;
    }
}


async function deleteUserIfInactive(newUser) {
console.log('newUser :', newUser);
console.log('=========== deleteUserIfInactive played ===========');
    try {
        const user = await findUser(newUser.email)

        if (!user) { throw error }
        if (user.isActive === false) {
            const resultUserDeleteByServer = await userDeleteByServer(newUser.email)
            console.log('resultUserDeleteByServer :', resultUserDeleteByServer);
        }

    } catch (error) {
        console.log(error);
    }

}


module.exports = { createUser, findUser, deleteUser, deleteUserIfInactive }