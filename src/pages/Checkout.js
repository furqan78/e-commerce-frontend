import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../features/cart/CartSlice';
import { useForm } from 'react-hook-form';
import { appLevelConstant, regEx } from '../app/constant';
import { selectLoggedInUser } from '../features/auth/AuthSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import SavedIcon from "../assets/images/saved_icon.png"
import { fetchUserInfoAsync, selectUserInfo, updateUserInfoAsync } from '../features/user/userSlice';
import { getItemFromLocalStorage } from '../app/constants/common-function';
import { updateUser } from '../features/user/userAPI';
import { ArchiveBoxXMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import AppDialog from '../app/common-components/AppDialog';
import ManageAddress from '../app/common-components/ManageAddress';

export default function Checkout() {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const [shippingEstimate, setShippingEstimate] = useState(20);
    const [isDialog, setDialog] = useState(false);
    const [deliveryCharges, setDeliveryCharges] = useState(10);
    const totalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const totalItems = items.reduce((total, item) => item.quantity + total, 0);
    const user = useSelector(selectLoggedInUser);
    const userData = useSelector(selectUserInfo);
    const currentOrder = useSelector(selectCurrentOrder);
    let userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    // const userData = useSelector(selectUserInfo);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(appLevelConstant.ONLINE_LABLE);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

    const handleOpenDialog = (index) => {
        setDialog(true);
    }

    const handleRemoveAddress = (index) => {
        setDialog(false);
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
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}> </Navigate>}
            <div className="min-h-full bg-gray-100 mt-5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-5">
                        <div className='w-2/3 bg-white p-6'>
                            <ManageAddress />
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
                        <div className='w-1/3'>
                        <div className=" bg-white px-4 py-6 sm:px-6">
                <h2 className='text-xl font-bold mb-3 text-gray-900 nunito-text'>Price Details</h2>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Price ({totalItems + (totalItems > 1 ? " items" : " item")})</p>
                  <p className='font-medium text-gray-900 nunito-text'>&#x20B9;{totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Discount</p>
                  <p className='font-medium text-green-600 nunito-text'>- &#x20B9;{shippingEstimate}</p>
                </div>
                <div className="flex justify-between my-2 py-3 text-base align-middle border-b border-gray-200">
                  <p className='text-gray-500'>Delivery Charges</p>
                  <p className='font-medium nunito-text'><span className='text-green-600'>Free</span></p>
                </div>
                <div className="flex justify-between my-2 text-lg font-medium text-gray-900 py-3">
                  <p className='nunito-text font-bold'>Total Payable</p>
                  <p className='nunito-text font-bold'>&#x20B9; {totalAmount - shippingEstimate}</p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent pamplet-btn px-6 py-3 text-base font-medium text-white shadow-sm"
                  >
                    CONFIRM ORDER
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p className='font-medium text-lg nunito-text text-green-600'>Your Total Saving on this order &#x20B9;{totalAmount - (totalAmount - shippingEstimate)}</p>
                </div>
              </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppDialog 
            title={appLevelConstant.DELETE_ADDRESS_LABEL}
            description={appLevelConstant.DELETE_ADDRESS_WARNING} 
            toggle={isDialog} 
            actionButtonLabel={appLevelConstant.DELETE_LABEL}
            dialogClosed={()=> setDialog(false)} 
            dialogAction={()=> handleRemoveAddress(selectedIndex)} />
        </>
    )
}
