"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputField from "@/app/ui/InputField";
import Button from "@/app/ui/Button";
import ApiRequest from "@/app/lib/Api_request";
import SelectDrpodownManu from "@/app/ui/SelectDrpodownManu";

export default function OwnMerchantApply() {
  // Profile Form CODE
  const [company, setcompany] = useState([]);
  const [industry, setindustry] = useState([]);
  const [identityOfCompany, setIdentityOfCompany] = useState("");
  const [showIdentityOfCompany, setShowIdentityOfCompany] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [showBusinessType, setShowBusinessType] = useState(false);

  // BusinessInfoForm fo Form code
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await ApiRequest({
      url: "/business_structure",
      method: "get",
    });
    if (response?.status == 200) {
      setcompany(response?.data?.company);
      setindustry(response?.data?.industry);
    } else {
    }
  };

  const [errors, setErrors] = useState({});
  const validation = () => {
    const newErrors = {};
    if (!identityOfCompany?.id)
      newErrors.identityOfCompany = "Please select a company identity.";
    if (!businessType?.id)
      newErrors.businessType = "Please select a business type.";
    if (!businessName)
      newErrors.businessName = "Please enter the business name.";
    if (!address) newErrors.address = "Please provide an address.";
    if (!webAddress) newErrors.webAddress = "Please provide a web address.";
    if (webAddress) {
      if (!isValidUrl(webAddress)) {
        newErrors.webAddress = "Please enter a valid URL.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };
  const isValidUrl = (url) => {
    try {
      // Create a new URL object
      new URL(url);
      return true;
    } catch {
      // Invalid URL
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validation()) {
      setLoading(true);
      const form_data = new FormData();

      form_data.append("address", address);
      form_data.append("business_name", businessName);
      form_data.append("company", identityOfCompany?.id);
      form_data.append("industry", businessType?.id);
      form_data.append("web_address", webAddress);
      form_data.append("description", productDescription);
      try {
         await ApiRequest({
          url: "/self/merchant_apply",
          formdata: form_data,
        });
      
          toast.success("Own Merchant Apply Success");

          // Reset form fields to empty strings
          setIdentityOfCompany("");
          setBusinessType("");
          setProductDescription("");
          setBusinessName("");
          setAddress("");
          setWebAddress("");
          // Optionally, reset errors state
          setErrors({});
        
      } catch (error) {
        toast.error(error?.response?.message);
      }
      setLoading(false);
    }
  };

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
    <section className=" bg-white shadow-md border border-gray-200 rounded-md ml-0 ">
      <div className="p-6 space-y-5">
        <InputField
          label="Business Name"
          id="business-name"
          value={businessName}
          onChange={setBusinessName}
          required={true}
          error={errors.businessName}
        />
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
            company?.map((item) => (
              <div
                key={item?.id}
                onClick={() => {
                  setIdentityOfCompany(item);
                  setShowIdentityOfCompany(false);
                }}
                className="p-3 py-1 hover:text-white hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] cursor-pointer"
              >
                <h2>{item?.company_name}</h2>
              </div>
            ))}
        </SelectDrpodownManu>
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
            industry?.map((item) => (
              <div
                key={item?.id}
                onClick={() => {
                  setBusinessType(item);
                  setShowBusinessType(false);
                }}
                className="p-3 py-1 hover:text-white hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] cursor-pointer"
              >
                <h2>{item?.industry_name}</h2>
              </div>
            ))}
        </SelectDrpodownManu>
        <InputField
          label="Address"
          id="address"
          value={address}
          onChange={setAddress}
          required={true}
          error={errors.address}
        />
        <InputField
          label="Web Address"
          id="web-address"
          value={webAddress}
          onChange={setWebAddress}
          required={true}
          error={errors.webAddress}
        />
        <InputField
          label="Product description"
          id="description"
          value={productDescription}
          onChange={setProductDescription}
          type="textarea"
        />
        <Button
          onclickFunction={handleSubmit}
          cssClass="bg-gradient-to-r from-[#2F65EC] to-[#7073F3]"
          text="Submit"
          loading={loading}
        />
      </div>
    </section>
  );
}
