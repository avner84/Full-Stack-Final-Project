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
            const response = await axios.put(DELETE_URL,
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response))
            
            navigate("/account_deleted");
            dispatch(logout());

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