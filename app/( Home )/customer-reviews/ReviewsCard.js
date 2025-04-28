import { FaStar } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";
import moment from "moment";
import Image from "next/image";

function ReviewsCard({review}) {
  return (
    <div
      className="bg-white hover:bg-gray-50 rounded-lg p-8 shadow hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 text-gray-900 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start mb-6">
          <div className="relative w-16 h-16 mr-4">
            <Image
              src={review?.user_image}
              alt={review?.user_name}
              fill
              className="rounded-full object-fill ring-2 ring-blue-100"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{review?.user_name}</h3>
            <p className="text-sm">{review?.position}</p>
          </div>
        </div>

        <FaQuoteRight className="h-8 w-8 text-blue-500 mb-4" />
        <p className="leading-relaxed pb-5">{review?.review_details}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <span className="text-sm">
          {moment(review?.date).format("DD MMMM YYYY")}
        </span>
      </div>
    </div>
  );
}

export default ReviewsCard;
