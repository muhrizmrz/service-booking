import React from 'react'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='w-full p-10 bg-white text-gray-800 flex justify-between items-center'>
        <h3 className='text-4xl font-bold italic'>Verve</h3>
        <NavBar />
    </header>
  )
}

export default Header