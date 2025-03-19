import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Booking from './components/Booking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="h-[30rem] bg-cover bg-[url('/bg.jpg')]">
          <div className='w-full h-full bg-black/25 grid place-items-center pb-8'>
          <h3 className='text-white font-bold text-4xl text-center'>Appointment Booking</h3>
          </div>
      </div>
      <Booking />
    </>
  )
}

export default App
