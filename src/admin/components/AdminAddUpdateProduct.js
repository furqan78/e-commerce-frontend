import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { appLevelConstant } from '../../app/constant';
import { useDispatch } from 'react-redux';
import { addProductAsync } from '../../features/products/productSlice';
import { getImageIdFromURL, getImageLink } from '../../app/constants/common-function';
import ProductPreviewDialog from '../../app/common-components/ProductPreviewDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProduct } from '../../features/products/productAPI';

function AdminAddUpdateProduct() {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    let product = location.state;
    const [categorie, setCategorie] = useState('t-shirts');
    const [productData, setProductData] = useState(null);
    const [isPreview, setPreview] = useState(false);

    const handleCategorie = (e) => {
        setCategorie(e.target.value);
    }

    useEffect(()=> {
        let isMounted = true;

        if(isMounted && product) {
            setValue("title", product.title);
            setValue("price", product.price);
            setValue("rating", product.rating);
            setValue("description", product.description);
            setValue("highlights", product.highlights.join(' | '));
            setValue("thumbnail", getImageIdFromURL(product.thumbnail));
            setValue("image1",getImageIdFromURL(product.images[0]));
            setValue("image2",getImageIdFromURL(product.images[1]));
            setValue("image3",getImageIdFromURL(product.images[2]));
            setCategorie(product.categorie);
        }

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div className='p-12 bg-white'>
            <form noValidate onSubmit={handleSubmit((data) => {
                try {
                    // Destructure the data object for clarity
                    const { title, price, description, rating, thumbnail, highlights, image1, image2, image3 } = data;
                    // Construct the request object
                    const reqObj = {
                        title,
                        price,
                        description,
                        rating,
                        highlights: highlights?.split('|').map(highlight => highlight.trim()),
                        thumbnail: getImageLink(thumbnail),
                        categorie,
                        images: [getImageLink(image1), getImageLink(image2), getImageLink(image3)]
                    };

                    setProductData(reqObj);
                    setPreview(true);
                } catch (error) {
                    console.log('error', error);
                }
            })}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-bold leading-7 midnight-green-color">{product ? "EDIT PRODUCT" : "ADD A NEW PRODUCT"}</h2>
                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('title', { required: appLevelConstant.REQUIRED, })}
                                        id="title"
                                        autoComplete="given-name"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.title ? <p className='text-red-500'>{errors.title.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        id="price"
                                        {...register('price', {
                                            required: appLevelConstant.REQUIRED,
                                            min: { value: 200, message: appLevelConstant.PRICE_NOT_VALID },
                                        })}
                                        autoComplete="family-name"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.price ? <p className='text-red-500'>{errors.price.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rating
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        id="rating"
                                        {...register('rating', {
                                            required: appLevelConstant.REQUIRED,
                                            min: { value: 1, message: appLevelConstant.RATING_NOT_VALID },
                                            max: { value: 5, message: appLevelConstant.RATING_NOT_VALID },
                                        })}
                                        autoComplete="family-name"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.rating ? <p className='text-red-500'>{errors.rating.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="categorie" className="block text-sm font-medium leading-6 text-gray-900">
                                    Categorie
                                </label>
                                <div className="mt-2">
                                    <select
                                        {...register('categorie', { required: appLevelConstant.REQUIRED, })}
                                        className='quantitiy-dropdown' onChange={(e) => handleCategorie(e)}>
                                        <option className='p-2' value="t-shirts">T-Shirts</option>
                                        <option className='p-2' value="business-cards">Business Cards</option>
                                        <option className='p-2' value="coffee-mug">Coffee Mug</option>
                                        <option className='p-2' value="custom-cap">Custom Cap</option>
                                        <option className='p-2' value="pillow-cover">Pillow Cover</option>
                                        <option className='p-2' value="key-chain">Key Chain</option>
                                    </select>
                                    {errors.categorie ? <p className='text-red-500'>{errors.categorie.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register('description', {
                                            required: appLevelConstant.REQUIRED,
                                            minLength: { value: 50, message: appLevelConstant.DESCRIPTION_NOT_VALID },
                                            maxLength: { value: 500, message: appLevelConstant.DESCRIPTION_NOT_VALID }
                                        })}
                                        rows={3}
                                        defaultValue={''}
                                        type="text"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.description ? <p className='text-red-500'>{errors.description.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="highlights" className="block text-sm font-medium leading-6 text-gray-900">
                                    Highlights
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="highlights"
                                        {...register('highlights', {
                                            required: appLevelConstant.REQUIRED,
                                            minLength: { value: 50, message: appLevelConstant.HIGHLIGHT_NOT_VALID },
                                            maxLength: { value: 500, message: appLevelConstant.HIGHLIGHT_NOT_VALID }
                                        })}
                                        rows={3}
                                        defaultValue={''}
                                        type="text"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.highlights ? <p className='text-red-500'>{errors.highlights.message}</p> : null}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="thumbnail"
                                        {...register('thumbnail', { required: appLevelConstant.REQUIRED, })}
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.thumbnail ? <p className='text-red-500'>{errors.thumbnail.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="image1"
                                        {...register('image1', { required: appLevelConstant.REQUIRED, })}
                                        autoComplete="address-level2"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.image1 ? <p className='text-red-500'>{errors.image1.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="image2"
                                        {...register('image2', { required: appLevelConstant.REQUIRED, })}
                                        autoComplete="address-level1"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.image2 ? <p className='text-red-500'>{errors.image2.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="image3"
                                        id="image3"
                                        {...register('image3', { required: appLevelConstant.REQUIRED, })}
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.image3 ? <p className='text-red-500'>{errors.image3.message}</p> : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900 bg-white"
                            onClick={() => {
                                reset();
                                navigate('/admin/product-list');
                            }}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-sm px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                        >
                            Preview
                        </button>
                    </div>
                </div>
            </form>
            {
                productData ?
            <ProductPreviewDialog
                title={appLevelConstant.PRODUCT_PREVIEW_LABLE}
                toggle={isPreview}
                data={productData}
                dialogClosed={() => setPreview(false)}
                dialogAction={(data) => {
                    if(product){
                        updateProduct(data,product.id)
                        .then(res => {
                            setPreview(false);
                            setProductData(null);
                            reset();
                            product = null;
                            navigate('/admin/product-list');
                        })
                        .catch(err => {
                            setPreview(false);
                            setProductData(null);
                            reset();
                            console.log("error:", err);
                        })
                    }else {
                        dispatch(addProductAsync(data));
                        setPreview(false);
                        setProductData(null);
                        reset();
                    }
                }}
                actionButtonLabel={product ? appLevelConstant.UPDATE_PRODUCT_LABLE : appLevelConstant.ADD_PRODUCT_LABLE}
            /> : null }
        </div>
    )
}

export default AdminAddUpdateProduct