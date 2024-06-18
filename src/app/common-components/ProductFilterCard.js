import React from 'react'
import { Link } from 'react-router-dom';
import "../../features/products/components/product.scss";
import { truncateString } from '../constants/common-function';

function ProductFilterCard({ product }) {

    const image = product?.colors ? product?.colors[0].images[0] : product.thumbnail;

    return (
        <Link key={product.id} to={`/product-detail/${product.id}`} className="group">
            <div className="group relative border-gray-100">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={image}
                        alt="product"
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <p className="mt-2 text-l font-normal text-gray-900 nunito-text">{truncateString(product.title)}</p>
                <p className="text-l font-semibold text-gray-900 nunito-text">&#x20B9;{product.discountedPrice}</p>
            </div>
        </Link>
    )
}

export default ProductFilterCard;