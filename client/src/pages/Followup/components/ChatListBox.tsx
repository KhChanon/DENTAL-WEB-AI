import React from 'react'
import { RecordProp } from '../../../interface/RecordProp'


const ChatListBox: React.FC<RecordProp> = ({RecordID,TimeStamp,SurgicalProcedure,Status,ChatMessesge}) => {

    const day: number = TimeStamp.getDate();
    const month: number = TimeStamp.getMonth()+1;
    const year: number = TimeStamp.getFullYear();
  
    // Format the date
    const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

    return (
    <div className="flex flex-col items-center justify-center w-[85%] px-3 min-h-16 bg-stone-700 rounded-[30px] text-center text-white font-medium text-base cursor-pointer">
        <p className='m-0'>{SurgicalProcedure} - {formattedDate}</p>
    </div>
  )
}

const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
}

export default ChatListBox