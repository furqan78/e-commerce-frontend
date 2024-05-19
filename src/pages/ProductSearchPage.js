import React, { useEffect, useState } from 'react'
import Navbar from '../features/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import ProductCard from '../app/common-components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync, selectAllProducts } from '../features/products/productSlice';

export default function ProductSearchPage() {
    const location = useLocation();
    const searchText = location.state.searchText;
    const products = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    useEffect(() => {
        const query = { page: page, search: searchText };
        dispatch(fetchAllProductsAsync(query));
    }, [dispatch, page, searchText]);

    return (
        <div className="bg-white">
            <Navbar>
                <ProductsSearchGrid products={products.data} searchText={searchText} />
            </Navbar>
        </div>
    )
};

export function ProductsSearchGrid({ products, searchText }) {

    return (
        <div className="bg-white">
            <div className="mx-10 py-5 sm:px-6 sm:py-24">
                <h2 className='text-gray-900 font-bold text-2xl'>Results for "{searchText}"</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-5">
                    {products?.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}