import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function CollapsableMenu({ title, selectedValue, onItemClick, menuItems }) {
    return (
        <div className='flex justify-end items-center gap-4'>
            <p className='font-semibold'>{title}:</p>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className='inline-flex w-full justify-between gap-x-3 rounded-sm bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                            <p>{selectedValue}</p>
                            <ChevronDownIcon className='m-auto h-4 w-4 text-gray-400' />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {menuItems.map((item) => (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                onClick={() => {
                                                    onItemClick(item);
                                                }}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                            >
                                                {item.label}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default CollapsableMenu