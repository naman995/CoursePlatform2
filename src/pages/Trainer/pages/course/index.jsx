import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { AiFillEdit, AiFillStar } from "react-icons/ai";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import ProgressBar from "@ramonak/react-progress-bar";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getCourse } from "@/apis/courses";
import CourseContentCard from "@/pages/Trainer/components/CourseContentCard";
import useAccountType from "@/hooks/useAccountType";
import LiveCourseContentCard from "@/pages/Trainer/components/LiveCourseContentCard";
import { sendLink } from "@/apis/user";
import { useState } from "react";
import moment from "moment";
import mappings from "../../../../apis/currency_mappings";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import "./index.css";
import { addReview } from "../../../../apis/courses";
import ReviewsSection from "../../../User/component/ReviewSection/ReviewSection";

export async function loader({ params }) {
  const course = await getCourse(params.courseId);
  //await getCourse(params.courseId);
  if (!course) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { course: course.course };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

function getAppropiateTime(durationIn, value) {
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

const StarRating = ({ rating, handleRating }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`star ${index <= (hover || rating) ? "on" : "off"}`}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default function Course() {
  const { course } = useLoaderData();
  const { acType } = useAccountType();

  const [newliveLink, setNewLiveLink] = useState("");

  const [_rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const handleLink = () => {
    sendLink(course.liveLink, newliveLink);
  };

  const getCompletedPercentage = () => {
    let completed = 0;
    let students = course.students?.filter(
      ({ student }) =>
        student == JSON.parse(localStorage.getItem("current-user"))._id
    );

    if (students.length > 0) {
      completed = students[0].completedPercentage;
    }

    return Math.round(completed);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    centerMode: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderArrows = () => {
    return (
      <div className="slider-arrow">
        <button
          className="arrow-btn prev"
          onClick={() => this.slider.slickPrev()}
        >
          <FiArrowLeftCircle />
        </button>
        <button
          className="arrow-btn next"
          onClick={() => this.slider.slickNext()}
        >
          <FiArrowRightCircle />
        </button>
      </div>
    );
  };

  const handleAddReview = () => {
    const { success } = addReview(
      {
        rating: _rating,
        content: reviewContent,
      },
      course._id
    );

    setModalOpen(false);
  };

  const handleOpenReviews = () => {
    setReviewsOpen(true);
  };

  return (
    <div
      id="course"
      className="bg-[#101010] min-h-screen w-full px-4 lg:px-16 pt-[35%] lg:pt-[8%]"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row">
            <div className="h-64 md:h-96">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <div className="flex flex-col ml-2 lg:ml-8 py-12">
              <div className="flex flex-row">
                <h1 className="text-3xl font-bold text-white">
                  {course.title}
                </h1>
                {acType === "trainer" && (
                  <Form action="edit">
                    <button
                      type="submit"
                      className="flex items-center ml-4 bg-[#2A2A2A] rounded-full p-2"
                    >
                      <AiFillEdit className="text-2xl text-[#D1D1D1]" />
                    </button>
                  </Form>
                )}
              </div>
              <div className="max-w-[500px] my-2">
                <p className="text-[#BDB8B8]">
                  {course.description?.short}
                  {/* ...&nbsp;{" "}
                  <span className="text-[#E0FF23] cursor-pointer">More</span> */}
                </p>
              </div>
              {acType === "trainer" && (
                <>
                  {course.type === "LIVE_TRAINING" && (
                    <div className="pt-2">
                      <span className="text-white font-semibold text-sm mt-4">
                        Date & Time -{" "}
                        {moment(course?.liveTime && course?.liveTime).format(
                          "D MMM YYYY, h:mm A"
                        )}
                      </span>
                    </div>
                  )}
                  {course.type === "LIVE_TRAINING" && (
                    <div className="flex items-center mt-4">
                      <div className="flex flex-col  lg:flex-row items-center">
                        <input
                          className="rounded-full py-2 px-2 bg-transparent border-2 border-gray-800 text-white"
                          placeholder="Enter Link"
                          value={newliveLink}
                          onChange={(e) => setNewLiveLink(e.target.value)}
                        />
                        <button
                          onClick={handleLink}
                          className="bg-blue-600 px-20 mt-4 lg:mt-0  rounded-full p-2 lg:px-3 ml-4 text-white"
                        >
                          Send Link
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              {acType === "student" && (
                <>
                  <div className="flex flex-row space-x-2 items-center mt-2">
                    <span className="text-white font-semibold text-lg">
                      {Math.floor(course.overall_rating)}
                    </span>
                    <div className="flex flex-row items-center">
                      {new Array(5).fill(0).map((_, i) => (
                        <AiFillStar
                          key={i}
                          size={20}
                          className={`${
                            i < Math.floor(course.overall_rating)
                              ? "text-[#FFC107]"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#BDB8B8] font-semibold tex-lg">
                      ({course.reviews.length})
                    </span>
                    <span
                      className="text-blue-300 font-semibold tex-lg cursor-pointer"
                      onClick={() => setModalOpen(true)}
                    >
                      Add review
                    </span>
                  </div>
                  <div className="flex flex-row space-x-6 items-center mt-4">
                    <span className="text-white font-light text-sm">
                      Course duration :{" "}
                      {getAppropiateTime(
                        course.duration?.in,
                        course.duration?.val
                      )}
                    </span>
                    <span className="text-white font-light text-sm">
                      Level : {course.skill}
                    </span>
                    <span className="text-white font-light text-sm">
                      Author : {course.trainer?.firstName}{" "}
                      {course.trainer?.lastName}
                    </span>
                  </div>
                  <div className="my-6">
                    <ProgressBar
                      completed={getCompletedPercentage()}
                      bgColor={"#75F489"}
                      baseBgColor={"#414141"}
                      labelAlignment={"outside"}
                      labelColor={"#BDB8B8"}
                      height={"18px"}
                    />
                  </div>
                  {course.type == "LIVE_TRAINING" && (
                    <div className="flex flex-row space-x-4 items-center mt-4">
                      <a
                        href={course.content[0].videoUrl}
                        className="bg-[#4D5EDC] rounded-full py-4 px-3 text-white w-[200px] text-center"
                      >
                        Join Link
                      </a>
                    </div>
                  )}
                </>
              )}
              {acType === "trainer" && (
                <>
                  <div className="flex items-center mt-4">
                    <div className="flex items-center">
                      <h2>
                        <span className="text-2xl font-bold text-white">
                          {course.overall_rating} ⭐
                        </span>
                      </h2>
                    </div>
                    <div className="flex items-center ml-4">
                      <h2
                        className="text-xl font-bold text-white hover:underline cursor-pointer"
                        onClick={() => setReviewsOpen(true)}
                      >
                        {course.reviews?.length} Reviews
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center my-3">
                    <h2 className="text-xl font-bold text-white">
                      Total Students: {course.students?.length}
                    </h2>
                    &nbsp;&nbsp;
                    <h2 className="text-xl font-bold text-white">
                      | Total Sales: {course.price.base}{" "}
                      {course.students?.length * course.price.amt}
                    </h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full mt-10 space-x-10 overflow-x-auto p-8">
          {course.content?.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-96 bg-[#2A2A2A] rounded-3xl">
              <h1 className="text-2xl font-bold text-white">
                No Content Available
              </h1>
              {acType === "trainer" && (
                <Form action="edit">
                  <button
                    type="submit"
                    className="flex items-center mt-4 bg-stone-700 hover:bg-stone-800 rounded-full p-2 px-4 font-semibold text-white"
                  >
                    Add Content
                  </button>
                </Form>
              )}
            </div>
          )}
        </div>
        {/* {renderArrows()} */}
        <div className=" pb-10">
          <Slider {...settings}>
            {course.type === "ONLINE_TRAINING" &&
              course.content.length > 0 &&
              course.content.map((content, index) => (
                <div className="py-12 px-4 ">
                  <CourseContentCard
                    {...content}
                    courseId={course._id}
                    index={index}
                    percent={getCompletedPercentage()}
                  />
                </div>
              ))}
            {course.type === "LIVE_TRAINING" &&
              course.content.length > 0 &&
              course.content.map((content, index) => (
                <LiveCourseContentCard
                  {...content}
                  courseId={course._id}
                  liveLink={course.liveLink}
                  index={index}
                  dateTime={moment(course?.liveTime && course?.liveTime).format(
                    "D MMM YYYY, h:mm A"
                  )}
                />
              ))}
          </Slider>
        </div>

        {/* <div>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div> */}
      </div>
      <Rodal
        height={280}
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        className="bg-black bg-opacity-60"
      >
        {/* Review form */}
        <div className="mb-4">
          <h1 className="text-xl">Add Review</h1>
        </div>
        <div>
          <Form onSubmit={handleAddReview}>
            <div className="flex flex-col">
              <label htmlFor="rating">Rating</label>
              <StarRating handleRating={setRating} rating={_rating} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="review">Review</label>
              <textarea
                name="review"
                id="review"
                required
                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="flex items-center mt-4 bg-stone-700 hover:bg-stone-800 rounded-full p-2 px-4 font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </Rodal>
      <Rodal
        height={280}
        width={980}
        visible={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
        className="bg-black bg-opacity-60"
      >
        {/* Review form */}
        <div className="mb-4">
          <h1 className="text-xl">Reviews</h1>
        </div>
        <div>
          <ReviewsSection reviews={course.reviews} />
        </div>
      </Rodal>
    </div>
  );
}

// function Favorite({ course }) {
//   const fetcher = useFetcher();
//   let favorite = course.favorite;

//   if (fetcher.formData) {
//     favorite = fetcher.formData.get("favorite") === "true";
//   }

//   return (
//     <fetcher.Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// }
