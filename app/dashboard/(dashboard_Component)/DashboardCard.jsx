import Link from "next/link";

function DashboardCard({ title, amount, color, gridSize, loading, icon: Icon, link }) {
  const amountNumber = amount && Number(amount);
  return (
    <div
      className={`${gridSize} flex flex-col transition-transform duration-300 transform border border-gray-200 rounded cursor-pointer bg-gray-50 -z-10`}
    >
      <Link href={link} className="p-7 cursor-pointer " prefetch={false}>
        {loading ? (
          <div>
            {/* Skeleton Loader */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            </div>
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4 animate-pulse"></div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-black">
            <div className="space-y-2">
              <h2 className="text-2xl">
                {amountNumber.toLocaleString("en-US")}
              </h2>
              <p className="font-semibold">{title}</p>
            </div>
            <div className={`p-3 ${color}`}>
              <Icon className="w-10 h-10" />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

export default DashboardCard;
