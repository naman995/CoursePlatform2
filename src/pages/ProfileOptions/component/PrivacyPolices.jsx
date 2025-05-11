import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const PrivacyPolices = () => {

    const list = [
        {
            id: 1,
            text: "Donec quis urna sagittis, pulvinar justo id, imperdiet elit. Quisque ornare nibh mauris, quis efficitur diam facilisis",
        },
        {
            id: 2,
            text: "Donec quis urna sagittis, pulvinar justo id, imperdiet elit. Quisque ornare nibh mauris, quis efficitur diam facilisis",
        }, {
            id: 3,
            text: "Donec quis urna sagittis, pulvinar justo id, imperdiet elit. Quisque ornare nibh mauris, quis efficitur diam facilisis",
        },
        {
            id: 4,
            text: "Donec quis urna sagittis, pulvinar justo id, imperdiet elit. Quisque ornare nibh mauris, quis efficitur diam facilisis",
        }]

    return (
        <>
             
            <div className=" ml-[8%] mt-[30%] lg:mt-[8%] mx-4">
                <h1 className="text-3xl lg:text-[48px] font-bold pt-7 pr-4">Our Privacy Polices</h1>
                <div className="text-[#7D7D7D] text-[16px] lg:text-[20px]">
                    <p className="mt-5 font-[400]">
                        Donec quis urna sagittis, pulvinar justo id, imperdiet elit. Quisque ornare nibh mauris, quis efficitur
                        diam facilisis rhoncus. Morbi in porta quam. Phasellus ut felis pulvinar, maximus ante ut, porta nunc.
                        Integer porttitor nulla vitae enim elementum, ullamcorper molestie arcu accumsan. Pellentesque imperdiet justo....
                    </p>
                    <ul className="mt-4 list">
                        {list.map((item) => ( 
                            <li className="flex items-center "> <HiOutlineArrowNarrowRight className="text-[#775EA5] mr-3 w-8" size={32} /> <p>{item.text}</p></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolices;