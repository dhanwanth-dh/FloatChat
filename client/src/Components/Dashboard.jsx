import React from 'react'
import 'boxicons'
const Dashboard = () => {
    return (
        <div className='h-[88vh] w-full flex justify-around pb-5 items-end md:items-center'>
            <div className='absolute flex flex-col h-12s w-[80%] md:w-100'>
                <input type="text" className='bg-white rounded-full w-full md:w-full h-12 border-none px-4 flex justify-center items-center' placeholder='Search' />
                <button className='bg-amber-800'>
                    <box-icon name='search-alt-2' className="absolute flex top-3 right-3 transition-colors hover:text-gray-300"></box-icon>
                </button>
            </div>
        </div>
    )
}

export default Dashboard