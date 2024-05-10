import React from 'react'
import { RecordProp } from '../../../interface/RecordProp'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const ChatListBox: React.FC<RecordProp> = ({_id, surgicalprocedure, surgicaldate, surgicalstatus, latestresult}) => {
    const recordID = useParams<{id: string}>().id;
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
    <div className='flex flex-col items-center justify-center w-full text-center text-white font-medium text-base'>
        {recordID === _id
        ?
        <button onClick={() => window.location.href = `/followup/${_id}`} className="cursor-pointer bg-[#1d435f] flex flex-col items-center justify-center w-[85%] px-3 min-h-16 rounded-[30px] border-none text-center text-white text-base">
            <p className='m-0'>{surgicalprocedure} - {formattedDate}</p>
        </button>
        :
        <button 
            onClick={surgicalstatus === "Follow Up" ? getRecommendation : () => window.location.href = `/followup/${_id}`}
            className={`flex flex-col items-center justify-center w-[85%] px-3 min-h-16 rounded-[30px] border-none text-center text-white text-base cursor-pointer  ${surgicalstatus === "Follow Up" ? "bg-[#f90000] opacity-50 hover:bg-[#f90000] hover:opacity-50" : "hover:bg-[#1d435f] bg-[#499896]"}`} 
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