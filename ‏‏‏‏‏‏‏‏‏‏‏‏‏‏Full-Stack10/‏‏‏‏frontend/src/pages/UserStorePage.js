import StoreItem from '../components/StoreItem'
import './UserStorePage.css'
import { Link } from 'react-router-dom'

const UserStorePage = () => {
  return (
    <div className='userStorePage'>
      <h2>החנות שלי</h2>
      <div className='userStorePage__uploadBtnDiv'>
      <Link to='/product_upload'><button>הוספת מוצר</button></Link>
               
      </div>
      <div className='userStorePage__itemContainer'>
      <StoreItem/>
      <StoreItem/>
        <div>
        
        </div>
      </div>
    </div>
  )
}

export default UserStorePage
