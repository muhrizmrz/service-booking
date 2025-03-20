import React from 'react'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='w-full p-10 bg-white text-gray-800 flex justify-between items-center'>
        <h3 className='text-4xl font-bold italic'>Verve</h3>
        <button className='sm:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <NavBar />
    </header>
  )
}

export default Header