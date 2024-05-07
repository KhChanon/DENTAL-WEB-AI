import { Scanner } from '@yudiel/react-qr-scanner';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import NavBarLogin from '../../components/NavBarLogin';
import BgImage from '../../assets/Homepage_Bg.png'
import axios from 'axios';
import config from '../../config/config';
import { UserProp } from '../../interface/UserProp'
import Swal from 'sweetalert2';

const Qrscanner = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const userID = localStorage.getItem(`userID`);
    const [user, setUser] = useState<UserProp>();

    const getUser = async () => {
        try {
            const res = await axios.get(config.API_URL + '/users/user/' + userID);
            setUser(res.data.user);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem(`userID`)) {
          getUser();
          setAuth(true);
        }
        else{
          setAuth(false);
          window.location.href = '/';
        }
      }, []);

      const handlescan = (text:string, result:any) => {
        console.log("scanned na jaaaa")
        console.log(text)
        console.log(result)
        localStorage.setItem(`scan`, "QkTMN9Atbr3taS8Frqh8SNq0XrNTecsO");
        if(text === `${config.REDIRECT_URL}addcase`){
            window.location.href = "/addcase"
        }
        else {
            Swal.fire(
                'Invalid QR Code',
                'Please scan a valid QR Code',
                'error'
            )
        }
      }

    return (
        <div className="bg-cover h-screen w-screen overflow-hidden" style={{ backgroundImage: `url(${BgImage})` }}>
            {!auth
                ?
                <NavBar />
                :
                <NavBarLogin {...user!} />
            }
            <div className="flex h-full justify-center max-w-[700px] items-center mx-auto w-4/5 iphone:h-auto iphone:pt-32 iphone:w-11/12">
                <Scanner
                    onResult={(text, result) => handlescan(text, result)}
                    onError={(error) => console.log(error?.message)}
                />

            </div>
        </div>
    )
}

export default Qrscanner