import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, selectUserError } from '../../auth/AuthSlice';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  return (
    <div>
        <div className="mx-auto bg-white mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
              Email Address
            </h3>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p>Your Addresses:</p>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          </div>
        </div>
    </div>
  );
}
