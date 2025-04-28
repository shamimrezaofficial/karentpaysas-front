"use client";
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import moment from "moment";

import ApiRequest from "@/app/lib/Api_request";
import Table from "../(dashboard_Component)/Table";
import SupportModel from "./SupportModel";
import TableFooter from "../(dashboard_Component)/TableFooter";
import ButtonDashboard from "../(dashboard_Component)/ButtonDashboard";
import DatePickers from "../(dashboard_Component)/DatePickers";
import SupportView from "./SupportView";

//  import time formate package
moment().format();

function Support() {
  const headers = ["Sl", "Date", "Ticket ID", "Subject", "Status", "Action"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supportReplyMessage, setSupportReplyMessage] = useState(null);
  const [searchSubjectTicket, setSearchSubjectTicket] = useState("");
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);

  const token = Cookies.get("auth_token_font");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [tecket, settecket] = useState([]);
  const [total, setTotal] = useState({ totalItems: 0, totalPage: 0 });
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: "",
  });

  const startDate = moment(startEndDate?.startDate).format("YYYY-MM-DD");
  const endDate = moment(startEndDate?.endDate).format("YYYY-MM-DD");

  // difference day today and start date
  const date = new Date();
  const today = moment(date).format("YYYY-MM-DD");
  const startDates = moment(startDate);
  const todayDate = moment(today);
  const differenceInDays = todayDate.diff(startDates, "days");
  // user data fetch function
  const [user, setUser] = useState("");
  const [buttonClickSetSearchText, setButtonClickSetSearchText] = useState("");

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        const response = await ApiRequest({
          url: "/user",
          method: "get",
        });
        if (response?.status == 200) {
          setUser(response?.data?.user);
        } else {
          toast.error(response?.message);
        }
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/tickets/user?search=${buttonClickSetSearchText}&page=${currentPage}&per_page=${itemsPerPage}&start_date=${differenceInDays > 0 ? startDate : ""}&end_date=${differenceInDays > 0 ? endDate : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        settecket(response?.data.data);
        setTotal({
          totalItems: response?.data?.total,
          totalPage: response?.data?.last_page,
        });
      } catch (error) {
        // console.error(error);
      }
      setLoading(false);
    };
    setRender(false);
    fetchData();
  }, [render, buttonClickSetSearchText, currentPage, startEndDate]);
  const handleSearchData = () => {
    setButtonClickSetSearchText(searchSubjectTicket);
    setCurrentPage(1);
    setRender(true);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <div>
      <section className="shadow-md bg-white border border-gray-200 rounded-md  ">
        <div className="w-full">
          {/* <!-- Start coding here --> */}
          <div className="space-y-6 pt-5">
            <div className="md:flex items-center justify-between w-full px-6 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow items-center justify-center">
                  <div className="flex items-center w-full bg-white border border-gray-300 rounded-md">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 ml-2 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="text"
                      id="simple-search"
                      onChange={(e) => setSearchSubjectTicket(e.target.value)}
                      className="w-full p-3 text-sm text-gray-900 border-none rounded-md focus:ring-0 outline-none"
                      placeholder="Search Ticket Id..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <ButtonDashboard
                    // open={showModal}
                    onClick={handleSearchData}
                    title='Search'
                  />
                  <ButtonDashboard
                    open={isModalOpen}
                    onClick={setIsModalOpen}
                    title='Create'
                  />
                </div>
              </div>

              <DatePickers
                setStartEndDate={setStartEndDate}
                startEndDate={startEndDate}
              />
            </div>
            <Table headers={headers}>
              {loading
                ? Array.from({ length: itemsPerPage })?.map((_, index) => (
                  <tr key={index} className="table_tr">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4 max-w-[200px]">
                      <div className="h-4 w-36 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))
                : Array.isArray(tecket) && tecket?.map((item, index) => (
                  <tr key={tecket?.length + index} className="table_tr">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {total?.totalItems -
                        ((currentPage - 1) * itemsPerPage + index)}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {item?.created_at
                        ? moment(item?.created_at).format("DD MMM YYYY")
                        : ""}
                      <br />
                      {item?.created_at
                        ? moment(item?.created_at).format("hh:mm A")
                        : ""}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {item?.track_id}
                    </td>
                    <td className="p-4 max-w-[200px]">{item?.subject}</td>
                    <td className="p-4 ">{item?.status}</td>
                    <td className="p-4 ">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSupportReplyMessage(item)}
                          className=" text-xl w-fit text-white bg-blue-500 hover:bg-blue-800 rounded-[4px]  p-2 flex items-center gap-1"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>

            <TableFooter
              startIndex={startIndex}
              data={tecket}
              totalItems={total?.totalItems}
              currentPage={currentPage}
              totalPages={total?.totalPage}
              handlePageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
      <SupportView
        supportReplyMessage={supportReplyMessage}
        setSupportReplyMessage={setSupportReplyMessage}
      />
      <SupportModel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={user}
        setRender={setRender}
      />
    </div>
  );
}

export default Support;
