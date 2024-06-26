import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import ChatMessageBox from '../../components/ChatMessageBox'
import send from '../../assets/send.png'
import axios from 'axios';
import config from '../../config/config';
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

  const postChat = async (answer:String) => {
    try{
      if(user === undefined){
        const res = await axios.post(config.API_URL + '/faq/add', {
          question: chat,
          answer : answer,
          userID: "",
        });
      }
      else{
        const res = await axios.post(config.API_URL + '/faq/add', {
          question: chat,
          answer : answer,
          userID: userID,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getAnswer = async () => {
    try{
      const res = await axios.post(config.MODEL_URL+'/predict', {
        question: chat,
      });
      setAllchat([...allchat,{
        userchat: true,
        chattime: new Date(),
        chattext: chat,
      },{
        userchat: false,
        chattime: new Date(),
        chattext: res.data.answer,
      }]);
      postChat(res.data.answer);
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
      getAnswer();
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem('userID')) {
      getUser();
      setAuth(true);
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, []);
  
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      {!auth
      ?
      <NavBar />
      :
      <NavBarLogin {...user!} />
      }
      <div className='flex flex-row w-full h-full overflow-hidden bg-[#EFEFEF]'>
        <div className='flex flex-col items-center w-full p-5 px-12 justify-between iphone:px-6'>
          <div className='flex flex-col rounded-3xl w-full h-[85%] bg-white select-none overflow-auto py-3 gap-2 iphone:h-[89%]'>
            {
              allchat
              .sort((a:ChatMessegeProp, b:ChatMessegeProp) => a.chattime.getTime() - b.chattime.getTime())
              .map((chat:ChatMessegeProp,idx:number) => {
                return <ChatMessageBox key={idx} {...chat}/>
              })
            }
          </div>
          <form className='flex rounded-3xl w-full h-[8%] bg-[#21294C] items-center select-none iphone:h-[6%]'>
            <input 
              className='w-full h-full bg-[transparent] text-white text-xl pl-5 border-none rounded-4xl iphone:text-base iphone:outline-none' 
              placeholder='Type your message here...'
              value={chat}
              required
              onChange={(e) => setChat(e.target.value)}
              onKeyDown={handleKeypress}
            />
            <img 
              className='w-8 h-8 pr-3 iphone:w-5 iphone:h-5' src={send} alt='send'
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default FAQ