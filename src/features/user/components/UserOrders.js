import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { getFormatedDate, getItemFromLocalStorage } from '../../../app/constants/common-function';
import { ITEMS_PER_PAGES, appLevelConstant, orderStatus } from '../../../app/constant';
import "../../order/order.scss";
import Pagination from '../../../app/common-components/Pagination';
import CollapsableMenu from '../../../app/common-components/CollapsableMenu';


export default function UserOrders() {
  const dispatch = useDispatch();
  const user = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  let orders = useSelector(selectUserOrders);
  const [page, setPage] = useState(1);
  const [dropdownTitle, setDropdownTitle] = useState(appLevelConstant.ORDER_STATUS_LABEL);
  const [selectedValue, setSelectedValue] = useState(orderStatus[0].label);

  useEffect(() => {
    const reqObj = {
      user_id: user?.id,
      page: page,
    }
    dispatch(fetchLoggedInUserOrdersAsync(reqObj))
  }, [dispatch, page]);

  return (
    <div>
      <div className='px-3'>
      <CollapsableMenu title={dropdownTitle} selectedValue={selectedValue} onItemClick={(item)=> {setSelectedValue(item.label)}} menuItems={orderStatus} />
      </div>
      <div className='mt-5'>
        {orders && orders.data ? orders?.data?.map((order, index) => (
          <ul className="-my-6" key={index}>
            {order.order_items.map((item, index) => (
              <li key={index} className="flex py-6 user-order-card">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
                  <img
                    src={item?.selectedDetails?.images[0]}
                    alt={item?.product?.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base">
                      <div>
                        <h3 className='text-l font-normal text-gray-900'>{item.product.title}</h3>
                        <div className="text-gray-500 mt-2">
                          <label htmlFor="password" className="inline mr-5 text-sm font-normal leading-6 text-gray-500">
                            Qty: {item.quantity}
                          </label>
                        </div>
                        <div className="text-gray-500">
                          <label htmlFor="password" className="inline mr-5 text-sm font-normal leading-6 text-gray-500">
                            Order Number: {order.id}
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className='text-l font-normal text-gray-900 nunito-text'>&#x20B9;{item.product.price*item.quantity}</p>
                      </div>
                      <div>
                        <p className='text-sm font-semibold mt-1'>Order Confirmed on {getFormatedDate(order.order_date)}</p>
                        <p className='text-xs font-normal mt-1'>Your item has been confirmed</p>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )) : null}
      </div>
      <div className='mt-10'>
        <Pagination 
        page={page} totalItems={orders?.totalCount} 
        handlePagination={(page) => {
          setPage(page) ;
          }} 
        itemsPerPage={ITEMS_PER_PAGES.ordersPage} />
      </div>
    </div>
  );
}
