"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import { PiClipboardFill } from "react-icons/pi";
import ApiRequest from "@/app/lib/Api_request";

const Test = () => {
  const [key, setKey] = useState([]);
  const [showText, setShowText] = useState(false);

  const getTestKey = async () => {
    const response = await ApiRequest({
      url: "/key",
      method: "get",
    });
    if (response?.status === 200) {
      setKey(response?.data[0]);
    }
  };

  useEffect(() => {
    getTestKey();
  }, []);
  return (
    <div className="mx-auto mt-5">
      <div className="w-full border border-gray-200 p-3 mt-3 rounded-md lg:flex items-center justify-between">
        <h3 className="text-xl font-semibold">API keys</h3>
        <Link className="" href="/documentations" prefetch={false}>
          <span className="text-sm text-[#2F65EC] font-medium flex items-center">
            API Documentation{" "}
            <IoIosArrowRoundForward fontSize={20} />
          </span>
        </Link>
      </div>

      <div className="mt-5 w-full border border-gray-200 rounded-md">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-xl font-semibold">Test keys</h3>
          <p className="text-sm font-normal">This key only for testing Purpose</p>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="w-full text-left mt-3 h-8 border-b border-gray-200 text-xs">
                <th className="w-[200px] font-medium px-4">
                  <div className="ml-4">NAME</div>
                </th>
                <th className="lg:w-[150px] md:w-[200px] w-[150px] font-medium px-4">
                  TOKEN
                </th>
                <th className="lg:w-[200px] md:w-[300px] w-[150px] font-medium px-4 whitespace-nowrap">
                  LAST USED
                </th>
                <th className="lg:w-[200px] w-[150px] font-medium px-4">CREATED</th>
                <th className="lg:w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs ml-4 h-20 border-b border-gray-200 w-full">
                <td className="px-4">
                  <div className="ml-3 font-semibold whitespace-nowrap">Publishable key</div>
                </td>
                <td
                  className="px-4"
                >
                  <div className="flex items-center gap-3 whitespace-nowrap">
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
                    <div className="relative break-words word-break-all overflow-hidden">{key?.public_key}</div>
                  </div>
                </td>
                <td className="px-4">-</td>
                <td className="px-4">{key?.created_at && format(key?.created_at, 'dd MMM yyyy')}</td>
              </tr>
              <tr className="text-xs mt-4">
                <td className="px-4">
                  <div className="ml-3 font-semibold whitespace-nowrap">Secret key</div>
                </td>
                <td className="px-4 overflow-hidden relative py-3">
                  <div
                    className={` cursor-pointer flex items-center gap-3 ${showText ? "" : "blur-sm"} transition-all duration-300`}
                  >

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
                    <div className=" break-words word-break-all overflow-hidden">{key?.privet_key}</div>
                    <br />
                  </div>
                  {showText ? (

                    <button
                      className="bg-white border border-gray-300 cursor-pointer rounded-md shadow-md p-1"
                      onClick={() => setShowText(false)}
                    >
                      Hide Token
                    </button>
                  ) : (
                    <button
                      className="bg-white border border-gray-300 cursor-pointer rounded-md shadow-md p-1 lg:ml-10 md:ml-10"
                      onClick={() => setShowText(true)}
                    >
                      Reveal Token
                    </button>
                  )}
                </td>
                <td className="px-4">-</td>
                <td className="px-4">{key?.created_at && format(key?.created_at, 'dd MMM yyyy')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Test;
