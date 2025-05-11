import React from "react";
import Button from "./Button";
import { AiFillCheckCircle } from "react-icons/ai";
import auth from "@/apis/auth";
const LogoutModel = ({ closeModel }) => {
    return (
        <div className="absolute top-1/4 p-2 grid place-content-center  backdrop-blur-md bg-gray-100 rounded-2xl font-[600] ">
            <div className="h-auto py-8 w-[500px] bg-[#FFFFFF] rounded-[20px]">
                <div className=" flex flex-row justify-center font-[600] text-2xl mt-2"><AiFillCheckCircle className="text-[#66BE5E] " size={'60px'} /></div>
                <p className="text-center text-3xl">Logout</p>
                <p className="text-center text-xl">Do You Really want to Log Out ?</p>
                <div className="flex justify-center space-x-3">
                    <Button text={"Go Back"} />
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}

export default LogoutModel;


const LogoutButton = () => {
    return (

        <div onClick={auth.logout} className="flex mt-5  justify-center" >
            <button className="w-[200px] py-3   text-white border border-[#FF5F5F]  flex justify-center items-center gap-x-2 rounded-[100px]">
                <p className="font-[600] text-[#FF5F5F]">Log Out</p>
            </button>
        </div>
    );
}

