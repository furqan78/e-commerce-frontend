import { ChevronDownIcon, ChevronUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

function CollapsableCard({ children, title }) {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className='bg-white relative'>
            <div className='p-5 flex justify-between items-center cursor-pointer border-b border-gray-100' onClick={() => setOpen(!isOpen)}>
                <div className='flex gap-2 items-center'>
                <DocumentTextIcon className='w-6 h-6' />
                <h1 className="product-categorie-heading">{title}</h1>
                </div>
                <div className='rounded-full bg-gray-100 p-2'>
                    {
                        isOpen ? <ChevronUpIcon className='w-5 h-5 text-gray-600' /> : <ChevronDownIcon className='w-5 h-5 text-gray-600' />
                    }
                </div>
            </div>
            {
                isOpen ?
                    <div className='px-8 pt-6 pb-10'>
                        {children}
                    </div> : null
            }
        </div>
    )
}

export default CollapsableCard