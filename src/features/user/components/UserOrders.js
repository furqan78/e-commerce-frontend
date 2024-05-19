import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { getFormatedDate, getItemFromLocalStorage } from '../../../app/constants/common-function';
import { appLevelConstant } from '../../../app/constant';
import "../../order/order.scss";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user?.id))
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <ul role="list" className="-my-6">
          {order.order_items.map((item) => (
            <li key={item.product.id} className="flex py-6 user-order-card">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base">
                    <h3 className='text-l font-normal text-gray-900'>{item.product.title}</h3>
                    <p className='text-l font-normal text-gray-900'>&#x20B9; {item.product.price}</p>
                    <div>
                      <p className='text-sm font-semibold mt-1'>Order Confirmed on {getFormatedDate(order.order_date)}</p>
                      <p className='text-xs font-normal mt-1'>Your item has been confirmed</p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="text-gray-500">
                    <label htmlFor="password" className="inline mr-5 text-sm font-normal leading-6 text-gray-500">
                      Qty: {item.quantity}
                    </label>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
