import React from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import Swal from 'sweetalert2';
import config from '../config/config';

interface QrcodescannerProps {
    closeScanner: React.MouseEventHandler<HTMLButtonElement>;
}

const Qrcodescanner: React.FC<QrcodescannerProps> = ({ closeScanner }) => {
    const handlescan = (text: string, result: any) => {
        console.log("scanned na jaaaa")
        console.log(text)
        console.log(result)
        localStorage.setItem(`scan`, "QkTMN9Atbr3taS8Frqh8SNq0XrNTecsO");
        if (text === `${config.REDIRECT_URL}addcase`) {
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
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm
    flex items-center justify-center w-screen h-screen">
            <div className="overflow-hidden h-auto w-[400px] bg-white p-[30px] rounded-3xl iphone:w-[300px] iphone:p-[20px]">
                <div className="flex flex-col items-center justify-center gap-8 iphone:gap-4">
                    <Scanner
                        onResult={(text, result) => handlescan(text, result)}
                        onError={(error) => console.log(error?.message)}
                    />
                    <div className="">
                        <button className="cursor-pointer p-[0.625rem] bg-silver w-[7.313rem] self-center rounded-xl box-border h-[3.375rem] flex flex-row items-center justify-center bg-[#25597e] border-none iphone:w-[6rem] iphone:h-[3rem] iphone:rounded-lg"
                            onClick={closeScanner}>
                            <div className="relative text-[20px] font-semibold font-red-hat-display text-white text-center">
                                Close
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Qrcodescanner