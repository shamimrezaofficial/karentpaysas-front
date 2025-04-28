import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const Slider = async () => {
  const sliderData = await fetchingDataGet("/api/front/home-image-sliders");

  return (
   
    <div className="lg:h-[60vh]">
      {Array.isArray(sliderData) && sliderData?.length > 0 ? (
        <Carousel className='relative carasul-container z-10' opts={{ loop: true }}>
          <CarouselContent>
            {sliderData?.map((slider, index) => (
              <CarouselItem className='p-0 relative' key={index}>
                <Image
                  src={slider?.BannerImage}
                  alt={slider?.BannerText || 'Banner Image'}
                  priority
                  width={100000}
                  height={10000}
                  quality={100}
                  className='w-full h-[40vh] md:h-[50vh] lg:h-[60vh] hidden sm:block z-10'
                />
                <div className='sm:hidden block bg-gray-100 h-[320px] xs:h-[280px]' />

                <div className='absolute z-[10000000] inset-0 flex items-start  sm:items-center p-5 xs:px-[3vw] md:px-[2vw] lg:px-[1vw]'>
                  <div className='container mx-auto pt-10 sm:pt-0 px-12 sm:px-10 md:px-12 xl:px-11'>
                    <h2 className='text-transparent mb-3 xs:pl-2 sm:pl-0 lg:pl-2 bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-medium lg:font-bold sm:w-[80%] text-2xl lg:w-[60%] text-left sm:text-left sm:text-3xl md:text-4xl lg:text-5xl pb-2 sm:pb-4 lg:pb-6 pt-2 md:pt-10 lg:pt-6'>
                      {slider?.BannerText}
                    </h2>

                    <div className='flex flex-wrap xs:pl-2 sm:pl-0 justify-start sm:justify-start items-center lg:pl-2 gap-2 md:mt-5'>
                      <Link href={slider?.ButtonText1Link} prefetch={false} target="_blank">
                        <button className='bg-pink-600 py-2 px-2 text-white md:px-6 md:py-2 lg:px-8 inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold hover:bg-black transition-colors delay-100 duration-100 z-50'>
                          {slider?.ButtonText1}
                        </button>
                      </Link>
                      <Link href={slider?.ButtonText2Link} prefetch={false} target="_blank">
                        <button className='bg-pink-600 py-2 px-2 text-white md:px-6 md:py-2 lg:px-8 inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold hover:bg-black transition-colors delay-100 duration-100 z-50'>
                          {slider?.ButtonText2}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-1/2 transform -translate-y-1/2 left-2 sm:left-4 lg:left-12 opacity-30 hover:opacity-100' />
          <CarouselNext className='absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4 lg:right-12 opacity-30 hover:opacity-100' />
        </Carousel>
      ) : (
        ""
      )}
    </div>
  );
};

export default Slider;
