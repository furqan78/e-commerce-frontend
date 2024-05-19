import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { useEffect } from "react";
import { resetCartAsync } from "../features/cart/CartSlice";
import { getItemFromLocalStorage } from "../app/constants/common-function";
import { appLevelConstant } from "../app/constant";
import "../features/order/order.scss";
import SuccessImage from "../assets/images/success-check.png";

export default function OrderSuccessPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
    console.log(params, 'fetched params')

    useEffect(()=> {
        console.log(user, 'f etched userinfo')
        dispatch(resetCartAsync(user.id));
    },[dispatch, user]);

    return (
        <>
         {!params?.id && <Navigate to={'/'} replace={true}> </Navigate>}
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center order-success-container">
                    <img src={SuccessImage} alt="Order Success" className="w-24 h-24 m-auto success-image" />
                    <p className="text-xl font-normal mt-4">Thank you</p>
                    <p className="text-2xl font-semibold mt-3">Your Order is Confirmed!</p>
                    <p className="text-base text-l font-normal mt-2 w-80 m-auto">We'll send you a shipping confirmation email as soon as your order ships.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/account/orders"
                            className="px-8 py-2.5 check-status-btn  text-sm font-semibold text-white shadow-sm"
                        >
                            CHECK STATUS
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
