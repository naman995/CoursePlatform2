import React from "react";

const Button = ({ text, onClick }) => {

    return (
        <div className="flex mt-5  justify-center" onClick={onClick}>
            <button className="w-[200px] py-3   text-white border bg-black  flex justify-center items-center gap-x-2 rounded-[100px]">
                <p className="font-[600] ">{text}</p>
            </button>
        </div>
    );
}

export default Button;
