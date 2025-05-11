"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import InputFiledLabel from "../(dashboard_Component)/InputFiledLabel";
import FilterStatus from "../(dashboard_Component)/FilterStatus";

function WithdrawTransactions({
  showModal,
  setShowModal,
  getMainBalance,
  getWithdrw,
  mainBalance,
}) {
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [storesUser, setStoresUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTransitionMethod, setShowTransitionMethod] = useState(false);
  const [transitionMethod, setTransitionMethod] = useState(null);
  const [showCurrency, setShowCurrency] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [deposit_Address, setDeposit_Address] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const token = Cookies.get("auth_token_font");

  const [showStores, setShowStores] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (showModal && currency) {
      const getPayment = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/get_withdraw_type?method=${currency}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response?.status === 200) {
            setPaymentMethod(response?.data?.data);
          } else {
            toast.error("Failed to fetch payment methods.");
          }
        } catch (error) {
          toast.error("An error occurred while fetching payment methods.");
        }
      };
      getPayment();
    }
  }, [showModal, currency]);

  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem("storesUser"));
    if (storeUser) {
      setStoresUser(storeUser);
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!currency?.trim()) {
      valid = false;
      newErrors.currency = "Currency is required.";
    }
    if (!transitionMethod?.network) {
      valid = false;
      newErrors.network = "Payment method is required.";
    }
    if (!deposit_Address) {
      valid = false;
      newErrors.deposit_Address = "Deposit address is required.";
    }
    if (!amount) {
      valid = false;
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amount)) {
      valid = false;
      newErrors.amount = "Amount must be a valid number.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    const formdata = new FormData();
    formdata.append("currency", currency);
    formdata.append("method", transitionMethod?.network);
    formdata.append("account", deposit_Address);
    formdata.append("amount", amount);
    formdata.append("api_id", store?.api_id);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/withdrawal_request`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status == 201) {
        toast.success("Withdraw Request Success");
        getMainBalance();
        getWithdrw();
        setCurrency("");
        setTransitionMethod(null);
        setDeposit_Address("");
        setAmount("");
        setStore(null);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setShowModal(false);
    setLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickTargets = [
        { id: "setShowTransitionMethod", setter: setShowTransitionMethod },
        { id: "setShowCurrency", setter: setShowCurrency },
        { id: "setShowStores", setter: setShowStores },
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
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            Settlement Request :{" "}
            <span className="text-green-500">
              {" "}
              {mainBalance?.toLocaleString("en-US")}
            </span>
          </h3>
          <button
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
            onClick={() => setShowModal(!showModal)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4 w-full">
          <FilterStatus
            showMerchantStatus={showCurrency}
            setShowMerchantStatus={setShowCurrency}
            setSearchMerchantStatus={setCurrency}
            searchMerchantStatus={currency ? currency : ""}
            id="setShowCurrency"
            placeholderText="Currency..."
            label="Currency Name"
            required={true}
            error={errors.currency}
            cssClass="w-full"
          >
            {["BDT", "USD"]?.map((item, index) => (
              <div
                key={index}
                className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white w-full justify-between"
                onClick={() => {
                  setCurrency(item);
                  setShowCurrency(false);
                }}
              >
                <span> {item}</span>
              </div>
            ))}
          </FilterStatus>

          <FilterStatus
            showMerchantStatus={showTransitionMethod}
            setShowMerchantStatus={setShowTransitionMethod}
            setSearchMerchantStatus={setTransitionMethod}
            searchMerchantStatus={
              transitionMethod?.network
                ? transitionMethod?.network?.charAt(0).toUpperCase() +
                  transitionMethod?.network?.slice(1).toLowerCase()
                : ""
            }
            id="setShowTransitionMethod"
            placeholderText="Payment Method..."
            label="Payment Method"
            required={true}
            error={errors.network}
            cssClass="w-full"
          >
            {Array.isArray(paymentMethod) &&
              paymentMethod?.map((item, index) => (
                <div
                  key={index}
                  className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white w-full justify-between"
                  onClick={() => {
                    setTransitionMethod(item);
                    setShowTransitionMethod(false);
                  }}
                >
                  <span> {item?.network}</span>
                </div>
              ))}
          </FilterStatus>

          <FilterStatus
            showMerchantStatus={showStores}
            setShowMerchantStatus={setShowStores}
            setSearchMerchantStatus={setStore}
            searchMerchantStatus={store?.business_name ? store?.business_name?.charAt(0).toUpperCase() + store?.business_name?.slice(1).toLowerCase() : ""}
            id="setShowStores"
            placeholderText="All Stores..."
            label="All Stores"
            required={true}
            error={errors.store}
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
                <span> {item?.business_name?.charAt(0).toUpperCase() + item?.business_name?.slice(1).toLowerCase()}</span>
              </div>
            ))}
          </FilterStatus>
          <InputFiledLabel
            value={deposit_Address}
            onChange={setDeposit_Address}
            placeholder="Deposit Address"
            label="Deposit Address"
            errors={errors.deposit_Address}
            required={true}
            name="account"
            id="account"
          />

          <InputFiledLabel
            value={amount}
            onChange={setAmount}
            label="Amount"
            placeholder="Amount"
            errors={errors.amount}
            required={true}
            name="amount"
            id="amount"
          />

          <div className="flex justify-around">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className=" bg-gradient-2 text-white w-full py-2 rounded-md flex items-center justify-center cursor-pointer gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawTransactions;
