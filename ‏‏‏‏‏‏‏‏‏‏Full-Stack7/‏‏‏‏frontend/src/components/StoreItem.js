import './StoreItem.css'

const StoreItem = () => {
    return (
        <div className='storeItem'>
            <div className='storeItem__image'>
                <img src='https://market.marmelada.co.il/images/detailed/6175/PHOTO-2021-08-01-17-29-55__3_.jpg?source_page=products.view' alt='product name' />
            </div>
            <div className='storeItem__name'>
                <h3>שם המוצר:</h3>
                <p>קערה אומנותית</p>
            </div>

            <div className='storeItem__price'>
                <h3>מחיר:</h3>
                <p>90 ש"ח</p>
            </div>
            <div className='storeItem__category'>
                <h3>קטגוריה:</h3>
                <p>קרמיקה</p>
            </div>
            <div className='storeItem__description'>
                <h3>תיאור המוצר:</h3>
                <p>זה מוצר מאוד יקר ומאוד משובח. הוא יעשה אתכם שמחים. גודל המוצר הוא בערך חצי טפח על טפח וזרת. הוא עשוי מחומר מאוד איכותי ולא ניתן להשיג כמוהו בכל העולם</p>
            </div>

            <div className='storeItem__btns'>              
                <button className='storeItem__editBtn'>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>

                <button className='storeItem__deleteBtn'>
                    <i class="fa fa-trash" ></i>
                </button>
            </div>


        </div>
    )
}

export default StoreItem