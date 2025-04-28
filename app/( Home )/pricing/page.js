import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import PriceCardSection from "./PriceCardSection";

const Pricing = async () => {
  const fetchData = await fetchingDataGet("/api/front/pricing-items");
  const settingsData = await fetchingDataGet(
    "/api/front/setting/logo-identity"
  );
  const trialFeatures = [
    "GetWay Advanced",
    "Additional Store Support",
    "All Payment Methods Included",
    "Other Diamond plan benefits"
  ];
  return (
    <div className="container  mx-auto">
      {settingsData?.settings && (
        <div className="my-12 lg:my-24">
          <h1 className="text-center text-3xl font-bold">
            <span className="gradient-text">
              {settingsData?.settings?.siteName}
            </span>
          </h1>
          <p className="text-xl mt-4 text-center font-semibold">
            Automatic Payment Gateway Pricing Value
          </p>
        </div>
      )}
      {fetchData && <PriceCardSection pricingPlans={fetchData} />}
      {/* Trial Banner Section */}
      <div className="mt-24">
        <h2 className="text-3xl text-center font-bold text-gray-900 mb-10">
          Start your withdraw plan trial today
        </h2>
        <div className="bg-white hover:bg-gray-50 rounded shadow p-8 transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-blue-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 relative">
                <Image
                  width={2000}
                  height={2000}
                  src={
                    settingsData?.settings?.faviconImage?.trim() || desktopLogo
                  }
                  alt="logo"
                  className="w-auto h-24 object-fill"
                  loading="lazy"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold gradient-text mb-4">
                  Automatic Payout & Withdraw Solution Instant
                </h3>
                <Link
                  href="/auth/register"
                  className="inline-block bg-gradient-2 text-white px-8 py-3 rounded font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Sign up now
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {trialFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <FaCheck className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
