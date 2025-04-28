import axios from "axios";
import Image from "next/image";
export default async function NewsPageDetails({ params }) {
  let newsDetails = {};
  const { id } = params; 
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/front/news/articles/${id}`
    );
    newsDetails = response?.data;
  } catch (error) {
    // console.error("Error fetching news details:", error);
  }


  return (
    <section className="container mx-auto mt-20 flex items-start justify-center">
      <div className="bg-white text-justify lg:w-3/4 w-full rounded-lg border border-gray-100 shadow">
        {newsDetails && (
          <div>
            <Image
              alt="testimonial"
              className="w-full h-auto object-fill object-center inline-block rounded-t-lg"
              src={
                newsDetails?.featured_image ? newsDetails?.featured_image : ""
              }
              width={2000}
              height={2000}
              quality={100}
              loading="lazy"
            />

            <div className="p-10">
              <h2 className="font-bold text-xl lg:text-2xl">
                {newsDetails?.title}
              </h2>
              <p>
                Category : {newsDetails?.category?.name}
              </p>
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: String(newsDetails?.content || "") }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
