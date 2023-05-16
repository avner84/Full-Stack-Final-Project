import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {addOrder} from '../redux/ordersSlice'
import {emptyCart} from '../redux/cartSlice'


//import CartItem from '../components/CartItem'
import OrderItem from '../components/OrderItem'

const OrdersPage = () => {
   const { cartProducts } = useSelector((state) => state.cart);
    const { orders } = useSelector((state) => state.orders); // הוספתי זאת
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
      
        dispatch(addOrder({ order, userId: user._id }));
        dispatch(emptyCart());
      };
      
    
      return (
        <>
          <button onClick={handleUpdateOrder}>עדכן הזמנה</button>
          <div className='cartPage'>
            <div>
              {orders.length > 0 ? (
                <>
                  <h2>ההזמנות שלי</h2>
                  {orders.map((product) => (
                    <OrderItem key={product._id} product={product} />
                  ))}
                </>
              ) : (
                <>
                  <h2>עד כה לא בוצעו הזמנות</h2>
                  <p>לאחר ביצוע רכישות באתר, פרטי ההזמנות יופיעו בדף זה</p>
                </>
              )}
            </div>
          </div>
        </>
      );
}

export default OrdersPage