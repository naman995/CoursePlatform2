import React from "react";
import logo from "@/assets/Home/Footerlogo.png";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-footer-custom-color px-2 pt-8 text-white h-auto  lg:px-20  pb-10">
      <div className="flex-cols lg:flex lg:justify-between lg:py-10">
        <div className=" flex-cols ">
          <img
            className="lg:mx-auto mt-0 lg:mt-2 h-[3rem] w-[10rem] lg:h-auto lg:w-auto"
            src={logo}
            alt=""
          />
        </div>
        <div className="mt-4 lg:inset-0 space-y-2">
          <p className="text-2xl">Wanted to say hello ?</p>
          <p className="font-light text-[14px]">USE THIS EMAIL</p>
          <p className="font-light">sales@bootlabstech.com</p>
        </div>
        <div>
          <p className="text-2xl mt-4 lg:inset-0 ">Follow us on social Media</p>
          <div className="flex space-x-8 mt-2  text-white ">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100092294291959"
            >
              <AiFillFacebook
                size={30}
                className="text-2xl bg-Icongradient p-1 rounded-full"
              />
            </a>
            <a target="_blank" href="https://instagram.com/_learnxtech_">
              <AiFillInstagram
                size={30}
                className="text-2xl bg-Icongradient p-1 rounded-full"
              />
            </a>
            {/* <a target="_blank" href="">
              <AiOutlineTwitter
                size={30}
                className="text-2xl bg-Icongradient p-1 rounded-full"
              />
            </a> */}
            <a target="_blank" href="https://www.youtube.com/@LearnxTech/f">
              <AiFillYoutube
                size={30}
                className="text-2xl bg-Icongradient p-1 rounded-full"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/learnxtech"
            >
              <AiFillLinkedin
                size={30}
                className="text-2xl bg-Icongradient p-1 rounded-full"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-gray-300 rounded-full mt-4 lg:mt-2"></div>
      <div className="flex-cols lg:flex  justify-between mt-10">
        <ul>
          <li className="text-2xl">
            <Link to="">Company </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">About Us </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Terms </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Privacy Policy </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="/login">LogIn </Link>
          </li>
        </ul>
        <ul>
          <li className="text-2xl mt-5 lg:mt-0">
            <Link to="">Learn </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Home </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Why cloudlyz? </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Use Cases </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Pricing </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Community </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Features </Link>
          </li>
        </ul>
        <ul>
          <li className="text-2xl mt-5 lg:mt-0">
            <Link to="">More </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Become Trainer </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Blogs </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Status </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Support </Link>
          </li>
          <li className="font-light mt-3">
            <Link to="">Forum </Link>
          </li>
        </ul>
        <div>
          <div>
            <p className="text-2xl mt-5 lg:mt-0">Address</p>

            <p className="border-b-2 border-gray-400 font-light pb-2">
              xyz Locality,
              <br />
              Bengaluru,201033
              <br />
              India
            </p>
            <div className="mt-2 font-light">
              <p>
                Copyright All Rights Are Reserved <br /> Under Cloudlyz.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
