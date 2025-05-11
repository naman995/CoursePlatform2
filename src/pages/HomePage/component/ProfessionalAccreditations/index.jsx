import React from "react";
import amazon from "../../../../assets/Home/amazon.png";
import google from "../../../../assets/Home/google.png";

const ProfessionalAccreditations = () => {
  const logo = [
    {
      id: 1,
      image: amazon,
      alternate: "amazon",
    },
    {
      id: 2,
      image: google,
      alternate: "google",
    },
    {
      id: 3,
      image: google,
      alternate: "google",
    },
    {
      id: 4,
      image: google,
      alternate: "google",
    },
    {
      id: 5,
      image: google,
      alternate: "google",
    },
  ];

  return (
    <div className="bg-black text-white flex flex-col  items-center justify-center mt-20 h-96">
      <p className="text-[40px] font-semibold text-center lg:text-left">
        Professional Accreditations
      </p>
      <p className="text-[20px] mt-5 mx-[13%] text-center font-extralight text-[#737373]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        fermentum ornare risus in pulvinar. Donec finibus risus sem, in aliquam
        leo lobortis sed. In pretium elit dolor, et ultricies urna imperdiet
        view more
      </p>
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-10 mt-8 ">
          {logo.map((item) => (
            <img key={item.id} src={item.image} alt={item.alternate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAccreditations;
