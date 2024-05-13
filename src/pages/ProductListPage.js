import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/products/components/ProductList";

const ProductListPage = () => {

    return (
        <div className="bg-white">
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
        </div>
    );
}

export default ProductListPage;