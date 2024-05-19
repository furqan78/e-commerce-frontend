import React, { useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { getItemFromLocalStorage } from './app/constants/common-function';
import { appLevelConstant } from './app/constant';
import { routes } from './app/constants/routes';

const router = createBrowserRouter(routes);

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
