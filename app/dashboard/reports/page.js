"use client";
import Table from "../(dashboard_Component)/Table";
import { useEffect, useState } from "react";
import moment from "moment";
import TableFooter from "../(dashboard_Component)/TableFooter";
import { FaFileExport, FaSpinner } from "react-icons/fa6";
import FilterStatus from "../(dashboard_Component)/FilterStatus";
import TransectionCard from "../(dashboard_Component)/TransectionCard";
import DatePickers from "../(dashboard_Component)/DatePickers";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { TextCopy } from "../(dashboard_Component)/TextCopy";
import ApiRequest from "@/app/lib/Api_request";
import SkeletonLoader from "../(dashboard_Component)/SkeletonLoader";

function page() {
  const headers = [
    "Sl",
    "Date",
    "Customer Info",
    "Sender Info",
    "Payment Info",
    "Amount / Fee",
    "Trx / Ref ID",
    "Status",
  ];
  const payoutHeaders = [
    "Sl",
    "Date",
    "Customer Info",
    "Sender Info",
    "Payment Info",
    "Amount / Fee",
    "Trx / Ref ID",
    " Reason",
    "Status",
  ];

  const [loadingExport, setLoadingExport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsFilterShow, setReportsFilterShow] = useState(false);
  const [reportsFilter, setReportsFilter] = useState("");
  const [reportsFilterMethod, setReportsFilterMethod] = useState("");
  const [reportsFilterShowMethod, setReportsFilterShowMethod] = useState(false);
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: "",
  });
  const perPage = 10;
  const [reportsFilterMethodList, setReportsFilterMethodList] = useState([]);

  const startDate = moment(startEndDate?.startDate).format("YYYY-MM-DD");
  const endDate = moment(startEndDate?.endDate).format("YYYY-MM-DD");

  const token = Cookies.get("auth_token_font");
  const date = new Date();
  const today = moment(date).format("YYYY-MM-DD");
  const startDates = moment(startDate);
  const todayDate = moment(today);
  const differenceInDays = todayDate.diff(startDates, "days");

  const [transactions, setTransactions] = useState([]);
  const [transactionsReport, setTransactionsReport] = useState({});
  const [total, setTotal] = useState({
    totalItems: 0,
    totalPage: 0,
  });

  useEffect(() => {
    if (reportsFilter === "") return;
    setLoading(true);
    fetchData();
  }, [currentPage, reportsFilter]);
  const fetchData = async () => {
    try {
      let endpoint = "";
      if (["Manual", "P2C", "P2P"].includes(reportsFilter)) {
        endpoint = "/api/merchant/report/history/cash-in";
      } else if (reportsFilter === "Pay Out") {
        endpoint = "/api/merchant/report/filter/payouts";
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
        payment_method: reportsFilterMethod,
        start_date: differenceInDays > 0 ? startDate : "",
        end_date: differenceInDays > 0 ? endDate : "",
      });

      if (reportsFilter === "P2P") {
        params.append("payment_type", "p2p");
      } else if (reportsFilter === "P2C") {
        params.append("payment_type", "Auto");
      } else if (reportsFilter === "Manual") {
        params.append("payment_type", "Manual");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotal({
        totalItems: response?.data?.data?.deposits?.total,
        totalPage: response?.data?.data?.deposits?.last_page,
      });
      setTransactions(response?.data?.data?.deposits?.data);
      setTransactionsReport(response?.data?.data?.reports);
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [reportsFilterMethod, startEndDate]);

  const handleExportReport = async () => {
    if (!reportsFilter) return toast.error("Please select payment type.");

    setLoadingExport(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${
        reportsFilter === "P2C" ||
        reportsFilter === "P2P" ||
        reportsFilter === "Manual"
          ? "/api/merchant/report/export/cash-in"
          : "/api/merchant/report/export/payout"
      }?payment_method=${
        reportsFilter === "P2P" ? "" : reportsFilterMethod
      }&start_date=${differenceInDays > 0 ? startDate : ""}&end_date=${
        differenceInDays > 0 ? endDate : ""
      }${
        reportsFilter === "P2P"
          ? `&payment_type=p2p`
          : reportsFilter === "P2C"
          ? `&payment_type=Auto`
          : reportsFilter === "Manual"
          ? `&payment_type=Manual`
          : ""
      }`;

      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${reportsFilter.replace(/\s+/g, "_")}_Report_${new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/:/g, "-")}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to export report.");
    }
    setLoadingExport(false);
  };

  useEffect(() => {
    const handleClickOutsideOperator = (event) => {
      if (!event.target.closest("#setReportsFilterShow")) {
        setReportsFilterShow(false);
      }
    };
    const handleClickMethod = (event) => {
      if (!event.target.closest("#setReportsFilterShowMethod")) {
        setReportsFilterShowMethod(false);
      }
    };
    window.document.addEventListener("click", handleClickOutsideOperator);
    window.document.addEventListener("click", handleClickMethod);

    return () => {
      window.document.removeEventListener("click", handleClickOutsideOperator);
      window.document.removeEventListener("click", handleClickMethod);
    };
  }, []);

  const startIndex = (currentPage - 1) * perPage;

  const formatMessage = (message) => {
    if (typeof message !== "string") {
      return message;
    }
    const formattedMessage = message
      .replace(
        /(\bTk\s?\d+(\.\d{1,2})?\b)/g,
        '<strong class="text-green-500">$1</strong>'
      )
      .replace(/(TrxID\s\w+)/g, '<strong class="text-blue-500">$1</strong>')
      .replace(
        /(Send Money|Balance|Reference|Fee|OK|CANCEL|SEND)/g,
        '<span class="font-semibold">$1</span>'
      )
      .replace(
        /(The destination account is in a state which prohibits the execution of the transaction\.)/g,
        '<span class="text-red-500 font-semibold">⚠️ $1</span>'
      );

    return (
      <div className="prose lg:prose-xl prose-gray">
        <p
          dangerouslySetInnerHTML={{ __html: String(formattedMessage || "") }}
        />
      </div>
    );
  };

  useEffect(() => {
    handelGetMethod();
  }, [reportsFilter]);

  const handelGetMethod = async () => {
    if (reportsFilter === "") {
      return;
    }
    try {
      const response = await ApiRequest({
        url: `/merchant/${
          reportsFilter === "Pay Out"
            ? "payout-methods"
            : `deposit-methods?cashin_type=${reportsFilter?.toLowerCase()}`
        }`,
        method: "get",
      });
      setReportsFilterMethodList(response);
    } catch (error) {
      // console.log(error);merchant/payout-methods
    }
  };
  // console.log(reportsFilter);
  const closeHandler = () => {
    setReportsFilter("");
    setReportsFilterMethod("");
    setReportsFilterMethodList([]);
  };
  return (
    <section className="bg-white shadow-md border border-gray-200 rounded">
      <div className="space-y-6">
        {/* <!-- Start coding here --> */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 px-6 pt-5">
          <div className="w-full md:fit md:flex flex-wrap items-center gap-2">
            <FilterStatus
              showMerchantStatus={reportsFilterShow}
              setShowMerchantStatus={setReportsFilterShow}
              setSearchMerchantStatus={closeHandler}
              searchMerchantStatus={reportsFilter}
              id="setReportsFilterShow"
              placeholderText="Payment Type..."
            >
              {["P2C", "P2P", "Manual", "Pay Out"]?.map((item, index) => (
                <div
                  key={index}
                  className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white w-full justify-between"
                  onClick={() => {
                    setReportsFilter(item);
                    setReportsFilterMethod("");
                  }}
                >
                  <span> {item}</span>
                </div>
              ))}
            </FilterStatus>
            <FilterStatus
              showMerchantStatus={reportsFilterShowMethod}
              setShowMerchantStatus={setReportsFilterShowMethod}
              setSearchMerchantStatus={setReportsFilterMethod}
              searchMerchantStatus={reportsFilterMethod?.charAt(0).toUpperCase() + reportsFilterMethod?.slice(1).toLowerCase()}
              id="setReportsFilterShowMethod"
              placeholderText="Payment Method..."
            >
              {reportsFilterMethodList?.length ? (
                reportsFilterMethodList?.map((item, index) => (
                  <div
                    key={index}
                    className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white w-full justify-between"
                    onClick={() => setReportsFilterMethod(item)}
                  >
                    <span>
                      {" "}
                      {item?.charAt(0).toUpperCase() +
                        item?.slice(1).toLowerCase()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white w-full justify-between">
                  <span> No Data Available</span>
                </div>
              )}
            </FilterStatus>
          </div>
          <DatePickers
            setStartEndDate={setStartEndDate}
            startEndDate={startEndDate}
          />
          <button
            onClick={handleExportReport}
            disabled={loadingExport}
            className="button_gradient cursor-pointer flex items-start gap-3 w-full md:w-auto"
          >
            {" "}
            {loadingExport ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FaFileExport />
                Export
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6  gap-5  px-6">
          {[
            {
              transaction: reportsFilter
                ? transactionsReport?.dailyTransaction
                  ? transactionsReport?.dailyTransaction
                  : transactionsReport?.dailyPayouts
                : 0.0,
              title: reportsFilter
                ? "Today " + reportsFilter
                : "Select Payment",
              gridSize: "md:col-span-2",
            },
            {
              transaction: reportsFilter
                ? transactionsReport?.weeklyTransaction
                  ? transactionsReport?.weeklyTransaction
                  : transactionsReport?.weeklyPayouts
                : 0.0,
              title: reportsFilter
                ? "Weekly " + reportsFilter
                : "Select Payment",
              gridSize: "md:col-span-2",
            },
            {
              transaction: reportsFilter
                ? transactionsReport?.monthlyTransaction
                  ? transactionsReport?.monthlyTransaction
                  : transactionsReport?.monthlyPayouts
                : 0.0,
              title: reportsFilter
                ? "Monthly " + reportsFilter
                : "Select Payment",
              gridSize: "md:col-span-2",
            },
            {
              transaction: reportsFilter
                ? transactionsReport?.allTransaction
                  ? transactionsReport?.allTransaction
                  : transactionsReport?.allPayouts
                : 0.0,
              title: reportsFilter
                ? "Total " + reportsFilter
                : "Select Payment",
              gridSize: "md:col-span-3",
            },
            {
              transaction: reportsFilter
                ? transactionsReport?.filtered_Transaction
                : 0.0,
              title: reportsFilter
                ? "Filter " + reportsFilter
                : "Select Payment",
              gridSize: "md:col-span-3",
            },
          ].map((item, index) => (
            <TransectionCard
              key={index}
              transaction={item.transaction}
              title={item.title}
              gridSize={item.gridSize}
              loading={loading}
            />
          ))}
        </div>

        <Table headers={reportsFilter === "Pay Out" ? payoutHeaders : headers}>
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="table_tr">
                  {[
                    { width: "w-8", height: "h-4" },
                    { width: "w-20", height: "h-4", extra: 1 },
                    { width: "w-32", height: "h-14" },
                    { width: "w-20", height: "h-6" },
                    { width: "w-20", height: "h-4", extra: 2 },
                    { width: "w-20", height: "h-4", extra: 1 },
                    { width: "w-20", height: "h-4", extra: 1 },
                    { width: "w-14", height: "h-8" },
                  ].map((item, i) => (
                    <SkeletonLoader item={item} i={i} key={i} />
                  ))}
                </tr>
              ))
            : Array.isArray(transactions) &&
              transactions?.map((transaction, index) => (
                <tr className="table_tr" key={index}>
                  <td className="px-6 py-3 w-[50px]">
                    {total?.totalItems - ((currentPage - 1) * perPage + index)}
                  </td>
                  <td className="p-3 w-[150px] whitespace-nowrap">
                    {moment(transaction?.created_at).format("DD MMM YYYY")}{" "}
                    <br />
                    {moment(transaction?.created_at).format("hh:mm A")}
                  </td>

                  <td className="p-3">
                    {transaction?.customer_name && (
                      <div
                        onClick={() => setSearch(transaction?.customer_name)}
                        className="cursor-pointer p-1 border border-gray-200 hover:bg-gray-100 rounded font-semibold w-[200px] break-words"
                      >
                        {transaction?.customer_name && (
                          <h3>{transaction?.customer_name}</h3>
                        )}
                        {transaction?.customer_phone && (
                          <h3>{transaction?.customer_phone}</h3>
                        )}
                        {transaction?.customer_email && (
                          <h3>{transaction?.customer_email}</h3>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-3 w-[150px]">
                    {transaction?.customerMsisdn || transaction?.sender}
                  </td>
                  <td className="p-3">
                    {transaction?.currency && (
                      <>
                        {transaction?.currency.toUpperCase()}
                        <br />
                      </>
                    )}

                    {transaction?.payment_method_type && (
                      <>
                        {transaction?.payment_method_type === "auto"
                          ? "P2C"
                          : ["p2p", "p2c"].includes(
                          transaction?.payment_method_type.toLowerCase()
                        )
                          ? transaction?.payment_method_type.toUpperCase()
                          : transaction?.payment_method_type
                              .charAt(0)
                              .toUpperCase() +
                            transaction?.payment_method_type
                              .slice(1)
                              .toLowerCase()}
                        <br />
                      </>
                    )}

                    {transaction?.payment_method && (
                      <>
                        {transaction?.payment_method?.charAt(0).toUpperCase() +
                          transaction?.payment_method?.slice(1).toLowerCase()}
                        <br />
                      </>
                    )}
                    {transaction?.merchant_number ||
                      transaction?.withdraw_number?.charAt(0).toUpperCase() +
                        transaction?.withdraw_number?.slice(1).toLowerCase()}
                  </td>
                  <td className="p-3">
                    <span className="text-blue-500">
                      {transaction?.amount &&
                        Number(transaction?.amount)?.toLocaleString("en-US")}
                    </span>
                    <br />
                    <span className="text-green-500">
                      {transaction?.fee !== "0.00" &&
                        Number(transaction?.fee)?.toLocaleString("en-US")}
                    </span>
                  </td>
                  <td className="p-3">
                    <TextCopy
                      text={transaction?.trxID}
                      fontSize="font-semibold w-[100px]"
                      status="T : "
                    />
                    <TextCopy
                      text={transaction?.reference}
                      fontSize="w-[100px]"
                      status="R : "
                    />
                  </td>
                  {reportsFilter === "Pay Out" && (
                    <td className="p-3">
                      {transaction?.failed_reason &&
                        formatMessage(transaction?.failed_reason)}
                    </td>
                  )}

                  <td className="p-3 space-y-2">
                    <div
                      className={`px-2 py-0.5 rounded border border-dotted flex items-center cursor-pointer transition-colors duration-200 gap-2 w-fit ${
                        {
                          Success:
                            "bg-green-700 hover:bg-green-800 text-white border-green-800",
                          Pending:
                            "bg-[#ff7654] hover:bg-[#da5737] text-white border-[#ff7654]",
                          Failed:
                            "bg-red-600 hover:bg-red-800 text-white border-red-800",
                          Rejected:
                            "bg-[#ff1d1d] hover:bg-[#d63737] text-white border-[#ff1d1d]",
                        }[
                          transaction?.transactionStatus || transaction?.status
                        ] ||
                        "bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-400"
                      }`}
                    >
                      {transaction?.transactionStatus || transaction?.status}
                    </div>
                  </td>
                </tr>
              ))}
        </Table>

        <TableFooter
          startIndex={startIndex}
          data={transactions}
          totalItems={total?.totalItems || 0}
          currentPage={currentPage}
          totalPages={total?.totalPage || 1}
          handlePageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default page;
