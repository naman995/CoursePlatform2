import React, { useState, useEffect } from "react";
import logo from "@/assets/Home/logomini.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation, Link } from "react-router-dom";

function NavLinks({ style }) {
  const location = useLocation();
  const Links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Course",
      path: "/courses",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
    {
      name: "About Us",
      path: "/aboutUs",
    },
    {
      name: "Services",
      path: "/services",
    },
  ];
  return (
    <ul className="flex flex-col lg:flex lg:flex-row  text-gray-700 font-semibold mr-12 pb-2 lg:pb-0 cursor-pointer">
      {Links.map((link) => (
        <li className=" ml-2  lg:ml-10" key={link.name}>
          <Link
            to={link.path}
            className={`${
              location.pathname === link.path ? " text-white" : "text-[#8D8D8D]"
            }`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NavBar() {
  const [isOn, setIsOn] = useState(false);

  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    (async () => {
      //get account type
      const user = JSON.parse(localStorage.getItem("current-user"));

      if (user) setAccountType(user.accountType);
      else setAccountType(null);
    })();
  }, []);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  return (
    <div>
      <div className="">
        <nav className="bg-black lg:hidden items-center justify-between w-auto flex">
          <div className="ml-10">
            <img src={logo} alt="logo" className="lg:ml-[90%] h-[40px]" />
          </div>
          <div className="flex items-center space-x-5 mr-6 text-lg">
            <div className="flex mr-[4%] items-center  text-lg ">
              {/* <NavLinks /> */}
              {accountType == "trainer" && (
                <Link to="/trainer">
                  <button className="text-button-custom-color font-[600] flex items-center ">
                    <p className="py-1 w-32 text-[17px] lg:text-[20px]">View Dashboard</p>
                  </button>
                </Link>
              )}
              {accountType == "student" && (
                <Link to="/dashboard">
                  <button className="text-button-custom-color font-[600]   flex items-center ">
                    <p className="py-1 w-32 text-[17px] lg:text-[20px]">View Dashboard</p>
                  </button>
                </Link>
              )}
              {!accountType && (
                <Link to="/login">
                  <button className="text-button-custom-color font-[600]    flex items-center ">
                    <p className="py-1 w-10 text-[17px] lg:text-[20px]">Login</p>
                  </button>
                </Link>
              )}
            </div>
            {/* <div className="bg-button-custom-color text-white rounded-lg py-2 px-4 flex items-center ">
              <BsFillPersonFill size={23} className="mr-2" />
              <button className="">My Account</button>
            </div> */}
            <div onClick={handleToggle} className=" p-3 rounded-2xl">
              <GiHamburgerMenu className="text-white" size={30} />
            </div>
          </div>
        </nav>
        {isOn && (
          <div className="lg:hidden bg-black text-white text-3xl pl-5">
            {<NavLinks />}
          </div>
        )}
      </div>

      {/* Large screen */}
      <nav className="bg-black hidden lg:flex items-center justify-between w-auto h-[80px]">
        <div className="flex ml-20">
          <div>
            <img src={logo} alt="logo" className="mr-6 h-[50px] " />
          </div>
        </div>
        <div className="flex mr-[4%] items-center  text-lg ">
          <NavLinks />
          {accountType == "trainer" && (
            <Link to="/trainer">
              <button className="bg-button-custom-color text-white rounded-3xl py-2 px-16 flex items-center ">
                <p className="py-1 text-[20px]">View Dashboard</p>
              </button>
            </Link>
          )}
          {accountType == "student" && (
            <Link to="/dashboard">
              <button className="bg-button-custom-color text-white rounded-3xl py-2 px-16 flex items-center ">
                <p className="py-1 text-[20px]">View Dashboard</p>
              </button>
            </Link>
          )}
          {!accountType && (
            <Link to="/login">
              <button className="bg-button-custom-color text-white rounded-3xl py-2 px-16 flex items-center ">
                <p className="py-1 text-[20px]">Login</p>
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
