import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../config/config.json';
import { RecordProp } from '../../interface/RecordProp';
import { UserProp } from '../../interface/UserProp'
import NavBarLogin from '../../components/NavBarLogin';
import NavBar from '../../components/NavBar';
import PlusIcon from '../../assets/plus-solid.svg';

const RecordCard: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, surgicalresult}) => {
  const day: number = surgicaldate.getDate();
  const month: number = surgicaldate.getMonth()+1;
  const year: number = surgicaldate.getFullYear();
 // Format the date
  const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

  return (
    <div 
      className="flex flex-col w-56 h-48 rounded-xl bg-purple p-5 cursor-pointer items-start" 
      onClick={() => window.location.href = `/followup/${_id}`}
    >
      <div className="text-xl text-white font-bold mb-1">{surgicalprocedure}</div>
      <div className="text-sm text-white font-bold mb-5">{formattedDate}</div>
      <div className="text-base text-white font-bold mb-5">Status: {surgicalstatus}</div>
      <div className="text-base text-white font-bold">{surgicalresult ? surgicalresult :"This surgery is still being Follow Up" }</div>
    </div>
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
    <div className='w-screen h-screen flex flex-col'>
      {!auth
      ?
        <NavBar />
      :
      <NavBarLogin {...user!} />
      }
      <div className='flex flex-col h-full item-center justify-start px-[30px] py-[30px] overflow-hidden bg-[#D9D9D9]'>
        <div className='grid grid-cols-5 box-border rounded-xl p-2 h-full w-full justify-center items-center gap-[15px] py-[25px] px-[50px] bg-white shadow-md overflow-auto'>
          <div className='flex flex-col gap-5 w-56 h-48 rounded-xl bg-[#a12d72] p-5 cursor-pointer select-none items-center justify-center' onClick={() => {window.location.href='/addcase'}}>
            <img
              className="=w-[50px] h-[50px] bg-[#a12d72]"
              alt=""
              src={PlusIcon}
            />    
          </div>
          {records
          .sort((a:RecordProp, b:RecordProp) => b.surgicaldate.getTime() - a.surgicaldate.getTime())
          .map((record: RecordProp) => {
            return <RecordCard {...record} key={record._id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Followup