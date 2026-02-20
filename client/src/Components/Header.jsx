import React from 'react'
import 'boxicons'


const Header = () => {
    //Function--toggle
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu')
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden')
        }
        else {
            mobileMenu.classList.add('hidden')
        }
    }
    return (
        <header className='flex justify-between items-center py-4 px-4 lg:px-20'>
            <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-light m-0'>FlowChat</h1>
            <nav className='hidden md:flex items-center gap-12'>
                <a className='text-white text-base tracking-wider transition-colors hover:text-gray-300 z-50' href="#">GLOBE</a>
                <a className='text-white text-base tracking-wider transition-colors hover:text-gray-300 z-50' href="#">DISASTERS</a>
            </nav>
            <button className='hidden md:block bg-[#a7a7a7] text-black py-1 px-3 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50'>
                SIGNIN
            </button>
            {/* Mobile Menu */}
            <button onClick={toggleMobileMenu} className='bg-amber-400s md:hidden text-3xl p-2 z-50'>
                <box-icon name='menu' color='#faf9f7' ></box-icon>
            </button>

            {/* Side Bar */}
            <div id="mobileMenu" className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md'>
                <nav className='flex flex-col gap-6 items-center'>
                    <a className='text-white text-base tracking-wider transition-colors hover:text-gray-300 z-50' href="#">GLOBE</a>
                    <a className='text-white text-base tracking-wider transition-colors hover:text-gray-300 z-50' href="#">DISASTERS</a>
                </nav>
            </div>
        </header>
    )
}

export default Header