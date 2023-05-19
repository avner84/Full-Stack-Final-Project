import './CartPage.css'
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import CartItem from '../components/CartItem'
import axios from '../api/axios';
import {getCookie} from '../api/CookiesMethodes'

const PAY_URL = '/api/order/pay';

function CartPage() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { cartProducts, totalAmount, totalPrice } = useSelector((state) => state.cart);

  const hundlePayBtn = () => {
    const loginVerificationToken = getCookie("loginVerification");

    if(loginVerificationToken){
    axios.post(PAY_URL, { cartProducts, totalAmount, totalPrice },
      {
        headers: {
          Authorization: `Bearer ${loginVerificationToken}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setShowSuccessAlert(true); // מציג את ההודעה כאשר התשלום בוצע בהצלחה
          window.location = res.data.forwardLink;
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
  }



  return (
    <div className='cartPage'>

{showSuccessAlert && (
 
       
          <p>תודה רבה על רכישתך.</p>
        
      )}


  <div className='cartPage__right'>
    <h2>עגלת קניות</h2>
    {cartProducts.length > 0 ?
      cartProducts.map((product) => {
        return (
          <CartItem key={product._id} product={product} />)
      })
      :
      <h3>עגלת הקניות שלך ריקה</h3>
    }
  </div>

  {cartProducts.length > 0 &&
    <div className='cartPage__left'>
      <div className='cartPage__info'>
        <p>סך הכל {totalAmount} מוצרים</p>
        <p>{totalPrice} ש"ח</p>
      </div>
      <div>
        <button onClick={hundlePayBtn}>מעבר לתשלום</button>
      </div>
    </div>
  }
</div>
  )
}

export default CartPage



















// import './CartPage.css'
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import {addOrder} from '../redux/ordersSlice'
// import {emptyCart} from '../redux/cartSlice'

// import CartItem from '../components/CartItem'
// import axios from '../api/axios';
// import {getCookie} from '../api/CookiesMethodes'

// const PAY_URL = '/api/order/pay';



// function CartPage() {
//   const { cartProducts, totalAmount, totalPrice } = useSelector((state) => state.cart); 
//   const user = useSelector((state) => state.user.currentUser);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

// const handleUpdateOrder = () => {


// const now = new Date();
// const year = now.getFullYear();
// const month = now.getMonth() + 1; // יונואר מתחיל מ-0
// const day = now.getDate();
// const hours = now.getHours();
// const minutes = now.getMinutes();

// const formattedDate = `${year}-${month}-${day}, שעה ${hours}:${minutes}`;

// const order = cartProducts.map((product) => {
//   return {
//     ...product,
//     date: formattedDate,
//   };
// });

// dispatch(addOrder({ order, userId: user._id }));
// dispatch(emptyCart());
// };


//   const hundlePayBtn = () => {
//     const loginVerificationToken = getCookie("loginVerification");

//     if(loginVerificationToken){
//       axios.post(PAY_URL, { cartProducts, totalAmount, totalPrice },
//         {
//           headers: {
//             Authorization: `Bearer ${loginVerificationToken}`
//           }
//         })
//         .then((res) => {
//           if (res.status === 200) {
//             console.log(res.data);
//             const redirectUrl = res.data.forwardLink;

//             // הוספת פונקציה עבור טיפול בעדכון ההזמנה
//             const handleOrderUpdate = () => {
//               const url = new URL(redirectUrl);
//               const success = url.searchParams.get('success');
//               const orderData = JSON.parse(decodeURIComponent(url.searchParams.get('orderData')));

//               if (success === 'true' && orderData) {
//                 handleUpdateOrder(orderData);
//                 navigate("/my_order");
//               }
//             };

//             // קריאה לפונקציה לאחר שהלקוח הופנה לכתובת
//             window.addEventListener('load', handleOrderUpdate);
//             window.location = redirectUrl;
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }




//   return (
//     <div className='cartPage'>
//   <div className='cartPage__right'>
//     <h2>עגלת קניות</h2>
//     {cartProducts.length > 0 ?
//       cartProducts.map((product) => {
//         return (
//           <CartItem key={product._id} product={product} />)
//       })
//       :
//       <h3>עגלת הקניות שלך ריקה</h3>
//     }
//   </div>

//   {cartProducts.length > 0 &&
//     <div className='cartPage__left'>
//       <div className='cartPage__info'>
//         <p>סך הכל {totalAmount} מוצרים</p>
//         <p>{totalPrice} ש"ח</p>
//       </div>
//       <div>
//         <button onClick={hundlePayBtn}>מעבר לתשלום</button>
//       </div>
//     </div>
//   }
// </div>
//   )
// }

// export default CartPage