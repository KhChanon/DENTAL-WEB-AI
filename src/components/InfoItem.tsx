import React from 'react'

interface InfoItemProps {
    
}

const InfoItem: React.FC<InfoItemProps> = () => {
  return (
    <div className="flex flex-row items-center justify-start gap-[2.69rem] max-w-full">
        <div className="relative font-light flex items-center w-[8.44rem] h-[2.31rem] shrink-0">
            1234
        </div>
        <div className="relative font-light whitespace-pre-wrap flex items-center w-[11.25rem] h-[2.31rem] shrink-0">
            12:00:59 33/55/2022
        </div>
        <div className="relative font-light flex items-center w-[11.25rem] h-[2.31rem] shrink-0">
            ถอนฟันคุด
        </div>
        <div className="relative font-light flex items-center w-[8.75rem] h-[2.31rem] shrink-0">
            Follow up
        </div>
        <button className="cursor-pointer [border:none] pt-[0.38rem] px-[0.31rem] pb-[0.31rem] bg-darkslateblue-100 rounded-11xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[5.63rem] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border hover:bg-plum-100">
        <div className="relative text-[0.63rem] font-semibold font-montserrat text-colors-white-white text-center flex items-center justify-center w-[4rem] shrink-0">
            ติดตาม
        </div>
        </button>
    </div>
  )
}

export default InfoItem
