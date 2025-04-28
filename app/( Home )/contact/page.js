import Link from "next/link";
import Image from "next/image";

import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import CardWithForm from "./ContactForm";
import IframeMap from "./IframeMap";

const Contact = async () => {

  const fetchData = await fetchingDataGet("/api/front/contact-page-locations");
  const title = await fetchingDataGet("/api/front/setting/logo-identity");
  return (
    <div className="container mx-auto px-8">
      {/* Header div */}
      <div className="flex flex-col lg:flex-row justify-between py-10 px-1 sm:px-0">
        {/* Header and contact form */}
        <div className="w-full lg:w-1/2 mt-12">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl py-10 gradient-text">
              Hi, how can we help?
            </h1>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl py-5">
              Help & Support
            </h2>
          </div>
          <div className="text-lg sm:text-xl text-gray-700 mb-10">
            Have questions or need to report an issue with a {title?.settings?.siteName}
            <br className="hidden lg:block" />
            product or service? We &apos;ve got you covered.
            <br className="hidden lg:block" />
          </div>
          <div>
            <Link
              href="/dashboard/support"
              prefetch={false}
              className="bg-gradient-2 text-white rounded px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            >
              Get Support
            </Link>
          </div>
        </div>
        {/* Contact form */}
        <div className="w-full lg:w-1/2 flex justify-center py-10 lg:py-6">
          <CardWithForm />
        </div>
      </div>
      {/* Location */}
      {Array.isArray(fetchData) && fetchData[0]?.id && (
        <div className="bg-white px-10 mx-1 py-4 grid grid-cols-1 md:grid-cols-2 gap-3 justify-between border border-gray-200 rounded-md transition duration-300 hover:bg-gray-50">
          {fetchData?.map(
            (
              {
                BranchOfficeName,
                BranchOfficeAddress1,
                BranchOfficeAddress2,
                BranchOfficePhone1,
                BranchOfficePhone2,
                BranchOfficePhone3,
                BranchOfficeImage,
              },
              index
            ) => (
              <div
                key={index}
                className="flex items-center flex-col lg:flex-row"
              >
                <div className="mt-4 lg:mt-0 ">
                  <Image
                    alt="headquarter"
                    className=" h-36 w-60  lg:mt-4 rounded F-md"
                    src={BranchOfficeImage}
                    width={200}
                    height={100}
                    loading="lazy"
                  />
                </div>
                <div className="py-4 lg:py-16 mx-4 text-center lg:text-left">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl mb-2 transition duration-300 hover:text-blue-500">
                    {BranchOfficeName}
                  </h2>
                  <p className="transition duration-300 hover:text-blue-500">
                    {BranchOfficeAddress1}
                  </p>
                  <p className="transition duration-300 hover:text-blue-500">
                    {BranchOfficeAddress2}
                  </p>
                  {BranchOfficePhone1 != null && (
                    <Link href={"tel:" + BranchOfficePhone1} prefetch={false}>
                      <p className="text-blue-500 underline transition duration-300 hover:text-blue-700">
                        {"Phone: " + BranchOfficePhone1}
                      </p>
                    </Link>
                  )}
                  {BranchOfficePhone2 != null && (
                    <Link href={"tel:" + BranchOfficePhone2} prefetch={false}>
                      <p className="text-blue-500 underline transition duration-300 hover:text-blue-700">
                        {"Phone: " + BranchOfficePhone2}
                      </p>
                    </Link>
                  )}
                  {BranchOfficePhone3 != null && (
                    <Link href={"tel:" + BranchOfficePhone3} prefetch={false}>
                      <p className="text-blue-500 underline transition duration-300 hover:text-blue-700">
                        {"Phone: " + BranchOfficePhone3}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center py-4 mt-10">
          Our Offices
        </h2>
      </div>
      {/* Google Map */}
      <div className="py-8 mx-1 sm:mx-0  px-6 border rounded-md mt-6 transition duration-300 border-gray-200 hover:bg-gray-50 bg-white">
        <IframeMap />
      </div>
    </div>
  );
};

export default Contact;
