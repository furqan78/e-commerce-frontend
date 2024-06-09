import React from 'react'
import { productCategorie } from '../constant'
import { Link } from 'react-router-dom'
import { getImageLink } from '../constants/common-function'

const navigation = [
    // { name: 'New Arrivals', href: '/products/' + productCategorie.NEW_ARRIVALS, current: true },
    { 
        name: 'T-shirts', 
        href: '/products/' + productCategorie.T_SHIRTS, 
        current: false, 
        image: "1k2OZE-QH-a4SuANQ5mCv-54rtUxj_ikx",
        alt: ""
    },
    { 
        name: 'Business Cards', 
        href: '/products/' + productCategorie.BUSINESS_CARDS, 
        current: false,
        image: "1RfFIllwwxFDEk8X7gqTAS0vpsHPSY9AP",
        alt: ""
    },
    { 
        name: 'Coffee mug', 
        href: '/products/' + productCategorie.COFFEE_MUG, 
        current: false,
        image: "1AlDc6J8oNo-tRwW09V9N6tNyAcxgbuOh",
        alt: ""
    },
    { 
        name: 'Custom cap', 
        href: '/products/' + productCategorie.CUSTOM_CAP, 
        current: false,
        image: "1DPTgVvff-jo_lN01zh_7KdkytdLsurv7",
        alt: ""
    },
    { 
        name: 'Custom pillow', 
        href: '/products/' + productCategorie.PILLOW, 
        current: false,
        image: "1_0tObkcmprClnakO5woHWR-9MqfIkQBk",
        alt: "" 
    },
    { 
        name: 'Key Chain', 
        href: '/products/' + productCategorie.KEY_CHAIN, 
        current: false,
        image: "1FhYdRxCq1ZtqVFOViK7a7XUtzCkDQo6l",
        alt: ""
    },
]

function ProductCategorie() {
  return (
    <header className="bg-white rounded-sm">
    <div className="flex items-center justify-center gap-5 px-4 py-3 sm:px-6 lg:px-8">
        {navigation.map((item) => (
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