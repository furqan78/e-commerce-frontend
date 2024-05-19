import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
    return (
        <Link key={product.id} to={`/product-detail/${product.id}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                    src={product.thumbnail}
                    alt="product"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.title}</h3>
        </Link>
    )
}

export default ProductCard