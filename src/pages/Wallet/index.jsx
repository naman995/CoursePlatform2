import React from "react";
import { AiFillCamera } from "react-icons/ai";
import StatsBox from "./component/StatsBox";
import EditProfileButton from "../ProfileOptions/component/EditProfileButton";
import PaymentHistory from "./component/PaymentHistory";
import Navbar from "@/components/AuthNav";
import { useEffect } from "react";
import { getWallet } from "../../apis/user";
import { convertPrice } from "../../apis/courses";
import mappings from "../../apis/currency_mappings";

const wallet = () => {
  const user = JSON.parse(localStorage.getItem("current-user"));
  const [walletData, setWalletData] = React.useState({});

  useEffect(() => {
    (async () => {
      const data = await getWallet();
      setWalletData({
        ...data,
        totalAmountEarned: await convertPrice({
          price: {
            amt: data.totalAmountEarned,
            base: "USD",
            to: getCurrencySymbol("CURR"),
          },
        }),
      });
    })();
  }, []);

  const getCurrencySymbol = (type) => {
    const country = JSON.parse(localStorage.getItem("user-location")) || "USD";

    if (type === "CURR") {
      return mappings[country.country_code]?.currency || "USD";
    }

    return mappings[country.country_code]?.symbol || "$";
  };

  const stats = [
    {
      color: "bg-[#FF5A5A]",
      symbol: walletData?.totalAmountEarned?.symbol,
      stats: walletData?.totalAmountEarned?.country_price || 0,
      subheading: "Total Earning Till Now",
    },
    {
      color: "bg-[#31BB00]",
      symbol: getCurrencySymbol(),

      stats: "0.00",
      subheading: "Your Current Balance",
    },
    {
      color: "bg-[#F29100]",
      symbol: getCurrencySymbol(),
      stats: "0.00",
      subheading: "Your Pending Balance",
    },
    {
      color: "bg-[#009BF2]",
      symbol: "",
      stats: walletData?.totalCoursesSold || 0,
      subheading: "Total Courses Sold",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="px-6 lg:px-20 mt-10  w-full pb-20">
        <h1 className="text-2xl font-[600] text-[#232323]">My Wallet</h1>
        <div className="flex lg:flex-row flex-col justify-between mt-10 lg:mt-6 items-center">
          <div className="flex lg:flex-row flex-col space-x-4">
            <img
              className=" lg:h-20 p-[2px] border rounded-full border-[#4D5EDC]"
              src={
                JSON.parse(localStorage.getItem("current-user")).profile_picture
              }
              alt=""
            />
            <div className="flex flex-col text-center lg:text-left ml-4">
              <h1 className="text-2xl font-[600]">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-[#9E9E9E] font-[500]">{user?.email}</p>
              {/* <p className="text-[#9E9E9E] font-[500]">{user?.phone}</p> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly mt-8">
          {stats.map((stat) => (
            <StatsBox
              color={stat.color}
              symbol={stat.symbol}
              stats={stat.stats}
              subheading={stat.subheading}
            />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row  items-center  justify-between mt-10 ">
          <p className="text-2xl font-[600]">Account Information</p>
          <div className="mt-5 lg:mt-0">
            <EditProfileButton onclick={""} text="Edit Account" />
          </div>
        </div>
        <div className="mt-5 text-xl flex flex-col lg:flex-row ">
          <p className=" w-full lg:w-[510px] h-12 rounded-[10px] border border-[#8B8B8B] outline-none px-3 flex items-center  text-[#8B8B8B] ">
            {" "}
            Your Account Name
          </p>
          <p className=" w-full lg:w-[510px] h-12 rounded-[10px] mt-5 lg:mt-0 border border-[#8B8B8B] outline-none px-3 flex items-center ml-0  lg:ml-10 text-[#8B8B8B]">
            {" "}
            Your Bank IFSC
          </p>
        </div>
        <div className="flex flex-col lg:flex-row  items-center  justify-between mt-10 ">
          <p className="text-2xl font-[600]">Or Add Paypal Account</p>
          <div className="mt-5 lg:mt-0">
            <EditProfileButton
              onclick={""}
              text="Verify
          "
            />
          </div>
        </div>
        <div className="mt-5 text-xl">
          <p className=" w-full lg:w-[510px] h-12 rounded-[10px] border border-[#8B8B8B] outline-none px-3 flex items-center  text-[#8B8B8B] ">
            Enter Your Paypal id
          </p>
        </div>
        <p className="mt-10 text-2xl font-[600]">Payment History</p>
        <div className="overflow-x-scroll">
          <PaymentHistory />
        </div>
      </div>
    </>
  );
};

export default wallet;
