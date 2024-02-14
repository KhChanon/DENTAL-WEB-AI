import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../config/config.json';
import { RecordProp } from '../../interface/RecordProp';
import { UserProp } from '../../interface/UserProp'
import NavBarLogin from '../../components/NavBarLogin';
import NavBar from '../../components/NavBar';

const RecordCard: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, surgicalresult}) => {  
  const day: number = surgicaldate.getDate();
  const month: number = surgicaldate.getMonth()+1;
  const year: number = surgicaldate.getFullYear();
 // Format the date
  const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

  return (
    <div 
      className="flex flex-col gap-5 w-52 h-52 rounded-xl bg-stone-700 p-5 cursor-pointer items-start" 
      onClick={() => window.location.href = `/followup/${_id}`}
    >
      <div className="text-base text-white font-bold">{surgicalprocedure}</div>
      <div className="text-base text-white font-bold">{formattedDate}</div>
      <div className="text-base text-white font-bold">{surgicalstatus}</div>
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
      <div className='grid grid-cols-5 w-full h-full overflow-hidden gap-4 place-items-center'>
        {records.map((record: RecordProp) => {
          return <RecordCard {...record} key={record._id} />
        })}
      </div>
    </div>
  )
}

export default Followup