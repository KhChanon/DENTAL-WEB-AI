import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import ChatMessageBox from '../../components/ChatMessageBox'
import send from '../../assets/send.png'
import axios from 'axios';
import config from '../../config/config.json';

const FAQ = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<any>();
  
  const getUser = () => {
    axios.get(config.API_URL + '/users/' + userID)
    .then(res => {
      setUser(res.data.user);
      return res.data.user;
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
    <div className='w-screen h-screen flex flex-col'>
      {!auth
      ?
      <NavBar />
      :
      <NavBarLogin user={user} />
      }
      <div className='flex flex-row w-full h-full'>
        <div className='flex flex-col items-center w-full p-5 px-12 justify-between'>
          <div className='flex rounded-4xl w-1/4 h-16 bg-[#423C3C] select-none text-white font-semibold text-xl items-center pl-1'>
            <div className="flex w-[49.25%] h-[87.5%] rounded-4xl items-center justify-center  bg-[#8F8787]">
              FAQ
            </div>
            <div 
              className="flex w-[49.25%] h-[87.5%] rounded-4xl items-center justify-center cursor-pointer"
              onClick={() => {window.location.href = '/followup'}}
            >
              Follow-Up
            </div>
          </div>
          <div className='flex flex-col rounded-3xl w-full h-[70%] bg-[#D9D9D9] select-none overflow-auto py-3 gap-2'>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={true} TimeStamp={new Date()} Text={"aasdsdffffffdsdffff  fffffffss dfffffffdsfsdfsdffff ffffffsdfsd fsdfffffff233 3333333333 3333333dddddddd ddddddddsdff dfsdfdssfdsfdsfdfs dfsddddddddddddd dddasdsd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={false} TimeStamp={new Date()} Text={"adsasd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={true} TimeStamp={new Date()} Text={"asdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
            <ChatMessageBox FollowUpChatID={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"} RecordID={"1"}/>
          </div>
          <div className='flex rounded-3xl w-full h-[8%] bg-[#21294C] items-center select-none'>
            <input className='w-full h-full bg-[transparent] text-white text-xl pl-5 border-none rounded-4xl' placeholder='Type your message here...'/>
            <img className='w-8 h-8 pr-3' src={send} alt='send'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ