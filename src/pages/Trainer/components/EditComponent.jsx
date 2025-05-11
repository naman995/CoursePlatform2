import React from "react";


function EditComponent() {
  return (
    <div className=" absolute  mb-4 right-2 top-2 bg-gray-500 hover:bg-gray-600 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 justify-center items-center">
      <GrEdit style={{ color: "white" }} className="text-white h-8" />{" "}
      <span className="text-2xl text-white">|</span>{" "}
      <AiFillDelete style={{ color: "white" }} className="h-8" />
    </div>
  );
}

export default EditComponent;
