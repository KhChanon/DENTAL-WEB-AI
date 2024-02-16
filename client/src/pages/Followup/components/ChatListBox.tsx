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
        className='flex flex-col items-center justify-center w-full text-center text-white font-medium text-base cursor-pointer'
        onClick={() => window.location.href = `/followup/${_id}`}
    >
        {recordID === _id
        ?
        <div className="bg-purple flex flex-col items-center justify-center w-[85%] px-3 min-h-16 rounded-[30px]">
            <p className='m-0'>{surgicalprocedure} - {formattedDate}</p>
        </div>
        :
        <div className=" bg-stone-700 flex flex-col items-center justify-center w-[85%] px-3 min-h-16 rounded-[30px] hover:bg-purple">
            <p className='m-0'>{surgicalprocedure} - {formattedDate}</p>
        </div>
        }
    </div>
  )
}

const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
}

export default ChatListBox