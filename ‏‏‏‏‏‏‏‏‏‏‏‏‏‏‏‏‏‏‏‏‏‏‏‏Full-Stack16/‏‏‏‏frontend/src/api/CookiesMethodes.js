
import axios from "./axios"
import { useSelector, useDispatch } from 'react-redux';

import { loginSuccess } from '../redux/userSlice';
import { setCartProducts } from '../redux/cartSlice'

import { FetchCartFromDB } from '../api/FetchCartFromDB'



const LOGIN_BY_TOKEN_URL = '/api/auth/login_by_token';

export async function SigninUserByToken() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    if (!user) {
        const loginVerificationToken = getCookie("loginVerification");
        if (loginVerificationToken) {
            try {
                const response = await axios.get(LOGIN_BY_TOKEN_URL, {
                    headers: {
                        Authorization: `Bearer ${loginVerificationToken}` // מוסיף את הטוקן לכותרת Authorization
                    }
                });
                dispatch(loginSuccess(response?.data));
                console.log("response.data from SigninUserByToken: ",response.data);
                const user = response.data;
                console.log('userID :', user._id);
                const cartForReduxStore = await FetchCartFromDB(user._id);
                dispatch(setCartProducts(cartForReduxStore));
            } catch (error) {
                console.log(error);
            }
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