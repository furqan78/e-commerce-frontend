import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

export default function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <div className="mt-4">
          <UserOrders></UserOrders>
        </div>
      </Navbar>
    </div>
  )
}
