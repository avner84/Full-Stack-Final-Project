import './ProductUploadFormPage.css'
import { useState } from 'react';
import axios from '../api/axios'
const LOGIN_BY_TOKEN_URL = '/api/products/createProduct';

const ProductUploadFormPage = () => {

    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        category: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('productName', formData.productName);
        data.append('productDescription', formData.productDescription);
        data.append('productPrice', formData.productPrice);
        data.append('category', formData.category);
        data.append('file', file, file.name);
        data.append('Content-Type', file.type);

        try {
            const response = await axios.post(LOGIN_BY_TOKEN_URL, data, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>הוספת מוצר</h2>
                </div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>שם המוצר</label>
                            <input type='text' required onChange={handleInputChange} />
                        </div>
                    </div>


                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>תיאור המוצר</label>
                            <textarea name="product_description" rows="4" cols="50" onChange={handleInputChange}></textarea>
                        </div>
                    </div>

                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>מחיר (בשקלים)</label>
                            <input type='number' required onChange={handleInputChange} />
                        </div>
                    </div>

                    <div class='form_wrap'>
                        <div class='form_item'>
                            <label>קטגוריה</label>
                            <select name='category' required onChange={handleInputChange}>
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
                            <input type='file' required onChange={handleFileChange} />
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