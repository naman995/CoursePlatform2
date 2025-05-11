import React from "react";

const DropDownInputField = ({ placeholder }) => {
  const skills = [
    {
      id: 0,
      name: "Select",
    },
    {
      id: 1,
      name: "Select",
    },
  ];
  const experience = [
    {
      id: 0,
      name: "Select",
    },
    {
      id: 1,
      name: "Select",
    },
  ];

  const IntrestedIn = [
    {
      id: 0,
      name: "Frontend Development",
    },
    {
      id: 1,
      name: "Photoshop Design",
    },
  ];

  return (
    <div className="mx-4">
      <div className="justify-center ">
        <div className=" mb-6  items-center justify-center border-3xl border-[1px] rounded-3xl px-4 py-3  border-[#7D7D7D]">
          <select
            name=""
            id=""
            className="bg-login-background-custom-color text-[#7D7D7D] outline-none w-[150px]"
          >
            <option value="" className="bg-black ">
               
                Select Your Skills
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
            </option>
            {skills.map((skill) => (
              <option value={skill.id} className="text-white">
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" mb-6 items-center justify-center border-3xl border-[1px] rounded-3xl px-4 py-3  border-[#7D7D7D]">
          <select
            name=""
            id=""
            className="bg-login-background-custom-color text-[#7D7D7D] outline-none"
          >
            <option value="" className="bg-black pr-10">
              
                Experience Years
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
            </option>
            {experience.map((exp) => (
              <option value={exp.id} className="text-white">
                {exp.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row  mb-8 items-center border-3xl border-[1px] rounded-3xl px-6 py-3  border-[#7D7D7D] w-[360px] mx-auto">
        <select
          name=""
          id=""
          className="bg-login-background-custom-color text-[#7D7D7D] outline-none"
        >
          <option value="" className="bg-black ">
            You Are Intrested In
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </option>
          {IntrestedIn.map((int) => (
            <option value={int.id} className="text-white">
              {int.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDownInputField;
