import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import { useState } from "react";
import useAccountType from "@/hooks/useAccountType";
import ReactPlayer from "react-player";

export default function CourseContentCard({
  title,
  duration,
  index,
  description,
  courseId,
  videoUrl,
  percent,
}) {
  const { acType } = useAccountType();
  let _index = index + 1;
  const [isOpen, setOpen] = useState(false);
  const handlePlay = () => {
    setOpen(true);
  };

  const RenderButton = ({ children }) => {
    if (acType === "trainer") {
      return (
        <button
          onClick={handlePlay}
          className="relative flex flex-col min-w-[400px] max-w-[400px] h-[300px] bg-[#222222] p-12 hover:scale-110 cursor-pointer group"
        >
          {children}
        </button>
      );
    } else {
      return (
        <Link
          to={`/watch/${courseId}/${index}`}
          className="relative flex flex-col min-w-[400px] max-w-[400px] h-[300px] bg-[#222222] p-12 hover:scale-110 cursor-pointer group"
        >
          {children}
        </Link>
      );
      // } else {
      //   return (
      //     <div className="relative flex flex-col min-w-[400px] max-w-[400px] h-[300px] bg-[#222222] p-12 hover:rounded-t-[18px] rounded-xl hover:scale-110 cursor-pointer group">
      //       {children}
      //     </div>
      //   );
      // }
    }
  };

  return (
    <>
      <RenderButton>
        {!isOpen && (
          <span className="text-white font-bold text-lg mt-4 absolute -top-8 -left-3 bg-[#FD7373] rounded-full h-10 w-10 z-10 flex items-center justify-center">
            {_index}
          </span>
        )}

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="relative h-full w-full">
            <div className="h-full w-full flex items-center justify-center hover:rounded-t-[18px] rounded-xl relative">
              <div className="absolute top-0 left-0 w-full h-full hover:rounded-t-[18px] rounded-xl opacity-30 -mt-12">
                <video className="w-full h-full" autoPlay={false} muted>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
              <span className="rounded-full h-12 w-12 bg-[#4A47EF] flex items-center justify-center z-10 -mt-16">
                <BsFillPlayFill className="text-white text-3xl ml-1 mt-0.5" />
              </span>
            </div>
            <div
              className={`-mt-20 mx-6 ${isOpen ? "z-10" : "z-0"} float-left`}
            >
              <div className="mb-4">
                <p className="text-[#AEAEAE] font-normal text-lg">
                  Lesson {_index}
                </p>
                <h1 className="text-white font-semibold text-xl">
                  {title.length > 0 ? (
                    title
                  ) : (
                    <span className="text-[#AEAEAE]">No title</span>
                  )}
                </h1>
              </div>
            </div>
            <div
              className={`w-[32%] bg-[#FF2D2D] h-2 rounded-r group-hover:block hidden`}
            />
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 min-w-[400px] max-w-[400px] bg-black z-20 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {/* <video className="w-full h-full" controls>
            <source src={videoUrl} type="video/mp4" />
          </video> */}
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </RenderButton>
    </>
  );
}
