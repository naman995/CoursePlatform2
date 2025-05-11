import React, { useEffect, useReducer, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const filterReducer = (state, action) => {
  switch (action.type) {
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

const Filter = ({ courses, setFiltered }) => {
  const rating = [1, 2, 3, 4, 5];

  const level = ["Beginner", "Intermediate", "Advanced"];

  const [showRating, setShowRating] = useState(false);
  const [getRatingIcon, setGetRatingIcon] = useState(true);

  const [showLevel, setShowLevel] = useState(false);
  const [levelIcon, setLevelIcon] = useState(true);

  const [filterState, dispatch] = useReducer(filterReducer, {
    skill: [],
    rating: [],
  });

  const handleFilter = (filterType, filter, checked) => {
    if (checked) {
      dispatch({ type: filterType, payload: filter });
    } else {
      dispatch({ type: `REMOVE_${filterType}`, payload: filter });
    }
  };

  // Toggle Rating
  const handleClick = () => {
    setShowRating(!showRating);
    setGetRatingIcon(!getRatingIcon);
  };

  // Toggle Level
  const handleLevelClick = () => {
    setShowLevel(!showLevel);
    setLevelIcon(!levelIcon);
  };

  function filterProducts(products, ratings, skillLevels) {
    if (!ratings && !lengths) {
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
      filterState.skill
    );
    console.log(filteredCourses);
    setFiltered(filteredCourses);
  }, [filterState]);

  return (
    <div className="bg-[#f2f2f2] min-h-[300px]  mt-7 px-16 rounded-2xl ">
      <div className="pt-10 text-[28px] border-b-2 pb-10 font-[600] ">
        <p>Filter</p>
      </div>
      {/* Rating */}
      <div
        onClick={handleClick}
        className="mt-5 flex items-center justify-between  pb-5"
      >
        <p className="font-semibold">Rating</p>
        {getRatingIcon ? (
          <AiOutlineDown className="mt-1 mr-2 text-[#667080]" />
        ) : (
          <AiOutlineUp className="mt-1 mr-2 text-[#667080]" />
        )}
      </div>
      {showRating && (
        <form className="flex flex-col ">
          {rating.map((item) => (
            <div className="flex flex-row items-center  my-1 ">
              <input
                onChange={(e) => handleFilter("RATING", item, e.target.checked)}
                className="mt-[2px]"
                type="checkbox"
                name="rating"
                id="rating"
              />
              <label className="ml-4 text-[#282828] " htmlFor="rating ">
                {item}
              </label>
            </div>
          ))}
        </form>
      )}
      <div className="border-b-2 mt-2"></div>
      {/* Price */}
      {/* <div
        onClick={handleClick}
        className="mt-5 flex items-center justify-between border-b-2 pb-5"
      >
        <p className="font-semibold">Topic</p>
        <AiOutlineDown className="mt-1 mr-2" />
      </div> */}
      {/* Level */}
      <div
        onClick={handleLevelClick}
        className="mt-5 flex flex-row items-center justify-between "
      >
        <p className="font-semibold">Skill Level</p>
        {levelIcon ? (
          <AiOutlineDown className="mt-1 mr-2 text-[#667080]" />
        ) : (
          <AiOutlineUp className="mt-1 mr-2 text-[#667080]" />
        )}
      </div>
      {showLevel && (
        <form className="flex flex-col  ">
          {level.map((item) => (
            <div className="flex flex-row items-center  my-1 ">
              <input
                onChange={(e) =>
                  handleFilter("SKILL", item.toLowerCase(), e.target.checked)
                }
                className="bg-[#f2f2f2] mt-[2px] "
                type="checkbox"
                name="level"
                id="level"
              />
              <label className="ml-4 text-[#282828] " htmlFor="level ">
                {item}
              </label>
            </div>
          ))}
        </form>
      )}
      <div className="border-b-2 pb-5"></div>
    </div>
  );
};

export default Filter;
