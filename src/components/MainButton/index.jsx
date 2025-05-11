import React from "react";
import { Link } from "react-router-dom";

const MainButton = ({ style, text, onClick, goto }) => {
  return (
    <>
      <Link to={goto}>
        <button
          className= {`bg-login-button-custom-color px-6 py-3 rounded-3xl text-white font-semibold ${style}`}
          onClick={onClick}
        >
           {text}
        </button>
      </Link>
    </>
  );
};

export default MainButton;
