import './HomePage.css'
import axios from "../api/axios"

import { useSelector, useDispatch } from 'react-redux';

import {loginSuccess } from '../redux/userSlice';
import DUMMY_PRODUCTS from '../data/products'
import ProductItem from '../components/ProductItem';

const LOGIN_BY_TOKEN_URL = '/api/auth/login_by_token';



function HomePage() { 

  const dispatch = useDispatch();
  const user= useSelector((state)=>state.user.currentUser);
  
  if (!user){   
    const loginVerificationToken = getCookie("loginVerification");
    if (loginVerificationToken){
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


  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  return (
    <div className='homePage'>
      <h2 className='homePage_title'>מוצרים נבחרים</h2>

      <div className='homePage__products'>
      {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem key={product.productId} product={product} />
          )

        })}
      </div>

    </div>
  )
}

export default HomePage