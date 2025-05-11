import React from 'react'

const LoginBottomText = () => {
  return (
    <div className='flex-col lg:flex lg:flex-row  font-light text-[11px] lg:text-[12px]  '>
      <p className=" text-placeholder-gray-custom-color whitespace-nowrap font-light text-[11px] lg:text-[12px] flex flex-row mt-10 ">
        By Logging In, You Agree With Cloudlyz’s 
        <span className="text-yellow-custom-color ">&nbsp;Privacy Policy</span>
        &nbsp;And
        <span className="text-yellow-custom-color hidden lg:block ">
          &nbsp;Terms Of Service
        </span>
      </p>
        <div className="text-yellow-custom-color text-center w-full lg:hidden">
          Terms Of Service
        </div>
    </div>
  );
}

export default LoginBottomText