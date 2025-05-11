"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import InputFiledLabel from "../(dashboard_Component)/InputFiledLabel";
import { FaSpinner } from "react-icons/fa6";
import TableFooter from "../(dashboard_Component)/TableFooter";
import Table from "../(dashboard_Component)/Table";
import SkeletonLoader from "../(dashboard_Component)/SkeletonLoader";
import FilterStatus from "../(dashboard_Component)/FilterStatus";

function AllowedIpPage() {
  const headers = ["Sl", "Date", "Ip Address", "Status", "Action"];
  const [addAllowedIp, setAddAllowedIp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [allowedIp, setAllowedIp] = useState("");
  const [error, setError] = useState("");
  const token = Cookies.get("auth_token_font");
  const [addLoading, setAddLoading] = useState(false);
  const [data, setData] = useState([]);
  const [storesUser, setStoresUser] = useState([]);
  const [showStores, setShowStores] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("storesUser"));
    if (store) {
      setStoresUser(store);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    handleGetAllowedIps();
  }, []);

  const handleGetAllowedIps = async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/merchant/allowed-ips`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        setData(response?.data.toReversed());
      }
    } catch (error) {
      // console.error(error);
    }
    setLoading(false);
  };

  const handleAllowedIps = async () => {
    if (!token) return;

    // Add validation
    if (!allowedIp.trim()) {
      setError("IP address is required");
      return;
    }
    setAddLoading(true);
    const formData = new FormData();
    formData.append("ip_address", allowedIp);

    try {
      setLoadingAdd(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/merchant/allowed-ips`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 201) {
        toast.success("Allowed IP added successfully");
        setAddAllowedIp(false);
        setError("");
        setAllowedIp("");
        handleGetAllowedIps();
      }
    } catch (error) {
      toast.error("Failed to add allowed IP.");
    } finally {
      setAddLoading(false);
    }
  };

  const [deleteAllowedIp, setDeleteAllowedIp] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);
  const handleDeleteAllowedIp = async () => {
    if (!token) return;
    try {
      setDeleteItem(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/merchant/allowed-ips/${deleteAllowedIp}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        toast.success("Allowed IP deleted successfully");
        setDeleteAllowedIp(null);
        handleGetAllowedIps();
      }
    } catch (error) {
      // console.error(error);
      toast.error("Failed to delete allowed IP.");
    } finally {
      setDeleteItem(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = data?.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleTransactions = data?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="bg-white shadow-md border border-gray-200 rounded">
      <div className="p-5">
        <button
          onClick={() => setAddAllowedIp(!addAllowedIp)}
          className="bg-gradient-2 mx-auto cursor-pointer w-full md:w-fit py-2.5 px-6 rounded text-center text-white hover:from-purple-700 hover:to-blue-600"
        >
          Add New IP
        </button>
      </div>

      <Table headers={headers}>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="table_tr">
                {[
                  { width: "w-8", height: "h-4" },
                  { width: "w-32", height: "h-14" },
                  { width: "w-20", height: "h-6" },
                  { width: "w-28", height: "h-14" },
                  { width: "w-14", height: "h-8" },
                ].map((item, i) => (
                  <SkeletonLoader item={item} key={i} />
                ))}
              </tr>
            ))
          : Array.isArray(visibleTransactions) &&
            visibleTransactions?.map((item, index) => (
              <tr key={index} className="table_tr">
                <td className="px-6 py-4 whitespace-nowrap">
                  {totalItems - ((currentPage - 1) * itemsPerPage + index)}
                </td>
                <td className="px-4 py-4 ">
                  <h2 className="flex items-center">
                    {moment(item?.created_at).format("Do MMM YYYY")}
                  </h2>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <h2>{item?.ip_address}</h2>
                </td>
                <td className="px-4 py-4 ">
                  <h2
                    className={`flex items-center px-2 py-1 border border-dotted w-fit rounded
                    ${
                      item?.status === "active"
                        ? "bg-green-100 border-green-600 text-green-700"
                        : item?.status === "inactive"
                        ? "bg-gray-100 border-gray-400 text-gray-500"
                        : item?.status === "rejected"
                        ? "bg-red-100 border-red-600 text-red-700"
                        : item?.status === "suspended"
                        ? "bg-yellow-100 border-yellow-600 text-yellow-700"
                        : "bg-gray-100 border-gray-400 text-gray-500" // default case
                    }`}
                  >
                    {item?.status?.charAt(0).toUpperCase() +
                      item?.status?.slice(1)}
                  </h2>
                </td>
                <td className="px-4 py-4 ">
                  <button
                    onClick={() => setDeleteAllowedIp(item?.id)}
                    className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 cursor-pointer rounded text-xl"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
      </Table>
      <TableFooter
        startIndex={startIndex}
        data={visibleTransactions}
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />

      {/* add allowed ip address modal */}
      {addAllowedIp && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
          <div className="relative w-full max-w-xl max-h-full  ">
            <div className="relative p-10 bg-white rounded-[4px] shadow">
              <div className="space-y-4 text-black text-size">
                <FilterStatus
                  showMerchantStatus={showStores}
                  setShowMerchantStatus={setShowStores}
                  setSearchMerchantStatus={setStore}
                  searchMerchantStatus={
                    store?.business_name
                      ? store?.business_name?.charAt(0).toUpperCase() +
                        store?.business_name?.slice(1).toLowerCase()
                      : ""
                  }
                  id="setShowStores"
                  placeholderText="All Stores..."
                  label="All Stores"
                  required={true}
                  cssClass="w-full"
                >
                  {storesUser?.map((item, index) => (
                    <div
                      key={index}
                      className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white w-full justify-between"
                      onClick={() => {
                        setStore(item);
                        setShowStores(false);
                      }}
                    >
                      <span>
                        {" "}
                        {item?.business_name?.charAt(0).toUpperCase() +
                          item?.business_name?.slice(1).toLowerCase()}
                      </span>
                    </div>
                  ))}
                </FilterStatus>
                <InputFiledLabel
                  value={allowedIp}
                  onChange={setAllowedIp}
                  placeholder="Allowed Ip"
                  label="Allowed Ip"
                  errors={error}
                  required={true}
                />
                <div className=" flex items-center gap-3">
                  <button
                    onClick={handleAllowedIps}
                    disabled={addLoading}
                    className=" py-2 px-4 bg-gradient-2 cursor-pointer flex items-center gap-2 text-white text-base font-medium rounded w-fit shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {addLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <button
                    onClick={() => setAddAllowedIp(false)}
                    className=" py-2 px-4 bg-red-500 cursor-pointer text-white hover:bg-red-600 rounded w-fit shadow-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* delete allowed ip address modal */}
      {deleteAllowedIp && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
          <div className="relative w-full max-w-lg max-h-full  ">
            <div className="relative p-10 bg-white rounded-[4px] shadow">
              <div className="space-y-5 text-black text-size text-center">
                <div className="space-y-2">
                  <div className="text-6xl text-red-500 flex items-center justify-center ">
                    <MdDelete />
                  </div>
                  <div>
                    <p className="font-medium">Are you sure</p>
                    <p>you want to delete this allowed ip?</p>
                  </div>
                </div>
                <div className=" flex items-center gap-3 justify-center w-full">
                  <button
                    onClick={handleDeleteAllowedIp}
                    // disabled={loading}
                    className=" py-2 px-4 bg-gradient-2 text-white text-base font-medium rounded-md w-fit shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {deleteItem ? "Loading..." : "Submit"}
                  </button>
                  <button
                    onClick={() => setDeleteAllowedIp(null)}
                    className=" py-2 px-4 bg-red-500 text-white hover:bg-red-600 cursor-pointer rounded w-fit shadow-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default AllowedIpPage;
