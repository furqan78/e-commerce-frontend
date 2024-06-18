import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { appLevelConstant } from '../../app/constant';
import { useDispatch } from 'react-redux';
import { addProductAsync } from '../../features/products/productSlice';
import { getImageIdFromURL, getImageLink } from '../../app/constants/common-function';
import ProductPreviewDialog from '../../app/common-components/ProductPreviewDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProduct } from '../../features/products/productAPI';

const colorTemplate = {
    color: '',
    images: ["", "", "", ""]
}

function AdminAddUpdateProduct() {

    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "fields" });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    let product = location.state;
    const [category, setcategory] = useState(appLevelConstant.T_SHIRTS_VALUE);
    const [productType, setProductType] = useState(appLevelConstant.T_SHIRTS_VALUE);
    const [productData, setProductData] = useState(null);
    const [isPreview, setPreview] = useState(false);
    const [colors, setColors] = useState([colorTemplate]);

    const handlecategory = (e) => {
        setcategory(e.target.value);
    }

    const handleProductType = (e) => {
        setProductType(e.target.value);
    }

    useEffect(() => {
        let isMounted = true;

        const setProductValues = async () => {
            if (isMounted && product) {
                setValue("title", product.title);
                setValue("price", product.price);
                setValue("rating", product.rating);
                setValue("description", product.description);
                setValue("highlights", product.highlights.join(' | '));
                setValue("sizes", product.sizes.join(' | '));
                setcategory(product.category);
                await Promise.all(product.colors.map(async (item) => {
                    delete item?._id;
                  
                    item.images = await Promise.all(item.images.map(async (imagelink) => {
                      return await getImageIdFromURL(imagelink);
                    }));
                  
                    return item;
                  }));                  
                setValue("fields", product.colors);
            }
        }

        setProductValues();

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div className='p-12 bg-white'>
            <form noValidate onSubmit={handleSubmit(async (data) => {
                try {
                    // Destructure the data object for clarity
                    const { title, price, description, rating, highlights, fields, sizes, discount } = data;
                    await Promise.all(fields.map(async (item) => {
                        item.images = await Promise.all(item.images.map(async (imageId, index) => {
                          return await getImageLink(imageId);
                        }));
                        return item;
                      }));                      
                    // Construct the request object
                    const reqObj = {
                        title,
                        price,
                        description,
                        rating,
                        highlights: highlights?.split('|').map(highlight => highlight.trim()),
                        sizes: sizes?.split('|').map(size => size.trim()),
                        category: category,
                        productType: productType,
                        colors: fields,
                        discount
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
                                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        id="discount"
                                        {...register('discount', {
                                            required: appLevelConstant.REQUIRED,
                                            min: { value: 1, message: appLevelConstant.DISCOUNT_SHOULD_BE_BETWEEN },
                                            max: { value: 80, message: appLevelConstant.DISCOUNT_SHOULD_BE_BETWEEN },
                                        })}
                                        autoComplete="family-name"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.discount ? <p className='text-red-500'>{errors.discount.message}</p> : null}
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
                                            min: { value: 0, message: appLevelConstant.RATING_NOT_VALID },
                                            max: { value: 5, message: appLevelConstant.RATING_NOT_VALID },
                                        })}
                                        autoComplete="family-name"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.rating ? <p className='text-red-500'>{errors.rating.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        {...register('category', { required: appLevelConstant.REQUIRED, })}
                                        className='quantitiy-dropdown' onChange={(e) => handlecategory(e)}>
                                        <option className='p-2' value={appLevelConstant.T_SHIRTS_VALUE}>{appLevelConstant.T_SHIRTS_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.BUSINESS_CARDS_VALUE}>{appLevelConstant.BUSINESS_CARDS_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.COFFEE_MUG_VALUE}>{appLevelConstant.COFFEE_MUG_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.CUSTOM_CAP_VALUE}>{appLevelConstant.CUSTOM_CAP_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.PILLOW_COVER_VALUE}>{appLevelConstant.PILLOW_COVER_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.KEY_CHAIN_VALUE}>{appLevelConstant.KEY_CHAIN_LABLE

                                        }</option>
                                    </select>
                                    {errors.category ? <p className='text-red-500'>{errors.category.message}</p> : null}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="productType" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Type
                                </label>
                                <div className="mt-2">
                                    <select
                                        {...register('productType', { required: appLevelConstant.REQUIRED, })}
                                        className='quantitiy-dropdown' onChange={(e) => handleProductType(e)}>
                                        <option className='p-2' value={appLevelConstant.T_SHIRTS_VALUE}>{appLevelConstant.T_SHIRTS_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.BUSINESS_CARDS_VALUE}>{appLevelConstant.BUSINESS_CARDS_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.COFFEE_MUG_VALUE}>{appLevelConstant.COFFEE_MUG_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.CUSTOM_CAP_VALUE}>{appLevelConstant.CUSTOM_CAP_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.PILLOW_COVER_VALUE}>{appLevelConstant.PILLOW_COVER_LABLE}</option>
                                        <option className='p-2' value={appLevelConstant.KEY_CHAIN_VALUE}>{appLevelConstant.KEY_CHAIN_LABLE

                                        }</option>
                                    </select>
                                    {errors.productType ? <p className='text-red-500'>{errors.productType.message}</p> : null}
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
                            <div className='sm:col-span-4 gap-4 flex'>
                                <button
                                    type="button"
                                    onClick={() => append(colorTemplate)}
                                    className="rounded-sm px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                >
                                    ADD COLOR
                                </button>
                                <button
                                    type="button"
                                    onClick={() => fields?.length > 0 ? remove(fields?.length - 1) : null}
                                    className="rounded-sm px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 family-open-sans pamplet-btn"
                                >
                                    REMOVE
                                </button>
                            </div>
                            {
                                fields?.map((color, index) => (
                                    <div className='sm:col-span-4'>
                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor={`fields[${index}].color`} className="block text-sm font-medium leading-6 text-gray-900">
                                                Color {index + 1}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id={`fields[${index}].color`}
                                                    {...register(`fields[${index}].color`,
                                                        { required: appLevelConstant.REQUIRED }
                                                    )}
                                                    className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors?.fields && errors?.fields[index]?.color ? <p className='text-red-500'>{errors?.fields[index]?.color?.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className='flex gap-3 mt-4'>
                                            {color?.images?.map((item, itemIndex) => (
                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor={`fields[${index}].images[${itemIndex}]`} className="block text-sm font-medium leading-6 text-gray-900">
                                                        Image {itemIndex + 1}
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            id={`fields[${index}].images[${itemIndex}]`}
                                                            {...register(`fields[${index}].images[${itemIndex}]`,
                                                                { required: appLevelConstant.REQUIRED }
                                                            )}
                                                            className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors?.fields && errors?.fields[index]?.images[itemIndex] ? <p className='text-red-500'>{errors?.fields[index]?.images[itemIndex].message}</p> : null}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="sm:col-span-4">
                                <label htmlFor="sizes" className="block text-sm font-medium leading-6 text-gray-900">
                                    Size
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="sizes"
                                        {...register('sizes', {
                                            required: appLevelConstant.REQUIRED
                                        })}
                                        rows={3}
                                        defaultValue={''}
                                        type="text"
                                        className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.sizes ? <p className='text-red-500'>{errors.sizes.message}</p> : null}
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
                            if (product) {
                                updateProduct(data, product.id)
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
                            } else {
                                dispatch(addProductAsync(data));
                                setPreview(false);
                                setProductData(null);
                                reset();
                            }
                        }}
                        actionButtonLabel={product ? appLevelConstant.UPDATE_PRODUCT_LABLE : appLevelConstant.ADD_PRODUCT_LABLE}
                    /> : null}
        </div>
    )
}

export default AdminAddUpdateProduct