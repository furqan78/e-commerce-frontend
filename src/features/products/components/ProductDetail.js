import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCartAsync, fetchItemsByUserIdAsync, selectItems } from '../../cart/CartSlice';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import "../../pamplet/pamplet.scss"
import { appLevelConstant } from '../../../app/constant';
import { getItemFromLocalStorage } from '../../../app/constants/common-function';
import { BoltIcon } from '@heroicons/react/24/solid';
import { getProductById } from '../productAPI';
import { ProductSkeleton } from '../../../app/common-components/ProductSkeleton';
import ProductCarousel from './ProductCarousel';
import RateReviewForm from './RateReviewForm';
import CollapsableCard from '../../../app/common-components/CollapsableCard';
import ProductKeyPoints from './ProductKeyPoints';

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const items = useSelector(selectItems);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();
  const userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  const [productImage, setProductImage] = useState("");
  const [colorImages, setColorImages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(userInfo.id))
    let isMounted = true;
    getProductById(params.id)
      .then(async data => {
        if (isMounted) {
          setProduct(data);
          setProductImage(data?.colors[0]?.images[0]);
          setColorImages(data?.colors[0]?.images);
          setSelectedColor(data?.colors[0].color);
          setSelectedSize(data?.colors[0].sizes[0].size);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    }
  }, [dispatch, params.id])

  useEffect(() => {
    if (colorImages?.length > 0) {
      setProductImage(colorImages[0]);
    }
  }, [colorImages])

  const handleCart = (e) => {
    e.preventDefault();
    const cartReqObj = { 
      product_id: product?.id, 
      user_id: userInfo?.id, 
      quantity: 1,
      selectedDetails: {
        color: selectedColor,
        images: colorImages
      }
    };

    if(product?.productType === appLevelConstant.T_SHIRTS_VALUE || product?.productType === appLevelConstant.CUSTOM_CAP_VALUE){
      cartReqObj.selectedDetails.size = selectedSize;
    }
    dispatch(addToCartAsync(cartReqObj));
  }


  const handleColorClick = (color, images) => {
    setSelectedColor(color);
    setColorImages(images);
  };

  const isItemFound = (cartItems, productData) => {
    const isFound = cartItems.find((item) => item?.product?.id === productData?.id);
    return !!isFound;
  };

  return (
    <>
      {loading ? <ProductSkeleton /> :
        <div className="mx-20 mt-3">
          {product ? <div>
            {/* Image gallery */}
            <div className=' bg-white flex gap-12 px-5 py-5'>
              <div className='flex mt-2 gap-2 width-45-percent'>
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
                      {product.numberOfReviews} reviews
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

                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <div className='flex mt-4 gap-2'>
                      {
                        product?.colors?.map((item) => (
                          <div
                            key={item?.color}
                            className={`cursor-pointer border  p-2 relative ${selectedColor === item?.color ? 'border-blue-500' : 'border-gray-300'}`}
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

                  {/* Sizes */}
                  {product?.productType === appLevelConstant.T_SHIRTS_VALUE || product?.productType === appLevelConstant.CUSTOM_CAP_VALUE ?
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                      </div>
                      <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                        <div className="flex gap-3">
                          {product?.colors?.map((colorItem) => (
                            colorItem.color === selectedColor ?
                            colorItem?.sizes?.map((item) => (
                              <div
                                key={item._id}
                                className={`cursor-pointer border rounded-sm px-8 flex items-center justify-center py-2 relative ${selectedSize === item.size ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                onClick={() => setSelectedSize(item.size)}
                              >
                                <span>{item.size}</span>
                              </div>
                            )) : null
                          ))}
                        </div>
                      </RadioGroup>
                    </div> : null
                  }
                  {
                    isItemFound(items, product) === true ?
                      (<Link
                        to={"/cart"}
                        className="mt-10 w-1/3 flex items-center justify-center rounded-md midnight-border px-8 py-3 text-base font-medium text-white"
                      >
                        <ShoppingBagIcon className="h-6 w-6 midnight-green-color" aria-hidden="true" />

                        <span className='ml-2 midnight-green-color'>GO TO CART</span>
                      </Link>)
                      :
                      (<div className='flex gap-4'>
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
                      </div>)
                  }
                </form>
              </div>
            </div>
            <div className='mt-3 relative'>
              <CollapsableCard title={"Product Details"}>
                <ProductKeyPoints product={product} />
              </CollapsableCard>
            </div>
            <div className='mt-3 relative'>
              <RateReviewForm product={product} />
            </div>
            <div className='mt-3 relative'>
              <ProductCarousel
                heading={appLevelConstant.SIMILAR_PRODUCT_LABLE}
                requestObject={{
                  categories: product?.productType
                }}
              ></ProductCarousel>
            </div>
            <div className='mt-3 relative'>
              <ProductCarousel
                heading={appLevelConstant.YOU_MIGHT_BE_INTERESTED_IN_LABLE}
                requestObject={{
                  categories: `${appLevelConstant.BUSINESS_CARDS_VALUE},${appLevelConstant.PILLOW_COVER_VALUE},${appLevelConstant.CUSTOM_CAP_VALUE},${appLevelConstant.COFFEE_MUG_VALUE},${appLevelConstant.KEY_CHAIN_VALUE}`
                }}
              ></ProductCarousel>
            </div>
          </div> : null}
        </div>
      }
    </>
  )
}
