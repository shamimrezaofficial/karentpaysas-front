import Link from "next/link";
import { LiaCheckCircle } from "react-icons/lia";
function PriceCardSection({ pricingPlans = [] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {pricingPlans?.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col justify-between h-full rounded-lg ring-2 bg-gray-50 hover:bg-gray-100 p-8 shadow transition-all hover:shadow-lg ${
            pricingPlans[0]?.name === plan.name ? " ring-blue-500" : " ring-gray-200"
          }`}
        >
          {pricingPlans[0]?.name === plan.name && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-block rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </span>
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {plan.charge_percentage === "0.00"
                    ? "Free"
                    : `${plan.charge_percentage}%`}
                </span>
                {plan.charge_percentage !== "0.00" && (
                  <span className="ml-1 text-lg">per transaction</span>
                )}
              </div>
              <p className="mt-4 text-sm font-semibold">{plan.description}</p>
            </div>

            <ul className="mb-8 space-y-4">
              {Array.isArray(plan?.features) &&
                plan?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <LiaCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature?.name}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Button Section */}
          <div className="mt-4">
            <Link
              href="/auth/register"
              prefetch={false}
              className="block w-full text-center bg-gradient-2 md:transition-transform md:duration-300 md:hover:scale-105 text-white px-12 py-3 rounded"
            >
              Choose Plan
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PriceCardSection;
