import React from 'react'
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";

const TicketModel = ({ closeModel }) => {

    return (
        <div className="absolute top-1/4 p-2 grid place-content-center  backdrop-blur-md bg-gray-100 rounded-2xl font-[600] ">
            <div  className="h-auto py-8 w-[300px] lg:w-[500px] bg-[#FFFFFF] rounded-[20px]">
                <div onClick={closeModel}>
                    <AiOutlineClose  className='absolute top-5 right-8' size={24} />

                </div>
                <p className='text-center text-3xl'>Raise Your Ticket</p>
                <div className='flex flex-col mx-8'>
                    <input className='border rounded-[15px] text-[15px] outline-none  px-2 py-2 placeholder:pl-1 text-[#7D7D7D] placeholder:font-[300] mt-4 ' placeholder='Enter Your Issue Topic Here' type="text" />
                    <textarea className='border rounded-[15px] text-[15px] outline-none px-2 py-2 placeholder:pl-1 text-[#7D7D7D] placeholder:font-[300] mt-2' placeholder='Enter Your Description Here' type="text" />
                </div>
                <Button text={"Send"} />
            </div>
        </div>
    )
}

export default TicketModel