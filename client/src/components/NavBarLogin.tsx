import React,{useState} from 'react'
import Logo from '../assets/Logo.svg'
import Default_PP from '../assets/Default_PP.png'
import { UserProp } from '../interface/UserProp'

const NavBarLogin: React.FC<UserProp> = ({ _id, lineopenid, lineusername, lineprofilepicture, lineemail }) => {
    
  const handleLogout = () => {
    localStorage.removeItem('userID');
    window.location.href = '/';
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-darkslateblue-200 flex flex-row items-center justify-between w-screen h-12 py-2 select-none">
      <div className='flex flex-row h-12 items-center'>
        <img
          className="flex h-full pr-4 ml-5 mr-2 border-solid border-y-0 border-l-0 border-r-[1px] border-white iphone:h-[75%]"
          alt=""
          src={Logo}
          onClick={() => {window.location.href = '/'}}
        />
        <div className='flex flex-row text-2xl font-semibold text-white cursor-pointer ml-6 gap-10 align-middle iphone:text-xl iphone:gap-6 iphone:ml-3'>
          <div 
            onClick={() => {window.location.href = '/faq'}}
          >FAQ</div>
          <div 
            onClick={() => {window.location.href = '/followup'}}
          >Follow-Up</div>
        </div>
      </div>
      <div className='flex flex-row bg-darkslateblue-200 items-center justify-between h-fit mr-7 text-white border-0 text-2xl font-bold cursor-pointer gap-4' onClick={toggleDropdown}>
        <img
          className="flex h-12 w-12 rounded-full cursor-pointer select-none iphone:h-8 iphone:w-8"
          alt=""
          src={lineprofilepicture ? lineprofilepicture : Default_PP}
          
        />
        <div className='iphone:hidden'>{lineusername}</div>
      </div>
      {/* <button onClick={toggleDropdown}>drop</button> */}
      {isOpen && (
        <div className="z-[999] absolute top-16 right-0 bg-opacity-80 bg-darkslateblue-200 w-auto rounded-bl-4xl">
          <div className='flex flex-col gap-[15px] px-[30px] py-[15px] text-white text-center'>
            <a href="/patientinfo" className="font-bold text-white no-underline cursor-pointer">View Profile</a>
            <b className=" hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Log out</b>
            {/* Add more dropdown items as needed */}
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBarLogin