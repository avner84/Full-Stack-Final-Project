import './SignInPage.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice';

const SignInPage = () => {
const dispatch = useDispatch();

const loginHandler = (event) => {
  event.preventDefault();
dispatch(login());
};

  return (
    <div className='wrapper'>
      <div className='form_container'>
        <div className='heading'>
          <h2>התחבר לחשבון</h2>
        </div>
        <form onSubmit={loginHandler}>
          <div className='form_wrap'>
            <div className='form_item'>
              <label>כתובת דוא"ל</label>
              <input type='text' />
            </div>
          </div>
          <div className='form_wrap'>
            <div className='form_item'>
              <label>סיסמה</label>
              <input type='password' />
            </div>
          </div>
          <div className="btn">
            <input type="submit" value="התחבר" />
          </div>
          <div className='fogate_pass_wrap'>
            <Link >שכחת את הסיסמה?</Link>
          </div>
        </form>
      </div>
    </div>

  )
}

export default SignInPage