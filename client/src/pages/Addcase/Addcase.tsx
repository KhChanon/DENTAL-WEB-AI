import React from 'react'
import NavBar from '../../components/NavBar'

const Addcase = () => {
  return (
    <div className='h-screen'>
        <NavBar/>
    <div className='flex flex-col item-center justify-start px-[30px] py-[30px] overflow-hidden bg-[#D9D9D9]'>
      <div className='flex flex-col w-full h-auto box-border rounded-xl justify-center item-center gap-[15px] py-[25px] px-[50px] bg-white shadow-md'>
        <div className='self-center text-2xl font-bold'>โปรดเลือกการรักษาที่พึ่งได้รับ</div>
        <button className='bg-[#BAA5CE] text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl'>ถอนฟัน</button>
        <button className='bg-[#BAA5CE] text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl'>ผ่าฟันคุด</button>
        <button className='bg-[#BAA5CE] text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl'>ผ่าตัดเหงือก</button>
        <button className='bg-[#BAA5CE] text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl'>ผ่าตัดรากฟันเทียม</button>
        <button className='bg-palevioletred text-white cursor-pointer [border:none] py-[15px] rounded-xl w-1/3 self-center'>ยืนยัน</button>
      </div>
    </div>
    </div>
  )
}

export default Addcase