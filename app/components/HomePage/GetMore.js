import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const GetMore = async ({ settingsData, articles }) => {
  return (
    <>
      {articles?.length > 0 && (
        <section className="mt-[70px]">
          <div className="container mx-auto">
            <div className="flex justify-between items-center md:items-start">
              <h2 className="text-xl sm:text-3xl font-bold  md:text-left">
                Get more from{" "}
                <span className=" gradient-text">
                  {" "}
                  {settingsData?.settings?.siteName}
                </span>
              </h2>
              <Link
                href="/news"
                prefetch={false}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded whitespace-nowrap flex items-center gap-1 w-fit text-sm"
              >
                See all <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-6 text-lg md:text-xl text-left">
              {settingsData?.settings?.siteDescription}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 justify-center mt-10">
              {Array.isArray(articles) ? (
                articles.slice(0, 6).map((news) => (
                  <Link
                    href={`/news/${news?.id}`}
                    prefetch={false}
                    className="w-full scale-110 lg:scale-100 md:scale-100 mb-6 border rounded-lg shadow-lg"
                    key={news?.id}
                  >
                    <div className="h-full bg-white rounded-md">
                      <Image
                        alt="testimonial"
                        className="w-full h-56 mb-8 object-cover object-center inline-block rounded-t-lg"
                        src={news?.featured_image || ""}
                        width={400}
                        height={300}
                        loading="lazy"
                      />
                      <div className="px-4 pb-5">
                        <h2 className="font-bold text-lg">{news?.title}</h2>
                        <div className="prose lg:prose-xl prose-gray">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: String(news?.content.slice(0, 150) || ""),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500">No news available</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GetMore;
