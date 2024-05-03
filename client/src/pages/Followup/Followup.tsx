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
    <button className='flex flex-col w-full h-full bg-white outline-none border-none iphone:max-h-48  disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed'
      id={`RecordCard${_id}`}
      disabled={surgicalstatus === "Follow Up" ? true : false}
      onClick={() => window.location.href = `/followup/${_id}`}
    >
      <img src={surgicalprocedure === "ถอนฟัน" ? "https://tu.ac.th/uploads/news-tu/news/2566/oct/66-1349r.jpg" :
        (surgicalprocedure === "ผ่าฟันคุด" ? "https://www.smiledelightclinic.com/wp-content/uploads/2023/08/wisdom-tooth-768x553.jpg" :
          (surgicalprocedure === "ผ่าตัดเหงือก" ? "https://media.istockphoto.com/id/998246150/fi/vektori/s%C3%B6p%C3%B6-sarjakuvahammashahmo-jolla-on-purukumiongelma.jpg?s=612x612&w=0&k=20&c=zfJMQm8-ZB3Prw2eE4AijftQyRHXQbmm8_7_hW8SXG0=" :
            "https://www.si.mahidol.ac.th/sidoctor/sirirajonline2021/Article_images/1482_0.jpg" 
          ) 
        )
      } 
        alt="plus" 
        className='object-cover w-full h-2/3 rounded-t-xl'/>
      <div className={`flex flex-row w-full h-1/3 rounded-b-xl ${surgicalstatus === "Follow Up" ? "bg-[#f90000]" : "bg-[#5cc9c6]"} cursor-pointer items-start justify-between`} >
        <div className='flex flex-col w-3/4 h-full rounded-b-xl cursor-pointer items-start justify-between'>
          <div className="w-full flex flex-row text-base text-white font-bold mb-1 text-left justify-between iphone:text-base pt-2 px-5">{surgicalprocedure}</div>
          <div className="text-sm text-white font-bold mb-5 iphone:font-medium px-5">{formattedDate}</div>
        </div>
        <div className='flex text-white w-1/4 h-full text-3xl justify-center items-center'>
          {surgicalstatus == "Pending" ? <MdOutlinePendingActions/>:<IoCheckmarkCircleOutline/>}
        </div>
      </div>
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
      else{
        setAuth(false);
        window.location.href = '/';
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