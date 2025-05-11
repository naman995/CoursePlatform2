import React,{useState} from "react";
 

function Card({ prop }) {
  const [editable, setEditable] = useState(false);
  const handleClick = () => {
    setEditable(!editable);
  };
  return (
    <div
      className="
        flex
        justify-center
        text-3xl md:text-7xl 
        p-6 w-50 h-50 bg-slate-300 md:p-10 md:w-60 md:h-60 mx-10 md:bg-gray-300
        items-center
        drop-shadow-md	
        rounded-md"
    >
      <div onClick={handleClick} className="flex">
         <p>{prop.description}</p>
      </div>
    </div>
  );
}

export default Card;
