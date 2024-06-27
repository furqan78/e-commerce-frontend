import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../cart/CartSlice'
import './Navbar.scss'
import companyLogo from '../../assets/images/company-logo.png';
import { useForm } from 'react-hook-form'
import { appLevelConstant, categorieNavigation } from '../../app/constant'
import Footer from '../footer/Footer'
import { decodeJwtToken, getItemFromLocalStorage } from '../../app/constants/common-function'

const user = {
    name: 'User',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const userNavigation = [
    { name: 'Profile', link: '/account/details' },
    { name: 'My Orders', link: '/account/orders' },
    { name: 'Log out', link: '/logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children, isCategorieSection = false }) {
    const items = useSelector(selectItems);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const token = getItemFromLocalStorage(appLevelConstant.TOKEN_KEY);
    const userRole = decodeJwtToken(token);
    return (
        <>
            <div className="min-h-full bg-gray-100">
                <Disclosure as="nav" className="bg-white border-width border-gray-200">
                    {({ open }) => (
                        <>
                            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-1">
                                <div className="flex h-14 items-center justify-between">
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
                                            navigate("/product-filter", { state: data, replace: true });
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
                                                className="rounded-md bg-indigo-50 global-search-bar border border-gray-100 text-gray-900 placeholder:text-gray-400 font-semibold sm:text-sm"
                                            />
                                            <button
                                                type="submit"
                                                className="search-btn text-gray-500"
                                            >
                                                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </form>
                                    {/* { userRole?.role && userRole?.role === appLevelConstant.ADMIN_LABEL ?
                                    <Link to={'/admin/product-list'} className='px-4 py-2  border border-gray-200 flex gap-3 cursor-pointer'>
                                        <p className="text-sm font-semibold leading-6 midnight-green-color">Go to Admin Panel</p>
                                    </Link> : null} */}
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex gap-4 items-center md:ml-6">
                                            <Link to="/cart">
                                                <button
                                                    type="button"
                                                    className="relative flex items-center gap-2 p-1 text-black focus:outline-none"
                                                >
                                                    <div>
                                                        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                                    </div>
                                                    <div className='text-m font-semibold'>Cart</div>
                                                </button>
                                            </Link>
                                            {items?.length > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                {items?.length}
                                            </span>}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative py-1 px-2 flex gap-2 max-w-xs items-center rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-6 w-6 rounded-full" src={user.imageUrl} alt="" />
                                                        <p className='text-m font-semibold'>{user.name}</p>
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
                <main>
                    {
                        isCategorieSection ?
                        <div className="bg-white flex items-center justify-center gap-10">
                        {categorieNavigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className='text-l py-2 font-small text-gray-700 font-normal hover:text-gray-500'
                                aria-current={item.current ? 'page' : undefined}
                            >
                                <p>{item.name}</p>
                            </Link>
                        ))}
                    </div>
                        : null
                    }
                    <div className='bg-gray-100 mx-3'>{children}</div>
                    <Footer></Footer>
                </main>
            </div>
        </>
    )
}
