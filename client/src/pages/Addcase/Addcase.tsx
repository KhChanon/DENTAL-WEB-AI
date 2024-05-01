import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import { UserProp } from '../../interface/UserProp';
import axios from 'axios';
import config from '../../config/config';


const Addcase = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [surgicalprocedure, setSurgicalprocedure] = useState<string>('');

  const getUser = async () => {
    try{
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const addFollowCase = async () => {
    try {
      const res = await axios.post(config.API_URL + '/users/addrecord', {
        surgicalprocedure: surgicalprocedure,
        surgicalstatus: 'Pending',
        userID: userID
      });
      window.location.href = '/followup';
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
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      {!auth
      ?
        <NavBar />
      :
      <NavBarLogin {...user!} />
      }
      <div className='flex flex-col h-full item-center justify-start px-[30px] py-[30px] overflow-hidden bg-[#EFEFEF]'>
        <div className='flex flex-col box-border h-full w-full rounded-xl justify-between items-center gap-[15px] py-[25px] px-[50px] bg-white shadow-md iphone:px-[10px] iphone:text-sm'>
          <div className='text-2xl font-bold iphone:text-xl'>โปรดเลือกการรักษาที่พึ่งได้รับ</div>
          <div className='flex w-3/4 justify-center iphone:w-full'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ถอนฟัน'
            />
            <label
              onClick={() => setSurgicalprocedure('ถอนฟัน')}
              htmlFor='ถอนฟัน'
              className={`bg-[#25597e] opacity-50 peer-checked:opacity-100 text-white text-center cursor-pointer hover:opacity-100 border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ถอนฟัน</label>
          </div>
          <div className='flex w-3/4 justify-center iphone:w-full'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ผ่าฟันคุด'
            />
            <label
              onClick={() => setSurgicalprocedure('ผ่าฟันคุด')}
              htmlFor='ผ่าฟันคุด'
              className={`bg-[#25597e] opacity-50 peer-checked:opacity-100 text-white text-center cursor-pointer hover:opacity-100 border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ผ่าฟันคุด</label>
          </div>
          <div className='flex w-3/4 justify-center iphone:w-full'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ผ่าตัดเหงือก'
            />
            <label
              onClick={() => setSurgicalprocedure('ผ่าฟันฟันคุด')}
              htmlFor='ผ่าตัดเหงือก'
              className={`bg-[#25597e] opacity-50 peer-checked:opacity-100 text-white text-center cursor-pointer hover:opacity-100 border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ผ่าตัดเหงือก</label>
          </div>
          <div className='flex w-3/4 justify-center iphone:w-full'>
            <input
              className='peer hidden'
              name='การรักษา'
              type='radio'
              id='ผ่าตัดรากฟันเทียม'
            />
            <label
              onClick={() => setSurgicalprocedure('ผ่าตัดรากฟันเทียม')}
              htmlFor='ผ่าตัดรากฟันเทียม'
              className={`bg-[#25597e] opacity-50 peer-checked:opacity-100  text-white text-center cursor-pointer hover:opacity-100 border-none py-[30px] rounded-xl text-xl w-3/4 select-none`}
            >ผ่าตัดรากฟันเทียม</label>
          </div>
          <button 
            className='disabled bg-[#1d435f] active:bg-[#153449] text-white cursor-pointer border-none py-[15px] rounded-xl w-1/3 self-center text-xl select-none disabled:bg-slate-400 disabled:cursor-default iphone:w-1/2'
            disabled={surgicalprocedure === '' ? true : false} 
            onClick={addFollowCase}
          >ยืนยัน</button>
        </div>
      </div>
    </div>
  )
}

export default Addcase