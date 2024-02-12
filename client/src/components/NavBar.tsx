import React from 'react'
import Logo from '../assets/Logo.svg'
import config from '../config/config.json';

const NavBar = () => {

  const handleLineLogin = async () => {
    const state = Math.random().toString(36).substring(2, 15) +Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 10);

    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URL}&state=${state}&scope=${config.SCOPE}`;
  }

  return (
    <div className="bg-darkslateblue-200 flex flex-row items-center justify-between w-screen h-20 py-2 select-none">
      <img
        className="flex h-full ml-5"
        alt=""
        src={Logo}
        onClick={() => {window.location.href = '/'}}
      />
      <div className='flex flex-row bg-darkslateblue-200 items-center justify-between h-fit mr-7 text-white border-0 text-2xl font-bold cursor-pointer select-none'
        onClick={handleLineLogin}
      >
        Login
      </div>
    </div>
  )
}

export default NavBar