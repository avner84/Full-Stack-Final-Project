import './CartPage.css'
import { useSelector } from 'react-redux';

import CartItem from '../components/CartItem'
import axios from '../api/axios';

const PAY_URL = '/api/order/pay';

function CartPage() {
  const { cartProducts, totalAmount, totalPrice } = useSelector((state) => state.cart);

  const hundlePayBtn = () => {

    axios.post(PAY_URL, { cartProducts, totalAmount, totalPrice })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          window.location = res.data.forwardLink
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // .then(response => console.log(response.data))
    // .catch(error => console.error(error));

  }



  return (
    <div className='cartPage'>
      <div className='cartPage__right'>
        <h2>עגלת קניות</h2>
        {cartProducts.length > 0 ?
          cartProducts.map((product) => {

            return (
              <CartItem key={product._id} product={product} />)
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
          <button onClick={hundlePayBtn}>מעבר לתשלום</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage