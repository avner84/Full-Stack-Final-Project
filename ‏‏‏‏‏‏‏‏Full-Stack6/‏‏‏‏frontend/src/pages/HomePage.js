import './HomePage.css'

import DUMMY_PRODUCTS from '../data/products'
import ProductItem from '../components/ProductItem';

function HomePage() {
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