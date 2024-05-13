import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../features/cart/CartSlice';
import { useForm } from 'react-hook-form';
import { appLevelConstant, regEx } from '../app/constant';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import SavedIcon from "../assets/images/saved_icon.png"
import { fetchUserInfoAsync, selectUserInfo, updateUserInfoAsync } from '../features/user/userSlice';
import { getItemFromLocalStorage } from '../app/constants/common-function';
import { updateUser } from '../features/user/userAPI';
import { ArchiveBoxXMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Checkout() {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const [shippingEstimate, setShippingEstimate] = useState(20);
    const [taxEstimate, setTaxEstimate] = useState(10);
    const totalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const totalItems = items.reduce((total, item) => item.quantity + total, 0);
    const user = useSelector(selectLoggedInUser);
    const userData = useSelector(selectUserInfo);
    const currentOrder = useSelector(selectCurrentOrder);
    let userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    // const userData = useSelector(selectUserInfo);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(appLevelConstant.ONLINE_LABLE);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // const handleQuantity = (e, product) => {
    //     dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
    // }

    // const handleRemoveItems = (e, id) => {
    //     dispatch(removeItemsFromCartAsync(id));
    // }

    const handleSelectAddress = (e) => {
        setSelectedIndex(e.target.value);
        setSelectedAddress(userInfo.address[e.target.value]);
    }

    const handlePaymentMode = (e) => {
        setPaymentMethod(e.target.value);
    }

    const handleOrder = async (e) => {
        if (selectedAddress && paymentMethod) {
            const orderItems = await items.map((element) => ({
                product: element.product.id,
                quantity: element.quantity,
            }));
            const order = {
                user_id: userInfo.id,
                payment_method: paymentMethod,
                shipping_address: selectedAddress,
                order_items: orderItems,
            }
            dispatch(createOrderAsync(order));
        } else {
            alert("Please select address");
        }
    }

    const handleRemoveAddress = (index) => {
        setSelectedIndex(0);
        let address = userInfo?.address;
        address.splice(index, 1);
        dispatch(updateUserInfoAsync({ id: userInfo.id, address: address }));
    }

    useEffect(()=> {
        setSelectedAddress(userInfo.address[0]);
    }, []);

    useEffect(() => {
        userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    }, [dispatch, userData])


    return (
        <>
            {/* {console.log(currentOrder, ' getting current order---')} */}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}> </Navigate>}
            <div className="min-h-full bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        <div className='lg:col-span-3'>
                            <form className='px-5 mt-12 py-10' noValidate onSubmit={handleSubmit((data) => {
                                if (userInfo?.address?.length >= 5) {
                                    alert("You can save only 5 addresses")
                                } else {
                                    setSelectedIndex(userInfo.address.length);
                                    setSelectedAddress(data);
                                    dispatch(updateUserInfoAsync({ id: userInfo.id, address: [...userInfo.address, data] }));
                                    reset();
                                }
                            })}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Full name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('name', { required: appLevelConstant.REQUIRED, })}
                                                        id="name"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.name ? <p className='text-red-500'>{errors.name.message}</p> : null}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        {...register('phone', {
                                                            required: appLevelConstant.REQUIRED,
                                                            minLength: 10,
                                                            maxLength: 10
                                                        })}
                                                        autoComplete="family-name"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.phone ? <p className='text-red-500'>{errors.phone.message}</p> : null}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        {...register('email', {
                                                            required: appLevelConstant.EMAIL_REQUIRED,
                                                            pattern: {
                                                                value: regEx.EMAIL_REGEX,
                                                                message: appLevelConstant.EMAIL_NOT_VALID
                                                            }
                                                        })}
                                                        type="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.email ? <p className='text-red-500'>{errors.email.message}</p> : null}
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Street address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        id="streetAddress"
                                                        {...register('streetAddress', { required: appLevelConstant.REQUIRED, })}
                                                        autoComplete="streetAddress"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.streetAddress ? <p className='text-red-500'>{errors.streetAddress.message}</p> : null}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2 sm:col-start-1">
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        {...register('city', { required: appLevelConstant.REQUIRED, })}
                                                        autoComplete="address-level2"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.city ? <p className='text-red-500'>{errors.city.message}</p> : null}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State / Province
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        {...register('state', { required: appLevelConstant.REQUIRED, })}
                                                        autoComplete="address-level1"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.state ? <p className='text-red-500'>{errors.state.message}</p> : null}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                    ZIP / Postal code
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="pinCode"
                                                        id="pinCode"
                                                        {...register('pinCode', { required: appLevelConstant.REQUIRED, })}
                                                        autoComplete="pinCode"
                                                        className="block w-full rounded-md border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                    {errors.pinCode ? <p className='text-red-500'>{errors.pinCode.message}</p> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900 bg-white">
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                        >
                                            Save Address
                                        </button>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose from saved addresses
                                        </p>
                                        <ul role="list">
                                            {userInfo?.address?.length > 0 ? userInfo?.address?.map((address, index) => (
                                                <div className='py-4 border-b border-gray-200'>
                                                    <li key={index} className="flex justify-between gap-x-6">
                                                        <div className="flex min-w-0 gap-x-4">
                                                            <input
                                                                id="existing-adress"
                                                                name="existing-adress"
                                                                type="radio"
                                                                onChange={(e) => handleSelectAddress(e)}
                                                                value={index}
                                                                checked= {selectedIndex === index}
                                                                className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.streetAddress}</p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                {address.pinCode}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <TrashIcon onClick={() => handleRemoveAddress(index)} className='h-5 w-5 mt-4 ml-auto  cursor-pointer text-black-400 hover:text-gray-500'></TrashIcon>
                                                </div>
                                            )) : null}
                                        </ul>
                                        {userInfo?.address?.length === 0 ?
                                            <div>
                                                <img src={SavedIcon} className='w-28 h-28 mx-auto' alt="" />
                                                <p className='font-medium w-full text-center text-gray-900'>No saved addresses yet.</p>
                                            </div> : null}
                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                                <div className="mt-6 space-y-6">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="card"
                                                            name="payment-method"
                                                            type="radio"
                                                            onChange={handlePaymentMode}
                                                            value={appLevelConstant.ONLINE_LABLE}
                                                            checked={paymentMethod === appLevelConstant.ONLINE_LABLE}
                                                            className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="card" className="cursor-pointer block text-sm font-medium leading-6 text-gray-900">
                                                            Online Payment
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="cash"
                                                            name="payment-method"
                                                            type="radio"
                                                            onChange={handlePaymentMode}
                                                            value={appLevelConstant.CASH_LABLE}
                                                            checked={paymentMethod === appLevelConstant.CASH_LABLE}
                                                            className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="cash" className="cursor-pointer block text-sm font-medium leading-6 text-gray-900">
                                                            Cash
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='lg:col-span-2'>
                            <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
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
                                        <div
                                            onClick={(e) => handleOrder(e)}
                                            className="flex family-open-sans cursor-pointer items-center justify-center rounded-md border border-transparent pamplet-btn px-6 py-3 text-base font-medium text-white shadow-sm"
                                        >
                                            Order Now
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
