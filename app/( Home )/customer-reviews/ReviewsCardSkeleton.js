function ReviewsCardSkeleton() {
    return (
      <div className="bg-white rounded p-8 shadow border border-gray-100 flex flex-col justify-between animate-pulse">
        <div>
          <div className="flex items-start mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4" />
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-200 rounded" />
              <div className="w-24 h-3 bg-gray-200 rounded" />
            </div>
          </div>
  
          <div className="h-8 w-8 bg-blue-100 rounded my-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
  
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-yellow-100 rounded" />
            ))}
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  
  export default ReviewsCardSkeleton;
  