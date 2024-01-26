import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/products/ProductList";

export default function Home() {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}
