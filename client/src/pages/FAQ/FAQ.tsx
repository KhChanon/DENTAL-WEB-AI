import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import ChatMessageBox from '../../components/ChatMessageBox'
import send from '../../assets/send.png'
import axios from 'axios';
import config from '../../config/config.json';
import { ChatMessegeProp } from '../../interface/ChatMessegeProp'
import { UserProp } from '../../interface/UserProp'

const FAQ = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [chat, setChat] = useState<string>("");
  const [allchat, setAllchat] = useState<ChatMessegeProp[]>([]);
  
  const getUser = async () => {
    try{
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const postChat = async () => {
    try{
      if(user === undefined){
        const res = await axios.post(config.API_URL + '/faq/add', {
          question: chat,
          answer : "",
          userID: "",
        });
      }
      else{
        const res = await axios.post(config.API_URL + '/faq/add', {
          question: chat,
          answer : "",
          userID: userID,
        });
      }
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
        userchat: true,
        chattime: new Date(),
        chattext: chat!,
      }]);
      await postChat();
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
      <div className='flex flex-row w-full h-full overflow-hidden'>
        <div className='flex flex-col items-center w-full p-5 px-12 justify-between'>
          <div className='flex flex-col rounded-3xl w-full h-[85%] bg-[#D9D9D9] select-none overflow-auto py-3 gap-2'>
            {
              allchat
              .sort((a:ChatMessegeProp, b:ChatMessegeProp) => a.chattime.getTime() - b.chattime.getTime())
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

export default FAQ