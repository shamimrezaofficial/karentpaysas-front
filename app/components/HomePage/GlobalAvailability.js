import Image from 'next/image';

const GlobalAvailability = async ({ countriesData }) => {

  return (
    <section className="bg-gradient-2 py-[70px] mt-[90px] mb-[40px] text-white">
      <div className="container mx-auto ">
        <h2 className="text-2xl md:text-4xl font-bold text-center px-2 sm:px-0">
          All payment systems will be available in the future.
        </h2>
        <p className="mt-3 text-center px-2 sm:px-0">
          We currently supported in 2 countries, with more to come. Once future
          is supported in your country, you&apos;ll be able to sell to customers
          anywhere in the world.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4  gap-4 justify-center mt-16 px-2 sm:px-0">
          {Array.isArray(countriesData) && countriesData?.map((country, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={encodeURI(country?.flag?.trim())}
                alt={country?.name}
                width={20}
                height={10}
                className="w-7 rounded"
                loading="lazy"
              />
              <span>{country?.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default GlobalAvailability;
