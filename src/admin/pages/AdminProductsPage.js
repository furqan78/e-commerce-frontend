import { ArrowDownIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const adminNavigation = [
  {
    lable: "Product List",
    link: "/admin/product-list"
  },
  {
    lable: "Add Product",
    link: "/admin/product-add-update"
  },
  {
    lable: "Orders",
    link: "/admin/orders"
  },
  {
    lable: "Form Builder",
    link: "/admin/form-builder"
  }
]

function AdminProductsPage({children}) {

  const { register, handleSubmit } = useForm();

  return (
    <div>
    <div className='bg-white flex p-4 border-b items-center border-gray-300 gap-10'>
    <Link className='company-name' to={'/admin/product-list'}>ADMIN PANEL </Link>
      <form className='w-3/5' onSubmit={handleSubmit((data) => {
        if (data.searchText) {

        }
      })}>
        <div className='relative'>
          <input
            id="searchText"
            {...register('searchText', {
            })}
            type="text"
            placeholder='Search Products'
            className="block rounded-md py-2 w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="search-btn"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
        </div>
      </form>
      <div className="relative group">
      <div className="flex items-center gap-2 border border-gray-400 px-5 py-2 rounded-md cursor-pointer">
        <span>Actions</span>
        <ChevronDownIcon className='w-4 h-4' />
      </div>
      <div className="z-50 absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="py-2">
          {
            adminNavigation.map(item => (
              <Link to={item.link} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">{item.lable}</Link>
            ))
          }
        </div>
      </div>
    </div>
    </div>
      {children}
    </div>
  )
}

export default AdminProductsPage