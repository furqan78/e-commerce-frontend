import React, { useEffect, useState } from 'react'
import ProductsListSlider from './ProductListSlider'
import { createCancelToken } from '../../../app/constants/common-function';
import { getAllProducts } from '../productAPI';
import SkeletonLoader from '../../../app/common-components/SkeletonLoader';
import ProductCard from '../../../app/common-components/ProductCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

function BestDesigns({ heading }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const page = 1;
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        const cancelTokenSource = createCancelToken();

        if (isMounted) {
            const getProducts = async () => {
                try {
                    const pagination = { page: page };
                    const data = await getAllProducts(pagination);
                    setProducts(data);
                    setLoading(false);
                } catch (err) {
                    if (err.message !== 'Request canceled' && isMounted) {
                        setError(err.message);
                        setLoading(false);
                    }
                }
            }

            getProducts();
        }
        return () => {
            isMounted = false;
            cancelTokenSource.cancel("Requests Canceled.")
        }

    }, [page]);

    return (
        <div>
            <div className='bg-white'>
                <div className='px-5 pt-5 flex justify-between items-center'>
                    <h1 className="product-categorie-heading">{heading}</h1>
                    <div className='flex justify-center items-center gap-2 cursor-pointer nunito-text'>
                        <p className='text-sm'>View All</p>
                        <ChevronRightIcon className='w-4 h-4' />
                    </div>
                </div>
                {loading ? (
                    <div className="px-5 pt-5 overflow-hidden">
                        <SkeletonLoader count={6} />
                    </div>
                ) : (
                    <ProductsListSlider>
                        {products && products.data ? products.data.map((product) => (
                            <ProductCard product={product} />
                        )) : ''}
                    </ProductsListSlider>
                )}

            </div>
        </div>
    )
}

export default BestDesigns