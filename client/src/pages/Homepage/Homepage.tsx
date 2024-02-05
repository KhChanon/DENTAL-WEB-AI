import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import BgImage from '../../assets/Homepage_Bg.png'
import axios from 'axios';
import config from '../../config/config.json'


const Homepage = () => {

  const handleLineLogin = async () => {
    const state = Math.random().toString(36).substring(2, 15) +Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 10);

    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URL}&state=${state}&scope=${config.SCOPE}`;
  }

  const handleAuth = async (userProfile:any) => {
    const res = await axios.post(config.API_URL + '/users/auth', {
      lineopenid: userProfile.sub,
      lineusername: userProfile.name,
      lineprofilepicture: userProfile.picture ?? null,
      linestatusmessage: userProfile.status_message ?? null,
      lineemail: userProfile.email ?? null,
      })
    .then(res => {
      console.log(res.data);
    })
  }

  const handleLineVerifyIDToken = async (idToken:String) => {
    const res = await axios.post('https://api.line.me/oauth2/v2.1/verify', {
      id_token: idToken,
      client_id: config.CLIENT_ID,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      handleAuth(res.data);
    })
  }

  const handleLineLoginAcessCode = async (code:String) => {
    const res = await axios.post('https://api.line.me/oauth2/v2.1/token', {
      grant_type: 'authorization_code',
      code : code,
      redirect_uri: config.REDIRECT_URL,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      handleLineVerifyIDToken(res.data.id_token);
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    const codeurl = new URLSearchParams(window.location.search).get('code');
    const stateurl = new URLSearchParams(window.location.search).get('state');
    if (codeurl && stateurl) {
      handleLineLoginAcessCode(codeurl);
    }
  }, []);

  return (
    <div className="bg-cover h-screen" style={{ backgroundImage: `url(${BgImage})` }}>
      <NavBar />
        <div className="absolute top-1/3 flex-col pl-10 w-[28.125rem]">
          <div className="text-4xl font-bold text-white">ORAL AI</div>
          <div className="text-xl text-white">lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet</div>
          <div className = "flex flex-row gap-8 item-start"> 
            <button className="bg-purple text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md">เริ่มสนทนา</button>
            <button 
              className="bg-green text-white text-xl py-3 [border:none] rounded-full mt-3 w-[12.5rem] cursor-pointer select-none shadow-md"
              onClick={() => { handleLineLogin() } }
            >
            เข้าสู่ระบบผ่าน LINE</button>
          </div>
        </div>
    </div>
  )
}

export default Homepage