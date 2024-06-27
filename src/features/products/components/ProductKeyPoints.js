import React from 'react'
import { productKeys } from '../../../app/constant'

function ProductKeyPoints({product}) {

    return (
        <div className='flex gap-16 flex-wrap'>
            {
                productKeys.map((item) => (
                    product[item.value] ?
                        <div key={item.value} className='w-1/5 py-2'>
                            <h3 className='text-gray-500'>{item.lable}</h3>
                            <p className='text-gray-900 mt-2 font-semibold text-lg'>{product[item.value]}</p>
                        </div> : null
                ))
            }
        </div>
    )
}

export default ProductKeyPoints