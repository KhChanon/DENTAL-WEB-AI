import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin';
import BgImage from '../../assets/Homepage_Bg.png'
import axios from 'axios';
import config from '../../config/config';
import { LineIDToken } from '../../interface/LineIDToken';
import { UserProp } from '../../interface/UserProp'

const Homepage = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const userID = localStorage.getItem(`userID`);
  const [user, setUser] = useState<UserProp>();

  const getUser = async () => {
    try{
      const res = await axios.get(config.API_URL + '/users/user/' + userID);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLineLogin = () => {
    const state = Math.random().toString(36).substring(2, 15) +Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 10);

    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URL}&state=${state}&scope=${config.SCOPE}`;
  }

  const handleAuth = async (userProfile:LineIDToken) => {
    try{
      const res = await axios.post(config.API_URL + '/users/auth', {
        lineopenid: userProfile.sub,
        lineusername: userProfile.name,
        lineprofilepicture: userProfile.picture ?? null,
        lineemail: userProfile.email ?? null,
      })
      localStorage.setItem(`userID`, res.data.user._id);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  const handleLineVerifyIDToken = async (idToken:string) => {
    try{
      const res = await axios.post('https://api.line.me/oauth2/v2.1/verify', {
          id_token: idToken,
          client_id: config.CLIENT_ID,
      }, {
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          },
      })
      handleAuth(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLineLoginAcessCode = async (code:string) => {
    try{
      const res = await axios.post(config.API_URL + '/users/lineauth', {
        code : code,
        redirect_url: config.REDIRECT_URL,
      })
      console.log(res.data);
      handleLineVerifyIDToken(res.data.data.id_token);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const codeurl = new URLSearchParams(window.location.search).get('code');
    const stateurl = new URLSearchParams(window.location.search).get('state');
    if (codeurl && stateurl) {
      handleLineLoginAcessCode(codeurl);
    }
    if (localStorage.getItem(`userID`)) {
      getUser();
      setAuth(true);
    }
  }, []);
  
  return (
    <div className="bg-cover h-screen w-screen" style={{ backgroundImage: `url(${BgImage})` }}>
      {!auth
      ?
      <NavBar />
      :
      <NavBarLogin {...user!} />
      }
        <div className="absolute top-1/3 flex-col pl-10 w-full iphone:top-[100px] iphone:pl-5">
          <div className="text-4xl font-bold text-white">ORAL AI</div>
          <div className="text-xl text-white w-[550px] iphone:w-[330px]">lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet</div>
          {!auth
          ?
          <div className = "flex flex-row gap-8 item-start iphone:flex-col iphone:gap-2"> 
            <button 
              className="bg-[#25597e] text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md iphone:rounded-xl iphone:text-base"
              onClick={() => {window.location.href = '/faq'}}
            >เริ่มสนทนา</button> 
            <button 
              className="bg-green text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md iphone:rounded-xl  iphone:text-base"
              onClick={() => { handleLineLogin() } }
            >เข้าสู่ระบบผ่าน LINE</button>
          </div>
          :
          <button 
            className="bg-[#25597e] text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md iphone:rounded-xl iphone:w-[10.5rem]"
            onClick={() => {window.location.href = '/faq'}}
          >เริ่มสนทนา</button> 
          }
        </div>
    </div>
  )
}

export default Homepage