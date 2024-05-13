import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProductsAsync, fetchProductsByFiltersAsync, selectAllProducts } from "../productSlice";
import '../../../style.scss';
import './product.scss';
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const ProductListSlider = ({ categorie }) => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // console.log(categorie, ' fetched categorie successfully')
        const pagination = { page: page};
        dispatch(fetchAllProductsAsync(pagination));
    }, []);

    return (
        <div className="bg-white mt-12">
            {console.log(products, ' fetched products ====')}
            <div className="mx-14">
                <div className="mt-6 product-list-container">
                    {products && products.data ? products.data.map((product) => (
                        <Link reloadDocument key={product.id} to={`/product-detail/${product.id}`}>
                            <div className="group relative product-card">
                                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                    <img
                                        src={product.thumbnail}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt=""
                                    />
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <div>
                                        <h3 className="text-sm text-black font-bold">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </h3>

                                    </div>
                                    <div>
                                        <ArrowLongRightIcon className='w-6 h-6'></ArrowLongRightIcon>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : ''}
                </div>
            </div>
        </div>
    );
}

export default ProductListSlider;