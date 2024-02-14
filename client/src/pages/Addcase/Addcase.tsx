import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import { UserProp } from '../../interface/UserProp';
import axios from 'axios';
import config from '../../config/config.json';


const Addcase = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();

  const getUser = async () => {
    try{
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`userID`)) {
      getUser();
      setAuth(true);
    }
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col'>
      {!auth
      ?
        <NavBar />
      :
      <NavBarLogin {...user!} />
      }
      <div className='flex flex-col h-full item-center justify-start px-[30px] py-[30px] overflow-hidden bg-[#D9D9D9]'>
        <div className='flex flex-col box-border h-full w-full rounded-xl justify-center items-center gap-[15px] py-[25px] px-[50px] bg-white shadow-md'>
          <div className='text-2xl font-bold'>โปรดเลือกการรักษาที่พึ่งได้รับ</div>
          <div className='flex w-3/4 justify-center'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ถอนฟัน'
            />
            <label
              htmlFor='ถอนฟัน'
              className={`bg-lightpurple peer-checked:bg-purple text-white text-center cursor-pointer hover:bg-purple border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ถอนฟัน</label>
          </div>
          <div className='flex w-3/4 justify-center'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ผ่าฟันคุด'
            />
            <label
              htmlFor='ผ่าฟันคุด'
              className={`bg-lightpurple peer-checked:bg-purple text-white text-center cursor-pointer hover:bg-purple border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ผ่าฟันคุด</label>
          </div>
          <div className='flex w-3/4 justify-center'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ผ่าตัดเหงือก'
            />
            <label
              htmlFor='ผ่าตัดเหงือก'
              className={`bg-lightpurple peer-checked:bg-purple text-white text-center cursor-pointer hover:bg-purple border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ผ่าตัดเหงือก</label>
          </div>
          <div className='flex w-3/4 justify-center'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ผ่าตัดรากฟันเทียม'
            />
            <label
              htmlFor='ผ่าตัดรากฟันเทียม'
              className={`bg-lightpurple peer-checked:bg-purple text-white text-center cursor-pointer hover:bg-purple border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ผ่าตัดรากฟันเทียม</label>
          </div>
          <button className='bg-palevioletred active:bg-[#e875a5] text-white cursor-pointer border-none py-[15px] rounded-xl w-1/3 self-center text-xl select-none'>ยืนยัน</button>
        </div>
      </div>
    </div>
  )
}

export default Addcase