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
            <Route exact path='/product_editing' element={<ProductEditingPage />} />
            

                     
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
