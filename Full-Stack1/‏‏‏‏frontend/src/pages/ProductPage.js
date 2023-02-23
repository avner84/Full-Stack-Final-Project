import './ProductPage.css'
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import DUMMY_PRODUCTS from '../data/products'
import { addProduct } from '../redux/cartSlice';

const ProductPage = () => {

  const params = useParams();
  
  const product = DUMMY_PRODUCTS.find(item=>item.productId===params.id)
  
  const [selectedValueOfAmount, setSelectedValue] = useState(1);

  const handleSelectChange=(event)=> {
    setSelectedValue(parseInt(event.target.value));
  }
  
  const dispatch = useDispatch();
  const addProductToCartHandler = () => {
      dispatch(addProduct({product, quantity:selectedValueOfAmount}));      
    };

  return (
    <div className='productpage'>
      <div className='productpage__right'>
        <div className='right__image'>
          <img src={product.imgUrl} alt={product.title} />
        </div>
        <div className='right__info'>
          <p className='right__name'>{product.title}</p>
          <p className=''>מחיר: {product.price} ש"ח</p>
          <p><strong>תיאור:</strong>{product.description}</p>
        </div>
      </div>
      <div className='productpage__left'>
        <div className='left__info'>
          <p>
            מחיר: <span>{product.price} ש"ח</span>
          </p>
          <p> סטטוס: <span>במלאי</span></p>
          <p>
            כמות:
            <select onChange={handleSelectChange}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </p>
          <p>
            <button type="button" onClick={addProductToCartHandler}>הוסף לעגלה</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage