import React from 'react'
import { RecordProp } from '../../../interface/RecordProp'

const InfoItem: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, surgicalresult}) => {

    const day: number = surgicaldate.getDate();
    const month: number = surgicaldate.getMonth() + 1;
    const year: number = surgicaldate.getFullYear();

    // Format the date
    const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

    return (
        <div className="flex flex-row items-center justify-start gap-[2.69rem] max-w-full">
            <div className="relative font-light flex items-center w-[12.44rem] h-[2.31rem] shrink-0 text-base">
                {_id}
            </div>
            <div className="relative font-light whitespace-pre-wrap flex items-center w-[9.25rem] h-[2.31rem] shrink-0">
                {formattedDate}
            </div>
            <div className="relative font-light flex items-center w-[11.25rem] h-[2.31rem] shrink-0">
                {surgicalprocedure}
            </div>
            <div className="relative font-light flex items-center w-[5.75rem] h-[2.31rem] shrink-0">
                {surgicalstatus}
            </div>
            <button className="cursor-pointer [border:none] pt-[0.38rem] px-[0.31rem] pb-[0.31rem] bg-darkslateblue-100 rounded-11xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[5.63rem] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border hover:bg-plum-100">
                <div className="select-none relative text-[1.03rem] font-semibold font-montserrat text-colors-white-white text-center flex items-center justify-center w-[4rem] shrink-0">
                    ติดตาม
                </div>
            </button>
        </div>
    )
}

const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
}

export default InfoItem
