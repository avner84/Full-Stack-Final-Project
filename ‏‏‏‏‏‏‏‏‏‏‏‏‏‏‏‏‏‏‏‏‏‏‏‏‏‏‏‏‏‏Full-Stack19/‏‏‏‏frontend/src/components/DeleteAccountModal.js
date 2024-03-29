import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from '../api/axios';
import {  logout } from '../redux/userSlice';

const DELETE_URL = '/api/user/delete';;

function DeleteAccountModal({ setShowDeleteModal }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);
    const email = user.email;

    const handleDelete = async () => {

        try {
            const loginVerificationToken = getCookie("loginVerification");
            const response = await axios.put(DELETE_URL,
                JSON.stringify({ email }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${loginVerificationToken}`
                      },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response))
                        
            dispatch(logout());
            navigate("/account_deleted");
        }
        catch (err) {
            if (!err?.response) {
                alert('אין תשובה מהשרת');
            }

            else {
                alert('מחיקת המשתמש נכשלה')
            }

        }




       
       
    };

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) {
          return parts.pop().split(";").shift();
        }
      }

    const handleCancel = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="wrapper">
            <div className='form_container'>
                <div className="DeleteAccountModalTitle">האם אתה בטוח שברצונך למחוק את חשבונך?</div>
                <div className="DeleteAccountModalBtns">
                    <button onClick={handleDelete}>כן</button>
                    <button onClick={handleCancel}>לא</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;