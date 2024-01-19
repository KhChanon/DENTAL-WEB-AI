import React from 'react'

const NavBar = () => {
  return (
    <div className="absolute top-[0rem] left-[0rem] bg-darkslateblue-200 overflow-hidden flex flex-row items-start justify-start py-[1.25rem] px-[1.88rem]">
        <div className="flex flex-row items-center justify-start gap-[76.63rem]">
          <img
            className="relative w-[5.55rem] h-[3.13rem] object-cover"
            alt=""
            src="/output-image1@2x.png"
          />
          <div className="w-[4.06rem] flex flex-row items-center justify-between">
            <div className="relative font-semibold">Login</div>
          </div>
        </div>
      </div>
  )
}

export default NavBar