import React from "react";
import { updateCompletedPercentage } from "@/apis/courses";
import ReactPlayer from "react-player";

function Content({ content, id, perc, numContents, setPerc }) {
  const handleOnEnded = () => {
    const contentWeight = 100 / numContents + perc;
    setPerc(contentWeight);
    updateCompletedPercentage(id, contentWeight);
  };

  return (
    <div class="p-4 lg:ml-64 mt-[14%] lg:mt-[4.5%]">
      <div class="p-4 rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-start">
          {/* <iframe
            width="1920"
            height="720"
            src="https://www.youtube.com/embed/EVPKj91hEcY"
            title="Building the WORLDS FASTEST Foam RC Jet!"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}

          <video
            class="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
            controls
            onEnded={handleOnEnded}
          >
            <source src={content?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <ReactPlayer
            url={content?.videoUrl}
            controls
            onEnded={handleOnEnded}
            width="100%"
            height="100%"
          /> */}
        </div>
        <div className="my-6">
          <h1 className="text-3xl text-gray-100 font-semibold">
            {content?.title}
          </h1>
          <div className="text-gray-100 my-2  ">{content?.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Content;
