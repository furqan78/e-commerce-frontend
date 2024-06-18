import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../../../app/common-components/SkeletonLoader'
import ProductCard from '../../../app/common-components/ProductCard';
import { createCancelToken } from '../../../app/constants/common-function';
import { getAllProducts } from '../productAPI';
import { Link } from 'react-router-dom';

function ProductSmallGrid({heading, requestObject}) {
    
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const cancelTokenSource = createCancelToken();

        if (isMounted) {
            const getProducts = async () => {
                try {
                    requestObject.page = 1;
                    const data = await getAllProducts(requestObject, 4);
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

    }, []);

  return (
    <div>
         <div className='bg-white'>
                <div className='px-5 pt-5 flex justify-between items-center'>
                    <h1 className="product-categorie-heading">{heading}</h1>
                    <Link to={"/product-filter"} className='flex justify-center items-center gap-2 cursor-pointer nunito-text'>
                        <p className='text-sm'>View All</p>
                        <ChevronRightIcon className='w-4 h-4' />
                    </Link>
                </div>
                {loading ? (
                    <div className="px-5 pt-5 overflow-hidden">
                        <SkeletonLoader count={6} />
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-5 p-5">
                        {products && products.data ? products.data.map((product) => (
                            <ProductCard product={product} />
                        )) : ''}
                </div>
                )}

            </div>
    </div>
  )
}

export default ProductSmallGrid