import { StarIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { classNames, getItemFromLocalStorage } from '../../../app/constants/common-function';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Controller, useForm } from 'react-hook-form';
import { appLevelConstant } from '../../../app/constant';
import StarRating from '../../../app/common-components/StarRating';
import { checkRatingEligibility, rateProducts } from '../productAPI';
import { ProductSkeleton } from '../../../app/common-components/ProductSkeleton';

const RateReviewForm = ({ onSubmit, product }) => {

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
    const [isRatingForm, setRatingForm] = useState(false);
    const userInfo = JSON.parse(getItemFromLocalStorage(appLevelConstant.USER_INFO_KEY));
  const [isUserEligible, setUserEligible] = useState(false);
  const [isLoading, setLoading] = useState(true);



    const handleFormSubmit = (data) => {
        const { comment, rating } = data;
        if (rating > 0 && comment) {
            const reqObj = {
                comment,
                rating,
                productId: product.id,
                userId: userInfo.id
            }
            rateProducts(reqObj).then((res) => {
                setRatingForm(false);
                reset();
            }).catch((error) => {
                console.log(error, "error");
            })
        }
    };

    const checkUserEligibility = () => {
        if(product?.id && userInfo?.id) {
            checkRatingEligibility(userInfo.id, product.id)
            .then((res)=> {
                if(res && res?.success) {
                    setUserEligible(true);
                }else{
                    setUserEligible(false);
                }
                setLoading(false);
            })
            .catch((error)=> {
                console.log(error, " error");
                setUserEligible(false);
                setLoading(false);
            })
        }
    }

    return (
        <div className="bg-white rounded p-14">
            <h3 className='text-2xl m-auto text-gray-700 text-center'>Customer Reviews</h3>
            <div className='flex w-full justify-between items-center px-10 py-4 border-b border-gray-100'>
                <div className="w-1/3 mt-2 p-16 border-r border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                product?.rating > rating ?
                                    <StarIconSolid
                                        key={rating}
                                        className={classNames(
                                            'text-yellow-400 h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    :
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            'text-yellow-400 h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                            ))}
                        </div>
                        <p className="text-m font-normal text-gray-700">
                            {product?.rating} out of 5
                        </p>
                    </div>
                    <p className="text-m font-normal text-gray-700">Based on {product?.numberOfReviews} reviews</p>
                </div>

                <div className="w-1/3 mt-2 p-16 border-r border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                product?.rating > rating ?
                                    <StarIconSolid
                                        key={rating}
                                        className={classNames(
                                            'text-yellow-400 h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    :
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            'text-yellow-400 h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                            ))}
                        </div>
                        <p className="text-m font-normal text-gray-700">
                            {product?.rating} out of 5
                        </p>
                    </div>
                    <p className="text-m font-normal text-gray-700">Based on {product?.numberOfReviews} reviews</p>
                </div>

                <div className="w-1/3 mt-2 py-6"
                    onClick={() => {
                        if(!isRatingForm){
                            checkUserEligibility()
                        }
                        setRatingForm(!isRatingForm);
                        }}>
                    <div className="bg-nile-blue cursor-pointer w-fit mx-auto text-white text-m py-2 px-8 rounded-sm">
                        {isRatingForm ? "Cancle review" : "Write a review"}
                    </div>
                </div>
            </div>
            {isLoading && isRatingForm ? 
            <ProductSkeleton /> :
                isRatingForm ?
                 (isUserEligible ?
                 <form className='px-80 mt-10' onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
                     <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Write a review</h2>
                     <div className="mb-4">
                         <label className="block text-center text-gray-700 text-lg mb-2" htmlFor="rating">
                             Rating
                         </label>
                         <Controller
                             name="rating"
                             control={control}
                             defaultValue={0}
                             rules={{
                                 required: appLevelConstant.REQUIRED,
                                 min: {
                                     value: 1,
                                     message: appLevelConstant.REQUIRED
                                 }
                             }}
                             render={({ field }) => <StarRating rating={field.value} setRating={field.onChange} />}
                         />
                         {errors.rating ? (<p className="text-red-500 text-center text-sm mt-1">{errors.rating.message}</p>) : null}
                     </div>
                     <div className="mb-6">
                         <label className="block text-center text-gray-700 text-lg mb-2" htmlFor="comment">
                             Review
                         </label>
                         <textarea
                             id="comment"
                             className="border border-gray-300 rounded-sm w-full placeholder:text-gray-400 py-2 px-3 text-gray-700 leading-tight "
                             rows="5"
                             defaultValue={''}
                             {...register('comment', {
                                 required: appLevelConstant.REQUIRED
                             })}
                             placeholder="Write your review here..."
                         ></textarea>
                         {errors.comment ? <p className='text-red-500'>{errors.comment.message}</p> : null}
                     </div>
                     <div className="flex items-center justify-center gap-5">
                         <button
                             onClick={() => {
                                 setRatingForm(false);
                                 reset();
                             }}
                             className="bg-nile-blue text-white text-m py-2 px-8 rounded-sm"
                             type='button'>
                             Cancel review
                         </button>
                         <button
                             className="bg-nile-blue text-white text-m py-2 px-8 rounded-sm"
                             type='submit'>
                             Submit Review
                         </button>
                     </div>
                 </form> :
                 <div className='mt-10 text-center'>
                    <h3 className='text-2xl font-semibold nunito-text'>Haven't purchased this product?</h3>
                    <p className='text-lg mt-2 nunito-text text-gray-400'>Sorry! You are not allowed to review this product since you haven't bought it</p>
                    <button
                             onClick={() => {
                                 setRatingForm(false);
                             }}
                             className="bg-nile-blue mt-6 text-white text-m py-2 px-8 rounded-sm"
                             type='button'>
                             Cancel review
                         </button>
                    </div>) 
                 : 
                 null
                
            }
        </div>
    );
};

export default RateReviewForm;
