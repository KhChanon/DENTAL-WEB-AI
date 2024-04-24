import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import InfoItem from './components/InfoItem'
import axios from 'axios';
import config from '../../config/config';
import { UserProp } from '../../interface/UserProp'
import PlusIcon from '../../assets/plus-solid.svg';
import DefaultPP from '../../assets/Default_PP.png'
import { RecordProp } from '../../interface/RecordProp'

const Patientinfo = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [records, setRecords] = useState<RecordProp[]>([]);

  const getRecords = async () => {
    try {
      const res = await axios.get(config.API_URL + '/users/' + userID + '/records');

      res.data.records.forEach((record:RecordProp) => {
        record.surgicaldate = new Date(record.surgicaldate);
      });
      setRecords(res.data.records);

    } catch (error) {
      console.error(error);
    }
  }

  const getUser = async () => {
    try {
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`userID`)) {
      getUser();
      getRecords();
      setAuth(true);
    }
  }, []);

  return (
    <div className="relative bg-whitesmoke w-full h-screen overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[13.81rem] box-border gap-[2.75rem] tracking-[normal">
      {!auth
        ?
        <NavBar />
        :
        <NavBarLogin {...user!} />
      }
      <div className="w-[62.5rem] flex flex-col items-start justify-start py-[0rem] px-[1.25rem] box-border gap-[1.88rem] max-w-full text-left text-[4rem] text-black font-red-hat-display">
        <div className="flex flex-row items-center justify-start gap-[3.13rem] max-w-full mq700:flex-wrap mq700:gap-[1.56rem]">
          <img
            className="h-[9.38rem] w-[9.38rem] relative rounded-[50%] object-cover"
            loading="eager"
            alt=""
            src={user?.lineprofilepicture ? user?.lineprofilepicture : DefaultPP}
          />
          <div className="m-0 h-[5.31rem] relative text-inherit font-bold font-inherit flex items-center max-w-full mq450:text-[2.38rem] mq950:text-[3.19rem]">
            {user?.lineusername}
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] max-w-full text-[2rem] text-darkslateblue-200">
          <div className="self-stretch flex flex-row items-center justify-between py-[0rem] px-[1.25rem]">
            <b className="w-[25.5rem] relative flex items-center h-[2.94rem] shrink-0">
              ประวัติการรักษา
            </b>
            <div className="w-[4.13rem] relative h-[2.08rem] text-center text-[1.5rem]"onClick={() => {window.location.href = '/addcase'}}>
              
              <img
                className="cursor-pointer select-none w-[20px] h-[20px] bg-[#a12d72] py-[10px] px-[25px] rounded-lg"
                alt=""
                src={PlusIcon}
                />
              
            </div>
          </div>
          <div className="self-stretch rounded-xl max-h-[26.5rem] bg-colors-white-white flex flex-col items-start justify-start p-[1.88rem] box-border gap-[0.94rem] max-w-full text-xl text-black mq450:pt-[1.25rem] mq450:pb-[1.25rem] mq450:box-border">
            <div className="w-[57.38rem] flex flex-row items-start justify-start gap-[85px] max-w-full mq450:flex-wrap">
              <div className="relative font-extrabold w-[157px]">Record ID</div>
              <div className="relative font-extrabold w-[105px]">วันที่</div>
              <div className="relative font-extrabold w-[140px]">ศัลยกรรม</div>
              <div className="h-[1.19rem] relative font-extrabold flex items-center">
                สถานะ
              </div>
            </div>
            <div className="w-[57.06rem] h-[0.06rem] relative box-border max-w-full border-t-[1px] border-solid border-black" />
            <div className="w-full flex flex-col items-start justify-start gap-[0.94rem] max-w-full overflow-y-auto overscroll-x-none pb-2">
              {
              records
              .sort((a:RecordProp, b:RecordProp) => b.surgicaldate.getTime() - a.surgicaldate.getTime())
              .map((record:RecordProp) => {
                  return <InfoItem key={record._id} {...record} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Patientinfo