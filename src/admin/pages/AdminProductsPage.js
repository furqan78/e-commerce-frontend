import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function AdminProductsPage({children}) {

  const { register, handleSubmit } = useForm();

  return (
    <div>
    <div className='flex p-4 border-b items-center border-gray-300 gap-10'>
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
      <Link to={'/admin/product-add-update'} className='px-4 py-2  border border-gray-200 flex gap-3 cursor-pointer'>
        <PlusIcon className='w-6 h-6 midnight-green-color' />
        <p className="text-sm font-semibold leading-6 midnight-green-color">ADD A NEW PRODUCT</p>
      </Link>
      <Link to={'/admin/orders'} className='px-4 py-2  border border-gray-200 flex gap-3 cursor-pointer'>
        <p className="text-sm font-semibold leading-6 midnight-green-color">ORDERS</p>
      </Link>
    </div>
      {children}
    </div>
  )
}

export default AdminProductsPage