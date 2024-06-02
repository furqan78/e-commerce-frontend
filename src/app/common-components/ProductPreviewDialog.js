import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/24/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProductPreviewDialog({ title, data, toggle, dialogClosed, dialogAction, actionButtonLabel }) {

  const cancelButtonRef = useRef(null);
  const [productImage, setProductImage] = useState(data?.thumbnail);


  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dialogClosed()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        {data ? <div className="pt-6">
                          {/* Image gallery */}
                          <div className='d-flex gap-8 px-12 product-preview-container overflow-y-auto'>
                            <div className="hidden overflow-hidden lg:block">
                              <img
                                src={productImage}
                                alt={data.title}
                                className="product-image object-cover object-center"
                              />
                              <div className='flex mt-2 gap-2'>
                                <div className='cursor-pointer' onClick={() => setProductImage(data.thumbnail)}>
                                  <img
                                    src={data.thumbnail}
                                    alt='Ali Studio Product'
                                    className="w-12 h-12 object-cover object-center"
                                  />
                                </div >
                                {
                                  data?.images?.map((item) => (
                                    <div className='cursor-pointer' onClick={() => setProductImage(item)}>
                                      <img
                                        src={item}
                                        alt='Ali Studio Product'
                                        className="w-12 h-12 object-cover object-center"
                                      />
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                            {/* Options */}
                            <div className="mt-2 width-60-percent lg:row-span-3 lg:mt-0">
                              <p className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</p>

                              {/* Reviews */}
                              <div className="mt-2">
                                <h3 className="sr-only text-black">Reviews</h3>
                                <div className="flex items-center">
                                  <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                      <StarIcon
                                        key={rating}
                                        className={classNames(
                                          data.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                          'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                      />
                                    ))}
                                  </div>
                                  <p className="sr-only">{data.rating} out of 5 stars</p>
                                </div>
                              </div>

                              <p className="text-2xl mt-2 tracking-tight text-gray-900">&#x20B9; {data.price}</p>

                              {/* Description and details */}
                              <div className="mt-2">
                                <p className="text-base text-gray-900">{data.description}</p>
                              </div>

                              <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-3">
                                  <ul className="list-disc space-y-2 pl-4 text-sm">
                                    {data?.highlights?.map((highlight) => (
                                      <li key={highlight} className="text-gray-400">
                                        <span className="text-gray-600">{highlight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-900">Categorie</h3>

                                <div className="mt-3">
                                  <ul className="list-disc space-y-2 pl-4 text-sm">
                                      <li key={data?.categorie} className="text-gray-400">
                                        <span className="text-gray-600">{data?.categorie}</span>
                                      </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                          </div>
                        </div> : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-950 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={() => dialogAction(data)}
                  >
                    {actionButtonLabel}
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => dialogClosed(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ProductPreviewDialog