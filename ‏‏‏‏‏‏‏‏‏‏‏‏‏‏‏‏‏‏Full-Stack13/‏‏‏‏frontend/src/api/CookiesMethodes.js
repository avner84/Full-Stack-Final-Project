
import axios from "./axios"
import { useSelector, useDispatch } from 'react-redux';

import { loginSuccess } from '../redux/userSlice';



const LOGIN_BY_TOKEN_URL = '/api/auth/login_by_token';

export function SigninUserByToken() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    if (!user) {
        const loginVerificationToken = getCookie("loginVerification");
        if (loginVerificationToken) {
            axios.get(LOGIN_BY_TOKEN_URL, {
                headers: {
                    Authorization: `Bearer ${loginVerificationToken}` // מוסיף את הטוקן לכותרת Authorization
                }
            })
                .then(response => {
                    dispatch(loginSuccess(response?.data));
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}