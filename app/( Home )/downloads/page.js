import Image from "next/image";
import moment from "moment";
import DownloadButton from "./DownloadButton";
import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";

async function page() {
  const versions = await fetchingDataGet("/api/front/applications");
  const setting = await fetchingDataGet("/api/front/setting/logo-identity");
  const downloadPage = await fetchingDataGet(
    "/api/front/settings/download-page"
  );
  if (!versions || !setting || !downloadPage) return;
  return (
    <div className="container mx-auto px-8 sm:px-0  ">
      <div className="py-20 px-2">
        <div className=" md:flex items-start gap-5 justify-between ">
          {/* Left Section: Text Content */}
          <div className="md:w-1/2 flex items-start">
            {downloadPage?.settings && (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {downloadPage?.settings?.download_page_title}
                </h1>

                <p className="py-5 mx-auto">
                  {downloadPage?.settings?.download_page_description}
                </p>
              </div>
            )}
          </div>
          {/* Right Section: Lottie Animation */}
          <div className="hidden md:block w-[50%] mt-10 md:mt-0 ">
            {downloadPage?.settings?.download_page_image && (
              <Image
                src={downloadPage?.settings?.download_page_image}
                width={2000}
                height={2000}
                quality={100}
                alt="Download Icon"
                property="true"
                className="w-full object-fill rounded-lg"
              />
            )}
          </div>
        </div>
        <div className="my-5">
          <div className="overflow-x-auto">
            <table className="min-w-full mt-5 bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-justify border-b border-gray-300">
                  <th className="py-3 px-4 whitespace-nowrap">Update Date</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Device</th>
                  <th className="py-3 px-4 flex justify-center">Download</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(versions) &&
                  versions?.reverse()?.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition text-justify border-b  border-gray-200"
                    >
                      <td className="py-2 px-4 whitespace-nowrap">
                        {moment(item?.created_at).format("DD MMM YYYY")}
                      </td>
                      <td className="py-2 px-4 min-w-60">{item?.name}</td>
                      <td className="py-2 px-4 whitespace-nowrap">{`v${item?.version}`}</td>
                      <td className="py-2 px-4 min-w-80 max-w-96">
                        {item?.details?.length > 130
                          ? item?.details?.slice(0, 130) + "..."
                          : item?.details}
                      </td>
                      <td className="py-2 px-4 text-2xl text-gray-500">
                        <div className="flex items-center justify-center w-full">
                          <Image
                            src={item?.icon}
                            width={100}
                            height={100}
                            quality={100}
                            alt="Download Icon"
                            property="true"
                            className="w-6 h-6 object-fill rounded-lg"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <Link
                            href={item?.app_file}
                            download
                            prefetch={false}
                            className="rounded-md py-2 px-4 flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600"
                          >
                            Download
                            <IoMdDownload size={20} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
