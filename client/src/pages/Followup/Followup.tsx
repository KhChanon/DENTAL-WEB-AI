import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../config/config';
import { RecordProp, StatusOrder } from '../../interface/RecordProp';
import { UserProp } from '../../interface/UserProp'
import NavBarLogin from '../../components/NavBarLogin';
import NavBar from '../../components/NavBar';
import PlusIcon from '../../assets/plus-solid.svg';
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Qrcodescanner from '../../components/Qrcodescanner';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const RecordCard: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, latestresult}) => {
  const day: number = surgicaldate.getDate();
  const month: number = surgicaldate.getMonth()+1;
  const year: number = surgicaldate.getFullYear();
  
 // Format the date
  const formattedDate: string = `${padZero(day)}/${padZero(month)}/${year}`;

  const getRecommendation = () => {

    let updatedRecommendations = [];
    if (latestresult.bleedChoice === 2) {
      updatedRecommendations.push("คุณยังมีเลือกซึมจากแผลอยู่บ้างเป็นเลือกปนน้ำลาย ควรกัดผ้าก๊อซต่ออีก30นาที และไม่บ้วนน้ำลายบ่อย")

    } else if (latestresult.bleedChoice === 3) {
      updatedRecommendations.push("คุณยังมีเลือดซึมจากแผลเป็นสีแดงสดและ/หรือมีลิ่มเลือกปนอยู่ด้วย ควรกัดผ้าก๊อซ และพบแพทย์ผู้ดูแล")
    }

    if (latestresult.painLevel! > 7) {
      if (latestresult.takenMedication === true) {
        if (latestresult.painDecreased === false) {
          updatedRecommendations.push("คุณได้ทานยาแก้ปวดแล้วแต่อาการปวดไม่ดีขึ้น ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        }
        else {
          updatedRecommendations.push("คุณได้ทานยาแก้ปวดแล้วและอาการปวดดีขึ้น จะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        }
      } else {
        updatedRecommendations.push("อาการปวดมากกว่าระดับ7 แนะนำให้ทานยาแก้ปวดเพื่อระงับความปวดเบื้องต้น และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
      }
    }

    if (latestresult.swellingLevel! >= 1 && latestresult.swellingLevel! < 2) {
      updatedRecommendations.push("ใบหน้าบริเวณแผลของคุณไม่มีอาการบวมหรือบวมเล็กน้อย ควรประคบเย็นที่ใบหน้าบริเวณแผลลดอาการบวม")
    } else if (latestresult.swellingLevel! >= 2) {
      if (latestresult.days <= 3) {
        updatedRecommendations.push("ใบหน้าของคุณยังมีอาการบวมแบบเห็นได้ชัด แต่ยังอยู่ในช่วง3วันหลังผ่าตัด ควรประคบเย็นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
      } else {
        if (latestresult.symptoms === true) {
          updatedRecommendations.push("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและไม่น้อยลงหรือมีอาการปวดร่วมด้วย ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        }
        else {
          updatedRecommendations.push("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและแค่อาการบวมน้อยลงและไม่มีอาการปวดร่วมด้วย ควรประคบอุ่นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        }
      }
    }

    if (latestresult.canEat === false) {
      if (latestresult.eatSoftFood === true) {
        updatedRecommendations.push("ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการของแผล")
      } else {
        updatedRecommendations.push("ควรทานอาหารอ่อน และอาหหารที่ไม่มีรสชาติจัด และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
      }
    }

    if (latestresult.canBrush === false) {
      updatedRecommendations.push("ควรหลีกเลี่ยงการแปรงฟันบริเวณจุดที่ทำการผ่าตัด")
    } else {
      updatedRecommendations.push("คุณสามารถแปรงฟันได้ตามปกติ")
    }

    showRecommendationsAlert(updatedRecommendations);
  }

  const showRecommendationsAlert = (updatedRecommendations: string[]) => {
    const uniqueRecommendations = Array.from(new Set(updatedRecommendations));
    // Construct the message to display
    const message = uniqueRecommendations.length === 0
      ? 'No recommendations available.'
      : uniqueRecommendations.map((recommendation, index) => `${index + 1}. ${recommendation}`).join('<br><br>'); // Use <br> for line breaks and add index

    // Show SweetAlert2 alert with HTML content and left-aligned text
    Swal.fire({
      title: 'Recommendations',
      html: `<div style="text-align: left;">${message}</div>`,
      confirmButtonText: 'OK'
    })
  };

  return (
    <button className={`px-0 flex flex-col w-full h-full bg-white outline-none border-none iphone:max-h-48  ${surgicalstatus === "Follow Up" ? "opacity-50 hover:opacity-50" : ""}`}
      id={`RecordCard${_id}`}
      onClick={surgicalstatus === "Follow Up" ? getRecommendation : () => window.location.href = `/followup/${_id}`}
    >
      <img src={surgicalprocedure === "ถอนฟัน" ? "https://tu.ac.th/uploads/news-tu/news/2566/oct/66-1349r.jpg" :
        (surgicalprocedure === "ผ่าฟันคุด" ? "https://www.smiledelightclinic.com/wp-content/uploads/2023/08/wisdom-tooth-768x553.jpg" :
          (surgicalprocedure === "ผ่าตัดเหงือก" ? "https://media.istockphoto.com/id/998246150/fi/vektori/s%C3%B6p%C3%B6-sarjakuvahammashahmo-jolla-on-purukumiongelma.jpg?s=612x612&w=0&k=20&c=zfJMQm8-ZB3Prw2eE4AijftQyRHXQbmm8_7_hW8SXG0=" :
            "https://www.si.mahidol.ac.th/sidoctor/sirirajonline2021/Article_images/1482_0.jpg" 
          ) 
        )
      } 
        alt="plus" 
        className='object-cover w-full h-2/3 rounded-t-xl'/>
      <div className={`flex flex-row w-full h-1/3 rounded-b-xl ${surgicalstatus === "Follow Up" ? "bg-[#f90000]" : "bg-[#5cc9c6]"} cursor-pointer items-start justify-between`} >
        <div className='flex flex-col w-3/4 h-full rounded-b-xl cursor-pointer items-start justify-between'>
          <div className="w-full flex flex-row text-base text-white font-bold mb-1 text-left justify-between iphone:text-base pt-2 px-5">{surgicalprocedure}</div>
          <div className="text-sm text-white font-bold mb-5 iphone:font-medium px-5">{formattedDate}</div>
        </div>
        <div className='flex text-white w-1/4 h-full text-3xl justify-center items-center'>
          {surgicalstatus == "Pending" ? <MdOutlinePendingActions/>:<IoCheckmarkCircleOutline/>}
        </div>
      </div>
    </button> 
  )
}

const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
}

const Followup = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [records, setRecords] = useState<RecordProp[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [showScannerPopup, setShowScannerPopup] = useState(false);


  const getRecords = async () => {
    try {
        const res = await axios.get(config.API_URL + '/users/' + userID + '/records/notdone');
        res.data.records.forEach((record:RecordProp) => {
          record.surgicaldate = new Date(record.surgicaldate);
        });
        setRecords(res.data.records);
    } catch (error) {
        console.error(error);
    }
    }
    
  const getUser = async () => {
    try{
        const res = await axios.get(config.API_URL + '/users/user/' + userID);
        setUser(res.data.user);
    } catch (error) {
        console.error(error);
    }
    }

    useEffect(() => {
      if (localStorage.getItem(`userID`)) {
        getUser();
        getRecords()
        setAuth(true);
      }
      else{
        setAuth(false);
        window.location.href = '/';
      }

      if(searchParams.get("scanner") === "true")
        {
          setShowScannerPopup(true)
        }
    }, []);

    const openScanner = () => {
      setShowScannerPopup(true);
    };
  
    const closeScanner = () => {
      setShowScannerPopup(false);
    };

  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden'>
      {!auth
      ?
        <NavBar />
      :
      <NavBarLogin {...user!} />
      }
      <div className='flex flex-col h-full item-center justify-start px-[30px] py-[30px] overflow-hidden bg-[#EFEFEF]'>
        <div className='grid grid-cols-5 grid-rows-3 box-border rounded-xl p-2 h-full w-full justify-center items-center gap-[15px] py-[25px] px-[50px] bg-white shadow-md overflow-auto iphone:flex iphone:flex-col iphone:items-start iphone:justify-start'>
          <button className='flex flex-col gap-5 w-full h-full iphone:max-h-32 rounded-xl bg-[#25597e] p-5 cursor-pointer select-none items-center justify-center border-none' onClick={openScanner}>
            <img
              className="=w-[50px] h-[50px] bg-[#25597e] iphone:w-[25px] iphone:h-[25px]"
              alt=""
              src={PlusIcon}
            />    
          </button>
          {
              records.sort((a: RecordProp, b: RecordProp) => {
                const statusOrder:StatusOrder = {
                  'Pending': 1,
                  'Follow Up': 2,
                  'Done': 3,
                };
            
                const orderA = statusOrder[a.surgicalstatus];
                const orderB = statusOrder[b.surgicalstatus];
            
                if (orderA !== orderB) {
                  return orderA - orderB;
                } else {
                  return b.surgicaldate.getTime() - a.surgicaldate.getTime();
                }
              })
              .map((record: RecordProp) => {
                return <RecordCard key={record._id} {...record} />;
              })
            }
        </div>
      </div>
      {showScannerPopup && <Qrcodescanner closeScanner={closeScanner} />}
    </div>
  )
}

export default Followup