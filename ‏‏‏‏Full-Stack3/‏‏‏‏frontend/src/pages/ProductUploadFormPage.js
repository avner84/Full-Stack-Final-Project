import './ProductUploadFormPage.css'

const ProductUploadFormPage = () => {
    return (

        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>הוספת מוצר</h2>
                </div>
                <form>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>שם המוצר</label>
                            <input type='text' required/>
                        </div>
                    </div>
                    
                  
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>תיאור המוצר</label>
                            <textarea name="product_description" rows="4" cols="50"></textarea>
                        </div>
                    </div>

                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>מחיר (בשקלים)</label>
                            <input type='number' required/>
                        </div>
                    </div>

                    <div class='form_wrap'>
                        <div className='form_item'>
                            <label>קטגוריה</label>                         
                            <select name='category' required>
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
                            <input type='file' required/>
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