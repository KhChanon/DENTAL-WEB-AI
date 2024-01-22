import React from 'react'
import { FollowUpProp } from '../../../interface/FollowUpProp'


const ChatListBox: React.FC<FollowUpProp> = ({FollowUpId,Title,TimeStamp,ChatID,ChatResult}) => {

    const day: number = TimeStamp.getDate();
    const month: number = TimeStamp.getMonth()+1;
    const year: number = TimeStamp.getFullYear();
  
    // Format the date
    const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

    return (
    <div className="flex flex-col items-center justify-center w-[85%] px-3 h-16 bg-stone-700 rounded-[30px] text-center text-white font-medium text-base">
        <p className='m-0'>{Title} - {formattedDate}</p>
    </div>
  )
}

const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
}

export default ChatListBox