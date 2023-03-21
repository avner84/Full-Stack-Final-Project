import './ProductEditingPage.css'
const ProductEditingPage = () => {
  return (
    <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>עריכת מוצר</h2>
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
                    <div className='form_wrap img_container_container'>
                        <div className='form_item img_container'>
                        <img src='https://market.marmelada.co.il/images/detailed/6175/PHOTO-2021-08-01-17-29-55__3_.jpg?source_page=products.view' alt='product name'/>   
                        <div className='textImageDiv'>תמונה נוכחית</div>
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label>החלף תמונה קיימת בתמונה חדשה</label>
                            <input type='file' required/>
                        </div>
                    </div>
                    
                    

                    <div className="btn">
                        <input type="submit" value="עדכן" />
                    </div>
                </form>
            </div>
        </div>
  )
}

export default ProductEditingPage