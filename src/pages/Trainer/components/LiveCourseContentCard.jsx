import { Link } from "react-router-dom";

export default function LiveCourseContentCard({
  title,
  duration,
  index,
  description,
  courseId,
  videoUrl,
  liveLink,
  dateTime,
}) {
  let _index = index + 1;

  return (
    <a
      href={liveLink}
      className="relative flex flex-col min-w-[400px] max-w-[400px] h-[250px] bg-[#222222] p-12 hover:rounded-t-[18px] rounded-xl hover:scale-110 cursor-pointer group mr-6"
    >
      <div className=" w-full h-full">
        <div className="  h-full w-full">
          <div className=" mx-6">
            <div className="mb-4">
              <p className="text-[#AEAEAE] font-normal text-lg">
                <h1 className="text-white font-semibold text-xl">{title}</h1>

                <p className="mt-10 text-white">Date & Time - {dateTime}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
