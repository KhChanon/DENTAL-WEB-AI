import React, { useState, useEffect } from 'react'

function Register() {
    return (
        <div className=" bg-black w-full overflow-hidden h-screen flex flex-col px-0 box-border items-center justify-start gap-[20px] text-left text-3xl text-white font-open-sans sm:w-[460px] sm:gap-[10px]"> 
          <div className="self-stretch flex-1 overflow-hidden flex flex-row py-[20px] px-[400px] items-center justify-center sm:self-stretch sm:w-auto sm:items-center sm:justify-center sm:pl-20 sm:pr-20 sm:box-border">
            <div className="rounded-xl w-auto bg-white flex flex-col py-[20px] px-[30px] box-border items-start justify-start lg:flex-1 lg:h-auto sm:flex-1 sm:flex-col sm:items-center sm:justify-center sm:pl-[20px] sm:pr-[20px] sm:box-border">
              <div className="flex flex-row items-start justify-start lg:w-auto lg:[align-self:unset] sm:items-start sm:justify-start">
                <form>
                  <div className="flex flex-col items-end justify-start gap-[40px] lg:w-auto lg:[align-self:unset] sm:gap-[30px]">
                    <div className="flex flex-col items-start justify-start gap-[20px] lg:w-auto lg:[align-self:unset] sm:gap-[30px]">
                      <b className="relative text-4xl text-black sm:text-[30px]">Register</b>
                      <div className="flex flex-col items-start justify-start gap-[30px] text-5xl text-black sm:gap-[10px]">
                        {/* <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                          <div className="relative font-semibold sm:text-tlg">
                            Name
                          </div>
                          <input
                            className="p-[10px] text-xl sm:text-tsm text-semibold [border:none] bg-palevioletred relative w-[400px] h-[50px] sm:w-[300px] sm:h-10"
                            placeholder = "Enter Name"
                            name = 'username'
                            type="name"
                          />
                          
                        </div> */}
                        <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                          <div className="relative font-semibold sm:text-tlg">
                            Email
                          </div>
                          <input
                            className="p-[10px] text-xl sm:text-tsm text-semibold [border:none] bg-palevioletred relative w-[400px] h-[50px] sm:w-[300px] sm:h-10"
                            placeholder = "Enter Email"
                            name = 'email'
                            type="email"
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                          <div className="relative font-semibold sm:text-tlg">
                            Password
                          </div>
                          <input
                            className="p-[10px] text-xl sm:text-tsm text-semibold [border:none] bg-palevioletred relative w-[400px] h-[50px] sm:w-[300px] sm:h-10"
                            placeholder = "Enter Password"
                            name = 'password'
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[40px] sm:gap-[20px]">
                      <a href = "/" className="no-underline">
                        <div className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-row items-center justify-center">
                          <div className="relative text-9xl font-semibold font-open-sans text-lightgray text-left sm:text-tlg">
                            CANCEL
                          </div>
                        </div>
                      </a>
                      <button type="submit" className="cursor-pointer [border:none] bg-black rounded-[13px] px-[20px] w-auto h-[50px] flex flex-row items-center justify-center sm:w-[90px] sm:h-8">
                        <div className="relative text-9xl font-semibold font-open-sans text-white text-center sm:text-tlg">
                          SUBMIT
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Register