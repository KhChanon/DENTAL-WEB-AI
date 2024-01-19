import React from 'react'
import { ChatMessegeProp } from '../../../interface/ChatMessegeProp'

const ChatMessageBox: React.FC<ChatMessegeProp> = ({ChatId,UserChat,TimeStamp,Text}) => {

  const self_align = UserChat ? 'self-end' : 'self-start';
  return (
    <div className={`flex items-center justify-center mx-3 py-2 px-3 w-fit h-fit bg-stone-700 rounded-[30px] text-center text-white font-medium text-base ${self_align} max-w-[45%]`}>
      <p className='m-0'>{Text}</p>
    </div>
  )
}

export default ChatMessageBox