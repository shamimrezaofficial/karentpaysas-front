"use client";
import { useState } from "react";

import useFetchingData from "@/app/lib/useFetchingData";
import ResponsivePaginating from "@/app/components/ResponsivePaginating";
import { FaStar } from "react-icons/fa6";
import ReviewsCard from "./ReviewsCard";
import ReviewsCardSkeleton from "./ReviewsCardSkeleton";

const CustomerReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchData, loading } = useFetchingData("/api/front/reviews");
  const settingsData = useFetchingData("/api/front/setting/logo-identity");

  const reviews = fetchData
    ? fetchData?.data?.filter((data) => data.status === "approved")
    : [];

  const itemsPerPage = 6;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = reviews ? Math.ceil(reviews?.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviews
    ? reviews.slice(startIndex, startIndex + itemsPerPage)
    : [];

  return (
    <section className="px-1 sm:px-0">
      <div className="container mx-auto mt-20 ">
        <div className="text-center mb-16">
          <h1 className="text-xl md:text-3xl font-bold gradient-text sm:text-5xl mb-4">
            Customer Reviews
          </h1>
          <p className="leading-relaxed font-semibold">
            See what our customers are saying about{" "}
            {settingsData?.fetchData?.settings?.siteName}
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className="h-6 w-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(6)].map((_, i) => <ReviewsCardSkeleton key={i} />)
            : currentReviews?.map((review) => (
                <ReviewsCard key={review?.id} review={review} />
              ))}
        </div>
        <div className="flex justify-center mt-8">
          <ResponsivePaginating
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
