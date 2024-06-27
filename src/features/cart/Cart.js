import { useState } from 'react'
import { Link } from 'react-router-dom'
import { removeItemsFromCartAsync, selectItems, updateCartAsync } from './CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import '../pamplet/pamplet.scss';
import EmptyCart1 from "../../assets/images/empty-cart-1.png";
import EmptyCart2 from "../../assets/images/empty-cart-2.png";
import { getDateMonth } from '../../app/constants/common-function'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalItems = items?.reduce((total, item) => item?.quantity + total, 0);
  const [shippingEstimate, setShippingEstimate] = useState(70);
  const [deliveryCharges, setDeliveryCharges] = useState(40);
  let totalAmount = items?.reduce((amount, item) => item?.product?.price * item?.quantity + amount, 0);
  let discountedTotalAmount = items?.reduce((amount, item) => item?.product?.discountedPrice * item?.quantity + amount, 0);

  const handleQuantity = (quantity, itemId) => {
    dispatch(updateCartAsync({ quantity: quantity, id: itemId }));
  }

  const handleRemoveItems = (e, id) => {
    dispatch(removeItemsFromCartAsync(id));
  }

  return (
    <div className="px-20 py-3">
        {items && items.length ? 
          <div className="flex gap-5">
            <ul className="bg-white w-2/3">
              {items.map((item) => (
                <li key={item?.product?.id} className="flex p-5 border-b border-gray-200">
                  <div className="h-36 w-28  flex-shrink-0 overflow-hidden">
                    <img
                      src={item?.selectedDetails?.images ? item?.selectedDetails?.images[0] : ""}
                      alt={item?.product?.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="mx-4 flex flex-1 flex-col">
                    <div className='flex justify-between '>
                      <div className="text-base text-gray-900">
                        <p className='text-m text-black font-normal family-open-sans'>{item?.product?.title}</p>
                        {
                  item?.product?.discount > 0 ?
                    (
                      <p className='nunito-text mt-2 flex items-center gap-2'>
                        <span className="text-xl font-semibold tracking-tight text-gray-900 nunito-text">&#x20B9;{item?.product?.discountedPrice}</span>
                        <span className='text-gray-400 line-through'>&#x20B9;{item?.product?.price}</span>
                        <span className='text-green-600'>{item?.product?.discount}% off</span>
                      </p>
                    ) :
                    (
                      <p className='font-medium nunito-text mt-2 flex items-center gap-3'>
                        <span className="text-3xl font-semibold tracking-tight text-gray-900 nunito-text">&#x20B9;{item?.product?.price}</span>
                      </p>
                    )
                }
                        { item.selectedDetails.size ? <p className='mt-2 text-m text-gray-400 font-semibold'>Size - {item.selectedDetails.size}</p> : null }
                      </div>
                      <div className="text-base text-gray-900">
                        <p className='text-sm text-black font-normal family-open-sans'>
                          Delivery by {getDateMonth(Date.now())} | <span className='text-gray-400 line-through nunito-text'>&#x20B9;{deliveryCharges}</span> <span className='text-green-600 nunito-text'>Free</span>
                          </p>
                          <div className="flex gap-2 mt-5">
                         <div className='border-width border-gray-400 p-1 rounded-full cursor-pointer'
                         onClick={()=> item.quantity > 1 ? handleQuantity(item.quantity-1, item.id) : null}
                         >
                          <MinusIcon className='w-4 h-4' />
                         </div>
                         <div className='border-width border-gray-400 px-6'>
                          <p>{item.quantity}</p>
                         </div>
                         <div className='border-width border-gray-400 p-1 rounded-full cursor-pointer'
                          onClick={()=> item.quantity < 10 ? handleQuantity(item.quantity+1, item.id) : null}
                         >
                          <PlusIcon className='w-4 h-4' />
                         </div>
                      </div>
                      </div>
                    </div>
                      <div className="mt-10">
                        <button
                          type="button"
                          onClick={(e) => handleRemoveItems(e, item?.id)}
                        >
                          <p className='font-semibold'>REMOVE</p>
                        </button>
                      </div>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="w-1/3">
              <div className=" bg-white px-4 py-6 sm:px-6">
                <h2 className='text-xl font-bold mb-3 text-gray-900 nunito-text'>Order Summary</h2>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Price ({totalItems + (totalItems > 1 ? " items" : " item")})</p>
                  <p className='font-medium text-gray-900 nunito-text'>&#x20B9;{totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Discount</p>
                  <p className='font-medium text-green-600 nunito-text'>- &#x20B9;{totalAmount - discountedTotalAmount}</p>
                </div>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Delivery Charges</p>
                  <p className='font-medium nunito-text'><span className='text-gray-400 line-through'>&#x20B9;{totalItems*deliveryCharges}</span> <span className='text-green-600'>Free</span></p>
                </div>
                <div className="flex justify-between my-2 text-lg font-medium text-gray-900 py-3">
                  <p className='nunito-text font-bold'>Total Amount</p>
                  <p className='nunito-text font-bold'>&#x20B9; {discountedTotalAmount}</p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent pamplet-btn px-6 py-3 text-base font-medium text-white shadow-sm"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p className='font-medium text-lg nunito-text text-green-600'>You will save &#x20B9;{totalAmount - discountedTotalAmount}, on this order</p>
                </div>
              </div>
            </ul>
          </div> :
          <div className="bg-white">
            <div className="border-t text-center border-gray-200 px-4 py-6 sm:px-6">
              <img
                src={EmptyCart1}
                alt=""
                className="h-56 w-56 mx-auto object-cover object-center"
              />
              <h2 className='text-xl font-bold mb-3 mt-4 text-gray-900 text-center nunito-text'>Your Cart is Empty!</h2>
              <p className='font-medium text-gray-900 nunito-text'>Looks like you have not added anything to your cart. Go ahead & explore top categories.</p>
              <button
                className="pamplet-btn rounded-sm px-6 py-3 my-10 text-sm font-semibold text-white shadow-sm nunito-text">
                <Link to='/'>
                  Contiue Shopping
                </Link>
              </button>
            </div>
          </div>}
    </div>
  );
}
