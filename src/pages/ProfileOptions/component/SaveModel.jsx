import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Button from "./Button";

const SaveModel = ({ text }) => {
    return (
        <div className=" absolute top-1/4 p-2 grid place-content-center  backdrop-blur-md bg-gray-100 rounded-2xl ">
            <div className="h-auto py-8 w-[280px] lg:w-[500px] bg-[#FFFFFF] rounded-[20px]">
                <div className=" flex flex-row justify-center font-[600] text-2xl "><AiFillCheckCircle className="text-[#66BE5E] " size={'60px'} /></div>
                <p className="text-center font-[600] text-2xl mx-4 lg:mx-20 mt-2">
                    {text}
                </p>
                <Button text={"Close"} />
            </div>
        </div>
    );
};

export default SaveModel;

