import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { BsShieldFillCheck } from "react-icons/bs";
import { TbTicket } from "react-icons/tb";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import TicketModel from "./TicketModel";
import LogoutModel from "./LogoutModel";

const sidebarOptions = [
  {
    title: "My Profile",
    icon: <AiOutlineUser />,
    link: "/Profile",
  },
  // {
  //   title: "Change Password",
  //   icon: <AiOutlineLock />,
  //   link: "/profile/ChangePassword",
  // },
  // {
  //   title: "Terms of Service",
  //   icon: <CgNotes />,
  //   link: "/profile/Privacy",
  // },
  // {
  //   title: "Privacy Policy",
  //   icon: <BsShieldFillCheck />,
  //   link: "/profile/Privacy",
  // },
  // {
  //   title: "FAQ",
  //   icon: <IoIosInformationCircleOutline />,
  //   link: "/ProfileSetting/address",
  // },
];

const SidebarOptions2 = [];

const Sidebar = () => {
  const location = useLocation();
  const [showTicketModel, setShowTicketModel] = useState(false);
  const [isTicketModelOpen, setIsTicketModelOpen] = useState(false);
  const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);

  const handleTicketModel = () => {
    setShowTicketModel(!showTicketModel);
  };
  const closeTicketModel = () => {
    setIsTicketModelOpen(false);
  };
  const handleLogoutModel = () => {
    setIsLogoutModelOpen(!isLogoutModelOpen);
  };
  const closeLogoutModel = () => {
    setIsLogoutModelOpen(false);
  };
  return (
    <div className="h-auto min-h-screen bg-[#182745]  lg:w-[18%] pt-36 lg:pt-20">
      <h1 className=" lg:mt-10 font-[600] text-white text-2xl  text-center lg:block hidden ">
        Profile Settings
      </h1>
      {sidebarOptions.map((option, key) => (
        <div
          key={key}
          className="flex items-center mt-5 cursor-pointer pl-2 lg:ml-5 "
        >
          <Link
            to={option.link}
            className={`flex flex-row items-center ${
              location.pathname === option.path
                ? " text-white"
                : "text-[#8D8D8D]"
            }`}
          >
            <div className=" text-[#CECECE] hover:text-[#FFFFFF] w-6 lg:w-4">
              {option.icon}
            </div>
            <div className="w-11/12">
              <h1 className="text-[#CECECE] hover:text-[#FFFFFF] font-[600] text-lg ml-1 lg:block hidden">
                {option.title}
              </h1>
            </div>
          </Link>
        </div>
      ))}

      {/* <div
        onClick={handleTicketModel}
        className="flex items-center mt-5 cursor-pointer pl-2 lg:ml-5 "
      >
        <div className=" text-[#CECECE] hover:text-[#FFFFFF] w-6 lg:w-4">
          <TbTicket />
        </div>
        <div className="w-11/12">
          <h1 className="text-[#CECECE] hover:text-[#FFFFFF] font-[600] text-lg ml-1 lg:block hidden">
            Raise A Ticket
          </h1>
        </div>
      </div> */}
      {/* <div
        onClick={handleTicketModel}
        className="flex items-center mt-5 cursor-pointer pl-2 lg:ml-5 "
      >
        <div className=" text-[#CECECE] hover:text-[#FFFFFF] w-6 lg:w-4">
          <BsChatDots />
        </div>
        <div className="w-11/12">
          <h1 className="text-[#CECECE] hover:text-[#FFFFFF] font-[600] text-lg ml-1 lg:block hidden">
            Customer Chat
          </h1>
        </div>
      </div> */}
      <div className="flex items-center mt-5 cursor-pointer pl-2 lg:ml-5 ">
        <div
          onClick={handleTicketModel}
          className=" text-[#FF5F5F] hover:text-[#FF5F5F] w-6 lg:w-4"
        >
          <IoIosLogOut />
        </div>
        <div onClick={handleLogoutModel} className="w-11/12">
          <h1 className="text-[#FF5F5F] hover:text-[#FF5F5F] font-[600] text-lg ml-1 lg:block hidden">
            LogOut
          </h1>
        </div>
      </div>
      <div className="z-40 mx-auto absolute left-[40%] top-[20%] lg:w-auto w-[200px] ">
        {showTicketModel && <TicketModel closeModel={closeTicketModel} />}
        {isLogoutModelOpen && <LogoutModel closeModel={closeLogoutModel} />}
      </div>
    </div>
  );
};

export default Sidebar;
