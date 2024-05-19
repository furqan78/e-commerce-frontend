import React, { Fragment, useEffect, useState } from 'react'
import { getItemFromLocalStorage } from '../constants/common-function';
import { appLevelConstant, regEx } from '../constant';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import AppDialog from './AppDialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserInfoAsync } from '../../features/user/userSlice';
import SavedIcon from "../../assets/images/saved_icon.png"
import { useForm } from 'react-hook-form';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function ManageAddress() {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    let userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    const userData = useSelector(selectUserInfo);
    const [isDialog, setDialog] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [addressForm, setAddressForm] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const dispatch = useDispatch();


    const handleRemoveAddress = (index) => {
        setDialog(false);
        let address = userInfo?.address;
        address.splice(index, 1);
        dispatch(updateUserInfoAsync({ id: userInfo.id, address: address }));
    }

    useEffect(() => {
        userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    }, [dispatch, userData])

    const resetData = () => {
        setAddressForm(false);
        setEdit(false);
        setSelectedIndex(null);
    }

    return (
        <div>
            {
                addressForm ?
                    <form noValidate onSubmit={handleSubmit((data) => {
                        if (isEdit) {
                            userInfo?.address?.splice(selectedIndex, 1);
                            dispatch(updateUserInfoAsync({ id: userInfo.id, address: [...userInfo.address, data] }));
                            reset();
                            resetData();
                        } else {
                            if (userInfo?.address?.length >= 5) {
                                alert("You can save only 5 addresses")
                            } else {
                                dispatch(updateUserInfoAsync({ id: userInfo.id, address: [...userInfo.address, data] }));
                                reset();
                                resetData();
                            }
                        }
                    })}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-bold leading-7 midnight-green-color">{isEdit ? "EDIT ADDRESS" : "ADD A NEW ADDRESS"}</h2>
                                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                    minLength: { value: 10, message: appLevelConstant.MOBILE_NO_NOT_VALID },
                                                    maxLength: { value: 10, message: appLevelConstant.MOBILE_NO_NOT_VALID }
                                                })}
                                                autoComplete="family-name"
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.pinCode ? <p className='text-red-500'>{errors.pinCode.message}</p> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900 bg-white"
                                    onClick={() => {
                                        reset();
                                        resetData();
                                    }}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-sm px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                >
                                    Save Address
                                </button>
                            </div>
                        </div>
                    </form> :
                    <div className='px-4 py-3  border border-gray-200 d-flex gap-3 cursor-pointer'
                        onClick={() => setAddressForm(true)}
                    >
                        <PlusIcon className='w-6 h-6 midnight-green-color' />
                        <p className="text-sm font-semibold leading-6 midnight-green-color">ADD A NEW ADDRESS</p>
                    </div>
            }
            <div className='mt-10'>
                {userInfo?.address?.length > 0 ? userInfo?.address?.map((address, index) => (
                    <div className='p-4 border border-gray-200 mt-3'>
                        <li key={index} className="flex justify-between gap-x-6">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <div className="flex gap-4">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.phone}</p>
                                    </div>
                                    <p className="mt-2 truncate text-sm leading-5 text-gray-900">{address.streetAddress} {address.city}, {address.state}</p>
                                    <p className="mt-1 font-semibold text-sm leading-5 text-gray-900">{address.pinCode}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button>
                                            <EllipsisVerticalIcon className='w-6 h-6 cursor-pointer' />

                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <div
                                                            onClick={() => {
                                                                setSelectedIndex(index);
                                                                setEdit(true);
                                                                setAddressForm(true);
                                                                setValue("name", address.name);
                                                                setValue("phone", address.phone);
                                                                setValue("email", address.email);
                                                                setValue("streetAddress", address.streetAddress);
                                                                setValue("city", address.city);
                                                                setValue("state", address.state);
                                                                setValue("pinCode", address.pinCode);
                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm cursor-pointer'
                                                            )}
                                                        >
                                                            Edit
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <div
                                                            onClick={() => {
                                                                setSelectedIndex(index);
                                                                setDialog(true);
                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm cursor-pointer'
                                                            )}
                                                        >
                                                            Delete
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    </div>
                )) :
                    <div>
                        <img src={SavedIcon} className='w-28 h-28 mx-auto mt-5' alt="" />
                        <p className='font-medium w-full text-center text-gray-900'>No saved addresses yet.</p>
                    </div>}
            </div>

            <AppDialog
                title={appLevelConstant.DELETE_ADDRESS_LABEL}
                description={appLevelConstant.DELETE_ADDRESS_WARNING}
                toggle={isDialog}
                actionButtonLabel={appLevelConstant.DELETE_LABEL}
                dialogClosed={() => setDialog(false)}
                dialogAction={() => handleRemoveAddress(selectedIndex)} />
        </div>
    )
}

export default ManageAddress