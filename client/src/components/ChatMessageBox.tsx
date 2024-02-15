import React from 'react'
import { ChatMessegeProp } from '../interface/ChatMessegeProp'

const ChatMessageBox: React.FC<ChatMessegeProp> = ({userchat,chattime,chattext}) => {

  const self_align = userchat ? 'self-end' : 'self-start';
  return (
    <div className={`flex items-center justify-center mx-3 py-2 px-3 w-fit h-fit bg-stone-700 rounded-3xl text-white font-medium text-base text-left ${self_align} max-w-[45%] text-wrap`}>
      <p className='m-0 break-words'>{chattext}</p>
    </div>
  )
}

export default ChatMessageBox