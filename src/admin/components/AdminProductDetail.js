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

const reviews = { href: '#', average: 4, totalCount: 117 }

export default function AdminProductDetail() {

    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productImage, setProductImage] = useState("");
    const [colorImages, setColorImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);




    useEffect(() => {
        let isMounted = true;

        getProductById(params.id)
        .then(data => {
            if(isMounted) {
                setProduct(data);
                setProductImage(data?.colors[0]?.images[0]);
                setSelectedColor(data?.colors[0]?.color);
                setColorImages(data?.colors[0]?.images);
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

    const handleColorClick = (color, images) => {
        setSelectedColor(color);
        setColorImages(images);
      };

      useEffect(() => {
        if (colorImages?.length > 0) {
          setProductImage(colorImages[0]);
        }
      }, [colorImages])


    return (
        <div className="bg-white py-12">
            {product ? 
            <div className="pt-6">
                {/* Image gallery */}
                <div className='flex gap-12 px-12'>
                <div className='flex mt-2 gap-2'>
                <div>
                  <div>
                    {
                      colorImages?.map((item) => (
                        <div className='cursor-pointer border-gray-200 border-2 mt-3 rounded-sm' onClick={() => setProductImage(item)}>
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
                <div className="min-w-96 overflow-hidden items-center bg-gray-200 px-10 flex">
                  <img
                    src={productImage}
                    alt={product.title}
                    className="object-cover object-center w-fit h-fit"
                  />
                </div>
              </div>
                    {/* Options */}
                    <div className="mt-2 product-detail-container lg:row-span-3 lg:mt-0">
                    <p className="text-2xl font-bold tracking-tight text-gray-900 nunito-text">{product.title}</p>
                <h3 className="text-sm font-medium text-green-600 mt-2">Special Price</h3>
                {
                  product?.discount > 0 ?
                  (
                <p className='font-medium nunito-text mt-2 flex items-center gap-3'>
                  <span className="text-3xl font-semibold tracking-tight text-gray-900 nunito-text">&#x20B9;{product.discountedPrice}</span>
                  <span className='text-gray-400 line-through'>&#x20B9;{product.price}</span>
                  <span className='text-green-600'>{product.discount}% off</span>
                </p>
                  ) :
                  (
                    <p className='font-medium nunito-text mt-2 flex items-center gap-3'>
                    <span className="text-3xl font-semibold tracking-tight text-gray-900 nunito-text">&#x20B9;{product.price}</span>
                  </p>
                  )
                }

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
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>

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
                            <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <div className='flex mt-4 gap-2'>
                      {
                        product?.colors?.map((item) => (
                          <div
                            key={item?.color}
                            className={`cursor-pointer border border-gray-300 p-2 relative ${selectedColor === item?.color ? 'border-blue-500' : ''}`}
                            title={item?.color}
                            onClick={() => handleColorClick(item?.color, item?.images)}
                          >
                            <img
                              src={item?.images[0]}
                              alt='Ali Studio Product'
                              className="w-12 h-12 object-cover object-center"
                            />
                            {selectedColor === item?.color && (
                              <div className="absolute top-0 right-0 opacity-50 w-full h-full flex items-center justify-center bg-gray-200">
                                {/* <CheckIcon className='w-6 h-6' /> */}
                              </div>
                            )}
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    </div>

                      <div className="grid mt-4 grid-cols-4 gap-4 sm:grid-cols-8 l:grid-cols-4">
                        {product?.sizes?.map((size) => (
                          <div
                            key={size}
                            className="border rounded-sm border-gray-300 flex items-center justify-center p-2 relative"
                          >
                            <span>{size}</span>
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