import { Link, Navigate, useLocation } from "react-router-dom";
import "../features/order/order.scss";
import SuccessImage from "../assets/images/success-check.png";

export default function OrderSuccessPage() {
    const location = useLocation();
    const order = location?.state;

    return (
        <>
         {!order?.id && <Navigate to={'/'} replace={true}> </Navigate>}
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
