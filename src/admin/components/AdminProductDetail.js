import { StarIcon, TrashIcon } from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../features/products/productAPI';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

export default function AdminProductDetail() {

    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productImage, setProductImage] = useState('');



    useEffect(() => {
        let isMounted = true;

        getProductById(params.id)
        .then(data => {
            if(isMounted) {
                setProduct(data);
                setLoading(false);
            }
        })
        .catch(err => {
            if(isMounted) {
                setError(err.message);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        }
    }, [params.id])


    return (
        <div className="bg-white py-12">
            {product ? <div className="pt-6">
                {/* Image gallery */}
                <div className='flex gap-12 px-12'>
                    <div className="hidden overflow-hidden lg:block">
                        <img
                            src={productImage ? productImage : product?.thumbnail}
                            alt={product.title}
                            className="object-cover object-center"
                        />
                        <div className='flex mt-2 gap-2'>
                            <div className='cursor-pointer border-gray-200 border-1' onClick={() => setProductImage(product.thumbnail)}>
                                <img
                                    src={product.thumbnail}
                                    alt='Ali Studio Product'
                                    className="w-16 h-16 object-cover object-center"
                                />
                            </div >
                            {
                                product?.images?.map((item) => (
                                    <div className='cursor-pointer border-gray-200 border-1' onClick={() => setProductImage(item)}>
                                        <img
                                            src={item}
                                            alt='Ali Studio Product'
                                            className="w-16 h-16 object-cover object-center"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Options */}
                    <div className="mt-2 product-detail-container lg:row-span-3 lg:mt-0">
                        <p className="text-2xl font-bold tracking-tight text-gray-900">{product.title}</p>

                        {/* Reviews */}
                        <div className="mt-2">
                            <h3 className="sr-only text-black">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                            </div>
                        </div>

                        <p className="text-2xl mt-2 tracking-tight text-gray-900">&#x20B9; {product.price}</p>

                        {/* Description and details */}
                        <div className="mt-2">
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-3">
                                <ul className="list-disc space-y-2 pl-4 text-sm">
                                    {product?.highlights?.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                            {/* Colors */}
                            <div className='mt-10'>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>


                                <div className="flex items-center space-x-3">
                                    {colors.map((color) => (
                                        <div
                                            className={classNames(
                                                color.class,
                                                'h-12 w-12 rounded-full border border-black border-opacity-10 mt-6'
                                            )}>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex gap-4 mt-2'>
                                <button
                                    onClick={(e) => navigate("/admin/product-add-update", { state: product, replace: true })}
                                    type="button"
                                    className="mt-10 w-full flex items-center justify-center rounded-md midnight-border px-8 py-3 text-base font-medium text-white"
                                >
                                    <PencilIcon className="h-6 w-6 midnight-green-color" aria-hidden="true" />

                                    <span className='ml-2 midnight-green-color'>EDIT PRODUCT</span>
                                </button>
                                <button
                                    onClick={(e) => { }}
                                    type="button"
                                    className="mt-10 w-full flex items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium pamplet-btn text-white"
                                >
                                    <TrashIcon className="h-6 w-6" aria-hidden="true" />

                                    <span className='ml-2'>DELETE</span>
                                </button>
                            </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}