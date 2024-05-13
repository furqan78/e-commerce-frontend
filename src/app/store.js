import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "../features/products/productSlice"
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/CartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
