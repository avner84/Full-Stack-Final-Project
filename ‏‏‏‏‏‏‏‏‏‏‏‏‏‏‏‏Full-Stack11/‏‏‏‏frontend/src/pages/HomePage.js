import './HomePage.css'
import axios from "../api/axios"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {loginSuccess } from '../redux/userSlice';
//import DUMMY_PRODUCTS from '../data/products'
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../redux/productsActions';

const LOGIN_BY_TOKEN_URL = '/api/auth/login_by_token';



function HomePage() { 

  const dispatch = useDispatch();
  const user= useSelector((state)=>state.user.currentUser);
  const products = useSelector((state) => state.products.products);
  const productsStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
          //console.log(response.data);
        })
        .catch(error => {
          //console.log(error);
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

  if (productsStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (productsStatus === 'failed') {
    return <div>{error}</div>;
  }else {
    return (
      <div className='homePage'>
      <h2 className='homePage_title'>מוצרים נבחרים</h2>

      <div className='homePage__products'>
      {products.map((product) => {
          return (
            <ProductItem key={product._id} product={product} />
          )

        })}
      </div>

    </div>
    )
  }

}

export default HomePage