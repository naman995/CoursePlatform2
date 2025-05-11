import React, { useEffect } from "react";

import AddVideos from "../components/AddVideos";
import CourseDetails from "../components/CourseDetails";
import EnterPricing from "../components/EnterPricing";
import Actions from "../components/Actions";

import { createCourse } from "@/apis/courses";
import { toast } from "react-toastify";

function TrainerUpload() {
  const [course, setCourse] = React.useState({
    title: "",
    image:
      "/Course.jpg",
    description: {
      short: "",
      long: "",
    },
    skill: "",
    category: "",
    requirements: [
      "No programming experience needed - I'll teach you everything you need to know",
      "A computer with access to the internet",
      "No paid software required",
      "I'll walk you through, step-by-step how to get all the software installed and set up",
    ],
    perks: [
      "Certificate of completion",
      "On-demand video",
      "Access on mobile and TV",
      "Downloadable resources",
      "Coding exercises",
    ],
    price: {
      per: "",
      amt: "",
    },
    duration: {
      in: "",
      val: "",
    },
    language: "",
    content: [
      {
        title: "",
        description: "",
        duration: "",
        videoUrl: "",
      },
    ],
    type: "ONLINE_TRAINING",
    liveLink: "",
    liveTime: "",
    discount: 0,
  });

  const setMainDetails = (data) => {
    console.log(data);
    setCourse({ ...course, ...data, description: { short: data.description } });
  };

  const setVideos = (data) => setCourse({ ...course, content: data });

  const setPricing = (data) => {
    setCourse({ ...course, price: data, discount: data.discount });
    toast.success("Course pricing saved successfully");
  };

  const handleCreateCourse = async () => {
    const totalDuration = course.content.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );
    console.log(totalDuration);

    setCourse({ ...course, duration: { in: "weeks", val: totalDuration } });
    const finalCourse = {
      ...course,
      duration: { in: "weeks", val: totalDuration },
    };

    toast
      .promise(createCourse(finalCourse), {
        pending: "Creating course...",
        success: "Course created successfully",
        error: "Failed to create course",
      })
      .then((res) => {
        setTimeout(() => {
          window.location.href = "/trainer";
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to create the course");
        console.log(err);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 mt-[30%] lg:mt-[7%] ">
      <CourseDetails setMainDetails={setMainDetails} />

      <AddVideos
        setVideos={
          course.type === "ONLINE_TRAINING" ? setVideos : setMainDetails
        }
        courseType={course.type}
      />

      <EnterPricing setPricing={setPricing} />

      <Actions handleCreateCoures={handleCreateCourse} />
    </div>
  );
}

export default TrainerUpload;
