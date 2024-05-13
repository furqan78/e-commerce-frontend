import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import PageNotFound from './pages/PageNotFound';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import ProductListPage from './pages/ProductListPage';
import { getItemFromLocalStorage } from './app/constants/common-function';
import { appLevelConstant } from './app/constant';
import Logout from './features/auth/components/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
      </Protected>
  },
  {
    path: "/signin",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
      </Protected>
  },
  {
    path: "/checkout",
    element: <Protected>
      <Checkout></Checkout>
      </Protected>
  },
  {
    path: "/product-detail/:id",
    element:
      <ProductDetailPage></ProductDetailPage>
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />
  },
  {
    path: "/products/:categorie",
    element: <ProductListPage />
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);

function App() {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  useEffect(()=> {
    if(userInfo){
      dispatch(fetchItemsByUserIdAsync(userInfo.id));
    }
  },[dispatch, userInfo]);

  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
