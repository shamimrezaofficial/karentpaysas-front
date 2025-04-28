import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import ReviewsCard from "@/app/( Home )/customer-reviews/ReviewsCard";

const Reviews = ({ reviewsData }) => {
  const reviews = reviewsData
    ? reviewsData?.data?.filter((data) => data.status === "approved")
    : [];

  return (
    <section className="mt-[70px]">
      <div className="container mx-auto">
        {reviews && (
          <div className="flex justify-between items-center md:items-start  pr-2">
            <h2 className="text-xl sm:text-3xl font-bold text-center md:text-left  px-2 sm:px-0">
              Customer Reviews
            </h2>
            <Link
              href="/customer-reviews"
              prefetch={false}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded whitespace-nowrap flex items-center gap-1 w-fit"
            >
              Show more <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2 sm:px-0">
            {Array.isArray(reviews) && reviews?.length > 0
              ? reviews
                  ?.toReversed()
                  ?.slice(0, 3)
                  ?.map((review) => (
                    <ReviewsCard key={review?.id} review={review} />
                  ))
              : [...Array(3)]?.map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-fit md:w-[48%] lg:w-[32.5%] scale-110 lg:scale-100 md:scale-100 p-4 border rounded-md  bg-white  mb-12 last:mb-0"
                  ></div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
