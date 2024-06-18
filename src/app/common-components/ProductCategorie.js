import React from 'react'
import { categorieNavigation } from '../constant'
import { Link } from 'react-router-dom'
import { getImageLink } from '../constants/common-function'

function ProductCategorie() {
  return (
    <header className="bg-white rounded-sm">
    <div className="flex items-center justify-center gap-5 px-4 py-3 sm:px-6 lg:px-8">
        {categorieNavigation.map((item) => (
            <Link
                key={item.name}
                to={item.href}
                className='px-4 py-2 text-l font-small text-gray-700 font-semibold hover:text-gray-500'
                aria-current={item.current ? 'page' : undefined}
            >
                <div className='w-16 h-16 m-auto'>
                <img 
                className='w-full h-full'
                src={getImageLink(item.image)}
                alt={item.alt}
                />
                </div>
                <p className='semibold-small mt-2'>{item.name}</p>
            </Link>
        ))}
    </div>
</header>
  )
}

export default ProductCategorie