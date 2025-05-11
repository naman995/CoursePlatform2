import { useState } from "react";
import Navbar from "@/components/AuthNav";
import Accordion from "./components/Accordion";
import ReviewsSection from "@/pages/User/component/ReviewSection/ReviewSection";

import { AiFillHeart, AiFillStar, AiTwotoneStar } from "react-icons/ai";
import EnrollNowCard from "@/components/Card/EnrollNowCard";
import Footer from "@/components/Footer";
import { addToCart } from "@/apis/cart";
import { courseInEnrolledCourses } from "@/apis/courses";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCourse } from "@/apis/courses";
import Course from "@/pages/Trainer/pages/course";
import { addToWishlist } from "@/apis/wishlist";

export async function loader({ params }) {
  const course = await getCourse(params.courseId);
  return { course: course.course, related_courses: course.related_courses };
}

function replaceWithBr(text) {
  return text.replace(/\n/g, "<br />");
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const { course, related_courses } = useLoaderData();
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await courseInEnrolledCourses(courseId);
      setIsAlreadyEnrolled(response);
    })();
  }, [courseId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    isCourseInWislist();
    isCourseInCart();
  }, []);

  const handleAddToCart = async () => {
    addToCart(course);
    setIsInCart(isInCart ? false : true);
  };

  const handleEnrollNow = async () => {
    addToCart(course);
    window.location.href = "/cart";
  };

  const isCourseInCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      let courseInCart = cart.find((c) => c._id === course._id);
      if (courseInCart) {
        return setIsInCart(true);
      }
    }
    setIsInCart(false);
  };

  const isCourseInWislist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (wishlist) {
      let courseInWishlist = wishlist.find((c) => c._id === course._id);
      if (courseInWishlist) {
        return setIsInWishlist(true);
      }
    }
    setIsInWishlist(false);
  };

  const handleWishlist = () => {
    addToWishlist(course);
    setIsInWishlist(isInWishlist ? false : true);
  };

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      {!isAlreadyEnrolled ? (
        <div className="">
          {/* HEADER SECTION */}
          <div className=" mt-10 px-2 lg:px-0 lg:pl-20 py-10 bg-[#131313]">
            <div className="flex flex-col lg:flex-row items-center space-x-2 lg:space-x-6">
              <img
                className="lg:block h-[200px] lg:h-[350px] lg:w-[350px] aspect-video rounded-2xl object-contain"
                src={course.image || "/Course.jpg"}
                alt="headerImage"
              />
              <div className="w-full">
                <div className="flex flex-col pl-6 space-y-5 max-w-lg pt-1">
                  <p className="font-semibold text-[#BBBBBB] text-[24px] capitalize">
                    {course.category.replace("_", " ")}
                  </p>
                  <h2 className="text-[32px] lg:text-[48px] font-semibold text-white leading-[60px] lg:w-[700px]">
                    {course.title}
                  </h2>
                  <p className="text-[20px] font-light text-[#BBBBBB]">
                    {course.description?.short}
                  </p>
                  <div className="flex items-center space-x-1">
                    <p className="text-white text-[20px] font-light mr-1">
                      {Math.floor(course.overall_rating)}
                    </p>
                    {new Array(5).fill(0).map((_, i) => (
                      <AiFillStar
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(course.overall_rating)
                            ? "text-[#FFD12D]"
                            : "text-[#B4B4B4]"
                        }`}
                      />
                    ))}
                    <p className="text-[#BBBBBB] text-[20px] font-light ml-1">
                      ({course.reviews.length})
                    </p>
                  </div>
                </div>

                {!isAlreadyEnrolled && (
                  <div className="flex flex-col lg:flex-row items-center justify-between my-6 pl-4 pr-20 w-full">
                    <div className="mr-20">
                      <p className="text-[36px] font-medium text-white ">
                        Price : {course.price.symbol}
                        {course.price.amt}
                        <span className="line-through font-normal text-[36px] text-[#717070] pl-3">
                          {course.price.symbol}
                          {course.price.amt + course.price.amt * 0.01}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-row gap-4 mt-4 items-center justify-between ml-4 ">
                      <button
                        onClick={handleWishlist}
                        className="h-16 w-16 rounded-full bg-[#3C3C3C] flex justify-center items-center lg:mr-2 sm:mx-auto cursor-pointer"
                      >
                        <AiFillHeart
                          size={29}
                          className={`text-${
                            isInWishlist ? "red-400" : "[#5E5E5E]"
                          }`}
                        />
                      </button>
                      <div className="flex flex-col lg:flex-row">
                        <button
                          onClick={handleAddToCart}
                          class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-transparent border-white border rounded-full w-[254px]"
                        >
                          {isInCart ? "Remove from cart" : "Add to cart"}
                        </button>
                        <button
                          onClick={handleEnrollNow}
                          class="lg:ml-2 mt-4 lg:mt-0 flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-[254px]"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* HEADER SECTION END */}

          {/* ABOUT THE COURSE AND COURSE CONTENT SECTION START */}
          <div className="mx-4 lg:pl-20 py-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-semibold leading-[133%] mb-3">
                About The Course
              </h1>
              {course.description?.long ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: replaceWithBr(course.description?.long),
                  }}
                  className="font-light text-2xl leading-[35.5px] tracking-[3%] max-w-[700px]"
                />
              ) : (
                course.description?.short
              )}
            </div>
          </div>
          {/* COURSE CONTENT END */}
          {course.type === "ONLINE_TRAINING" && (
            <div className="mx-4 lg:pl-20 py-8">
              <h1 className="text-5xl font-semibold leading-[133%] mb-3">
                Course Content
              </h1>
              <div className="max-w-4xl max-h-fit">
                <Accordion
                  items={course.content ? course.content : []}
                  isCourseEnrolled={isAlreadyEnrolled}
                />
              </div>
            </div>
          )}
          {/* REVIEWS */}
          <div className="mx-4 lg:pl-20 py-8">
            <h2 className="text-4xl font-medium leading-[133%] mb-3">
              Ratings and Reviews
            </h2>

            <div className="flex items-center py-4">
              <AiFillStar className={"w-5 h-4 text-yellow-400"} />
              <p className="text-xl font-semibold">
                {Math.floor(course.overall_rating)} Rating
              </p>
              <p className="text-xl font-semibold">
                &nbsp;•&nbsp;{course.reviews.length} Reviews
              </p>
            </div>

            <div>
              <ReviewsSection reviews={course.reviews} />
            </div>

            {/* MORE RELATED COURSES */}
            {!related_courses?.filter((c) => c._id !== course._id).length ==
              0 && (
              <div className="  py-2 lg:py-8 pb-4 lg:pb-36">
                <h1 className="text-5xl font-semibold leading-[133%] py-12 no-scrollbar">
                  More Such Courses
                </h1>

                <div className="flex flex-col lg:flex-row lg:overflow-x-scroll sm:space-x-3 no-scrollbar -ml-6 py-4">
                  {/* {related_courses?.map((course) => (
                  <EnrollNowCard {...course} />
                ))} */}
                  {/* remove the same course */}
                  {related_courses
                    ?.filter((c) => c._id !== course._id)
                    .map((course) => (
                      <EnrollNowCard {...course} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="-mt-4">
          <Course />
        </div>
      )}
      <Footer />
    </>
  );
};

export default CourseDetails;
