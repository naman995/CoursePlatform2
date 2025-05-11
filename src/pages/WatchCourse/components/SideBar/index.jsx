import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

function ListItem({ item, selected, index }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const currentLocation = window.location.href;

    //check if last character is a /
    if (currentLocation[currentLocation.length - 1] === "/") {
      window.location.href = currentLocation?.slice(0, -2) + index;
    } else {
      window.location.href = currentLocation?.slice(0, -1) + index;
    }
  };

  return (
    <li
      class={`flex flex-row justify-between items-center space-x-2 hover:bg-stone-700 ${
        selected && "bg-stone-700"
      } px-2 py-3 rounded cursor-pointer`}
      onClick={handleClick}
    >
      <span class="text-sm font-medium text-white">{item.title}</span>
      {selected && (
        <span className="rounded-full h-6 w-6 bg-green-600 flex items-center justify-center">
          <AiOutlineCheck className="text-white" size={14} />
        </span>
      )}
    </li>
  );
}

function SideBar({ content, selected }) {
  const [isClosed, setIsClosed] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const handleClosed = () => {
    setIsClosed(true);
    setIsOpened(false);
  };
  const handleOpened = () => {
    setIsOpened(true);
    setIsClosed(false);
  };
  return (
    <aside
      id="default-sidebar"
      className={`fixed lg:mt-0 mt-[1.5%] left-0 h-full z-40 w-64 transition-transform ${
        isClosed ? "-translate-x-[88%]" : ""
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-[#222222] dark:bg-[#222222]">
        <div className="flex flex-row justify-between">
          <button onClick={handleClosed} className="block lg:hidden text-white">
            Close
          </button>
          {isClosed && (
            <button
              onClick={handleOpened}
              className="block lg:hidden text-white"
            >
              <AiOutlineArrowRight size={20} />
            </button>
          )}
        </div>

        <ul className="space-y-2 font-medium">
          {content.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              selected={selected === index}
              index={index}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}
export default SideBar;
