import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import Meow from '../../assets/meow.png'
import InfoItem from './components/InfoItem'
import axios from 'axios';
import config from '../../config/config.json';

const Patientinfo = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<any>();

  const getUser = () => {
    axios.get(config.API_URL + '/users/user/' + userID)
    .then(res => {
      setUser(res.data.user);
    })
    .catch(error => {
        console.error(error);
    });
  }
  
  useEffect(() => {
    if (localStorage.getItem(`userID`)) {
      getUser();
      setAuth(true);
    }
  }, []);
  
  return (
    <div className="relative bg-whitesmoke w-full h-screen overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[13.81rem] box-border gap-[2.75rem] tracking-[normal">
      {!auth
      ?
      <NavBar />
      :
      <NavBarLogin user={user} />
      }
      <section className="w-[63.5rem] flex flex-col items-start justify-start py-[0rem] px-[1.25rem] box-border gap-[1.88rem] max-w-full text-left text-[2rem] text-black">
        <div className="flex flex-row items-center justify-start gap-[3.13rem] max-w-full">
          <img
            className="relative rounded-[50%] w-[9.38rem] h-[9.38rem] object-cover"
            loading="eager"
            alt=""
            src={Meow}
          />
          <div className="m-0 relative text-inherit font-bold font-inherit flex items-center max-w-full">
            Meow Moew Sean
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] max-w-full text-[1.5rem] text-darkslateblue-200">
          <h1 className="m-0 relative text-inherit font-bold font-inherit flex items-center w-[25.56rem] h-[2.94rem] shrink-0 max-w-full">
            ประวัติการรักษา
          </h1>
          <div className="self-stretch rounded-xl bg-colors-white-white flex flex-col items-start justify-start p-[1.88rem] box-border gap-[0.94rem] max-w-full text-[20px] text-black">
            <div className="w-[45.38rem] flex flex-row items-start gap-[85px] max-w-full">
              <div className="font-extrabold w-fit">Record ID</div>
              <div className="font-extrabold w-[8.613rem]">วันที่</div>
              <div className="font-extrabold w-[8.613rem]">ศัลยกรรม</div>
              <div className="font-extrabold">สถานะ</div>
            </div>
            <div className="relative box-border w-[57.06rem] h-[0.06rem] max-w-full border-t-[1px] border-solid border-black" />
              <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
              <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
              <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
              <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
              <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Patientinfo