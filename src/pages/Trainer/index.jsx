import { getTrainerCourses } from "@/apis/courses";
import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getCourses, createCourse } from "../../functions/courses";
import CourseCard from "./components/CourseCard";
import CourseFilter from "./components/CourseFilter";
import { useState } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const courses = await getTrainerCourses(); //await getCourses(q);
  return { courses, q };
}

export async function action() {
  const course = await createCourse();
  return redirect(`courses/${course.id}/edit`);
}

export default function TrainerDashboard() {
  const { courses, q } = useLoaderData();
  // const navigation = useNavigation();
  const submit = useSubmit();

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q]);

  const [selectedTab, setSelectedTab] = useState("Currently Learning");
  const [selectedCourses, setSelectedCourses] = useState(
    courses ? courses : []
  );

  const handleTab = (tab) => {
    //filter courses
    setSelectedTab(tab);
    if (tab === "Uploaded Courses") {
      setSelectedCourses(courses);
    } else if (tab === "Live Sessions") {
      setSelectedCourses(
        courses.filter((course) => course.type === "LIVE_TRAINING")
      );
    } else if (tab === "Completed Courses") {
      setSelectedCourses(courses.filter((course) => course.completed));
    }
  };

  return (
    <div className="lg:pt-[5%] pt-[35%] md:pt-[15%]">
      <CourseFilter 
        selectedTab={selectedTab}
        handleTab={handleTab}
      />
      <div className="px-2 lg:px-16 py-4">
        {selectedCourses.length > 0 ? (
          <div className="grid grid-col-1 lg:grid-cols-4 gap-3">
            {selectedCourses?.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        ) : (
          <p>
            <i>No Courses</i>
          </p>
        )}
      </div>
    </div>
  );
}
