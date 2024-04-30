import React, { useEffect } from 'react'
import { RecordProp } from '../../../interface/RecordProp'

const InfoItem: React.FC<RecordProp> = ({ _id, surgicalprocedure, surgicaldate, surgicalstatus, surgicalresult }) => {

    const screenX = window.innerWidth
    const goToFollowUp = () => {
        window.location.href = `/followup/${_id}`;
    }

    const day: number = surgicaldate.getDate();
    const month: number = surgicaldate.getMonth() + 1;
    const year: number = surgicaldate.getFullYear();

    // Format the date
    const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

    return (
        <div>
            {
                screenX <= 450
                    ?
                    <button className="flex flex-row items-center justify-start gap-[0.84rem] max-w-full px-0 border-none bg-white overflow-hidden" onClick={goToFollowUp} disabled={surgicalstatus !== "Pending" ? true : false}>
                        <div className="relative font-light flex items-center w-[45px] h-[2.31rem] shrink-0 text-sm">
                            {_id.slice(0, 5)}{"..."}
                        </div>
                        <div className="relative font-light whitespace-pre-wrap flex items-center w-[75px] h-[2.31rem] shrink-0">
                            {formattedDate}
                        </div>
                        <div className="relative font-light flex items-center w-[80px] h-[2.31rem] shrink-0 ">
                            {surgicalprocedure}
                        </div>
                        <div className="relative font-light flex items-center w-[3rem] h-[2.31rem] shrink-0">
                            {surgicalstatus}
                        </div>
                    </button>
                    :
                    <div className="flex flex-row items-center justify-start gap-[2.69rem] max-w-full iphone:gap-[0.94rem]">

                        <div className="relative font-light flex items-center w-[12.44rem] h-[2.31rem] shrink-0 text-base iphone:text-sm">
                            {_id}
                        </div>
                        <div className="relative font-light whitespace-pre-wrap flex items-center w-[9.25rem] h-[2.31rem] shrink-0 iphone:w-[75px]">
                            {formattedDate}
                        </div>
                        <div className="relative font-light flex items-center w-[11.25rem] h-[2.31rem] shrink-0 iphone:w-[80px]">
                            {surgicalprocedure}
                        </div>
                        <div className="relative font-light flex items-center w-[5.75rem] h-[2.31rem] shrink-0">
                            {surgicalstatus}
                        </div>
                        <button
                            disabled={surgicalstatus !== "Pending" ? true : false}
                            onClick={goToFollowUp}
                            className="cursor-pointer [border:none] pt-[0.38rem] px-[0.31rem] pb-[0.31rem] bg-darkslateblue-100 rounded-11xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[5.63rem] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border hover:bg-plum-100 disabled:hover:bg-darkslateblue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >   <div className="select-none relative text-[1.03rem] font-semibold font-montserrat text-colors-white-white text-center flex items-center justify-center w-[4rem] shrink-0">
                                ติดตาม
                            </div>
                        </button>
                    </div>
            }
        </div>
    )
}



const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
}

export default InfoItem


{/* <div className="flex flex-row items-center justify-start gap-[2.69rem] max-w-full iphone:gap-[0.94rem]" onClick={goToFollowUp}>
            {
                screenX <= 450
                    ?
                    <div className="relative font-light flex items-center w-[12.44rem] h-[2.31rem] shrink-0 text-base iphone:text-sm iphone:w-[55px]">
                        {_id.slice(0, 5)}
                    </div>
                    :
                    <div className="relative font-light flex items-center w-[12.44rem] h-[2.31rem] shrink-0 text-base iphone:text-sm">
                        {_id}
                    </div>
            }
           
            <div className="relative font-light whitespace-pre-wrap flex items-center w-[9.25rem] h-[2.31rem] shrink-0 iphone:w-[75px]">
                {formattedDate}
            </div>
            <div className="relative font-light flex items-center w-[11.25rem] h-[2.31rem] shrink-0 iphone:w-[80px]">
                {surgicalprocedure}
            </div>
            <div className="relative font-light flex items-center w-[5.75rem] h-[2.31rem] shrink-0">
                {surgicalstatus}
            </div>
            <button
                disabled={surgicalstatus !== "Pending" ? true : false}
                onClick={goToFollowUp}
                className="cursor-pointer [border:none] pt-[0.38rem] px-[0.31rem] pb-[0.31rem] bg-darkslateblue-100 rounded-11xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[5.63rem] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border hover:bg-plum-100 disabled:hover:bg-darkslateblue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >   <div className="select-none relative text-[1.03rem] font-semibold font-montserrat text-colors-white-white text-center flex items-center justify-center w-[4rem] shrink-0">
                    ติดตาม
                </div>
            </button>
        </div> */}