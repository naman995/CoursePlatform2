import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import moment from "moment";
import { convertSecondsToDaysOrWeeks } from "../../../../apis/courses";

function calcDuration(minutes) {
  const duration = moment.duration(minutes, "minutes");

  const hours = duration.hours();
  const remainingMinutes = duration.minutes();

  return `${hours} hours ${
    remainingMinutes > 0 ? remainingMinutes + " minutes" : ""
  }`;
}

function Accordion({ items, isCourseEnrolled }) {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div className="border border-gray-300 rounded-md mb-2 p-2 lg:p-8">
      {items.length === 0 && (
        <div className="flex justify-center items-center text-2xl font-normal text-blue-600 cursor-pointer mt-2">
          No Content Available
        </div>
      )}
      {items.length > 0 &&
        items.map((item, index) => (
          <div
            key={index}
            className="px-2 py-4 border-b border-b-[#D0D0D0] last:border-0 "
          >
            <div
              className="flex flex-row justify-start items-center space-x-3 pb-2 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <span className="mr-2 text-gray-700 text-2xl font-medium">
                <b>{index + 1}.</b>
              </span>
              <div className="flex items-end">
                {openAccordionIndex === index ? (
                  <BsChevronUp className="text-[#4D5EDC]" size={25} />
                ) : (
                  <BsChevronDown className="text-[#4D5EDC]" size={25} />
                )}
              </div>
              <div className="flex w-full justify-between">
                <p className="font-normal text-2xl">{item.title}</p>
                <p className="text-xl font-normal text-[#747474] mr-12">
                  {} {item.duration && convertSecondsToDaysOrWeeks(item.duration)}
                </p>
              </div>
            </div>
            <div className="flex mx-6">
              {openAccordionIndex === index && (
                <p className="font-light text-xl ml-14 pb-4">
                  {item.description}
                </p>
              )}
              {/* {isCourseEnrolled && openAccordionIndex === index && (
              <div className="flex justify-center items-center text-2xl font-normal text-blue-600 cursor-pointer ml-auto mb-2">
                <a
                  href={item.videoUrl}
                  target="_blank"
                  className="flex flex-col justify-center items-center"
                >
                  Watch Video
                </a>
              </div>
            )} */}
            </div>
          </div>
        ))}
      {/* <div className="flex justify-center items-center text-2xl font-normal text-blue-600 cursor-pointer mt-2">
        <div className="flex flex-col justify-center items-center">
          View All
          <p>
            <BsChevronDown />
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Accordion;

// {
//   isOpen ? (
//     <BsChevronUp className="h-5 w-5 text-gray-500 transform rotate-180" />
//   ) : (
//     <BsChevronDown className="h-5 w-5 text-gray-500" />
//   );
// }

// <div
//   className={`${
//     isOpen ? "h-28" : "max-h-0"
//   } overflow-hidden transition-all duration-500`}
// >
//   <div className="p-4">{content}</div>
// </div>;
