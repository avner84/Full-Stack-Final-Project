const User = require("../models/User");

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

module.exports = {deleteUser,userDeleteByServer}