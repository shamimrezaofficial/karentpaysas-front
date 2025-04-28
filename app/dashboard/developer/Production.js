"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { IoIosArrowRoundForward } from "react-icons/io";
import { SlOptions } from "react-icons/sl";

import { format } from "date-fns";

import { PiClipboardFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { DrawerDialogDemo } from "@/app/components/BecomeMerchant/DrawerDialogDemo";
import ApiRequest from "@/app/lib/Api_request";

export default function Production() {
  const [keys, setKeys] = useState([]);
  const [showText, setShowText] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getLiveKey();
    getMarchent();
  }, [isDrawerOpen]);

  const getLiveKey = async () => {
    const response = await ApiRequest({
      url: "/production_key",
      method: "get",
    });

    if (response?.status === 200) {
      setKeys(response?.data);
    } else {
    }
  };

  const handleRevealText = (id, item) => {
    if (id === item.id) {
      setShowText(id);
    }
  };
  const handleHideText = (id, item) => {
    if (id === item.id) {
      setShowText(id);
    }
  };

  const [DeleteBan, setDeleteBan] = useState(false);
  const handleDeleteBan = () => {
    setDeleteBan(!DeleteBan);
  };

  const getMarchent = async () => {
    const response = await ApiRequest({
      url: "/get_marchent_apply_info",
      method: "get",
    });

    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setData(response?.data);
      } else {
        setData(null);
      }
    } else {
    }
  };

  return (
    <div className=" mt-5 bg-white">
      <div className="w-full border border-gray-200 p-3 mt-3 rounded-md flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-xl font-semibold"> API keys</h3>
        <Link className="" href="/documentations" prefetch={false}>
          <span className="text-sm text-[#2F65EC] font-medium flex items-center">
            API Documentation <IoIosArrowRoundForward fontSize={20} />
          </span>
        </Link>
      </div>
      {data === null && (
        <div className="overflow-x-auto">
          <div className="m-5">
            <h1>
              {" "}
              For Live key Please Apply Merchant{" "}
              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
                className="button text-bold text-blue-500"
              >
                Apply
              </button>
            </h1>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-black bg-white">
          <thead className="text-xs  uppercase ">
            <tr>
              <th scope="col" className="px-4 py-3">
                Sl
              </th>

              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Business Name
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Phone
              </th>

              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data?.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  {data?.length - index}
                </th>
                <td className="px-4 py-3 min-w-[200px]">{item?.business_name}</td>
                <td className="px-4 py-3  whitespace-nowrap">{item?.name}</td>
                <td className="px-4 py-3">{item?.email}</td>
                <td className="px-4 py-3">{item?.phone}</td>
                <td className="px-4 py-3">
                  {item?.confirmed == 0
                    ? "pending"
                    : item?.confirmed == 1
                      ? "Active"
                      : item?.confirmed == 2
                        ? "Rejected"
                        : ""}
                </td>
                <td className="px-4 py-3  whitespace-nowrap">
                  {item?.created_at && format(item?.created_at, "dd MMM yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Array.isArray(keys) && keys?.map((key, index) => (
        <div key={index} className="mt-5  border border-gray-200 rounded-md">
          <div className="border-b border-gray-200 lg:p-4 text-center flex p-4 justify-between lg:flex md:flex items-center  lg:justify-between md:justify-between">
            <h3 className="text-sm lg:text-xl font-semibold  ">
              {key?.business_name}
            </h3>
            <div className="relative">
              <SlOptions onClick={handleDeleteBan} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left mt-3 h-8 border-b border-gray-200 text-xs">
                  <th className="w-[200px] font-medium px-4">
                    <div className="ml-4">NAME</div>
                  </th>
                  <th className="lg:w-[150px] md:w-[200px] w-[150px] font-medium px-4">
                    TOKEN
                  </th>
                  <th className="lg:w-[200px] md:w-[300px] w-[150px] font-medium whitespace-nowrap px-4">
                    LAST USED
                  </th>
                  <th className="lg:w-[200px] md:w-[300px] w-[150px] font-medium px-4">
                    CREATED
                  </th>
                  <th className="lg:w-[200px] md:w-[300px] w-[150px] font-medium  px-4">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-xs ml-4 h-20 border-b border-gray-200">
                  <td className="px-4">
                    <div className="ml-3 font-semibold  whitespace-nowrap">Publishable key</div>
                  </td>
                  <td className="px-4">
                    <div className="flex items-center gap-2 w-[250px]">
                      <span
                        onClick={() =>
                          navigator?.clipboard
                            .writeText(key?.public_key)
                            .then(() => {
                              toast.success("Copied successfully!", {
                                position: "top-center",
                              });
                            })
                            .catch(() => {
                              toast.error(
                                "Failed to copy. Please try again.",
                                {
                                  position: "top-center",
                                }
                              );
                            })
                        }
                        className="cursor-pointer"
                      >
                        <PiClipboardFill className="text-xl text-[#08987C] hover:text-[#065A47] transition-colors duration-200" />
                      </span>
                      <div className="break-words ">
                        {key?.public_key}
                      </div>
                    </div>
                  </td>
                  <td className="px-4">-</td>
                  <td className="px-4 whitespace-nowrap">
                    {key?.created_at && format(key?.created_at, "dd MMM yyyy")}
                  </td>
                  <td className="px-4 whitespace-nowrap">{key?.status == 1 ? "Active" : "Deactive"}</td>
                </tr>
                <tr className="text-xs mt-4">
                  <td className="px-4">
                    <div className="ml-3 font-semibold whitespace-nowrap">Secret key</div>
                  </td>
                  <td className="relative overflow-hidden py-3 px-4 w-[250px]">
                    <span
                      className={` cursor-pointer flex items-center gap-2 ${showText === key?.id ? "" : "blur-sm"
                        } transition-all duration-300`}
                    >
                      {/* Tooltip */}
                      <span
                        onClick={() =>
                          navigator?.clipboard
                            .writeText(key?.privet_key)
                            .then(() => {
                              toast.success("Copied successfully!", {
                                position: "top-center",
                              });
                            })
                            .catch(() => {
                              toast.error(
                                "Failed to copy. Please try again.",
                                {
                                  position: "top-center",
                                }
                              );
                            })
                        }
                        className="cursor-pointer"
                      >
                        <PiClipboardFill className="text-xl text-[#08987C] hover:text-[#065A47] transition-colors duration-200" />
                      </span>

                      <div className="break-words word-break-all overflow-hidden">
                        {key?.privet_key}
                      </div>
                    </span>

                    {/* Reveal/Hide Button */}
                    {showText === key?.id ? (
                      <button
                        className="bg-white border border-gray-300 cursor-pointer rounded-md shadow-md p-1 mt-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                        onClick={() => handleHideText(key?.id, key)}
                      >
                        Hide Token
                      </button>
                    ) : (
                      <button
                        className="bg-white border border-gray-300 cursor-pointer rounded-md shadow-md p-1 mt-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                        onClick={() => handleRevealText(key?.id, key)}
                      >
                        Reveal Token
                      </button>
                    )}
                  </td>
                  <td className="px-4">-</td>
                  <td className="px-4 whitespace-nowrap">
                    {key?.created_at && format(key?.created_at, "dd MMM yyyy")}
                  </td>
                  <td className="px-4 whitespace-nowrap">{key?.status == 1 ? "Active" : "Deactive"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {isDrawerOpen && <DrawerDialogDemo open={isDrawerOpen} setOpen={setIsDrawerOpen} />}
    </div>
  );
}
