import React, { useEffect, useState } from 'react'
import { appLevelConstant, regEx } from '../constant';
import { useForm } from 'react-hook-form';
import { getItemFromLocalStorage } from '../constants/common-function';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../features/user/userSlice';

function ManageProfile() {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    let userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    const userData = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    // state
    const [isPersonalInfoEdit, setPersonalInfoEdit] = useState(false);
    const [isMobileEdit, setMobileEdit] = useState(false);
    const [isEmailEdit, setEmailEdit] = useState(false);
    const [gender, setGender] = useState("");

    useEffect(() => {
        userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
        setValue("name", userInfo.name);
        setValue("email", userInfo.email);
        setValue("phone", userInfo.email);
    }, [dispatch, userData])

    const resetValues = () => {
        reset();
        setValue("name", userInfo.name);
        setValue("email", userInfo.email);
        setValue("phone", userInfo.email);
        setPersonalInfoEdit(false);
        setMobileEdit(false);
        setEmailEdit(false);

    }

    const handleGender = (e) => {
        setGender(e.target.value);
    }

    return (
        <div>

            {/* Personal Information Form */}
            <form noValidate onSubmit={handleSubmit((data) => {
            })}>
                <div className="space-y-12">
                    <div className=" pb-12">
                        <div className='flex gap-4'>
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Personal Information</h2>
                            {
                                isPersonalInfoEdit ?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetValues();
                                            setPersonalInfoEdit(false);
                                        }}
                                        className="text-sm font-medium midnight-green-color px-1"
                                    >
                                        Cancel
                                    </button> :

                                    <button
                                        type="button"
                                        onClick={() => setPersonalInfoEdit(true)}
                                        className="text-sm font-medium midnight-green-color px-1"
                                    >
                                        Edit
                                    </button>
                            }
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <div className="flex items-center justify-between gap-x-6">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('name', { required: appLevelConstant.REQUIRED, })}
                                        id="name"
                                        autoComplete="given-name"
                                        disabled={!isPersonalInfoEdit}
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.name ? <p className='text-red-500'>{errors.name.message}</p> : null}
                                </div>
                                <div className="mt-4 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">Your Gender</legend>
                                        <div className="mt-6 flex items-center justify-start gap-5">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card"
                                                    name="payment-method"
                                                    type="radio"
                                                    onChange={handleGender}
                                                    value={appLevelConstant.MALE_LABEL}
                                                    checked={gender === appLevelConstant.MALE_LABEL}
                                                    disabled={!isPersonalInfoEdit}
                                                    className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card" className="cursor-pointer block text-sm font-medium leading-6 text-gray-900">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash"
                                                    name="payment-method"
                                                    type="radio"
                                                    onChange={handleGender}
                                                    value={appLevelConstant.FEMALE_LABEL}
                                                    checked={gender === appLevelConstant.FEMALE_LABEL}
                                                    disabled={!isPersonalInfoEdit}
                                                    className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="cash" className="cursor-pointer block text-sm font-medium leading-6 text-gray-900">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="mt-2 flex items-center justify-end gap-x-6">
                                    {
                                        isPersonalInfoEdit ?
                                            <button
                                                type="submit"
                                                className="rounded-sm px-3 py-2  text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                            >
                                                Save
                                            </button> :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </form>

            {/* Email Form */}
            <form noValidate onSubmit={handleSubmit((data) => {
            })}>
                <div className="space-y-12">
                    <div className=" pb-12">
                        <div className='flex gap-4'>
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Email Address</h2>
                            {
                                isEmailEdit ?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetValues();
                                            setEmailEdit(false)
                                        }}
                                        className="text-sm font-medium midnight-green-color px-1"
                                    >
                                        Cancel
                                    </button> :

                                    <button
                                        type="button"
                                        onClick={() => setEmailEdit(true)}
                                        className="text-sm font-medium midnight-green-color px-1"
                                    >
                                        Edit
                                    </button>
                            }
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
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
                                        disabled={!isEmailEdit}
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {isEmailEdit && errors.email ? <p className='text-red-500'>{errors.email.message}</p> : null}
                                </div>
                                <div className="mt-2 flex items-center justify-end gap-x-6">
                                    {
                                        isEmailEdit ?
                                            <button
                                                type="submit"
                                                className="rounded-sm px-3 py-2  text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                            >
                                                Save
                                            </button> :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Mobile Number Form */}
            <form noValidate onSubmit={handleSubmit((data) => {
            })}>
                <div className="space-y-12">
                    <div className=" pb-12">
                        <div className='flex gap-4'>
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Mobile Number</h2>
                            {
                                isMobileEdit ?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetValues();
                                            setMobileEdit(false);
                                        }}
                                        className="text-sm font-medium midnight-green-color px-1"
                                    >
                                        Cancel
                                    </button> :

                                    <button
                                        type="button"
                                        onClick={() => setMobileEdit(true)}
                                        className="text-sm font-medium midnight-green-color px-1"
                                    >
                                        Edit
                                    </button>
                            }
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
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
                                        disabled={!isMobileEdit}
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {isMobileEdit && errors.phone ? <p className='text-red-500'>{errors.phone.message}</p> : null}
                                </div>
                                <div className="mt-2 flex items-center justify-end gap-x-6">
                                    {
                                        isMobileEdit ?
                                            <button
                                                type="submit"
                                                className="rounded-sm px-3 py-2  text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                            >
                                                Save
                                            </button> :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ManageProfile