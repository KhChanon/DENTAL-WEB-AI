import React from 'react'
import { RecordProp } from '../../../interface/RecordProp'
import { useParams } from 'react-router-dom';


const ChatListBox: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, surgicalresult}) => {
    const recordID = useParams<{id: string}>().id;
    const day: number = surgicaldate.getDate();
    const month: number = surgicaldate.getMonth()+1;
    const year: number = surgicaldate.getFullYear();
  
    // Format the date
    const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

    return (
    <div 
        className='flex flex-col items-center justify-center w-full text-center text-white font-medium text-base'
        
    >
        {recordID === _id
        ?
        <button onClick={() => window.location.href = `/followup/${_id}`} className="cursor-pointer bg-[#1d435f] flex flex-col items-center justify-center w-[85%] px-3 min-h-16 rounded-[30px] border-none text-center text-white text-base">
            <p className='m-0'>{surgicalprocedure} - {formattedDate}</p>
        </button>
        :
        <button 
            onClick={() => window.location.href = `/followup/${_id}`}
            className="bg-[#499896] flex flex-col items-center justify-center w-[85%] px-3 min-h-16 rounded-[30px] hover:bg-[#1d435f]  border-none text-center text-white text-base disabled:bg-[#f90000] disabled:opacity-50 disabled:hover:bg-[#f90000] disabled:hover:opacity-50 cursor-pointer disabled:cursor-not-allowed" 
            disabled={surgicalstatus === "Follow Up" ? true : false}
        >
            <p className='m-0'>{surgicalprocedure} - {formattedDate}</p>
        </button>
        }
    </div>
  )
}

const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
}

export default ChatListBox