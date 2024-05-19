import { ArrowPathRoundedSquareIcon, MapPinIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";
import { useNavigate, useParams } from "react-router-dom";
import { getItemFromLocalStorage } from "../app/constants/common-function";
import { appLevelConstant } from "../app/constant";
import AppDialog from "../app/common-components/AppDialog";
import { useState } from "react";
import ManageAddress from "../app/common-components/ManageAddress";
import ManageProfile from "../app/common-components/ManageProfile";

const profileItems = [
  {
    id: 0,
    name: "Account Details",
    icon: UserCircleIcon,
    link: "/account/details",
    params: "details",
    active: true
  },
  {
    id: 1,
    name: "Manage Addresses",
    icon: MapPinIcon,
    link: "/account/address",
    params: "address",
    active: false
  },
  {
    id: 2,
    name: "My Orders",
    icon: ArrowPathRoundedSquareIcon,
    link: "/account/orders",
    params: "orders",
    active: false
  },
  {
    id: 3,
    name: "Log Out",
    icon: PowerIcon,
    link: "/logout",
    params: "logout",
    active: false
  },
]

const
  imageUrl =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export default function UserOrdersPage() {
  const userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  const [isDialog, setDialog] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    if(item && item.link === "/logout"){
      setDialog(true);
    }else{
      navigate(item.link);
    }
  }

  return (
    <div>
      <Navbar>
        <div className="mx-16 mt-10">
              <h2 className="text-gray-900 text-2xl font-bold">My Account</h2>
          <div className="d-flex my-4">
            <div className="width-20-percent">
              <div className="d-flex px-3 py-2.5 items-center gap-3 bg-gray-100 my-4">
                <img className="h-12 w-12 rounded-full" src={imageUrl} alt="" />
                <div>
                  <p className="text-sm text-gray-700">Hello,</p>
                  <p className="text-lg text-gray-900 font-semibold">{userInfo.name}</p>
                </div>
              </div>
              {
                profileItems.map((item) => (
                  <div
                  onClick={()=> handleNavigation(item)}
                    key={item.id}
                    className="group cursor-pointer relative flex items-center gap-x-6 py-1 px-6  mt-1 text-sm leading-6"
                    style={{ backgroundColor: item.params === params.action ? "#ECECEC" : "" }}
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-gray-900" aria-hidden="true" />
                    </div>
                    <div className="flex-auto">
                      <p className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="width-80-percent mx-auto bg-white px-16 py-4">
              {params.action === "orders" ? <UserOrders /> : null}
              {params.action === "address" ? <ManageAddress /> : null}
              {params.action === "details" ? <ManageProfile /> : null}
            </div>
          </div>
        </div>
        <AppDialog 
            title={appLevelConstant.LOG_OUT_LABLE}
            description={appLevelConstant.LOG_OUT_WARNING} 
            toggle={isDialog} 
            actionButtonLabel={appLevelConstant.YES_LABEL}
            dialogClosed={()=> setDialog(false)} 
            dialogAction={()=> navigate("/logout")} />
      </Navbar>
    </div>
  )
}
