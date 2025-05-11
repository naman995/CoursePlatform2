import Navbar from "@/components/AuthNav";
import EnrollNowCard from "@/components/Card/EnrollNowCard";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import CourseTabButton from "../User/component/CourseTabButton/CourseTabButton";
import DropdownOption from "../User/component/DropdownOption/DropdownOption";

import { getCourses } from "@/apis/courses";
import { useLoaderData } from "react-router-dom";
import { useReducer } from "react";

export async function loader() {
  const courses = await getCourses();

  return { courses };
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY":
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        category: state.category.filter((cat) => cat !== action.payload),
      };
    case "SKILL":
      return {
        ...state,
        skill: [...state.skill, action.payload],
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        skill: state.skill.filter((skill) => skill !== action.payload),
      };
    case "LANGUAGE":
      return {
        ...state,
        language: [...state.language, action.payload],
      };
    case "REMOVE_LANGUAGE":
      return {
        ...state,
        language: state.language.filter((lang) => lang !== action.payload),
      };
    case "LENGTH":
      return {
        ...state,
        length: [...state.length, action.payload],
      };
    case "REMOVE_LENGTH":
      return {
        ...state,
        length: state.length.filter((len) => len !== action.payload),
      };
    case "RATING":
      return {
        ...state,
        rating: [...state.rating, action.payload],
      };
    case "REMOVE_RATING":
      return {
        ...state,
        rating: state.rating.filter((rating) => rating !== action.payload),
      };
    default:
      return state;
  }
};

const BrowseLiveCourses = () => {
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openLength, setOpenLength] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);
  const { courses } = useLoaderData();

  const ratings = [1, 2, 3, 4, 5];

  const [filterState, dispatch] = useReducer(filterReducer, {
    category: [],
    skill: [],
    language: [],
    length: [],
    rating: [],
  });

  const getCategories = () => {
    const categories = [];
    courses.forEach((course) => {
      if (!categories.includes(course.category)) {
        categories.push(course.category);
      }
    });
    return categories;
  };

  const getSkills = () => {
    const skills = [];
    courses.forEach((course) => {
      if (!skills.includes(course.skill)) {
        skills.push(course.skill);
      }
    });
    return skills;
  };

  useEffect(() => {
    setFetchedCourses(courses);
  }, []);

  useEffect(() => {
    if (selectedCourses.length > 0) {
      const filteredCourses = courses.filter((course) =>
        selectedCourses.includes(course.category)
      );
      setFetchedCourses(filteredCourses);
    } else {
      setFetchedCourses(courses);
    }
  }, [selectedCourses]);

  const handleFilter = (filterType, filter, checked) => {
    if (checked) {
      dispatch({ type: filterType, payload: filter });
    } else {
      dispatch({ type: `REMOVE_${filterType}`, payload: filter });
    }
  };

  function filterProducts(products, ratings, categories, lengths, skillLevels) {
    if (!ratings && !categories && !lengths && !skillLevels) {
      return products;
    }

    return products.filter((product) => {
      // Rating filter
      if (
        ratings &&
        ratings.length > 0 &&
        !ratings.includes(product.overall_rating)
      ) {
        return false;
      }

      // Category filter
      if (
        categories &&
        categories.length > 0 &&
        !categories.includes(product.category)
      ) {
        return false;
      }

      // Length filter
      if (
        lengths &&
        lengths.length > 0 &&
        !lengths.includes(product.duration?.val)
      ) {
        return false;
      }

      // Skill level filter
      if (
        skillLevels &&
        skillLevels.length > 0 &&
        !skillLevels.includes(product.skill)
      ) {
        return false;
      }

      return true;
    });
  }

  useEffect(() => {
    const filteredCourses = filterProducts(
      courses,
      filterState.rating,
      filterState.category,
      filterState.length,
      filterState.skill
    );
    setFetchedCourses(filteredCourses);
  }, [filterState]);

  return (
    <>
      <div className="fixed z-40 w-full lg:mt-0">
        <Navbar />
      </div>
      <div className="flex -mt-2 ">
        {/* SIDEBAR */}
        <div className="bg-sidebar-bg   h-screen w-80 p-3 lg:flex lg:flex-col space-y-4 fixed left-0    hidden">
          <h1 className="text-3xl font-bold text-white ml-6 pt-[30%] mb-8 ">
            Filters
          </h1>

          {/* Ratings DropDown */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between cursor-pointer px-6"
          >
            <p className="text-2xl font-normal text-white mb-3">Ratings</p>
            <div>
              {isOpen ? (
                <BsChevronUp className="text-white" size={24} />
              ) : (
                <BsChevronDown className="text-white" size={24} />
              )}
            </div>
          </div>
          {/* RATING TEXT AND CHECKBOX */}
          {ratings.map((rating) => (
            <React.Fragment key={rating}>
              {isOpen && (
                <DropdownOption
                  onClick={(checked) => {
                    handleFilter("RATING", rating, checked);
                  }}
                  text={`${rating} stars`}
                />
              )}
            </React.Fragment>
          ))}

          <div
            onClick={() => setOpenCategory(!openCategory)}
            className="flex items-center justify-between cursor-pointer mt-4 px-6"
          >
            <p className="text-2xl font-normal text-white mb-3">Category</p>
            <div>
              {openCategory ? (
                <BsChevronUp className="text-white" size={24} />
              ) : (
                <BsChevronDown className="text-white" size={24} />
              )}
            </div>
          </div>
          {/* Category TEXT AND CHECKBOX */}
          {getCategories().map((category) => (
            <React.Fragment key={category}>
              {openCategory && (
                <DropdownOption
                  onClick={(checked) => {
                    handleFilter("CATEGORY", category, checked);
                  }}
                  text={category.replace("_", " ")}
                />
              )}
            </React.Fragment>
          ))}

          {/* Skills */}
          <div
            onClick={() => setOpenSkill(!openSkill)}
            className="flex items-center justify-between cursor-pointer mt-4 px-6"
          >
            <p className="text-2xl font-normal text-white mb-3">Skill Level</p>
            <div>
              {openSkill ? (
                <BsChevronUp className="text-white" size={24} />
              ) : (
                <BsChevronDown className="text-white" size={24} />
              )}
            </div>
          </div>
          {/* Skill TEXT AND CHECKBOX */}
          {getSkills().map((skill) => (
            <React.Fragment key={skill}>
              {openSkill && (
                <DropdownOption
                  onClick={(checked) => {
                    handleFilter("SKILL", skill, checked);
                  }}
                  text={skill}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* BODY */}

        <div className="sm:ml-80 p-4 pt-[20%] lg:pt-[5%]">
          <div className="flex flex-col space-y-4 lg:space-y-0  lg:flex-row space-x-1">
            <CourseTabButton
              bg="bg-black"
              text={`Showing ${fetchedCourses.length} Results`}
              textColor="white"
            />

            {/* <CourseTabButton
              bg="bg-gray-300"
              text="Currently Learning"
              textColor="white"
            /> */}
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 -ml-5">
            {fetchedCourses?.map((course) => (
              <EnrollNowCard
                key={course._id}
                _id={course._id}
                title={course.title}
                image={course.image}
                description={course.description}
                duration={course.duration}
                price={course.price}
                overall_rating={course.overall_rating}
                category={course.category}
                reviews={course.reviews}
                contentLength={course.content?.length}
                skill={course.skill}
                trainer={course.trainer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseLiveCourses;
