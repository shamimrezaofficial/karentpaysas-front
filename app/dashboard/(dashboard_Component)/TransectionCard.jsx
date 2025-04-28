import { FaArrowUpLong } from "react-icons/fa6";

function TransectionCard({ transaction, title, loading, gridSize, icon }) {
  return (
    <div className={`${gridSize} flex flex-col transition-transform duration-300 transform border border-gray-200 rounded cursor-pointer bg-gray-50 hover:scale-105`}>
      <div className="p-7">
        {loading ? (
          <div>
            {/* Skeleton Loader */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="mb-2 text-3xl text-slate-800">
                {transaction ? transaction : 0}
              </h2>
            </div>
            <h2 className="mb-2 text-slate-800">{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransectionCard;
