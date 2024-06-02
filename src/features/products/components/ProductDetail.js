import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectedProductById } from '../productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import "../../pamplet/pamplet.scss"
import { appLevelConstant } from '../../../app/constant';
import ProductListSlider from './ProductListSlider';
import { getItemFromLocalStorage } from '../../../app/constants/common-function';
import { BoltIcon } from '@heroicons/react/24/solid';


const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

const sizes = [
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
];

const highlights = [
  'Hand cut and sewn locally',
  'Dyed with our proprietary colors',
  'Pre-washed & pre-shrunk',
  'Ultra-soft 100% cotton',
];

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[2])
  const user = useSelector(selectLoggedInUser)
  const product = useSelector(selectedProductById);
  const params = useParams();
  const userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  const [productImage, setProductImage] = useState(product?.thumbnail);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id])

  const handleCart = (e) => {
    e.preventDefault();
    const newItem = { product_id: product.id, user_id: userInfo?.id, quantity: 1 };
    dispatch(addToCartAsync(newItem));
  }

  return (
    <>
      <div className="bg-white">
        {product ? <div className="pt-6">
          {/* Image gallery */}
          <div className='d-flex gap-12 px-12'>
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
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
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
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product?.highlights?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 l:grid-cols-4">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className='flex gap-4'>
                  <button
                    onClick={(e) => handleCart(e)}
                    type="submit"
                    className="mt-10 w-full flex items-center justify-center rounded-md midnight-border px-8 py-3 text-base font-medium text-white"
                  >
                    <ShoppingBagIcon className="h-6 w-6 midnight-green-color" aria-hidden="true" />

                    <span className='ml-2 midnight-green-color'>ADD TO BAG</span>
                  </button>
                  <button
                    onClick={(e) => handleCart(e)}
                    type="submit"
                    className="mt-10 w-full flex items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium pamplet-btn text-white"
                  >
                    <BoltIcon className="h-6 w-6" aria-hidden="true" />

                    <span className='ml-2'>BUY NOW</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='mt-32'>
            <h1 className="product-categorie-heading mx-14">{appLevelConstant.RELATED_PRODUCT_LABLE}</h1>
            <ProductListSlider categorie={appLevelConstant.RELATED_PRODUCT_LABLE}></ProductListSlider>
          </div>
        </div> : null}
      </div>
    </>
  )
}
