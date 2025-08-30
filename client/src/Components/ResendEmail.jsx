import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosMail } from "react-icons/io";
import axios from 'axios';
const ResendEmail = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem("signupEmail")

    const sendCode = async () => {
        if (!email) {
            alert("Please Enter a gmail address at signup")
        }
        const res = await axios.post("http://localhost:3000/api/email/send-code", {
            email
        })
        if (res) {
            alert(`Verification code has been send at ${email}`)
            navigate('/verify')
        }
    }

    return (
        <div className='bg-gray-100 w-screen h-screen'>
            <div className=" flex items-center  justify-center pt-10">
                <div className="flex flex-col rounded-xl   bg-white w-[50rem] h-[30rem] items-center space-y-5 justify-center pt-2">
                    <h1 className='text-5xl absolute top-20 font-bold text-gray-600 '>Email Verification</h1>
                    <p className='text-gray-500 text-xl mt-10 font-bold'>Resend Code at your gmail </p>
                    <div className="w-[27rem]  focus:outline-blue-500 focus:outline-2 py-7 px-3 rounded-md bg-gray-100">
                        <p className='text-xl px-2 text-gray-500 font-semibold'>{email}</p>

                    </div>

                    <button onClick={sendCode()} className='bg-red-500 mt-10  py-4 mb-2   cursor-pointer hover:bg-red-600  text-white rounded-md  w-[10rem]'>Resend Code</button>
                </div>

            </div>
        </div >
    )
}

export default ResendEmail
