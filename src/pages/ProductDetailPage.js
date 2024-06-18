import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/products/components/ProductDetail";

export default function ProductDetailPage() {
  return (
    <div>
        <Navbar isCategorieSection={true}>
            <ProductDetail></ProductDetail>
        </Navbar>
    </div>
  )
}
