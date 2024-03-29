import './CartPage.css'
import { useSelector } from 'react-redux';

import CartItem from '../components/CartItem'


function CartPage() {
  const {cartProducts, totalAmount, totalPrice} = useSelector((state)=>state.cart);
  
  console.log('cartProducts :', cartProducts);
  console.log('cartProducts 0:', cartProducts[0]);
  console.log('cartProducts 1:', cartProducts[1]);
  
  return (
    <div className='cartPage'>
      <div className='cartPage__right'>
        <h2>עגלת קניות</h2>
        {cartProducts.length >0? 
        cartProducts.map((product)=>{
        
          return(
            <CartItem key={product._id} product={product}/>)
          })
        // <CartItem product={cartProducts[0]} />
        : <h3>עגלת הקניות שלך ריקה</h3>}
        {/* <CartItem /> */}
      </div>
      <div className='cartPage__left'>
        <div className='cartPage__info'>
          <p>סך הכל {totalAmount} מוצרים</p>
          <p>{totalPrice} ש"ח</p>
        </div>
        <div>
        <button>מעבר לתשלום</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage