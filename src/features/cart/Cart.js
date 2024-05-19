import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCartAsync, fetchItemsByUserIdAsync, removeItemsFromCartAsync, selectItems, updateCartAsync } from './CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectedProductById } from '../products/productSlice'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { appLevelConstant } from '../../app/constant'
import '../pamplet/pamplet.scss';
import EmptyCart1 from "../../assets/images/empty-cart-1.png";
import EmptyCart2 from "../../assets/images/empty-cart-2.png";

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
  const totalItems = items.reduce((total, item) => item?.quantity + total, 0);
  const [shippingEstimate, setShippingEstimate] = useState(20);
  const [taxEstimate, setTaxEstimate] = useState(10);
  let totalAmount = items.reduce((amount, item) => item?.product?.price * item?.quantity + amount, 0);

  const handleQuantity = (e, cartItem) => {
    dispatch(updateCartAsync({ quantity: e.target.value, id: cartItem?.id }));
  }

  const handleRemoveItems = (e, id) => {
    dispatch(removeItemsFromCartAsync(id));
  }

  return (
    <div className="bg-white">
      <div className="border-t border-gray-200 py-6 sm:px-16">
        {items && items.length ?
          <div className="mt-20 grid grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-7">
            <ul role="list" className="-my-6 divide-y divide-gray-200 lg:col-span-4 border-t border-gray-200">
              {items.map((item) => (
                <li key={item?.product?.id} className="flex py-10 border-b border-gray-200">
                  <div className="h-48 w-40  flex-shrink-0 overflow-hidden rounded-sm border border-gray-200">
                    <img
                      src={item?.product?.thumbnail}
                      alt={item?.product?.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="mx-4 flex flex-1 flex-col">
                    <div className='flex justify-between '>
                      <div className="text-base text-gray-900 w-32">
                        <p className='text-m text-black font-medium family-open-sans' href={item?.product?.href}>{item?.product?.title}</p>
                        <p className="mt-1 text-m text-gray-500 font-normal family-open-sans">{item?.product?.brand}</p>
                        <p className='mt-2 text-xl text-black font-medium family-open-sans'>&#x20B9; {item?.product?.price}</p>

                      </div>
                      <div className="text-gray-500">
                        <label htmlFor="password" className="inline mr-5 text-m leading-6 text-gray-900">
                          Qty
                        </label>
                        <select className='quantitiy-dropdown' onChange={(e) => handleQuantity(e, item)} value={item?.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          onClick={(e) => handleRemoveItems(e, item?.id)}
                        >
                          <XMarkIcon className='h-5 w-5 text-gray-400'></XMarkIcon>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <ul role="list" className="-my-6 divide-y divide-gray-200 lg:col-span-3">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-100">
                <h2 className='text-xl font-bold mb-3 text-gray-900'>Order Summary</h2>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Subtotal</p>
                  <p className='font-medium text-gray-900'>&#x20B9; {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Shipping estimate</p>
                  <p className='font-medium text-gray-900'>&#x20B9; {shippingEstimate}</p>
                </div>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Tax estimate</p>
                  <p className='font-medium text-gray-900'>&#x20B9; {taxEstimate}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900 py-3">
                  <p>Order total</p>
                  <p>&#x20B9; {totalAmount + shippingEstimate + taxEstimate}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{totalItems} Item</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes included.</p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent pamplet-btn px-6 py-3 text-base font-medium text-white shadow-sm"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </ul>
          </div> :
          <div role="list" className="-my-6 divide-y mt-4 divide-gray-200 lg:col-span-3">
            <div className="border-t text-center border-gray-200 px-4 py-6 sm:px-6 bg-gray-100">
              <img
                src={EmptyCart1}
                alt=""
                className="h-56 w-56 mx-auto object-cover object-center"
              />
              <h2 className='text-xl font-bold mb-3 mt-4 text-gray-900 text-center'>Your Cart is Empty!</h2>
              <p className='font-medium text-gray-900'>Looks like you have not added anything to your cart. Go ahead & explore top categories.</p>
              <button
                className="pamplet-btn w-44 rounded-md px-4 py-2 my-5 text-sm font-semibold text-white shadow-sm">
                <Link to='/'>
                  Contiue Shopping
                </Link>
              </button>
            </div>
          </div>}
      </div>
    </div>
  );
}
