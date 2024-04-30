import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../config/config';
import { RecordProp, StatusOrder } from '../../interface/RecordProp';
import { UserProp } from '../../interface/UserProp'
import NavBarLogin from '../../components/NavBarLogin';
import NavBar from '../../components/NavBar';
import PlusIcon from '../../assets/plus-solid.svg';
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const RecordCard: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, surgicalresult}) => {
  const day: number = surgicaldate.getDate();
  const month: number = surgicaldate.getMonth()+1;
  const year: number = surgicaldate.getFullYear();
 // Format the date
  const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

  return (
    <button 
      className="flex flex-col w-full h-full rounded-xl bg-[#499896] p-5 cursor-pointer items-start border-none disabled:bg-[#f90000] disabled:opacity-50 disabled:hover:bg-[#f90000] disabled:hover:opacity-50 disabled:cursor-not-allowed iphone:max-h-48" 
      disabled={surgicalstatus === "Follow Up" ? true : false}
      onClick={() => window.location.href = `/followup/${_id}`}
    >
      <div className="w-full flex flex-row text-xl text-white font-bold mb-1 text-left justify-between iphone:text-base">{surgicalprocedure} {surgicalstatus == "Pending" ? <MdOutlinePendingActions/>:<IoCheckmarkCircleOutline/>}</div>
      <div className="text-sm text-white font-bold mb-5 iphone:font-medium">{formattedDate}</div>
      <div className="text-left text-base text-white font-bold mb-5 iphone:text-sm">สถานะ: {surgicalstatus}</div>
      <div className="text-base text-white font-bold text-left iphone:text-sm">{surgicalstatus == "Pending" ? "กรุณาทำฟอร์มนี้" :"คุณทำฟอร์มนี้ไปแล้ว ค่อยกลับมาทำในวันถัดไป" }</div>
    </button>
  )
}

const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
}

const Followup = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [records, setRecords] = useState<RecordProp[]>([]);


  const getRecords = async () => {
    try {
        const res = await axios.get(config.API_URL + '/users/' + userID + '/records/notdone');

        res.data.records.forEach((record:RecordProp) => {
        record.surgicaldate = new Date(record.surgicaldate);
        });
        setRecords(res.data.records);
    } catch (error) {
        console.error(error);
    }
    }
    
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
        getRecords()
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
        <div className='grid grid-cols-5 grid-rows-3 box-border rounded-xl p-2 h-full w-full justify-center items-center gap-[15px] py-[25px] px-[50px] bg-white shadow-md overflow-auto iphone:flex iphone:flex-col iphone:items-start iphone:justify-start'>
          <button className='flex flex-col gap-5 w-full h-full iphone:max-h-32 rounded-xl bg-[#25597e] p-5 cursor-pointer select-none items-center justify-center border-none' onClick={() => {window.location.href='/addcase'}}>
            <img
              className="=w-[50px] h-[50px] bg-[#25597e] iphone:w-[25px] iphone:h-[25px]"
              alt=""
              src={PlusIcon}
            />    
          </button>
          {
              records.sort((a: RecordProp, b: RecordProp) => {
                const statusOrder:StatusOrder = {
                  'Pending': 1,
                  'Follow Up': 2,
                  'Done': 3,
                };
            
                const orderA = statusOrder[a.surgicalstatus];
                const orderB = statusOrder[b.surgicalstatus];
            
                if (orderA !== orderB) {
                  return orderA - orderB;
                } else {
                  return b.surgicaldate.getTime() - a.surgicaldate.getTime();
                }
              })
              .map((record: RecordProp) => {
                return <RecordCard key={record._id} {...record} />;
              })
            }
        </div>
      </div>
    </div>
  )
}

export default Followup