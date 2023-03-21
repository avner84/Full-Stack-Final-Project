import './ProductUploadFormPage.css'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from '../api/axios';

const PRODUC_TֹTITLE_REGEX = /^[a-zA-Zא-ת]+[\s_-][a-zA-Zא-ת]+$/;
const PRODUCT_DESCRIPTION_REGEX = /^[\u0590-\u05FF\s\d\w]{1,100}$|^[\s\d\w]{1,100}$/;
const PRODUCT_PRICE_REGEX = /^\d+$/;
const PRODUCT_CATEGORY_REGEX = /^[א-ת ]{2,20}$/;

const  CREATE_PRODUCT_URL = '/api/products/createProduct';

//Product description

const ProductUploadFormPage = () => {

    const [productTitle, setProductTitle] = useState('');
    const [validProductTitle, setvalidProductTitle] = useState(false);

    const [productDescription, setProductDescription] = useState('');
    const [validProductDescription, setValidProductDescription] = useState(false);

    const [price, setPrice] = useState(0);
    const [validPrice, setValidPrice] = useState(false);

    const [category, setCategory] = useState('');
    const [validCategory, setValidCategory] = useState(false);


    useEffect(() => {
        const result = PRODUC_TֹTITLE_REGEX.test(productTitle)
        setvalidProductTitle(result);
    }, [productTitle])

    useEffect(() => {
        const result = PRODUCT_DESCRIPTION_REGEX.test(productDescription)
        setValidProductDescription(result);
    }, [productDescription])

    useEffect(() => {
        const result = PRODUCT_PRICE_REGEX.test(price)
        setValidPrice(result);
    }, [price])

    useEffect(() => {
        const result = PRODUCT_CATEGORY_REGEX.test(category)
        setValidCategory(result);
    }, [category])

    const hundlesubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();        
        data.append('title', productTitle);
        data.append('description', productDescription);
        data.append('price', price);
        data.append('category', category);                
        data.append('file', "test_file");
        
        try {
            
            const response = await axios.post(CREATE_PRODUCT_URL, data, {
                headers: { 
                    'Content-Type': ' multipart/form-data'
                }
            });
            console.log('Success:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>הוספת מוצר</h2>
                </div>
                <form onSubmit={hundlesubmit}>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                שם המוצר
                                <FontAwesomeIcon icon={faCheck} className={validProductTitle ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validProductTitle || !productTitle ? "hide" : "invalid"} />
                            </label>
                            <input
                                type='text'
                                onChange={(e) => setProductTitle(e.target.value)}
                                value={productTitle}
                                required />
                        </div>
                    </div>


                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                תיאור המוצר
                                <FontAwesomeIcon icon={faCheck} className={validProductDescription ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validProductDescription || !productDescription ? "hide" : "invalid"} />
                            </label>
                            <textarea
                                name="product_description"
                                rows="4"
                                cols="50"
                                onChange={(e) => setProductDescription(e.target.value)}
                                value={productDescription}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>
                                מחיר (בשקלים)
                                <FontAwesomeIcon icon={faCheck} className={validPrice ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPrice || !price ? "hide" : "invalid"} />
                            </label>
                            <input type='number'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                required />
                        </div>
                    </div>

                    <div class='form_wrap'>
                        <div className='form_item'>
                            <label>
                                קטגוריה
                                <FontAwesomeIcon icon={faCheck} className={validCategory ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validCategory || !category ? "hide" : "invalid"} />
                            </label>
                            <select name='category'
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                required>
                                <option value=""></option>
                                <option>קרמיקה</option>
                                <option>תכשיטים</option>
                                <option>עץ</option>
                                <option>טקסטיל</option>
                                <option>זכוכית</option>
                                <option>הלבשה</option>
                                <option>ציור</option>
                                <option>כיסויי ראש</option>
                                <option>כיפות</option>
                                <option>יודאיקה</option>
                                <option>אחר</option>
                            </select>

                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>הוסף תמונה</label>
                            <input type='file'
                            //required
                            />
                        </div>
                    </div>


                    <div className="btn">
                        <input type="submit" value="הוסף" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductUploadFormPage