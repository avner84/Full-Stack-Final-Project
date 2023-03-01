import './SideDrawer.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LinkForGuest from './links/LinksForGuest'
import LinkForUser from './links/LinksForUser'

const SideDrawer = ({ show, click }) => {
  const { totalAmount } = useSelector((state) => state.cart);
  const userIsAuthenticated= useSelector((state)=>state.user.isAuthenticated);

  const sideDrawerClass = ['sidedrawer'];

  if (show) {
    sideDrawerClass.push("show");
  }
  return <div className={sideDrawerClass.join(" ")}>

    <ul className='sidedrawer__links' onClick={click}>
      {!userIsAuthenticated && <LinkForGuest />}
      {userIsAuthenticated && <LinkForUser />}
      <li >
        <Link to='/cart'>
          <i className="fas fa-cart-shopping" />
          <span className='sidedrawer__cartbadge'>{totalAmount}</span>
        </Link>
      </li>
    </ul>

  </div>;

}

export default SideDrawer