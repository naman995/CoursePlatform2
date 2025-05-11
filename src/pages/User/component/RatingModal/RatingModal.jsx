import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function RatingModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* button to open modal */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Rate our course
      </button>

      {/* modal overlay */}
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* modal content */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-[68px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-5/6 lg:max-w-4xl py-7"
              // style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            >
              {/* modal header */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 text-center">
                <h3 className="text-4xl font-semibold leading-6 text-gray-600 pb-5">
                  Rate Our Course
                </h3>
                <div className="mt-2 flex justify-center items-center">
                  <AiFillStar
                    size={60}
                    className="text-yellow-400 cursor-pointer"
                  />
                  <AiFillStar
                    size={60}
                    className="text-yellow-400 cursor-pointer"
                  />
                  <AiFillStar
                    size={60}
                    className="text-yellow-400 cursor-pointer"
                  />
                  <AiFillStar
                    size={60}
                    className="text-yellow-400 cursor-pointer"
                  />
                  <AiOutlineStar
                    size={60}
                    className="text-yellow-400 cursor-pointer"
                  />
                </div>
              </div>
              {/* modal body */}
              <div className="px-4 py-3 sm:px-6 flex justify-center">
                <textarea
                  className="w-4/5 h-48 rounded-lg focus:outline-none border border-[#8B8B8B] resize-none"
                  placeholder="Leave your feedback here..."
                ></textarea>
              </div>
              {/* modal footer */}
              <div className="flex justify-center p-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-12 py-3 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Send feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RatingModal;
