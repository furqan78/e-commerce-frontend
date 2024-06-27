import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { appLevelConstant, categories, colorTemplate, tshirtSizes } from '../../app/constant';
import { useDispatch } from 'react-redux';
import { addProductAsync } from '../../features/products/productSlice';
import { getImageIdFromURL, getImageLink, getPathFromUrl } from '../../app/constants/common-function';
import ProductPreviewDialog from '../../app/common-components/ProductPreviewDialog';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { addProduct, deleteFiles, updateProduct, uploadFiles } from '../../features/products/productAPI';
import MultiSelectDropdown from '../../app/common-components/MultiSelectDropdown';
import Dropdown from '../../app/common-components/Dropdown';

function AdminAddUpdateProduct() {

    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { fields, append, remove, update } = useFieldArray({ control, name: "fields" });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    let product = location.state;
    const [productType, setProductType] = useState(appLevelConstant.T_SHIRTS_VALUE);
    const [category, setcategory] = useState(categories[productType][0]);
    const [productData, setProductData] = useState(null);
    const [isPreview, setPreview] = useState(false);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handlecategory = (value) => {
        setcategory(value);
    }

    const handleProductType = (e) => {
        setProductType(e.target.value);
        setcategory(categories[e.target.value][0]);
    }

    useEffect(() => {
        let isMounted = true;

        const setProductValues = async () => {
            if (isMounted && product) {
                setValue("title", product.title);
                setValue("price", product.price);
                setValue("rating", product.rating);
                setValue("description", product.description);
                setValue("discount", product.discount);
                setValue("highlights", product.highlights.join(' | '));
                setProductType(product.productType);
                setcategory(product.category);
                setValue('fields', product.colors);
                setValue('material', product.material);
                setValue('sleeveType', product.sleeveType);
                setValue('neckType', product.neckType);
                setValue('capacity', product.capacity);
                setValue('dimensions', product.dimensions);
                setValue('paperType', product.paperType);
                setValue('quantity', product.quantity);
                setProductType(product.productType);
                setValue('firmness', product.firmness);
                setValue('fillMaterial', product.fillMaterial);
            }
        }

        setProductValues();

        return () => {
            isMounted = false;
        }
    }, [])

    const handleSelect = (index, option, productType) => {
        const currentSelectedOptions = fields[index]?.sizes || [];

        if (option.id === 'all') {
            if (currentSelectedOptions.length === tshirtSizes[productType].length - 1) {
                update(index, { ...fields[index], sizes: [] });
            } else {
                const allOptions = tshirtSizes[productType].slice(1).map(opt => ({ ...opt, stock: 0 }));
                update(index, { ...fields[index], sizes: allOptions });
            }
        } else {
            const exists = currentSelectedOptions.find(selected => selected.id === option.id);
            if (exists) {
                update(index, {
                    ...fields[index],
                    sizes: currentSelectedOptions.filter(selected => selected.id !== option.id)
                });
            } else {
                update(index, {
                    ...fields[index],
                    sizes: [...currentSelectedOptions, { ...option, stock: 0 }]
                });
            }
        }
    }


    const handleFormSubmit = async (data) => {
        try {
            const reqObj = {};
            switch (productType) {
                case appLevelConstant.T_SHIRTS_VALUE:
                    await Promise.all(fields.map(async (item) => {
                        delete item?.id;
                        item.sizes = await Promise.all(item.sizes.map(async (item, index) => {
                            return { size: item.size, stock: item.stock };
                        }));
                        return item;
                    }));
                    reqObj.title = data.title;
                    reqObj.price = data.price;
                    reqObj.description = data.description;
                    reqObj.rating = data.rating;
                    reqObj.highlights = data.highlights?.split('|').map(highlight => highlight.trim())
                    reqObj.category = category;
                    reqObj.productType = productType;
                    reqObj.colors = fields;
                    reqObj.discount = data.discount;
                    reqObj.material = data.material;
                    reqObj.sleeveType = data.sleeveType;
                    reqObj.neckType = data.neckType;
                    break;
                case appLevelConstant.CUSTOM_CAP_VALUE:
                    await Promise.all(fields.map(async (item) => {
                        delete item?.id;
                        item.sizes = await Promise.all(item.sizes.map(async (item, index) => {
                            return { size: item.size, stock: item.stock };
                        }));
                        return item;
                    }));
                    reqObj.title = data.title;
                    reqObj.price = data.price;
                    reqObj.description = data.description;
                    reqObj.rating = data.rating;
                    reqObj.highlights = data.highlights?.split('|').map(highlight => highlight.trim())
                    reqObj.category = category;
                    reqObj.productType = productType;
                    reqObj.colors = fields;
                    reqObj.discount = data.discount;
                    reqObj.material = data.material;
                    break;
                case appLevelConstant.COFFEE_MUG_VALUE:
                    await Promise.all(fields.map(async (item) => {
                        delete item?.id;
                        return item;
                    }));
                    reqObj.title = data.title;
                    reqObj.price = data.price;
                    reqObj.description = data.description;
                    reqObj.rating = data.rating;
                    reqObj.highlights = data.highlights?.split('|').map(highlight => highlight.trim())
                    reqObj.category = category;
                    reqObj.productType = productType;
                    reqObj.colors = fields;
                    reqObj.discount = data.discount;
                    reqObj.material = data.material;
                    reqObj.capacity = data.capacity;
                    break;
                case appLevelConstant.PILLOW_COVER_VALUE:
                    await Promise.all(fields.map(async (item) => {
                        delete item?.id;
                        return item;
                    }));
                    reqObj.title = data.title;
                    reqObj.price = data.price;
                    reqObj.description = data.description;
                    reqObj.rating = data.rating;
                    reqObj.highlights = data.highlights?.split('|').map(highlight => highlight.trim())
                    reqObj.category = category;
                    reqObj.productType = productType;
                    reqObj.colors = fields;
                    reqObj.discount = data.discount;
                    reqObj.material = data.material;
                    reqObj.firmness = data.firmness;
                    reqObj.fillMaterial = data.fillMaterial;
                    reqObj.dimensions = data.dimensions;
                    break;
                case appLevelConstant.KEY_CHAIN_VALUE:
                    await Promise.all(fields.map(async (item) => {
                        delete item?.id;
                        return item;
                    }));
                    reqObj.title = data.title;
                    reqObj.price = data.price;
                    reqObj.description = data.description;
                    reqObj.rating = data.rating;
                    reqObj.highlights = data.highlights?.split('|').map(highlight => highlight.trim())
                    reqObj.category = category;
                    reqObj.productType = productType;
                    reqObj.colors = fields;
                    reqObj.discount = data.discount;
                    reqObj.material = data.material;
                    break;
                case appLevelConstant.BUSINESS_CARDS_VALUE:
                    await Promise.all(fields.map(async (item) => {
                        delete item?.id;
                        return item;
                    }));
                    reqObj.title = data.title;
                    reqObj.price = data.price;
                    reqObj.description = data.description;
                    reqObj.rating = data.rating;
                    reqObj.highlights = data.highlights?.split('|').map(highlight => highlight.trim())
                    reqObj.category = category;
                    reqObj.productType = productType;
                    reqObj.colors = fields;
                    reqObj.discount = data.discount;
                    reqObj.paperType = data.paperType;
                    reqObj.quantity = data.quantity;
                    reqObj.dimensions = data.dimensions;
                    break;
                default:
                    break;
            }
            setProductData(reqObj);
            setPreview(true);
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleFileChange = async (event, index) => {
        const files = Array.from(event.target.files);
        if (fields && fields[index] && fields[index].images && fields[index].images.length > 0) {
            fields[index].images = await Promise.all(fields[index].images.map(async (imagelink) => {
                return getPathFromUrl(imagelink);
            }));

            try {
                const requestObject = {
                    filePaths: fields[index].images
                }
                const result = await deleteFiles(requestObject);
                if (result) handleUploadFiles(files, index);
            }
            catch (error) {
                console.log(error, " erorr");
            }

        } else {
            handleUploadFiles(files, index);
        }
    };

    const handleUploadFiles = (files, index) => {
        if (files && Array.isArray(files)) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            formData.append("productType", productType);
            uploadFiles(formData)
                .then((res) => {
                    update(index, { ...fields[index], images: res?.imageUrls ? res.imageUrls : [] })
                })
                .catch((error) => {
                    console.log(error, " error in uploading files");
                    update(index, { ...fields[index], images: [] })
                });
        }
    }

    const handleColorChange = (event, index) => {
        const color = event.target.value;
        update(index, { ...fields[index], color: color });
    }

    return (
        <div className='p-12 bg-white'>
            <form noValidate onSubmit={handleSubmit(async (data) => handleFormSubmit(data))}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-bold leading-7 midnight-green-color">{product ? "EDIT PRODUCT" : "ADD A NEW PRODUCT"}</h2>
                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

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
                                    <Dropdown
                                        options={categories[productType]}
                                        selectedOption={category}
                                        onSelect={(value) => handlecategory(value)}
                                    />
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
                                    onClick={() => append(colorTemplate[productType])}
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
                                                    onChange={(e) => handleColorChange(e, index)}
                                                    className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors?.fields && errors?.fields[index] && errors?.fields[index]?.color ? <p className='text-red-500'>{errors?.fields[index]?.color?.message}</p> : null}
                                            </div>
                                        </div>
                                        {
                                            fields && fields[index] && fields[index].images ?
                                                <div className='flex gap-3 mt-4'>
                                                    {/* {color?.images?.map((item, itemIndex) => ( */}
                                                    <div className="sm:col-span-2 sm:col-start-1">
                                                        <label htmlFor={`fields[${index}].images`} className="block text-sm font-medium leading-6 text-gray-900">
                                                            Images
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="file" multiple
                                                                id={`fields[${index}].images`}
                                                                {...register(`fields[${index}].images`,
                                                                    { required: appLevelConstant.REQUIRED }
                                                                )}
                                                                onChange={(event) => handleFileChange(event, index)}
                                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            {errors?.fields && errors?.fields[index] && errors?.fields[index]?.images ? <p className='text-red-500'>{errors?.fields[index]?.images.message}</p> : null}
                                                        </div>
                                                    </div>
                                                    {fields && fields[index] && fields[index]?.images?.map((url, index) => (
                                                        <img key={index} src={url} alt={`Preview ${index}`} className='w-36 h-36' />
                                                    ))}
                                                </div> : null
                                        }
                                        {
                                            fields && fields[index] && fields[index].sizes ?
                                                <div className='mt-4'>
                                                    <MultiSelectDropdown
                                                        id={`fields[${index}].sizes`}
                                                        {...register(`fields[${index}].sizes`,
                                                            { required: appLevelConstant.REQUIRED }
                                                        )}
                                                        options={tshirtSizes[productType]}
                                                        selectedOptions={color.sizes}
                                                        onSelect={(option) => handleSelect(index, option, productType)}
                                                    />
                                                    {errors?.fields && errors?.fields[index] && errors?.fields[index]?.sizes ? <p className='text-red-500'>{errors?.fields[index]?.sizes?.message}</p> : null}
                                                </div> : null
                                        }
                                    </div>
                                ))
                            }

                            {
                                productType === appLevelConstant.PILLOW_COVER_VALUE || productType === appLevelConstant.BUSINESS_CARDS_VALUE ?
                                    <div className="sm:col-span-4">
                                        <label htmlFor="dimensions" className="block text-sm font-medium leading-6 text-gray-900">
                                            Dimensions
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="dimensions"
                                                {...register('dimensions', {
                                                    required: appLevelConstant.REQUIRED
                                                })}
                                                rows={3}
                                                defaultValue={''}
                                                type="text"
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.dimensions ? <p className='text-red-500'>{errors.dimensions.message}</p> : null}
                                        </div>
                                    </div> : null
                            }

                            {
                                productType !== appLevelConstant.BUSINESS_CARDS_VALUE ?
                                    <div className="sm:col-span-4">
                                        <label htmlFor="material" className="block text-sm font-medium leading-6 text-gray-900">
                                            Material
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="material"
                                                {...register('material', {
                                                    required: appLevelConstant.REQUIRED
                                                })}
                                                rows={3}
                                                defaultValue={''}
                                                type="text"
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.material ? <p className='text-red-500'>{errors.material.message}</p> : null}
                                        </div>
                                    </div> :
                                    <div className="sm:col-span-4">
                                        <label htmlFor="paperType" className="block text-sm font-medium leading-6 text-gray-900">
                                            Paper Type
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="paperType"
                                                {...register('paperType', {
                                                    required: appLevelConstant.REQUIRED
                                                })}
                                                rows={3}
                                                defaultValue={''}
                                                type="text"
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.paperType ? <p className='text-red-500'>{errors.paperType.message}</p> : null}
                                        </div>
                                    </div>
                            }

                            {
                                productType === appLevelConstant.T_SHIRTS_VALUE ?
                                    <>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="sleeveType" className="block text-sm font-medium leading-6 text-gray-900">
                                                Sleeve Type
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="sleeveType"
                                                    {...register('sleeveType', {
                                                        required: appLevelConstant.REQUIRED
                                                    })}
                                                    rows={3}
                                                    defaultValue={''}
                                                    type="text"
                                                    className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.sleeveType ? <p className='text-red-500'>{errors.sleeveType.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="neckType" className="block text-sm font-medium leading-6 text-gray-900">
                                                Neck Type
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="neckType"
                                                    {...register('neckType', {
                                                        required: appLevelConstant.REQUIRED
                                                    })}
                                                    rows={3}
                                                    defaultValue={''}
                                                    type="text"
                                                    className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.neckType ? <p className='text-red-500'>{errors.neckType.message}</p> : null}
                                            </div>
                                        </div>
                                    </>
                                    : null
                            }
                            {
                                productType === appLevelConstant.COFFEE_MUG_VALUE ?
                                    <div className="sm:col-span-4">
                                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900">
                                            Capacity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="capacity"
                                                {...register('capacity', {
                                                    required: appLevelConstant.REQUIRED
                                                })}
                                                type="text"
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.capacity ? <p className='text-red-500'>{errors.capacity.message}</p> : null}
                                        </div>
                                    </div> : null
                            }
                            {
                                productType === appLevelConstant.BUSINESS_CARDS_VALUE ?
                                    <div className="sm:col-span-4">
                                        <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                            Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="quantity"
                                                {...register('quantity', {
                                                    required: appLevelConstant.REQUIRED,
                                                    min: { value: 100, message: appLevelConstant.PRICE_NOT_VALID },
                                                })}
                                                type="number"
                                                className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.quantity ? <p className='text-red-500'>{errors.quantity.message}</p> : null}
                                        </div>
                                    </div> : null
                            }

                            {
                                productType === appLevelConstant.PILLOW_COVER_VALUE ?
                                    <>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="firmness" className="block text-sm font-medium leading-6 text-gray-900">
                                                Firmness
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="firmness"
                                                    {...register('firmness', {
                                                        required: appLevelConstant.REQUIRED
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.firmness ? <p className='text-red-500'>{errors.firmness.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="fillMaterial" className="block text-sm font-medium leading-6 text-gray-900">
                                                Filled Material
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="fillMaterial"
                                                    {...register('fillMaterial', {
                                                        required: appLevelConstant.REQUIRED
                                                    })}
                                                    type="text"
                                                    className="block w-full rounded-sm border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.fillMaterial ? <p className='text-red-500'>{errors.fillMaterial.message}</p> : null}
                                            </div>
                                        </div>
                                    </>
                                    : null
                            }
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
                                        console.log("product update failed:", err);
                                    })
                            } else {
                                addProduct(data)
                                    .then((res) => {
                                        setPreview(false);
                                        setProductData(null);
                                        reset();
                                    })
                                    .catch(error => {
                                        console.log(" Product upload failed", error);
                                    });
                            }
                        }}
                        actionButtonLabel={product ? appLevelConstant.UPDATE_PRODUCT_LABLE : appLevelConstant.ADD_PRODUCT_LABLE}
                    /> : null}
        </div>
    )
}

export default AdminAddUpdateProduct