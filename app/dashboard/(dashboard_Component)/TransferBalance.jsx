'use client'
import TransferBalanceModal from "@/app/_components/DashboardCard/TransferBalanceModal";
import DatepickerTime from "@/app/_components/Dashbord_Share/DatepickerTime";
import ResponsivePaginations from "@/app/_components/Dashbord_Share/ResponsivePaginations";
import moment from "moment";
import { useEffect, useState } from "react";

function TransferBalance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transfer_history, setTransfer_history] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateRangeChange = async (newValue) => {
    setDateRange({
      startDate: newValue?.startDate,
      endDate: newValue?.endDate,
    });
  };

  useEffect(() => {
    getTransection();
  }, []);

  const getTransection = async () => {
    const response = await ApiRequest({
      url: "/transfer_history",
      method: "get",
    });
    if (response?.status == 200) {
      setRender(false);
      setTransfer_history(response?.data?.data);
    }
  };

  function handleSearchAndFilterTransfer(transfer_history, search, dateRange) {
    let searchAndFilterTransfer = transfer_history;

    // Search Filtering
    if (search) {
      searchAndFilterTransfer = searchAndFilterTransfer.filter(
        ({ method, total_amount }) => {
          const totalAmountString = total_amount ? total_amount.toString() : "";
          const methodString = method ? method.toLowerCase() : "";

          return (
            totalAmountString.toLowerCase().includes(search.toLowerCase()) ||
            methodString.includes(search.toLowerCase())
          );
        }
      );
    }

    if ((dateRange && dateRange.startDate) || dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);

      searchAndFilterTransfer = searchAndFilterTransfer.filter(
        ({ created_at }) => {
          const transferDate = new Date(created_at.split("T")[0]);
          return transferDate >= start && transferDate <= end;
        }
      );
    }
    return searchAndFilterTransfer;
  }

  // Usage:
  const searchAndFilterTransfer = handleSearchAndFilterTransfer(
    transfer_history,
    search,
    dateRange
  );

  // Pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalItems = searchAndFilterTransfer?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleTransactions = searchAndFilterTransfer.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className=" mt-5 lg:px-0">
        <section className="ml-0 border lg:rounded-md shadow-md mt-3">
          <div>
            {/* <!-- Start coding here --> */}
            <div className="bg-white shadow-md sm:rounded-lg">
              <div className="relative flex flex-col items-center p-6 space-y-3 md:flex-row md:space-y-0 md:space-x-4 ">
                <div className="w-full md:w-full">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full ">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500"
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
                      </div>
                      <div className="grid grid-flow-col w-[100%]">
                        <input
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                          type="text"
                          id="simple-search"
                          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Search Method Name And Total Amount."
                          required=""
                        />

                        <button
                          type="button"
                          className="flex items-center justify-center pr-2 ml-2 mr-2 text-white rounded-md btn bg-gradient-2"
                          onClick={() => setIsModalOpen(!isModalOpen)}
                        >
                          Transfer Balance
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 space-y-2 border border-blue-500 rounded-md w-fit md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <div className="flex items-center w-full space-x-3 md:w-auto">
                    <DatepickerTime
                      handleDateRangeChange={handleDateRangeChange}
                      dateRange={dateRange}
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Sl
                      </th>
                      <th scope="col" className="px-4 py-3 lg:w-[150px]">
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 lg:w-[200px] md:w-[300px] w-[150px]"
                      >
                        Amount
                      </th>

                      <th scope="col" className="px-4 py-3">
                        Method
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Charge
                      </th>

                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(visibleTransactions) && visibleTransactions?.map((transaction, index) => (
                      <tr
                        className="border-b"
                        key={transaction.id}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {startIndex + index + 1}
                        </th>
                        <td className="px-4 py-3">
                          <div>
                            <h2 className="min-w-[180px]">
                              {transaction.created_at
                                ? moment(transaction.created_at).format(
                                    "DD MMMM YYYY"
                                  )
                                : "--"}
                            </h2>
                            <h2 className="opacity-80">
                              {transaction.created_at
                                ? moment(transaction.created_at).format(
                                    "h:mm a"
                                  )
                                : "--"}
                            </h2>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          {transaction.total_amount}
                        </td>
                        <td className="px-4 py-3">
                          <h2 className="min-w-[150px]">
                            {transaction.method}
                          </h2>
                        </td>
                        <td className="px-4 py-3">{transaction.charge} %</td>
                        <td className="px-4 py-3">{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* this is pagination */}

              <nav
                className="flex flex-col items-start justify-between px-16 py-10 mt-2 space-y-3 md:flex-row md:items-center md:space-y-0 "
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                  {totalItems} Transactions
                </span>
                <ResponsivePaginations
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </nav>
            </div>
          </div>
        </section>
      </div>
      <TransferBalanceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        allbalance={allbalance}
        setRender={setRender}
      />
    </div>
  );
}

export default TransferBalance;
