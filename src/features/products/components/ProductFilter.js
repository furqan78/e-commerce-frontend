import { useEffect, useState } from 'react'
import {
    Dialog,
    Disclosure,
    Transition,
} from '@headlessui/react'
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { ITEMS_PER_PAGES, appLevelConstant } from '../../../app/constant'
import { createCancelToken } from '../../../app/constants/common-function'
import { getAllProducts } from '../productAPI'
import Pagination from '../../../app/common-components/Pagination'
import ProductFilterCard from '../../../app/common-components/ProductFilterCard'
import SkeletonLoader from '../../../app/common-components/SkeletonLoader'

const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const initialFilters = [
    {
        id: 'categories',
        name: 'Categories',
        inputType: "checkbox",
        options: [
            { value: appLevelConstant.T_SHIRTS_VALUE, label: appLevelConstant.T_SHIRTS_LABLE, checked: false },
            { value: appLevelConstant.BUSINESS_CARDS_VALUE, label: appLevelConstant.BUSINESS_CARDS_LABLE, checked: false },
            { value: appLevelConstant.COFFEE_MUG_VALUE, label: appLevelConstant.COFFEE_MUG_LABLE, checked: false },
            { value: appLevelConstant.CUSTOM_CAP_VALUE, label: appLevelConstant.CUSTOM_CAP_LABLE, checked: false },
            { value: appLevelConstant.PILLOW_COVER_VALUE, label: appLevelConstant.PILLOW_COVER_LABLE, checked: false },
            { value: appLevelConstant.KEY_CHAIN_VALUE, label: appLevelConstant.KEY_CHAIN_LABLE, checked: false },
        ],
    },
    {
        id: 'price',
        name: 'Price',
        inputType: "radio",
        options: [
            { value: 300, label: 'Under 300', checked: false },
            { value: 500, label: 'Under 500', checked: false },
            { value: 700, label: 'Under 700', checked: false },
            { value: 1000, label: 'Under 1000', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        inputType: "checkbox",
        options: [
            { value: 's', label: 'S', checked: false },
            { value: 'm', label: 'M', checked: false },
            { value: 'l', label: 'L', checked: false },
            { value: 'xl', label: 'XL', checked: false },
            { value: 'xxl', label: 'XXL', checked: false },
        ],
    },
    {
        id: 'ratings',
        name: 'Ratings',
        inputType: "radio",
        options: [
            { value: 4, label: '4 & Above', checked: false },
            { value: 3, label: '3 & Above', checked: false },
            { value: 2, label: '2 & Above', checked: false },
            { value: 1, label: '1 & Above', checked: false },
        ],
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductFilter({ search }) {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    // const [filters, setFilters] = useState(() => {
    //     const savedFilters = localStorage.getItem('filters');
    //     return savedFilters ? JSON.parse(savedFilters) : initialFilters;
    // });
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        let isMounted = true;
        const cancelTokenSource = createCancelToken();

        if (isMounted) {
            const getProducts = async () => {
                try {
                    const query = createQueryObject();
                    const reqObj = {
                        page: page,
                        search: search,
                        ...query
                    };
                    const data = await getAllProducts(reqObj);
                    setProducts(data);
                    setTotalItems(data.totalCount);
                    setLoading(false);
                } catch (err) {
                    if (err.message !== 'Request canceled' && isMounted) {
                        setError(err.message);
                        setLoading(false);
                    }
                }
            }

            getProducts();
        }
        return () => {
            isMounted = false;
            cancelTokenSource.cancel("Requests Canceled.")
        }

    }, [page, search, filters]);

    const handlePagination = (page) => {
        setLoading(true);
        setPage(page);
    }

    const handleApplyFilter = (sectionId, optionIdx, inputType) => {
        if (inputType === "checkbox") {
            setFilters((prevFilters) => {
                const newFilters = prevFilters.map((section) =>
                    section.id === sectionId
                        ? {
                            ...section,
                            options: section.options.map((option, idx) =>
                                idx === optionIdx ? { ...option, checked: !option.checked } : option
                            ),
                        }
                        : section
                );
                // localStorage.setItem('filters', JSON.stringify(newFilters));
                return newFilters;
            })
        } else {
            setFilters((prevFilters) => {
                const newFilters = prevFilters.map((section) =>
                    section.id === sectionId
                        ? {
                            ...section,
                            options: section.options.map((option, idx) =>
                                idx === optionIdx ? { ...option, checked: !option.checked } : { ...option, checked: false }
                            ),
                        }
                        : section
                );
                // localStorage.setItem('filters', JSON.stringify(newFilters));
                return newFilters;
            })
        }
        setPage(1);

    };

    const createQueryObject = () => {
        const query = {};

        filters.forEach((filter) => {
            filter.options.forEach((option) => {
                if (option.checked) {
                    if (!query[filter.id]) {
                        query[filter.id] = [];
                    }
                    query[filter.id].push(option.value);
                }
            });
        });

        return query;
    };

    return (
        <div>
            {/* Mobile filter dialog */}
            <Transition show={mobileFiltersOpen}>
                <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                        {subCategories.map((category) => (
                                            <li key={category.name}>
                                                <a href={category.href} className="block px-2 py-3">
                                                    {category.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        onChange={() => handleApplyFilter(option)}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <main className="flex my-2 gap-3">
                {/* <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ focus }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div> */}
                {/* Filters */}
                <form className="width-20-percent bg-white">
                    <div className="border-b border-gray-100 p-4">
                        <h3 className='text-xl font-semibold text-gray-900'>Filters</h3>
                    </div>
                    {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-b border-gray-100 p-4">
                            {({ open = true }) => (
                                <>
                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                                                {open ? (
                                                    <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-4">
                                            {section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center">
                                                    <input
                                                        id={`filter-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        defaultValue={option.value}
                                                        type={section?.inputType === "radio" ? "radio" : "checkbox"}
                                                        defaultChecked={option.checked}
                                                        onChange={() => handleApplyFilter(section.id, optionIdx, section.inputType)}
                                                        className={classNames(section.inputType === "radio" ? "rounded-lg" : "rounded", "h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500")}
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                        className="ml-3 text-sm text-gray-600 cursor-pointer w-full"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </form>
                {
                     loading ?
                     (
                       <div className="m-16 py-0 sm:px-6 sm:py-0 lg:px-8">
                       <SkeletonLoader count={ITEMS_PER_PAGES.productPage} />
                       </div>
                     ) : (
                        <div className='width-80-percent p-5 bg-white'>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-5">
                            {products?.data?.map((product) => (
                                <ProductFilterCard product={product} />
                            ))}
                        </div>
                        {totalItems > ITEMS_PER_PAGES.productPage ?
                            <div className='mt-5 border-t border-gray-200 '>
                                {/* section of prodcuts and filters ends */}
                                <Pagination page={page} handlePagination={handlePagination} totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGES.productPage} />
                            </div> : null
                        }
                    </div>
                )}
            </main>
        </div>
    )
}
