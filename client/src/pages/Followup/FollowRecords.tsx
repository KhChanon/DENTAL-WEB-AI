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

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (chat === "") {
      console.log("string empty")
    }
    else {
      setChat("");
      setAllchat([...allchat, {
        userchat: true,
        chattime: new Date(),
        chattext: chat!,
      }]);
      await postChat();
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
          <div className="flex flex-col overflow-y-auto bg-[#D9D9D9] items-start justify-start gap-[2.5rem] py-5 px-12 rounded-3xl">
            <div className="w-[20rem] h-[18.75rem] flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Blood</div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='ไม่มีเลือด'>
                  <span>ไม่มีเลือด</span>
                  <input
                    name='blood'
                    type='radio'
                    id='ไม่มีเลือด'
                    className='w-[20px] h-[20px]'
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='เลือดนิดหน่อย'>
                  <span>เลือดนิดหน่อย</span>
                  <input
                    name='blood'
                    type='radio'
                    id='เลือดนิดหน่อย'
                    className='w-[20px] h-[20px]'
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='เลือดกรอกปาก'>
                  <span>เลือดกรอกปาก</span>
                  <input
                    name='blood'
                    type='radio'
                    id='เลือดกรอกปาก'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Pain</div>
              <div className="flex flex-row items-start justify-start gap-[1.062rem] text-right font-inter">
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_0'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_0'>
                    0
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_1'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_1'>
                    1
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_2'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_2'>
                    2
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_3'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_3'>
                    3
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_4'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_4'>
                    4
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_5'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_5'>
                    5
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_6'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_6'>
                    6
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_7'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_7'>
                    7
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_8'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_8'>
                    8
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_9'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_9'>
                    9
                  </label>
                </div>
                <div className="">
                  <input
                    name='pain'
                    type='radio'
                    id='pain_10'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='pain_10'>
                    10
                  </label>
                </div>
              </div>
              <div className="w-[51.875rem] flex flex-row items-center justify-between text-grayer-100 text-[12px]">
                <div className="relative">ไม่เจ็บ</div>
                <div className="relative">เจ็บปางตาย</div>
              </div>
            </div>
            <div className="w-[12.5rem] h-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
              <div className="relative font-red-hat-display text-center">
                Medication
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='taken_medication_yes'>
                  <span>ใช่</span>
                  <input
                    name='taken_medication'
                    type='radio'
                    id='taken_medication_yes'
                    className='w-[20px] h-[20px]'
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='taken_medication_no'>
                  <span>ไม่</span>
                  <input
                    name='taken_medication'
                    type='radio'
                    id='taken_medication_no'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <div className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
              <div className="relative font-red-hat-display text-center">
                Better
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='pain_decreased_yes'>
                  <span>ใช่</span>
                  <input
                    name='pain_decreased'
                    type='radio'
                    id='pain_decreased_yes'
                    className='w-[20px] h-[20px]'
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='pain_decreased_no'>
                  <span>ไม่</span>
                  <input
                    name='pain_decreased'
                    type='radio'
                    id='pain_decreased_no'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Swelling</div>
              <div className="flex flex-row items-start justify-start gap-[1.062rem] text-right font-inter">
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_0'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_0'>
                    0
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_1'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_1'>
                    1
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_2'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_2'>
                    2
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_3'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_3'>
                    3
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_4'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_4'>
                    4
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_5'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_5'>
                    5
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_6'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_6'>
                    6
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_7'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_7'>
                    7
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_8'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_8'>
                    8
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_9'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_9'>
                    9
                  </label>
                </div>
                <div className="">
                  <input
                    name='swelling'
                    type='radio'
                    id='swelling_10'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='swelling_10'>
                    10
                  </label>
                </div>
              </div>
              <div className="w-[51.875rem] flex flex-row items-center justify-between text-grayer-100 text-[12px]">
                <div className="relative">ไม่บวม</div>
                <div className="relative">บวมเหมือนภูเขาไฟที่จะระเบิด</div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[1.187rem] text-center font-red-hat-display">
              <div className="relative">Days</div>
              <div className="flex flex-row items-start justify-start gap-[1.062rem] text-right font-inter">
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_0'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_0'>
                    0
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_1'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_1'>
                    1
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_2'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_2'>
                    2
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_3'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_3'>
                    3
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_4'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_4'>
                    4
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_5'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_5'>
                    5
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_6'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_6'>
                    6
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_7'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_7'>
                    7
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_8'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_8'>
                    8
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_9'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_9'>
                    9
                  </label>
                </div>
                <div className="">
                  <input
                    name='days'
                    type='radio'
                    id='days_10'
                    className='peer hidden'
                  />
                  <label className='cursor-pointer select-none w-[3.75rem] h-[3.75rem] box-border flex items-center justify-center relative border-[1px] border-solid border-black peer-checked:bg-green' htmlFor='days_10'>
                    10
                  </label>
                </div>
              </div>
            </div>
            <div className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
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
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='symptoms_no'>
                  <span>ไม่</span>
                  <input
                    name='symptoms'
                    type='radio'
                    id='symptoms_no'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <div className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
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
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='can_eat_no'>
                  <span>ไม่</span>
                  <input
                    name='can_eat'
                    type='radio'
                    id='can_eat_no'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <div className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
              <div className="relative font-red-hat-display text-center">
                Soft food
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.187rem] text-right font-inter">
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='eat_soft_food_yes'>
                  <span>ใช่</span>
                  <input
                    name='eat_soft_food'
                    type='radio'
                    id='soft_food_yes'
                    className='w-[20px] h-[20px]'
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='eat_soft_food_no'>
                  <span>ไม่</span>
                  <input
                    name='eat_soft_food'
                    type='radio'
                    id='eat_soft_food_no'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <div className="w-[12.5rem] flex flex-col items-start justify-start gap-[1.187rem]">
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
                  />
                </label>
                <label className='flex w-3/4 justify-between border-[1px] border-solid border-black px-5 py-3 cursor-pointer select-none' htmlFor='can_brush_no'>
                  <span>ไม่</span>
                  <input
                    name='can_brush'
                    type='radio'
                    id='can_brush_no'
                    className='w-[20px] h-[20px]'
                  />
                </label>
              </div>
            </div>
            <button className="cursor-pointer p-[0.625rem] bg-silver w-[7.313rem] self-center rounded-lg box-border h-[3.375rem] flex flex-row items-center justify-center border-[1px] border-solid border-black">
              <div className="relative text-[20px] font-semibold font-red-hat-display text-black text-center">
                ยืนยัน
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Followupchat