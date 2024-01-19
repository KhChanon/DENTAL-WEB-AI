import React from 'react'
import Logo from '../assets/Logo.svg'

const NavBar = () => {
  return (
    <div className="bg-darkslateblue-200 flex flex-row items-center justify-between w-screen h-20 py-2">
      <img
        className="flex h-full ml-5"
        alt=""
        src={Logo}
      />
      <div className='flex flex-row bg-darkslateblue-200 items-center justify-between h-fit mr-7 text-white border-0 text-2xl font-bold cursor-pointer'>
        Login
      </div>
    </div>
  )
}

export default NavBar