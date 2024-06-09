import React, { useEffect, useState } from 'react'
import { ITEMS_PER_PAGES, appLevelConstant } from '../../app/constant';
import { createCancelToken, getFormatedDate } from '../../app/constants/common-function';
import Pagination from '../../app/common-components/Pagination';
import { fetchAllOrders } from '../../features/order/orderAPI';
import OrderSkeletonLoader from '../../app/common-components/OrderSkeletonLoader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(appLevelConstant.ALL_ORDER_STATUS);

  useEffect(() => {
    let isMounted = true;
    const cancelTokenSource = createCancelToken();

    if(isMounted){

    const getOrders = async () => {
      try {
        const data = await fetchAllOrders(page, selectedStatus, cancelTokenSource);
        const orderStatusData = [
          {
            label: appLevelConstant.ALL_ORDER_STATUS,
            count: data.total
          },
          {
            label: appLevelConstant.CONFIRMED_ORDER_STATUS,
            count: data.confirmed
          },
          {
            label: appLevelConstant.SHIPPED_ORDER_STATUS,
            count: data.shipped
          },
          {
            label: appLevelConstant.OUT_FOR_DELIVERY_ORDER_STATUS,
            count: data.outForDelivery
          },
          {
            label: appLevelConstant.DELIVERED_ORDER_STATUS,
            count: data.delivered
          },
          {
            label: appLevelConstant.CANCELLED_ORDER_STATUS,
            count: data.cancelled
          },
          {
            label: appLevelConstant.RETURNED_ORDER_STATUS,
            count: data.returned
          },
          {
            label: appLevelConstant.FAILED_ORDER_STATUS,
            count: data.failed
          },
        ]
        setOrderStatus(orderStatusData);
        setOrders(data);
        setLoading(false);
        
      } catch (err) {
        if (err.message !== 'Request canceled' && isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    
    getOrders();
  }

    return () => {
      isMounted = false;
      cancelTokenSource.cancel("Requests Canceled.")
    }

  }, [page, selectedStatus]);

  const handleStatusChanged = (item) => {
    setLoading(true);
    setOrders([]);
    setSelectedStatus(item.label);
  }

  return (
    <div className='bg-white px-10 py-2'>
      <div className="py-3 flex">
        {orderStatus?.map((item, index) => (
          <div onClick={() => handleStatusChanged(item)}
          key={index}
            className={classNames(
              item.label === selectedStatus ? 'border-b-2 border-gray-700' : '',
              'px-4 py-2 text-l font-small text-gray-700 font-semibold hover:text-gray-500 cursor-pointer'
            )}
            aria-current={item ? 'page' : undefined}
          >
            {item.label} {`(${item.count})`}
          </div>
        ))}
      </div>
      { loading ? <OrderSkeletonLoader count={4} /> :
      <>
      {orders && orders?.data && orders?.data?.length > 0 ?
        <>
          <div>
            <Pagination
              page={page} totalItems={orders?.total}
              handlePagination={(page) => {
                setPage(page);
              }}
              itemsPerPage={ITEMS_PER_PAGES.ordersPage} />
          </div>
          <div className='mt-1 h-70vh overflow-auto'>
            {orders && orders.data ? orders?.data?.map((order, index) => (
              <ul className="-my-6" key={index}>
                {order.order_items.map((item, index) => (
                  <li key={index} className="flex py-6 user-order-card">
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
                            <p className='text-l font-normal text-gray-900'>&#x20B9; {item.product.price}</p>
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
        </> : null}
        </>}
    </div>
  )
}