import Logout from "../../features/auth/components/Logout";
import Protected from "../../features/auth/components/Protected";
import CartPage from "../../pages/CartPage";
import Checkout from "../../pages/Checkout";
import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";
import OrderSuccessPage from "../../pages/OrderSuccessPage";
import PageNotFound from "../../pages/PageNotFound";
import ProductDetailPage from "../../pages/ProductDetailPage";
import { ProductListPage } from "../../pages/ProductListPage";
import ProductSearchPage from "../../pages/ProductSearchPage";
import SignupPage from "../../pages/SignupPage";
import UserOrdersPage from "../../pages/UserOrdersPage";

export const routes = [
    
  {
    path: "/",
    element: <Protected>
      <Home></Home>
      </Protected>
  },
  {
    path: "/signin",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
      </Protected>
  },
  {
    path: "/checkout",
    element: <Protected>
      <Checkout></Checkout>
      </Protected>
  },
  {
    path: "/product-detail/:id",
    element:
      <ProductDetailPage></ProductDetailPage>
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />
  },
  {
    path: "/products/:categorie",
    element: <ProductListPage />
  },
  {
    path: "/search",
    element: <ProductSearchPage />
  },
  {
    path: "/account/:action",
    element: <UserOrdersPage></UserOrdersPage>
  },
  {
    path: "*",
    element: <PageNotFound />
  }
];