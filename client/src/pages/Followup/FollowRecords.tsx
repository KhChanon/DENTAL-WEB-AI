import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin'
import send from '../../assets/send.png'
import ChatListBox from './components/ChatListBox'
import ChatMessageBox from '../../components/ChatMessageBox'
import config from '../../config/config';
import { ChatMessegeProp } from '../../interface/ChatMessegeProp';
import { RecordProp } from '../../interface/RecordProp';
import { UserProp } from '../../interface/UserProp'
import PlusIcon from '../../assets/plus-solid.svg';
import Swal from 'sweetalert2'

const Followupchat: React.FC = () => {
  const recordID = useParams<{ id: string }>().id;
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();
  const [chat, setChat] = useState<string>("");
  const [allchat, setAllchat] = useState<ChatMessegeProp[]>([]);
  const [records, setRecords] = useState<RecordProp[]>([]);

  const getChat = async () => {
    try {
      const res = await axios.get(config.API_URL + '/followup/' + recordID);

      res.data.chat.chat.forEach((chat: ChatMessegeProp) => {
        chat.chattime = new Date(chat.chattime);
      });

      setAllchat(res.data.chat.chat);
    } catch (error) {
      console.error(error);
    }
  }

  const getRecords = async () => {
    try {
      const res = await axios.get(config.API_URL + '/users/' + userID + '/records');

      res.data.records.forEach((record: RecordProp) => {
        record.surgicaldate = new Date(record.surgicaldate);
      });
      setRecords(res.data.records);
    } catch (error) {
      console.error(error);
    }
  }

  const getUser = async () => {
    try {
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const postChat = async () => {
    try {
      await axios.post(config.API_URL + '/followup/add', {
        chat: {
          userchat: true,
          chattext: chat!,
        },
        followupid: recordID,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`userID`)) {
      getUser();
      getRecords()
      getChat();
      setAuth(true);
    }
  }, []);

  const [bleedChoice, setbleedChoice] = useState<number | null>(null);
  const [pain_level, setpain_level] = useState<number | null>(null);
  const [taken_medication, settaken_medication] = useState<boolean | null>(null);
  const [pain_decreased, setpain_decreased] = useState<boolean | null>(null);
  const [swelling_level, setswelling_level] = useState<number | null>(null);
  const [days, setdays] = useState<number>(-1);
  const [symptoms, setsymptoms] = useState<boolean | null>(null);
  const [can_eat, setcan_eat] = useState<boolean | null>(null);
  const [eat_soft_food, seteat_soft_food] = useState<boolean | null>(null);
  const [can_brush, setcan_brush] = useState<boolean | null>(null);
  const [followAgain, setfollowAgain] = useState<boolean | null>(false);

  const handleBleedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(event.target.value);
    setbleedChoice(level);
  };

  const handlePainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(event.target.value);
    setpain_level(level);
    if (level <= 6) {
      settaken_medication(null);
      setpain_decreased(null)
    }
  };

  const handleMedicationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taken = event.target.id === 'taken_medication_yes';
    settaken_medication(taken);
    if (taken === false) {
      setpain_decreased(null);
    }
  };

  const handlePainDecreasedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.id === 'pain_decreased_yes';
    setpain_decreased(temp);
  };

  const handleSwellingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(event.target.value);
    setswelling_level(level);
    if (level < 5) {
      setdays(-1)
      setsymptoms(null)
    }
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(event.target.value);
    setdays(level);
    if (level < 4) {
      setsymptoms(null)
    }
  };

  const handleSymptomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.id === 'symptoms_yes';
    setsymptoms(temp);
  };

  const handleDietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const diet = event.target.id === 'can_eat_yes';
    setcan_eat(diet);
    if (diet === true) {
      seteat_soft_food(null)
    }
  };

  const handleEatSoftFoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.id === 'eat_soft_food_yes';
    seteat_soft_food(temp);
  };

  const handleCanBrushChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.id === 'can_brush_yes';
    setcan_brush(temp);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let updatedRecommendations = [];  
    if (bleedChoice === 2) {
      updatedRecommendations.push("คุณยังมีเลือกซึมจากแผลอยู่บ้างเป็นเลือกปนน้ำลาย ควรกัดผ้าก๊อซต่ออีก30นาที และไม่บ้วนน้ำลายบ่อย")

    } else if (bleedChoice === 3) {
      updatedRecommendations.push("คุณยังมีเลือดซึมจากแผลเป็นสีแดงสดและ/หรือมีลิ่มเลือกปนอยู่ด้วย ควรกัดผ้าก๊อซ และพบแพทย์ผู้ดูแล")
    }

    if (pain_level! > 7) {
      if (taken_medication === true) {
        if (pain_decreased === false) {
          updatedRecommendations.push("คุณได้ทานยาแก้ปวดแล้วแต่อาการปวดไม่ดีขึ้น ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
          setfollowAgain(true)
        }
        else {
          updatedRecommendations.push("คุณได้ทานยาแก้ปวดแล้วและอาการปวดดีขึ้น จะมีการติตามอาการอีกรอบใน24ชั่วโมง")
          setfollowAgain(true)
        }
      } else {
        updatedRecommendations.push("อาการปวดมากกว่าระดับ7 แนะนำให้ทานยาแก้ปวดเพื่อระงับความปวดเบื้องต้น และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        setfollowAgain(true)
      }
    }

    if (swelling_level! >= 1 && swelling_level! < 2) {
      updatedRecommendations.push("ใบหน้าบริเวณแผลของคุณไม่มีอาการบวมหรือบวมเล็กน้อย ควรประคบเย็นที่ใบหน้าบริเวณแผลลดอาการบวม")
    } else if (swelling_level! >= 2) {
      if (days <= 3) {
        updatedRecommendations.push("ใบหน้าของคุณยังมีอาการบวมแบบเห็นได้ชัด แต่ยังอยู่ในช่วง3วันหลังผ่าตัด ควรประคบเย็นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        setfollowAgain(true)
      } else {
        if (symptoms === true) {
          updatedRecommendations.push("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและไม่น้อยลงหรือมีอาการปวดร่วมด้วย ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
          setfollowAgain(true)
        }
        else {
          updatedRecommendations.push("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและแค่อาการบวมน้อยลงและไม่มีอาการปวดร่วมด้วย ควรประคบอุ่นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
          setfollowAgain(true)
        }
      }
    }

    if (can_eat === false) {
      if (eat_soft_food === true) {
        updatedRecommendations.push("ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการของแผล")
      } else {
        updatedRecommendations.push("ควรทานอาหารอ่อน และอาหหารที่ไม่มีรสชาติจัด และจะมีการติตามอาการอีกรอบใน24ชั่วโมง")
        setfollowAgain(true)
      }
    }

    if (can_brush === false) {
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
    }).then((result) => {
      window.location.href = '/followup';
    });
  };

  return (

    <div className='w-screen h-screen flex flex-col'>
      {!auth
        ?
        <NavBar />
        :
        <NavBarLogin {...user!} />
      }
      <div className='flex flex-row w-full h-full overflow-hidden'>
        <div className="flex flex-col items-center justify-center w-1/5 p-5 pl-12 select-none">
          <div className='flex flex-col rounded-3xl h-full w-full bg-[#D9D9D9] py-3 gap-2 justify-start items-center overflow-auto'>
            <div
              className="flex flex-col items-center justify-center w-[85%] px-3 min-h-16 bg-[#A12D72] rounded-[30px] text-center text-white font-medium text-base cursor-pointer"
              onClick={() => { window.location.href = '/addcase' }}
            >
              <img
                className="cursor-pointer select-none w-[25px]"
                alt=""
                src={PlusIcon}
              />
            </div>
            {
              records
                .sort((a: RecordProp, b: RecordProp) => b.surgicaldate.getTime() - a.surgicaldate.getTime())
                .map((record: RecordProp) => {
                  return <ChatListBox key={record._id} {...record} />
                })
            }
          </div>
        </div>
        <div className='flex flex-col items-center py-5 px-12 justify-between'>
          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto bg-[#D9D9D9] items-start justify-start gap-[2.5rem] py-5 px-12 rounded-3xl">
            <section id='Blood' className="w-[20rem] h-[18.75rem] flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Blood</div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='ไม่มีเลือด'>
                  <span>ไม่มีเลือด</span>
                  <input
                    name='blood'
                    type='radio'
                    id='ไม่มีเลือด'
                    value='0'
                    className='w-[20px] h-[20px]'
                    onChange={handleBleedChange}
                    required
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='เลือดนิดหน่อย'>
                  <span>เลือดนิดหน่อย</span>
                  <input
                    name='blood'
                    type='radio'
                    id='เลือดนิดหน่อย'
                    value='1'
                    className='w-[20px] h-[20px]'
                    onChange={handleBleedChange}
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='เลือดกรอกปาก'>
                  <span>เลือดกรอกปาก</span>
                  <input
                    name='blood'
                    type='radio'
                    id='เลือดกรอกปาก'
                    value='2'
                    className='w-[20px] h-[20px]'
                    onChange={handleBleedChange}
                  />
                </label>
              </div>
            </section>
            <section id='Pain' className="flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Pain</div>
              <div className="flex flex-row items-start justify-start gap-[1.062rem] text-right font-inter">
                {[...Array(11)].map((_, index) => (
                  <div key={index}>
                    <input
                      name="pain"
                      type="radio"
                      id={`pain_${index}`}
                      value={index}
                      className="peer hidden"
                      onChange={handlePainChange}
                      required
                    />
                    <label
                      className="cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green"
                      htmlFor={`pain_${index}`}
                    >
                      {index}
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-[51.875rem] flex flex-row items-center justify-between text-grayer-100 text-[12px]">
                <div className="relative">ไม่เจ็บ</div>
                <div className="relative">เจ็บปางตาย</div>
              </div>
              {pain_level === null && (
                <p className="text-red-500 text-sm">Please select one of these options</p>
              )}
            </section>
            {pain_level !== null && pain_level > 6 && (
              <section id="Medication" className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
                <div className="relative font-red-hat-display text-center">Medication</div>
                <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                  <label className="flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none" htmlFor="taken_medication_yes">
                    <span>ใช่</span>
                    <input
                      name="taken_medication"
                      type="radio"
                      id="taken_medication_yes"
                      className="w-[20px] h-[20px]"
                      onChange={handleMedicationChange}
                      required
                    />
                  </label>
                  <label className="flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none" htmlFor="taken_medication_no">
                    <span>ไม่</span>
                    <input
                      name="taken_medication"
                      type="radio"
                      id="taken_medication_no"
                      className="w-[20px] h-[20px]"
                      onChange={handleMedicationChange}
                    />
                  </label>
                </div>
              </section>
            )}
            {taken_medication !== null && taken_medication && (
              <section id="Better" className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
                <div className="relative font-red-hat-display text-center">Better</div>
                <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                  <label className="flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none" htmlFor="pain_decreased_yes">
                    <span>ใช่</span>
                    <input
                      name="pain_decreased"
                      type="radio"
                      id="pain_decreased_yes"
                      className="w-[20px] h-[20px]"
                      onChange={handlePainDecreasedChange}
                      required
                    />
                  </label>
                  <label className="flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none" htmlFor="pain_decreased_no">
                    <span>ไม่</span>
                    <input
                      name="pain_decreased"
                      type="radio"
                      id="pain_decreased_no"
                      className="w-[20px] h-[20px]"
                      onChange={handlePainDecreasedChange}
                    />
                  </label>
                </div>
              </section>
            )}
            <section id="Swelling" className="flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Swelling</div>
              <div className="flex flex-row items-start justify-start gap-[1.062rem] text-right font-inter">
                {[...Array(11)].map((_, index) => (
                  <div key={index}>
                    <input
                      name="swelling"
                      type="radio"
                      id={`swelling_${index}`}
                      value={index}
                      className="peer hidden"
                      onChange={handleSwellingChange}
                    />
                    <label
                      className="cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green"
                      htmlFor={`swelling_${index}`}
                    >
                      {index}
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-[51.875rem] flex flex-row items-center justify-between text-grayer-100 text-[12px]">
                <div className="relative">ไม่บวม</div>
                <div className="relative">บวมเหมือนภูเขาไฟที่จะระเบิด</div>
              </div>
              {swelling_level === null && (
                <p className="text-red-500 text-sm">Please select one of these options</p>
              )}
            </section>

            {swelling_level !== null && swelling_level >= 5 && (
              <section id="Days" className="flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
                <div className="relative">Days</div>
                <div className="flex flex-row items-start justify-start gap-[1.062rem] text-right font-inter">
                  {[...Array(11)].map((_, index) => (
                    <div key={index}>
                      <input
                        name="days"
                        type="radio"
                        id={`days_${index}`}
                        value={index}
                        className="peer hidden"
                        onChange={handleDaysChange}
                        required
                      />
                      <label
                        className="cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green"
                        htmlFor={`days_${index}`}
                      >
                        {index}
                      </label>
                    </div>
                  ))}
                </div>
                {days === -1 && (
                  <p className="text-red-500 text-sm">Please select one of these options</p>
                )}
              </section>
            )}
            {days !== null && days > 3 && (
              <section id='Symptom' className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
                <div className="relative font-red-hat-display text-center">
                  Symptom
                </div>
                <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                  <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='symptoms_yes'>
                    <span>ใช่</span>
                    <input
                      name='symptoms'
                      type='radio'
                      id='symptoms_yes'
                      className='w-[20px] h-[20px]'
                      onChange={handleSymptomChange}
                      required
                    />
                  </label>
                  <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='symptoms_no'>
                    <span>ไม่</span>
                    <input
                      name='symptoms'
                      type='radio'
                      id='symptoms_no'
                      className='w-[20px] h-[20px]'
                      onChange={handleSymptomChange}
                    />
                  </label>
                </div>
              </section>
            )}
            <section id='Diet' className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
              <div className="relative font-red-hat-display text-center">
                Diet
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='can_eat_yes'>
                  <span>ใช่</span>
                  <input
                    name='can_eat'
                    type='radio'
                    id='can_eat_yes'
                    className='w-[20px] h-[20px]'
                    onChange={handleDietChange}
                    required
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='can_eat_no'>
                  <span>ไม่</span>
                  <input
                    name='can_eat'
                    type='radio'
                    id='can_eat_no'
                    className='w-[20px] h-[20px]'
                    onChange={handleDietChange}
                  />
                </label>
              </div>
            </section>
            {can_eat !== null && !can_eat && (
              <section id='Soft food' className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
                <div className="relative font-red-hat-display text-center">
                  Soft food
                </div>
                <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                  <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='eat_soft_food_yes'>
                    <span>ใช่</span>
                    <input
                      name='eat_soft_food'
                      type='radio'
                      id='eat_soft_food_yes'
                      className='w-[20px] h-[20px]'
                      onChange={handleEatSoftFoodChange}
                      required
                    />
                  </label>
                  <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='eat_soft_food_no'>
                    <span>ไม่</span>
                    <input
                      name='eat_soft_food'
                      type='radio'
                      id='eat_soft_food_no'
                      className='w-[20px] h-[20px]'
                      onChange={handleEatSoftFoodChange}
                    />
                  </label>
                </div>
              </section>
            )}
            <section id='Oral hygeine' className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
              <div className="relative font-red-hat-display text-center">
                Oral hygeine
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='can_brush_yes'>
                  <span>ใช่</span>
                  <input
                    name='can_brush'
                    type='radio'
                    id='can_brush_yes'
                    className='w-[20px] h-[20px]'
                    onChange={handleCanBrushChange}
                    required
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='can_brush_no'>
                  <span>ไม่</span>
                  <input
                    name='can_brush'
                    type='radio'
                    id='can_brush_no'
                    className='w-[20px] h-[20px]'
                    onChange={handleCanBrushChange}
                  />
                </label>
              </div>
            </section>
            <button className="cursor-pointer p-[0.625rem] bg-silver w-[7.313rem] self-center rounded-lg box-border h-[3.375rem] flex flex-row items-center justify-center border-[1px] border-solid border-black"
              type='submit'>
              <div className="relative text-[20px] font-semibold font-red-hat-display text-black text-center">
                ยืนยัน
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Followupchat