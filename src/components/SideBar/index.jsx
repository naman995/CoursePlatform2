import { Link } from "react-router-dom";

import { BiHome } from "react-icons/bi";

import navLinks from "@/routes/NavLinks";

export default function index() {
  return (
    <div
      className="w-64 h-full bg-white absolute border-r shadow-md"
      id="sidenavSecExample"
    >
      <ul className="relative mt-1.5">
        <li className="relative my-3">
          <Link
            to="/"
            className={`flex items-center py-1.5 px-3 mx-2 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out`}
          >
            <span className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center text-center mr-2">
              <BiHome className="w-5 h-5" />
            </span>
            <span className={`text-md font-semibold`}>Home</span>
          </Link>
        </li>
        <hr className="border-b border-gray-200" />
        {navLinks.map((link, index) => (
          <span key={index}>
            <h3 className="text-black font-semibold mx-4 mt-2 mb-1">
              {link.type}
            </h3>
            {link.routes?.map((route, index) => (
              <span key={index}>
                <li className="relative my-1">
                  <Link
                    to={route.to}
                    className={`flex items-center py-1.5 px-3 mx-2 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out`}
                  >
                    <span className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center text-center mr-2">
                      {route.icon ? route.icon : null}
                    </span>
                    <span className={`text-lg font-semibold`}>
                      {route.name}
                    </span>
                  </Link>
                </li>
              </span>
            ))}
            <hr className="border-b border-gray-200 mt-2" />
          </span>
        ))}
      </ul>
    </div>
  );
}
