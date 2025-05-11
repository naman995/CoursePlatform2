import React from "react";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import CardTag from "@/components/CardTag";
import { FaCloudDownloadAlt, FaPlay } from "react-icons/fa";
import { getCertificate } from "@/apis/courses";

import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import { convertSecondsToDaysOrWeeks } from "../../apis/courses";

function getAppropriateTime(durationIn, value) {
  switch (durationIn) {
    case "hours":
      return value > 1
        ? `${Math.round((value / 60).toFixed(1))} hours`
        : "1 hour";
    case "days":
      return value > 1 ? `${Math.round(value / 1440)} days` : "1 day";
    case "weeks":
      return value > 1 ? `${Math.round(value / 10080)} weeks` : "1 week";
    case "months":
      return value > 1 ? `${Math.round(value / 43800)} months` : "1 month";
    default:
      return "hours";
  }
}

const Card = ({
  title,
  image,
  description,
  duration,
  _id,
  category,
  content,
  type,
  completedPercentage,
  completed,
  skill,
  trainer,
}) => {
  const colorBasedOnPercentage = (percentage) => {
    if (percentage < 25) {
      return {
        pathColor: "#ff0303",
        trailColor: "rgba(255, 3, 3, 0.1)",
      };
    } else if (percentage < 50) {
      return {
        pathColor: "#ff6f03",
        trailColor: "rgba(255, 111, 3, 0.1)",
      };
    } else if (percentage < 75) {
      return {
        pathColor: "#039eff",
        trailColor: "rgba(3, 158, 255, 0.1)",
      };
    } else {
      return {
        pathColor: "#03ff4f",
        trailColor: "rgba(3, 255, 79, 0.1)",
      };
    }
  };

  const handleDownloadCertificate = (id) => async () => {
    toast.promise(getCertificate(id), {
      pending: "Downloading certificate...",
      success: "Certificate downloaded successfully!",
      error: "Error downloading certificate!",
    });
  };

  return (
    <div className="pl-3">
      <div className="m-3">
        <div className=" h-auto lg:w-[511px] lg:h-[440px] bg-[#fdfdfd] rounded-lg good-shadow overflow-hidden p-3">
          {/* CARD HEADER SECTION */}
          <div className="flex flex-col lg:flex-row space-x-3 mb-2">
            <img
              className="lg:w-[157px] h-[170px] rounded-2xl object-cover"
              src={image}
              alt="cardImage"
            />
            <div className="flex flex-col justify-start">
              <h5 className="mb-2 text-3xl font-semibold text-black leading-normal line-clamp-2">
                {title}
              </h5>

              {/* CARD TAGS */}
              <div className="flex flex-wrap mb-2">
                <CardTag bg="bg-[#BFFC90]" title={category.replace("_", " ")} />
                <CardTag bg="bg-[#FFDBC7]" title={skill} />
              </div>
              <div className="flex flex-wrap mb-2">
                <p>{content?.length > 0 ? content.length : 0} Lessons,</p>
                &nbsp;
                <p>{convertSecondsToDaysOrWeeks(duration?.val)}</p>
              </div>
            </div>
          </div>
          <p className="text-black text-xl my-6 tracking-wider leading-8 font-normal good-font line-clamp-3">
            {description?.short}
          </p>
          {/* Download button and Circle */}
          <div className="cursor-pointer flex justify-between items-center">
            {completedPercentage >= 100 && completed ? (
              <button
                onClick={handleDownloadCertificate(_id)}
                className="flex justify-start items-center"
              >
                <div className="h-16 w-16 rounded-full bg-blue-600 flex justify-center items-center mr-2">
                  <FaCloudDownloadAlt size={29} className="text-white" />
                </div>
                <span className="text-blue-600 text-2xl font-medium hover:underline">
                  Download Certificate
                </span>
              </button>
            ) : (
              <Link
                to={`/course/${_id}`}
                className="flex justify-start items-center"
              >
                <div className="h-16 w-16 rounded-full bg-[#4A47EF] flex justify-center items-center mr-2">
                  <FaPlay size={29} className="text-white" />
                </div>
                <span className="text-black text-2xl font-medium hover:underline">
                  Continue learning
                </span>
              </Link>
            )}
            {type === "ONLINE_TRAINING" && (
              <Link to={`/course/${_id}`} className="w-24 mr-4">
                <CircularProgressbar
                  counterClockwise={false}
                  styles={buildStyles({
                    // Text size
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    // Colors
                    pathColor:
                      colorBasedOnPercentage(completedPercentage).pathColor,
                    textColor:
                      colorBasedOnPercentage(completedPercentage).pathColor,
                    trailColor:
                      colorBasedOnPercentage(completedPercentage).trailColor,
                  })}
                  value={Math.floor(completedPercentage)}
                  text={`${
                    Math.round(completedPercentage) > 100
                      ? 100
                      : Math.round(completedPercentage)
                  }%`}
                  strokeWidth={12}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
