import React from 'react'
import NavBar from '../../components/NavBar'
import send from '../../assets/send.png'
import ChatListBox from './components/ChatListBox'
import ChatMessageBox from './components/ChatMessageBox'

const tempChat = {
  id: 1,
  name: "John Doe",
  messages: [
    {
      id: 1,
      message: "how are you?",
      sender: "AI",
      dateTime: "2021-01-01 12:00",
      chatListID: 1
    },
    {
      id: 2,
      message: "I'm fine, thanks",
      sender: "John Doe",
      dateTime: "2021-01-01 12:01",
      chatListID: 1
    },
    {
      id: 3,
      message: "how about you?",
      sender: "John Doe",
      dateTime: "2021-01-01 12:01",
      chatListID: 1
    },
    {
      id: 4,
      message: "I'm fine too",
      sender: "AI",
      dateTime: "2021-01-01 12:01",
      chatListID: 1
    },
    {
      id: 5,
      message: "Hi how is the wound?",
      sender: "AI",
      dateTime: "2021-01-01 12:01",
      chatListID: 2
    },
    {
      id: 6,
      message: "It's fine",
      sender: "John Doe",
      dateTime: "2021-01-01 12:01",
      chatListID: 2
    },
    {
      id: 7,
      message: "That's good",
      sender: "AI",
      dateTime: "2021-01-01 12:01",
      chatListID: 2
    }
  ]
}


const chatListItem = [
  {
    id: 1,
    title: "wisdom tooth removal",
    dateTime: "2021-01-01 12:00",
    status: "pending",
    customer: "John Doe",
  },
  {
    id: 2,
    title: "wisdom tooth removal",
    dateTime: "2021-02-03 02:00",
    status: "pending",
    customer: "john doe"
  }
]

const Followup:React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <NavBar/>
      <div className='flex flex-row w-full h-full'>
        <div className="flex flex-col items-center justify-center w-1/5 p-5 pl-8 select-none">
          <div className='flex flex-col rounded-3xl h-full w-full bg-[#D9D9D9] py-2 gap-2 justify-start items-center'>
            <ChatListBox FollowUpId={"1"} Title={"wisdom tooth removal"} TimeStamp={new Date()} ChatID={'asd'} ChatResult={"asd"}/>
            <ChatListBox FollowUpId={"1"} Title={"wisdom tooth removal"} TimeStamp={new Date()} ChatID={'asd'} ChatResult={"asd"}/>
            <ChatListBox FollowUpId={"1"} Title={"wisdom tooth removal"} TimeStamp={new Date()} ChatID={'asd'} ChatResult={"asd"}/>
            <ChatListBox FollowUpId={"1"} Title={"wisdom tooth removal"} TimeStamp={new Date()} ChatID={'asd'} ChatResult={"asd"}/>
          </div>
        </div>
        <div className='flex flex-col items-center w-4/5 p-5 pr-12 justify-between'>
          <div className='flex rounded-4xl w-1/4 h-16 bg-[#423C3C] select-none text-white font-semibold text-xl items-center'>
            <div className="flex w-[49.25%] h-[87.5%] rounded-4xl items-center justify-center">
              FAQ
            </div>
            <div className="flex w-[49.25%] h-[87.5%] rounded-4xl items-center justify-center bg-[#8F8787]">
              Follow-Up
            </div>
          </div>
          <div className='flex flex-col rounded-3xl w-full h-[70%] bg-[#D9D9D9] select-none overflow-auto py-3 gap-2'>
            <ChatMessageBox ChatId={"1"} UserChat={true} TimeStamp={new Date()} Text={"aasdsdffffffddddddddddddddddasdsd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={false} TimeStamp={new Date()} Text={"adsasd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={true} TimeStamp={new Date()} Text={"asdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={false} TimeStamp={new Date()} Text={"assdsdd"}/>
            <ChatMessageBox ChatId={"1"} UserChat={true} TimeStamp={new Date()} Text={"assdsdd"}/>
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

export default Followup