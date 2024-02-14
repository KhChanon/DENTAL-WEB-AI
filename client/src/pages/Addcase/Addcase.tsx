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
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>();

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
          <button
            className={`bg-${selectedTreatment === 'ถอนฟัน' ? '[#8660A9]' : '[#BAA5CE]'} text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl w-3/4`}
            onClick={() => setSelectedTreatment('ถอนฟัน')}
          >ถอนฟัน
          </button>
          <button
            className={`bg-${selectedTreatment === 'ผ่าฟันคุด' ? '[#8660A9]' : '[#BAA5CE]'} text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl w-3/4`}
            onClick={() => setSelectedTreatment('ผ่าฟันคุด')}
          >ผ่าฟันคุด
          </button>
          <button
            className={`bg-${selectedTreatment === 'ผ่าตัดเหงือก' ? '[#8660A9]' : '[#BAA5CE]'} text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl w-3/4`}
            onClick={() => setSelectedTreatment('ผ่าตัดเหงือก')}
          >ผ่าตัดเหงือก
          </button>
          <button
            className={`bg-${selectedTreatment === 'ผ่าตัดรากฟันเทียม' ? '[#8660A9]' : '[#BAA5CE]'} text-white cursor-pointer hover:bg-[#8660A9] [border:none] py-[30px] rounded-xl text-xl w-3/4`}
            onClick={() => setSelectedTreatment('ผ่าตัดรากฟันเทียม')}
          >ผ่าตัดรากฟันเทียม
          </button>
          <button className='bg-palevioletred text-white cursor-pointer [border:none] py-[15px] rounded-xl w-1/3 self-center text-xl'>ยืนยัน</button>
        </div>
      </div>
    </div>
  )
}

export default Addcase