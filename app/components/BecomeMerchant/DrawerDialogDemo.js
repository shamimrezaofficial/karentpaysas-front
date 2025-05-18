"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import InputField from "@/app/ui/InputField";
import Button from "@/app/ui/Button";
import ApiRequest from "@/app/lib/Api_request";
import SelectDrpodownManu from "@/app/ui/SelectDrpodownManu";
import ModalHeader from "@/app/ui/ModalHeader";
import Cookies from "js-cookie";

function StepIndicator({ step }) {

  return (
    <div className="flex items-center justify-around py-4">
      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            step >= 1 ? "bg-[#7073F3] text-white" : "bg-gray-300"
          }`}
        >
          1
        </div>
        <div className="text-center">
          Business <br /> Structure
        </div>
      </div>
      <span
        className={`w-48 h-[2px] mb-12 ${
          step >= 2 ? "bg-[#7073F3]" : "bg-gray-300"
        }`}
      />

      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            step >= 2 ? "bg-[#7073F3] text-white" : "bg-gray-300"
          }`}
        >
          {2}
        </div>
        <div className="text-center">
          Business <br /> Details
        </div>
      </div>
    </div>
  );
}

export function DrawerDialogDemo({ open, setOpen }) {
  const dropdownRef = useRef(null);
  if (!open) return null;
  const [step, setStep] = useState(1);
  // const [user, setUser] = useState(null);

  // Profile Form CODE
  const [company, setCompany] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [identityOfCompany, setIdentityOfCompany] = useState(null);
  const [showIdentityOfCompany, setShowIdentityOfCompany] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [businessType, setBusinessType] = useState(null);
  const [showBusinessType, setShowBusinessType] = useState(false);

  // BusinessInfoForm fo Form code
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("auth_token_font");

/*   useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (!token) return;
    const response = await ApiRequest({
      url: "/user",
      method: "get",
    });
    if (response?.status === 200) {
      setUser(response?.data?.user);
    }
  }; */

  useEffect(() => {
    getBusinessStructure();
  }, []);

  const getBusinessStructure = async () => {
    const response = await ApiRequest({
      url: "/business_structure",
      method: "get",
    });
    if (response?.status === 200) {
      setCompany(response?.data?.company);
      setIndustry(response?.data?.industry);
    }
  };

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!identityOfCompany?.id) {
      newErrors.identityOfCompany = "Please select a company identity.";
    }
    if (!businessType?.id) {
      newErrors.businessType = "Please select a business type.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!businessName) {
      newErrors.businessName = "Please enter the business name.";
    }
    if (!address) {
      newErrors.address = "Please provide an address.";
    }
    if (!webAddress) {
      newErrors.webAddress = "Please provide a web address.";
    } else if (!isValidUrl(webAddress)) {
      newErrors.webAddress = "Please enter a valid URL.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("company", identityOfCompany?.id);
    formData.append("industry", businessType?.id);
    formData.append("description", productDescription);
    formData.append("business_name", businessName);
    formData.append("address", address);
    formData.append("web_address", webAddress);

    try {
      const response = await ApiRequest({
        url: "/self/merchant_apply",
        formdata: formData,
      });

      if (response?.status === 201) {
        toast.success("Store Apply Success");
        setOpen(false);

        // Reset form fields
        setIdentityOfCompany(null);
        setBusinessType(null);
        setProductDescription("");
        setBusinessName("");
        setAddress("");
        setWebAddress("");
        setErrors({});
      } else if (response?.status === 400) {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickTargets = [
        { id: "companyType", setter: setShowIdentityOfCompany },
        { id: "industry", setter: setShowBusinessType },
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
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      <div className="relative w-full max-w-3xl max-h-full bg-white rounded-lg text-black">
        <ModalHeader
          title={"New Store Create"}
          action={() => setOpen(false)}
        />
        <div className="p-6 space-y-5">
          <StepIndicator step={step} />

          {step === 1 && (
            <div className="grid items-start gap-4 w-full">
              <div className="grid gap-1">
                <SelectDrpodownManu
                  showDeopDownManu={showIdentityOfCompany}
                  setShowDeopDownManu={setShowIdentityOfCompany}
                  showData={identityOfCompany?.company_name}
                  setShowData={setIdentityOfCompany}
                  label="Company Type"
                  id="companyType"
                  required={true}
                  error={errors.identityOfCompany}
                >
                  {Array.isArray(company) &&
                    company.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setIdentityOfCompany(item);
                          setShowIdentityOfCompany(false);
                        }}
                        className="p-3 py-1 hover:text-white hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] cursor-pointer"
                      >
                        <h2>{item.company_name}</h2>
                      </div>
                    ))}
                </SelectDrpodownManu>
              </div>

              <div className="grid gap-1">
                <SelectDrpodownManu
                  showDeopDownManu={showBusinessType}
                  setShowDeopDownManu={setShowBusinessType}
                  showData={businessType?.industry_name}
                  setShowData={setBusinessType}
                  label="Industry/Business Type"
                  id="industry"
                  required={true}
                  error={errors.businessType}
                >
                  {Array.isArray(industry) &&
                    industry.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setBusinessType(item);
                          setShowBusinessType(false);
                        }}
                        className="p-3 py-1 hover:text-white hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] cursor-pointer"
                      >
                        <h2>{item.industry_name}</h2>
                      </div>
                    ))}
                </SelectDrpodownManu>
              </div>

              <div className="grid gap-1">
                <InputField
                  label="Product description"
                  id="description"
                  value={productDescription}
                  onChange={setProductDescription}
                  type="textarea"
                />
              </div>

              <Button
                onclickFunction={handleNext}
                cssClass="bg-gradient-to-r from-[#2F65EC] to-[#7073F3]"
                text="Next"
              />
            </div>
          )}
          {step === 2 && (
            <div className="grid items-start gap-4">
              <div className="grid gap-1">
                <InputField
                  label="Business Name"
                  id="business-name"
                  value={businessName}
                  onChange={setBusinessName}
                  required={true}
                  error={errors.businessName}
                />
              </div>

              <div className="grid gap-1">
                <InputField
                  label="Address"
                  id="address"
                  value={address}
                  onChange={setAddress}
                  required={true}
                  error={errors.address}
                />
              </div>

              <div className="grid gap-1">
                <InputField
                  label="Web Address"
                  id="web-address"
                  value={webAddress}
                  onChange={setWebAddress}
                  required={true}
                  error={errors.webAddress}
                />
              </div>

              <div className="grid gap-1 grid-cols-1 md:grid-cols-2">
                <Button
                  cssClass="bg-gray-500"
                  onclickFunction={handlePrevious}
                  text="Previous"
                />
                <Button
                  onclickFunction={handleSubmit}
                  cssClass="bg-gradient-to-r from-[#2F65EC] to-[#7073F3]"
                  text="Submit"
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
