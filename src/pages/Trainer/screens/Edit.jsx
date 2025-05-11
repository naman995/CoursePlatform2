import React from "react";

import AddVideos from "../components/AddVideos";
import CourseDetails from "../components/CourseDetails";
import EnterPricing from "../components/EnterPricing";
import Actions from "../components/Actions";

import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { updateCourse } from "@/apis/courses";
import { toast } from "react-toastify";
import { getCourseNoConversion } from "../../../apis/courses";

export async function loader({ params }) {
  const course = await getCourseNoConversion(params.courseId);
  return { course: course.course, related_courses: course.related_courses };
}

function EditCourse() {
  const { course: oldCourse } = useLoaderData();
  const [course, setCourse] = useState({ ...oldCourse });

  const setMainDetails = (data) => {
    toast.success("Course details updated!");
    setCourse({ ...course, ...data, description: { short: data.description } });
  };

  const setVideos = (data) => setCourse({ ...course, content: data });

  const setPricing = (data) => {
    setCourse({ ...course, price: data, discount: data.discount });
    console.log(data);
    toast.success("Pricing details updated!");
  };

  const handleUpdateCourse = async () => {
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
      .promise(updateCourse(finalCourse), {
        pending: "Updating course...",
        success: "Course updated successfully",
        error: "Failed to update course",
      })
      .then((res) => {
        setTimeout(() => {
          window.location.href = "/trainer";
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to update the course");
        console.log(err);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 mt-[30%] lg:mt-[7%] ">
      <CourseDetails
        setMainDetails={setMainDetails}
        values={course}
        typeEditable={false}
      />

      <AddVideos
        setVideos={
          course.type === "ONLINE_TRAINING" ? setVideos : setMainDetails
        }
        courseType={course.type}
        values={course}
      />

      <EnterPricing setPricing={setPricing} values={course} />

      <Actions
        handleCreateCoures={handleUpdateCourse}
        actionTitle={"Update Course"}
        values={course}
      />
    </div>
  );
}

export default EditCourse;
