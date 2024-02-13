import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import send from '../../assets/send.png'
import ChatListBox from './components/ChatListBox'
import ChatMessageBox from '../../components/ChatMessageBox'
import config from '../../config/config.json';
import { ChatMessegeProp } from '../../interface/ChatMessegeProp';
import { RecordProp } from '../../interface/RecordProp';
import { UserProp } from '../../interface/UserProp'
import PlusIcon from '../../assets/plus-solid.svg';

const Followup:React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [chat, setChat] = useState<string>("");
  const [allchat, setAllchat] = useState<ChatMessegeProp[]>([]);
  const [records, setRecords] = useState<RecordProp[]>([]);

  const data:RecordProp[] = [
    {
      RecordID: "1",
      TimeStamp: new Date(),
      SurgicalProcedure: "sad",
      Status: "sad",
      ChatMessesge: "sad"
    },
    {
      RecordID: "2",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery2",
      Status: "completed",
      ChatMessesge: "Hello, how are you?"
    },
    {
      RecordID: "3",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery3",
      Status: "in progress",
      ChatMessesge: "Hey, how's it going?"
    },
    {
      RecordID: "4",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery4",
      Status: "completed",
      ChatMessesge: "Good job!"
    },
    {
      RecordID: "5",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery5",
      Status: "in progress",
      ChatMessesge: "Almost done!"
    },
    {
      RecordID: "6",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery6",
      Status: "completed",
      ChatMessesge: "Great job!"
    },
    {
      RecordID: "7",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery7",
      Status: "in progress",
      ChatMessesge: "Keep up the good work!"
    },
    {
      RecordID: "8",
      TimeStamp: new Date(),
      SurgicalProcedure: "surgery8",
      Status: "completed",
      ChatMessesge: "You're doing amazing!"
    }
  ]
  
  const getUser = async () => {
    try{
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const handleKeypress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if(chat === ""){
      console.log("string empty")
    }
    else{
      setChat("");
      setAllchat([...allchat, {
        UserChat: true,
        TimeStamp: new Date(),
        Text: chat!,
      }]);
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem(`userID`)) {
      getUser();
      setRecords(data)
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
      <div className='flex flex-row w-full h-full overflow-hidden'>
        <div className="flex flex-col items-center justify-center w-1/5 py-5 pl-12 select-none">
          <div className='flex flex-col rounded-3xl h-full w-full bg-[#D9D9D9] py-3 gap-2 justify-start items-center overflow-auto'>
            <div 
              className="flex flex-col items-center justify-center w-[85%] px-3 min-h-16 bg-[#A12D72] rounded-[30px] text-center text-white font-medium text-base cursor-pointer"
              onClick={() => {window.location.href = '/addcase'}}
            >
                <img
                className="cursor-pointer select-none w-[25px]"
                alt=""
                src={PlusIcon}
              />
            </div>
            {
            records
            .sort((a:RecordProp, b:RecordProp) => a.TimeStamp.getTime() - b.TimeStamp.getTime())
            .map((record:RecordProp) => {
                return <ChatListBox key={record.RecordID} {...record} />
              })
            }
          </div>
        </div>
        <div className='flex flex-col items-center w-4/5 p-5 px-12 justify-between'>
          <div className='flex flex-col rounded-3xl w-full h-[85%] bg-[#D9D9D9] select-none overflow-auto py-3 gap-2'>
            {
              allchat
              .sort((a:ChatMessegeProp, b:ChatMessegeProp) => a.TimeStamp.getTime() - b.TimeStamp.getTime())
              .map((chat:ChatMessegeProp,idx:number) => {
                return <ChatMessageBox key={idx} {...chat}/>
              })
            }
          </div>
          <form className='flex rounded-3xl w-full h-[8%] bg-[#21294C] items-center select-none'>
          <input 
              className='w-full h-full bg-[transparent] text-white text-xl pl-5 border-none rounded-4xl' 
              placeholder='Type your message here...'
              value={chat}
              required
              onChange={(e) => setChat(e.target.value)}
              onKeyDown={handleKeypress}
            />
            <img 
              className='w-8 h-8 pr-3' src={send} alt='send'
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Followup