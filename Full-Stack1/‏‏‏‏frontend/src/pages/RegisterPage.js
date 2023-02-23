import RegisterForm from '../components/forms/RegisterForm'
import './RegisterPage.css'

const RegisterPage = () => {
  return (

    <div className='wrapper'>
      <div className='form_container'>
        <div className='heading'>
          <h2>צור חשבון</h2>
        </div>
       <RegisterForm/>
      </div>
    </div>

  )
}

export default RegisterPage