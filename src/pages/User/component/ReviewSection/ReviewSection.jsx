import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import moment from "moment";

function ReviewCard({ review }) {
  const [hoverRating, setHoverRating] = useState(null);

  return (
    <div className="border-b-2 last:border-0 border-b-gray-300 py-4 px-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={review.user.profile_picture}
            alt="Avatar"
          />
          <div>
            <div className="flex flex-col space-y-2">
              <h6 className="text-2xl font-medium">
                {review.user.firstName} {review.user.lastName}
              </h6>
              <div className="flex items-center">
                {/* Render rating stars based on review.rating */}
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <AiFillStar
                        color={
                          ratingValue <= (hoverRating || review.rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        size={18}
                      />
                    </label>
                  );
                })}
                <div className="text-gray-500 text-sm mx-2">
                  {moment(review.createdAt).format("D MMM YYYY")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-800">{review.review}</div>
    </div>
  );
}

export default function ReviewsSection({ reviews }) {
  const middleIndex = Math.ceil(reviews.length / 2);
  const leftReviews = reviews.slice(0, middleIndex);
  const rightReviews = reviews.slice(middleIndex);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap w-full">
        {reviews.length > 0 && (
          <>
            <div className="max-w-sm md:w-1/2 px-2 mr-16">
              {leftReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <div className="border bg-slate-400 lg:block hidden my-8"></div>
            <div className="max-w-sm md:w-1/2 ml-0 lg:ml-16">
              {rightReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        )}
        {reviews.length == 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-medium">No reviews yet</h3>
            <p className="text-gray-500">Be the first to review this course</p>
          </div>
        )}
      </div>
    </div>
  );
}
