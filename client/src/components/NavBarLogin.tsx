import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'

const NavBarLogin = (user:any) => {
    
  const handleLogout = () => {
    localStorage.removeItem('userID');
    window.location.href = '/';
  }

  return (
    <div className="bg-darkslateblue-200 flex flex-row items-center justify-between w-screen h-20 py-2 select-none">
      <img
        className="flex h-full ml-5"
        alt=""
        src={Logo}
        onClick={() => {window.location.href = '/'}}
      />
      <div className='flex flex-row bg-darkslateblue-200 items-center justify-between h-fit mr-7 text-white border-0 text-2xl font-bold cursor-pointer gap-4'>
        <img
          className="flex h-12 w-12 rounded-full cursor-pointer select-none"
          alt=""
          src={user.user?.lineprofilepicture}
          onClick={handleLogout}
        />
        <div>{user.user?.lineusername}</div>
      </div>
    </div>
  )
}

export default NavBarLogin