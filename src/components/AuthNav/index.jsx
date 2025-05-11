import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineWallet, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { RiUser6Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import auth from "@/apis/auth";
import vector from "@/assets/Home/logomini.svg";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const openProfileBar = () => {
    setShowProfile(!showProfile);
  };
  const openNotificationsBar = () => {
    setShowNotifications(!showNotifications);
  };

  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    (async () => {
      //get account type
      const user = JSON.parse(localStorage.getItem("current-user"));

      if (user) {
        setAccountType(user.accountType);
        setUser(user);
      } else setAccountType(null);
    })();
  }, []);

  return (
    <nav className="w-full  top-0 left-0 h-[70px]  ">
      <div className=" max-w-full px-2   lg:px-12 block  bg-black  w-full">
        <div className="relative flex  items-center justify-between lg:h-16">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="hidden h-8 w-auto lg:block" src={vector} alt="" />
            </div>
            <div className="hidden lg:block">
              <div className="flex space-x-2">
                <NavLink
                  to={user ? (accountType === "student" ? "/" : "/") : "/"}
                  // to="/dashboard"
                  className={({ isActive }) =>
                    `font-bold  hover:text-white px-3 py-2 rounded-md text-sm ${
                      isActive ? "text-white" : "text-[#454545]"
                    }`
                  }
                >
                  Home
                </NavLink>
                {accountType == "trainer" && (
                  <NavLink
                    to="/trainer"
                    className={({ isActive }) =>
                      `font-bold  hover:text-white px-3 py-2 rounded-md text-sm ${
                        isActive ? "text-white" : "text-[#454545]"
                      }`
                    }
                  >
                    My DashBoard
                  </NavLink>
                )}
                {accountType == "trainer" && (
                  <NavLink
                    to="/trainer/new"
                    className={({ isActive }) =>
                      `font-bold  hover:text-white px-3 py-2 rounded-md text-sm ${
                        isActive ? "text-white" : "text-[#454545]"
                      }`
                    }
                  >
                    Upload Course
                  </NavLink>
                )}
                {accountType == "trainer" && (
                  <NavLink
                    to="/trainer/new"
                    className={({ isActive }) =>
                      `font-bold  hover:text-white px-3 py-2 rounded-md text-sm ${
                        isActive ? "text-white" : "text-[#454545]"
                      }`
                    }
                  >
                    GoLive
                  </NavLink>
                )}
                {user && accountType !== "trainer" && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `font-bold  hover:text-white px-3 py-2 rounded-md text-sm ${
                        isActive ? "text-white" : "text-[#454545]"
                      }`
                    }
                  >
                    My Courses
                  </NavLink>
                )}
                {accountType !== "trainer" && (
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      `font-bold  hover:text-white px-3 py-2 rounded-md text-sm ${
                        isActive ? "text-white" : "text-[#454545]"
                      }`
                    }
                  >
                    Browse Courses
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          {user ? (
            <div className="absolute inset-y-0 top-[73px] right-[4rem] lg:top-0 lg:right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {accountType === "trainer" && (
                <div className="lg:relative absolute -top-[65px] right-0 md:top-2 md:right-14 lg:top-0  ml-3 ">
                  <div className="top-[6rem]">
                    <Link
                      to="/trainer/new"
                      type="button"
                      className="hover:via-violet-500  flex items-center justify-center rounded-full
                       bg-[#4D5EDC] h-[34px] w-[108px] text-sm focus:outline-none focus:ring-2 focus:ring-white 
                       focus:ring-offset-2 focus:ring-offset-[#2B2B2B]"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <h1 className="text-white font-bold ">Publish</h1>
                    </Link>
                  </div>
                </div>
              )}

              <div className="hidden sm:ml-6 lg:block">
                <div className="flex space-x-3">
                  <Link
                    to="/search"
                    type="button"
                    className="rounded-full bg-[#2B2B2B] p-1  text-white  "
                    ttile="Search"
                  >
                    <span className="sr-only">Search</span>
                    <FiSearch size={26} className="p-1" />
                  </Link>
                  {/* <button
                    type="button"
                    onClick={openNotificationsBar}
                    className="rounded-full bg-[#2B2B2B] p-1 text-white  "
                  >
                    <span className="flex-reverse">
                      <span className=" animate-ping absolute top-[17px] rounded-full h-3 w-3 bg-red-500"></span>
                      <span className=" absolute rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http:www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </button> */}
                  {accountType !== "trainer" && (
                    <Link
                      to="/wishlist"
                      type="button"
                      className="rounded-full bg-[#2B2B2B] p-1 text-white focus:outline-none focus:ring-2   focus:ring-offset-[#2B2B2B]"
                      title="Wishlist"
                    >
                      <span className="sr-only">Wishlist</span>
                      <AiOutlineHeart size={26} className="p-1" />
                    </Link>
                  )}
                  {accountType !== "trainer" && (
                    <Link
                      to="/cart"
                      type="button"
                      className="rounded-full bg-[#2B2B2B] p-1 text-white focus:outline-none focus:ring-2   focus:ring-offset-[#2B2B2B]"
                      title="Cart"
                    >
                      <span className="sr-only">Cart</span>
                      <BsCart3 size={26} className="p-1" />
                    </Link>
                  )}
                  {accountType == "trainer" && (
                    <Link
                      to="/wallet"
                      type="button"
                      className="rounded-full bg-[#2B2B2B] p-1 text-white focus:outline-none focus:ring-2   focus:ring-offset-[#2B2B2B]"
                      title="Wallet"
                    >
                      <span className="sr-only">Wallet</span>
                      <AiOutlineWallet size={26} className="p-1" />
                    </Link>
                  )}
                  {/* User Profile */}
                  <button
                    onClick={openProfileBar}
                    type="button"
                    className="rounded-full outline-none bg-[#2B2B2B] p-1 text-white   focus:ring-offset-[#2B2B2B]"
                    title="Profile"
                  >
                    <span className="sr-only">User Profile</span>
                    <RiUser6Line size={26} className="p-1" />
                  </button>
                </div>
                {
                  // PROFILE PANNEL
                  showProfile && (
                    <div className="absolute rounded-xl h-20 -right-10 mt-[1%] bg-[#242424] w-[120px]">
                      <div className=" flex flex-col  ml-5 text-xl mt-1">
                        <Link
                          to="/profile"
                          className="text-white flex items-center"
                        >
                          <AiOutlineUser className="mr-1" size={""} />
                          Profile
                        </Link>
                        <Link
                          onClick={auth.logout}
                          className="text-red-400 flex items-center"
                        >
                          <IoIosLogOut className="mr-1" />
                          LogOut
                        </Link>
                      </div>
                    </div>
                  )
                }

                {/* NOTIFICATION PANNEL */}
                {showNotifications && <NotificationPanel />}
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className=" lg:hidden text-button-custom-color rounded-3xl py-1 px-16 flex items-center absolute right-0 top-1 ">
                <p className="py-1 text-[20px]">Login</p>
              </button>
              <button className="hidden lg:block bg-button-custom-color text-white rounded-3xl py-1 px-16 mt-2 absolute right-0 top-1 ">
                <p className="py-1 text-[20px]">Login</p>
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="lg:hidden bg-black w-full h-14 flex flex-row items-center   justify-between">
        {/* <p className="text-white text-2xl font-[600] ml-3">Filter</p> */}
        <div
          className="px-5 flex flex-row justify-between"
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu
            size={24}
            onClick={() => setShowMenu(!showMenu)}
            className="text-white mr-4 "
          />
        </div>
        <img
          className="block h-8 w-auto lg:hidden mr-6"
          src={vector}
          alt="cloudlyz"
        />
      </div>

      {showMenu && (
        <div className="space-y-1 px-2 pt-2 pb-3 bg-gray-900">
          {/* <button
            onClick={handleGoBack}
            className=" text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Back
          </button> */}

          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {accountType == "trainer" && (
            <Link
              to="/trainer/new"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Upload Course
            </Link>
          )}
          {accountType == "student" && (
            <Link
              to="/courses"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Browse Courses
            </Link>
          )}
          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <Link
                onClick={auth.logout}
                className="text-red-500 hover:bg-gray-700  block px-3 py-2 rounded-md text-base font-medium"
              >
                LogOut
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const NotificationPanel = () => {
  return (
    <div className="bg-[#242424] rounded-[32px] shadow-lg p-6 w-[480px] px-10 py-3 absolute top-16 right-[-35px]">
      <h1 className="text-4xl font-semibold text-white mb-10">Notifications</h1>

      <div className="flex items-start justify-center max-w-sm mb-7">
        <img
          src="https:picsum.photos/50/50"
          alt="Avatar"
          className="rounded-full w-20 h-20 mr-4"
        />

        <div>
          <p className="font-medium text-2xl mb-1 text-gray-200">
            Photoshopped by Tanmay Designer unlocked
          </p>
          <p className="text-base font-semibold text-gray-400">
            Today at 5:44 AM
          </p>
        </div>
      </div>

      <div className="flex items-start justify-center max-w-sm mb-7">
        <img
          src="https:picsum.photos/50/50"
          alt="Avatar"
          className="rounded-full w-20 h-20 mr-4"
        />

        <div>
          <p className="font-medium text-2xl mb-1 text-gray-200">
            Photoshopped by Tanmay Designer unlocked
          </p>
          <p className="text-base font-semibold text-gray-400">
            Today at 5:44 AM
          </p>
        </div>
      </div>

      <div className="flex items-start justify-center max-w-sm mb-7">
        <img
          src="https:picsum.photos/50/50"
          alt="Avatar"
          className="rounded-full w-20 h-20 mr-4"
        />

        <div>
          <p className="font-medium text-2xl mb-1 text-gray-200">
            Photoshopped by Tanmay Designer unlocked
          </p>
          <p className="text-base font-semibold text-gray-400">
            Today at 5:44 AM
          </p>
        </div>
      </div>

      <div className="flex items-start justify-center max-w-sm mb-7">
        <img
          src="https:picsum.photos/50/50"
          alt="Avatar"
          className="rounded-full w-20 h-20 mr-4"
        />

        <div>
          <p className="font-medium text-2xl mb-1 text-gray-200">
            Photoshopped by Tanmay Designer unlocked
          </p>
          <p className="text-base font-semibold text-gray-400">
            Today at 5:44 AM
          </p>
        </div>
      </div>

      <div className="flex items-start justify-center max-w-sm mb-7">
        <img
          src="https:picsum.photos/50/50"
          alt="Avatar"
          className="rounded-full w-20 h-20 mr-4"
        />

        <div>
          <p className="font-medium text-2xl mb-1 text-gray-200">
            Photoshopped by Tanmay Designer unlocked
          </p>
          <p className="text-base font-semibold text-gray-400">
            Today at 5:44 AM
          </p>
        </div>
      </div>

      {/* Add more notifications here */}
    </div>
  );
};

export default Navbar;
