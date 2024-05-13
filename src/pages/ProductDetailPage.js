import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/products/components/ProductDetail";

export default function Home() {
  return (
    <div>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
    </div>
  )
}
