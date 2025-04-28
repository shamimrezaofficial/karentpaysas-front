import { Card, CardDescription, CardHeader, CardTitle } from "@/app/ui/card";

import Image from "next/image";

const Features = async ({ featuresData }) => {
  return (
    <section className="container mt-5 md:mt-14 mx-auto">
      {featuresData && featuresData?.length > 0 ? (
        <>
          <h2 className="text-xl md:text-3xl pl-1 font-bold lg:text-left text-left">
            Why choose our payment system
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 mt-12 justify-center mx-auto px-0 sm:px-7 md:px-0">
            {Array.isArray(featuresData) ? (
              featuresData.map((feature) => (
                <Card
                  className="scale-110 lg:scale-100 md:scale-100 w-[88.5%] sm:w-full md:w-full mx-auto hover:bg-gray-50 border-gray-200"
                  key={feature?.id}
                >
                  <CardHeader>
                    <Image
                      src={feature?.image}
                      alt={feature?.title || "Feature image"}
                      width={100}
                      height={100}
                      className="w-20 mb-2"
                      loading="lazy"
                    />
                    <CardTitle>{feature?.title}</CardTitle>
                    <CardDescription className="text-justify">
                      {feature?.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No features available</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2 h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="grid lg:grid-cols-3  grid-cols-1 gap-x-4 gap-y-10 mt-12  justify-center mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                className="w-full scale-110 lg:scale-100 md:scale-100 mx-auto  animate-pulse"
                key={index}
              >
                <CardHeader>
                  <div className="w-20 h-20 mb-2 bg-gray-200" />
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-1" />
                  <div className="h-4 bg-gray-200 rounded mb-1" />
                  <div className="h-4 bg-gray-200 rounded" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Features;
