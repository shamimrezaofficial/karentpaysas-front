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
import useUserData from "@/app/lib/useUserData";
import FilterStatus from "../(dashboard_Component)/FilterStatus";
import Table from "../(dashboard_Component)/Table";
export default function Production() {
  const headers = [
    "Sl",
    "Date",
    "Business Name",
    "Name",
    "Email",
    "Phone",
    "Status",
  ];
  const [keys, setKeys] = useState([]);
  const [showText, setShowText] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [paymentType, setPaymentType] = useState("Own Merchant API");

  const [data, setData] = useState([]);
  const { user } = useUserData();

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
    } else {
      setShowText(id);
    }
  };
  const handleHideText = (id, item) => {
    if (id === item.id) {
      setShowText(id);
    } else {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickTargets = [
        { id: "setShowPaymentType", setter: setShowPaymentType },
      ];

      clickTargets.forEach(({ id, setter }) => {
        if (!event.target.closest(`#${id}`)) {
          setter(false);
        }
      });
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const filteredData = data?.filter((item) => {
    if (paymentType === "Merchant API") {
      return item?.user_id !== user?.id;
    }
    return item?.user_id == user?.id;
  });

  const filteredKeys = keys?.filter((item) => {
    if (paymentType === "Merchant API") {
      return item?.user_id !== user?.id;
    }
    return item?.user_id == user?.id;
  });
  return (
    <div className="bg-white">
      {/*  {user?.roles?.some((role) => role.name === "Admin") && (
        <div className="px-3">
          <div className="w-full border border-gray-200 p-3 rounded-md flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-xl font-semibold"> API keys</h3>
            <Link className="" href="/documentations" prefetch={false}>
              <span className="text-sm text-[#2F65EC] font-medium flex items-center">
                API Documentation <IoIosArrowRoundForward fontSize={20} />
              </span>
            </Link>
          </div>
          
        </div>
      )} */}

      <div className="overflow-x-auto">
        <div className="m-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {" "}
            Get live key by applying for a store{" "}
            <button
              onClick={() => {
                setIsDrawerOpen(true);
              }}
              className="button text-bold text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 cursor-pointer"
            >
              Apply
            </button>
          </h1>
          <Link className="" href="/documentations" prefetch={false}>
            <span className="text-[#2F65EC] font-medium flex items-center border-b-2 border-transparent hover:border-b-blue-500 cursor-pointer">
              API Documentation <IoIosArrowRoundForward fontSize={20} />
            </span>
          </Link>
        </div>
      </div>
      <Table headers={headers}>
        {Array.isArray(filteredData) &&
          filteredData?.map((item, index) => (
            <tr key={index} className="table_tr">
              <td className="px-6 py-4 whitespace-nowrap">
                {" "}
                {data?.length - index}
              </td>
              <td className="p-4  whitespace-nowrap">
                {item?.created_at && format(item?.created_at, "dd MMM yyyy")}
              </td>
              <td className="p-4 min-w-[200px]">{item?.business_name}</td>
              <td className="p-4  whitespace-nowrap">{item?.name}</td>
              <td className="p-4">{item?.email}</td>
              <td className="p-4">{item?.phone}</td>
              <td className="p-4">
                <div
                  className={`px-2 py-0.5 rounded flex items-center cursor-pointer transition-colors duration-200 gap-2 w-fit ${
                    {
                      1: "bg-green-700 hover:bg-green-800 text-white ",
                      0: "bg-[#ff7654] hover:bg-[#da5737] text-white ",
                      2: "bg-red-600 hover:bg-red-800 text-white ",
                    }[item?.confirmed] ||
                    "bg-gray-200 hover:bg-gray-300 text-gray-800 "
                  }`}
                >
                  {item?.confirmed == 0
                    ? "pending"
                    : item?.confirmed == 1
                    ? "Active"
                    : item?.confirmed == 2
                    ? "Rejected"
                    : ""}
                </div>
              </td>
            </tr>
          ))}
      </Table>

      {Array.isArray(filteredKeys) &&
        filteredKeys?.map((key, index) => (
          <div key={index} className="m-3 border border-gray-200 rounded-md">
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
                      <div className="ml-3 font-semibold  whitespace-nowrap">
                        Publishable key
                      </div>
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
                        <div className="break-words ">{key?.public_key}</div>
                      </div>
                    </td>
                    <td className="px-4">-</td>
                    <td className="px-4 whitespace-nowrap">
                      {key?.created_at &&
                        format(key?.created_at, "dd MMM yyyy")}
                    </td>
                    <td className="px-4 whitespace-nowrap">
                      {key?.status == 1 ? "Active" : "Deactive"}
                    </td>
                  </tr>
                  <tr className="text-xs mt-4">
                    <td className="px-4">
                      <div className="ml-3 font-semibold whitespace-nowrap">
                        Secret key
                      </div>
                    </td>
                    <td className="relative overflow-hidden py-3 px-4 w-[250px]">
                      <span
                        className={` cursor-pointer flex items-center gap-2 ${
                          showText === key?.id ? "" : "blur-sm"
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
                      {key?.created_at &&
                        format(key?.created_at, "dd MMM yyyy")}
                    </td>
                    <td className="px-4 whitespace-nowrap">
                      {key?.status == 1 ? "Active" : "Deactive"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      {isDrawerOpen && (
        <DrawerDialogDemo open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      )}
    </div>
  );
}
