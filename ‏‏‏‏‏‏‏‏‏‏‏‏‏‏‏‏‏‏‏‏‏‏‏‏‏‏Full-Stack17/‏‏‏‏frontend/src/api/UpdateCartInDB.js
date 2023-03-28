//import { useSelector } from 'react-redux';
import axios from './axios';

const UPDATE_CART_IN_DB_URL = 'api/cart/updateCartInDB';


const UpdateCartInDB = async (cart, userId) => {
  //  const user= useSelector((state)=>state.user.currentUser);
    //const cart= useSelector((state)=>state.cart.cartProducts);
    const response = await axios.post(UPDATE_CART_IN_DB_URL,
        JSON.stringify({cart, userId}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(response);
}

export default UpdateCartInDB