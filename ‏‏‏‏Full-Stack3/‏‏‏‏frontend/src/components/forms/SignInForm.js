import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from "../../redux/authSlice";
import axios from "../../api/axios";
const LOGIN_URL = '/auth'


const SignInForm = ({ loginHandler }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const hundlesubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data));
            dispatch(login());
            setEmail('');
            setPwd('');
            setSuccess(true)
        } catch (err) {            
            if (!err?.response) {
                setErrMsg('אין תשובה מהשרת');
            }
            else if (err.response?.status === 400) {
                setErrMsg('כתובת הדוא"ל או הסיסמה חסרים');
            }
            else if (err.response?.status === 401) {
                setErrMsg('אחד הפרטים שהוזן שגוי');
            } else {
                setErrMsg('ההתחברות נכשלה')
            }
        }


    }

    return (
        <div className='wrapper'>
            <div className='form_container'>
                <div className='heading'>
                    <h2>התחבר לחשבון</h2>
                </div>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <form onSubmit={hundlesubmit}>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="email">כתובת דוא"ל:</label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                    </div>
                    <div className='form_wrap'>
                        <div className='form_item'>
                            <label htmlFor="password">סיסמה:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                    </div>
                    <div className="btn">
                        <input type="submit" value="התחבר" />
                    </div>
                    <div className='fogate_pass_wrap'>
                        <p><Link >שכחת את הסיסמה?</Link></p>
                        <p>עוד אין לך חשבון? <Link to='/register'>לחץ כאן</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInForm