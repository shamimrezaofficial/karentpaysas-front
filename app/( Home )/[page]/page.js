export default async function Page({ params }) {
  let post = {};

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/front/page/${params?.page}`,
      { cache: "no-store" }
    );
    post = await response?.json();
  } catch (error) {
    // console.error("Error fetching post:", error);
  }

  return (
    <div className="container mx-auto flex justify-center">
      <div className="lg:w-3/4 w-full mt-[70px] px-1">
        {post && (
          <div className=" bg-white text-justify p-3 sm:p-5 md:p-10 rounded border border-gray-200">
            <h1 className="text-center text-xl md:text-2xl pb-3 font-bold">{post?.page_name}</h1>
            <div className="prose lg:prose-xl prose-gray">
              <div dangerouslySetInnerHTML={{ __html: String(post?.content || "") }} />

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
