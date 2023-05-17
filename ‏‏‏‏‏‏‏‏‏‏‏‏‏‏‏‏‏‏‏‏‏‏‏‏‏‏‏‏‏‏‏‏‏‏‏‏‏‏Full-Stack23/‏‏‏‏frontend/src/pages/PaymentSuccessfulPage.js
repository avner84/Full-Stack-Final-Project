import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrder } from '../redux/ordersSlice';
import { emptyCart } from '../redux/cartSlice';

const PaymentSuccessfulPage = () => {
  const { cartProducts } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleUpdateOrder = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // יונואר מתחיל מ-0
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedDate = `${year}-${month}-${day}, שעה ${hours}:${minutes}`;

    const order = cartProducts.map((product) => {
      return {
        ...product,
        date: formattedDate,
      };
    });

    return new Promise((resolve, reject) => {
        dispatch(addOrder({ order, userId: user._id }));
        dispatch(emptyCart());
    
        resolve();
      });
  };

  const intervalRef = useRef(null);

  useEffect(() => {
    const isFromPaypal = window.location.pathname === '/success';

    if (isFromPaypal && cartProducts && user && cartProducts.length > 0) {
      intervalRef.current = setInterval(() => {
        handleUpdateOrder();
        clearInterval(intervalRef.current);
      }, 200); 
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [cartProducts, user]);

  return (
    <div className="wrapper">
      <div className="form_container">
        <h2 >הזמנתך נקלטה בהצלחה</h2>
        <p>לצפייה בדף ההזמנות <Link to='/my_order'>לחץ כאן</Link></p>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
