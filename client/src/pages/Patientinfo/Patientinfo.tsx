import React from 'react'
import NavBar from '../../components/NavBar'
import Meow from '../../assets/meow.png'
import InfoItem from './components/InfoItem'

const Patientinfo = () => {
  return (
    <div className="relative bg-whitesmoke w-full h-screen overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[13.81rem] box-border gap-[2.75rem] tracking-[normal">
      <NavBar/>
      <section className="w-[62.5rem] flex flex-col items-start justify-start py-[0rem] px-[1.25rem] box-border gap-[1.88rem] max-w-full text-left text-[4rem] text-black font-red-hat-display">
      <div className="flex flex-row items-center justify-start gap-[3.13rem] max-w-full mq700:flex-wrap mq700:gap-[1.56rem]">
        <img
          className="h-[9.38rem] w-[9.38rem] relative rounded-[50%] object-cover"
          loading="eager"
          alt=""
          src={Meow}
        />
        <div className="m-0 h-[5.31rem] relative text-inherit font-bold font-inherit flex items-center max-w-full mq450:text-[2.38rem] mq950:text-[3.19rem]">
          Meow Meow Sean
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] max-w-full text-[2rem] text-darkslateblue-200">
        <div className="self-stretch flex flex-row items-center justify-between py-[0rem] px-[1.25rem]">
          <b className="w-[25.5rem] relative flex items-center h-[2.94rem] shrink-0">
            ประวัติการรักษา
          </b>
          <div className="w-[4.13rem] relative h-[2.08rem] text-center text-[1.5rem] text-colors-white-white">
            {/* <div className="absolute top-[0rem] left-[0rem] rounded-[10px] bg-palevioletred w-[4.13rem] h-[2.08rem]" /> */}
            <div className="absolute top-[0.4rem] rounded-[10px] flex items-center justify-center w-[4rem] h-[2rem] bg-palevioletred">
              +
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-xl bg-colors-white-white flex flex-col items-start justify-start p-[1.88rem] box-border gap-[0.94rem] max-w-full text-xl text-black mq450:pt-[1.25rem] mq450:pb-[1.25rem] mq450:box-border">
          <div className="w-[57.38rem] flex flex-row items-start justify-start gap-[85px] max-w-full mq450:flex-wrap">
            <div className="relative font-extrabold">Record ID</div>
            <div className="relative font-extrabold w-[133px]">วันที่</div>
            <div className="relative font-extrabold w-[140px]">ศัลยกรรม</div>
            <div className="h-[1.19rem] relative font-extrabold flex items-center">
              สถานะ
            </div>
          </div>
          <div className="w-[57.06rem] h-[0.06rem] relative box-border max-w-full border-t-[1px] border-solid border-black" />
          <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
          <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
          <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
          <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
          <InfoItem  RecordID={"12345678910"} TimeStamp={new Date()} SurgicalProcedure={"ผ่าฟันคุด"} Status={"Done"} ChatMessesge={"55555555"} />
        </div>
      </div>
    </section>
    </div>
  )
}

export default Patientinfo