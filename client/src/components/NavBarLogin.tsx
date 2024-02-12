import React from 'react'
import Logo from '../assets/Logo.svg'
import { UserProp } from '../interface/UserProp'

const NavBarLogin: React.FC<UserProp> = ({ _id, lineopenid, lineusername, lineprofilepicture, lineemail }) => {
    
  const handleLogout = () => {
    localStorage.removeItem('userID');
    window.location.href = '/';
  }

  return (
    <div className="bg-darkslateblue-200 flex flex-row items-center justify-between w-screen h-12 py-2 select-none">
      <div className='flex flex-row h-12 items-center'>
        <img
          className="flex h-full pr-4 ml-5 mr-2 border-solid border-y-0 border-l-0 border-r-[1px] border-white"
          alt=""
          src={Logo}
          onClick={() => {window.location.href = '/'}}
        />
        <div className='flex flex-row text-2xl font-semibold text-white cursor-pointer ml-6 gap-10 align-middle'>
          <div 
            onClick={() => {window.location.href = '/faq'}}
          >FAQ</div>
          <div 
            onClick={() => {window.location.href = '/followup'}}
          >Follow-Up</div>
        </div>
      </div>
      <div className='flex flex-row bg-darkslateblue-200 items-center justify-between h-fit mr-7 text-white border-0 text-2xl font-bold cursor-pointer gap-4'>
        <img
          className="flex h-12 w-12 rounded-full cursor-pointer select-none"
          alt=""
          src={lineprofilepicture}
          onClick={handleLogout}
        />
        <div onClick={() => {window.location.href = '/patientinfo'}}>{lineusername}</div>
      </div>
    </div>
  )
}

export default NavBarLogin