import React from "react";
import { useLoaderData } from "react-router-dom";
import { getCourse } from "@/apis/courses";

import SideBar from "./components/SideBar";
import Content from "./components/Content";

export async function loader({ params }) {
  const { course } = await getCourse(params.courseId);
  //await getCourse(params.courseId);
  if (!course) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  console.log(params.index);
  return { course, selected: params.index };
}

function WatchCourse() {
  const { course, selected } = useLoaderData();
  const [perc, setPerc] = React.useState(
    course?.students.filter(
      (s) => s.student === JSON.parse(localStorage.getItem("current-user"))._id
    )[0].completedPercentage
  );

  return (
    <div className="bg-[#101010] min-h-screen w-full px-2 lg:px-16 -mt-4">
      <SideBar content={course.content} selected={selected} />
      <Content
        content={course.content[selected]}
        id={course._id}
        perc={perc}
        numContents={course.content.length}
        setPerc={setPerc}
      />
    </div>
  );
}

export default WatchCourse;
