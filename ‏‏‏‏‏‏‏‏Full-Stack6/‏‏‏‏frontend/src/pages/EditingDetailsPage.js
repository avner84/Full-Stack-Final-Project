import { useState } from 'react';
import EditingDetailsForm from '../components/forms/EditingDetailsForm'
import './EditingDetailsPage.css'



const EditingDetailsPage = () => {

  const [success, setSuccess] = useState(false);

  return (
    <EditingDetailsForm setSuccess={setSuccess}/>
  )
}

export default EditingDetailsPage