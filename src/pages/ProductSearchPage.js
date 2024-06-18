import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import ProductFilter from '../features/products/components/ProductFilter';

export default function ProductSearchPage() {
    const location = useLocation();
    const searchText = location?.state?.searchText;

    return (
        <div className="bg-white">
            <Navbar>
                <ProductFilter search={searchText} />
            </Navbar>
        </div>
    )
};