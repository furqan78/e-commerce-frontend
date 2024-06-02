import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectItems } from '../cart/CartSlice'
import './Navbar.scss'
import companyLogo from '../../assets/images/company-logo.png';
import { useForm } from 'react-hook-form'
import { productCategorie } from '../../app/constant'
import Footer from '../footer/Footer'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'New Arrivals', href: '/products/' + productCategorie.NEW_ARRIVALS, current: true },
    { name: 'T-shirts', href: '/products/' + productCategorie.T_SHIRTS, current: false },
    { name: 'Business Cards', href: '/products/' + productCategorie.BUSINESS_CARDS, current: false },
    { name: 'Coffee mug', href: '/products/' + productCategorie.COFFEE_MUG, current: false },
    { name: 'Custom cap', href: '/products/' + productCategorie.CUSTOM_CAP, current: false },
    { name: 'Pillow Cover', href: '/products/' + productCategorie.PILLOW, current: false },
    { name: 'Key Chain', href: '/products/' + productCategorie.KEY_CHAIN, current: false },
]
const userNavigation = [
    { name: 'Profile', link: '/account/details' },
    { name: 'My Orders', link: '/account/orders' },
    { name: 'Log out', link: '/logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
    const items = useSelector(selectItems);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-white">
                    {({ open }) => (
                        <>
                            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-1 ">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 brand-container">
                                            <div className='logo-container'>
                                                <img
                                                    className="h-6 w-6"
                                                    src={companyLogo}
                                                    alt="Your Company"
                                                />
                                            </div>
                                            <h1 className='company-name'>Ali Studio</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit((data) => {
                                        if (data.searchText) {
                                            navigate("/search", { state: data, replace: true });
                                            navigate(0)
                                        }
                                    })}>
                                        <div className='search-bar-container'>
                                            <input
                                                id="searchText"
                                                {...register('searchText', {
                                                })}
                                                type="text"
                                                placeholder='Find your custom design, t-shirts, cup, key chain'
                                                className="block rounded-md py-2 global-search-bar text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            />
                                            <button
                                                type="submit"
                                                className="search-btn"
                                            >
                                                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </form>
                                    <Link to={'/admin/product-list'} className='px-4 py-2  border border-gray-200 d-flex gap-3 cursor-pointer'>
                                        <p className="text-sm font-semibold leading-6 midnight-green-color">Go to Admin Panel</p>
                                    </Link>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <Link to="/cart">
                                                <button
                                                    type="button"
                                                    className="relative p-1 text-black focus:outline-none"
                                                >
                                                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </Link>
                                            {items?.length > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                {items?.length}
                                            </span>}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to={item.link}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-bold'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <Link to="/cart">
                                            <button
                                                type="button"
                                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </Link>
                                        {items?.length > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                            {items?.length}
                                        </span>}
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white">
                    <div className="mx-auto px-4 py-3 sm:px-6 lg:px-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className='px-4 py-2 text-l font-small text-gray-700 font-semibold hover:text-gray-500'
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </header>
                <main className='bg-white'>
                    <div>{children}</div>
                    <Footer></Footer>
                </main>
            </div>
        </>
    )
}
