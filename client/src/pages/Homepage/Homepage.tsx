import React from 'react'
import NavBar from '../../components/NavBar'
import BgImage from '../../assets/Homepage_Bg.png'

const Homepage = () => {
  return (
    <div className="bg-cover h-screen" style={{ backgroundImage: `url(${BgImage})` }}>
      <NavBar />
        <div className="absolute top-1/3 flex-col pl-10 w-[28.125rem]">
          <div className="text-4xl font-bold text-white">ORAL AI</div>
          <div className="text-xl text-white">lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet</div>
          <div className = "flex flex-row gap-8 item-start"> 
            <button className="bg-purple text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md">เริ่มสนทนา</button>
            <button className="bg-green text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md">เข้าสู่ระบบผ่าน LINE</button>
          </div>
        </div>
    </div>
  )
}

export default Homepage