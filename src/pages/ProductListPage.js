import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/products/components/ProductList";

export const ProductListPage = () => {

    return (
        <div className="bg-white">
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
        </div>
    );
}
