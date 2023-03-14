import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartSlice';
import authReducer from './authSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth: authReducer,
        user: userReducer
    },
});