import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import EditingDetailsPage from "./pages/EditingDetailsPage";
import UserStorePage from './pages/UserStorePage'
import ProductUploadFormPage from './pages/ProductUploadFormPage'
import ProductEditingPage from './pages/ProductEditingPage'

import Navbar from './components/Navbar';
import BackDrop from './components/BackDrop';
import SideDrawer from './components/SideDrawer';
import AccountDeletedPage from './pages/AccountDeletedPage';
import AlertsPages from './pages/AlertsPages';
import ConfirmedAccountAlert from './components/alerts/ConfirmedAccountAlert';
import UnconfirmedAccountAlert from './components/alerts/UnconfirmedAccountAlert';
import ProductSuccessfullyAdded from './components/alerts/ProductSuccessfullyAdded';
import ProductDeletedSuccessfully from './components/alerts/ProductDeletedSuccessfully';
import ProductEditedSuccessfully from './components/alerts/ProductEditedSuccessfully';
import UserNotLoggedIn from './components/alerts/UserNotLoggedIn';

function App() {

  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <div className="app"> 
        <Navbar click={() => { setSideToggle(true) }} />
        <SideDrawer show={sideToggle} click={() => { setSideToggle(false) }} />
        <BackDrop show={sideToggle} click={() => { setSideToggle(false) }}/>

        <main>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/product/:id' element={<ProductPage />} />
            <Route exact path='/cart' element={<CartPage />} />
            <Route exact path='/signin' element={<SignInPage />} />
            <Route exact path='/register' element={<RegisterPage />} />
            <Route exact path='/edit_details' element={<EditingDetailsPage />} />
            <Route exact path='/user_store' element={<UserStorePage />} />
            <Route exact path='/product_upload' element={<ProductUploadFormPage />} />
            <Route exact path='/product_editing/:id' element={<ProductEditingPage />} />
            <Route exact path='/account_deleted' element={<AccountDeletedPage />} />
            <Route exact path='/account_confirmed' element={<AlertsPages alert={<ConfirmedAccountAlert/>} />} />
            <Route exact path='/account_unconfirmed' element={<AlertsPages alert={<UnconfirmedAccountAlert/>} />} />
            <Route exact path='/ProductSuccessfullyAdded' element={<AlertsPages alert={<ProductSuccessfullyAdded/>} />} />
            <Route exact path='/ProductDeletedSuccessfully' element={<AlertsPages alert={<ProductDeletedSuccessfully/>} />} />
            <Route exact path='/productEditedSuccessfully' element={<AlertsPages alert={<ProductEditedSuccessfully/>} />} />
            <Route exact path='/userNotLoggedIn' element={<AlertsPages alert={<UserNotLoggedIn/>} />} />
            
                   
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
