"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import InputField from "@/app/ui/InputField";
import Button from "@/app/ui/Button";
import ApiRequest from "@/app/lib/Api_request";
import SelectDrpodownManu from "@/app/ui/SelectDrpodownManu";
import ModalHeader from "@/app/ui/ModalHeader";
import Cookies from "js-cookie";
import countries from "@/public/countries.json";
import { FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { validatePhoneNumber } from "@/app/lib/formatAndValidatePhoneNumber";

function StepIndicator({ step, user }) {
  const isAdmin = user?.roles?.[0]?.name === "Admin";

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

      {isAdmin && (
        <>
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
              2
            </div>
            <div className="text-center">
              Business <br /> Representative
            </div>
          </div>
        </>
      )}

      <span
        className={`w-48 h-[2px] mb-12 ${
          step >= (isAdmin ? 3 : 2) ? "bg-[#7073F3]" : "bg-gray-300"
        }`}
      />

      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            step >= (isAdmin ? 3 : 2)
              ? "bg-[#7073F3] text-white"
              : "bg-gray-300"
          }`}
        >
          {isAdmin ? 3 : 2}
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
  const [user, setUser] = useState(null);

  // Profile Form CODE
  const [company, setCompany] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [identityOfCompany, setIdentityOfCompany] = useState(null);
  const [showIdentityOfCompany, setShowIdentityOfCompany] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [businessType, setBusinessType] = useState(null);
  const [showBusinessType, setShowBusinessType] = useState(false);

  // Additional Info Form code
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [countryId, setCountryId] = useState(0);
  const [phoneCode, setPhoneCode] = useState("+00");
  const [showPassword, setShowPassword] = useState(false);

  // BusinessInfoForm fo Form code
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCountryClick = (country) => {
    setSearchTerm(country.name);
    setCountryId(country.id);
    setPhoneCode(country.phone_code);
    setShowCountryList(false);
  };

  const filteredCountries = countries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const token = Cookies.get("auth_token_font");

  useEffect(() => {
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
  };

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

  const validateStep2 = () => {
    const newErrors = {};
    const phoneValidation = validatePhoneNumber(phoneCode, phoneNumber);
    if (!fullName) newErrors.fullName = "Please enter your full name.";
    if (!emailAddress) {
      newErrors.emailAddress = "Please enter an email address.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address.";
    }
    if (!countryId) newErrors.countryId = "Please select a country.";
    if (!phoneNumber) newErrors.phoneNumber = "Please enter a phone number.";
    if (!phoneValidation.isValid) {
      console.log("phoneValidation", phoneValidation);
      newErrors.phoneNumber = phoneValidation.error;
    }
    if (!password) newErrors.password = "Please enter a password.";
    setPhoneNumber(phoneValidation.formattedPhone);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep((prev) => prev + 1);
      }
    } else if (step === 2) {
      if (user?.roles?.[0]?.name === "Admin") {
        if (validateStep2()) {
          setStep((prev) => prev + 1);
        }
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const validateStep3 = () => {
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
    console.log("newErrors", newErrors);
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
    if (!validateStep3()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("company", identityOfCompany?.id);
    formData.append("industry", businessType?.id);
    formData.append("description", productDescription);

    if (user?.roles?.[0]?.name === "Admin") {
      formData.append("name", fullName);
      formData.append("email", emailAddress);
      formData.append("country", countryId);
      formData.append("phone", phoneNumber);
      formData.append("password", password);
      formData.append("confirmPassword", password);
    }

    formData.append("business_name", businessName);
    formData.append("address", address);
    formData.append("web_address", webAddress);

    try {
      const response = await ApiRequest({
        url:
          user?.roles?.[0]?.name === "Admin"
            ? "/submit_merchant"
            : "/self/merchant_apply",
        formdata: formData,
      });

      if (response?.status === 201) {
        toast.success("Store Apply Success");
        setOpen(false);

        // Reset form fields
        setIdentityOfCompany(null);
        setBusinessType(null);
        setProductDescription("");
        setFullName("");
        setEmailAddress("");
        setPhoneNumber("");
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

  const isAdmin = user?.roles?.[0]?.name === "Admin";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      <div className="relative w-full max-w-3xl max-h-full bg-white rounded-lg text-black">
        <ModalHeader
          title={isAdmin ? "New User Create" : "New Store Create"}
          action={() => setOpen(false)}
        />
        <div className="p-6 space-y-5">
          <StepIndicator step={step} user={user} />

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

          {isAdmin && step === 2 && (
            <div className="grid items-start gap-4">
              <div className="grid gap-1">
                <InputField
                  label="Legal Name of Person"
                  id="legal-name"
                  value={fullName}
                  onChange={setFullName}
                  required={true}
                  error={errors.fullName}
                  type="text"
                />
              </div>

              <div className="grid gap-1">
                <InputField
                  label="Email"
                  id="email"
                  value={emailAddress}
                  onChange={setEmailAddress}
                  required={true}
                  error={errors.emailAddress}
                  type="email"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="mb-2 inline-block text-sm sm:text-base"
                >
                  Country Name <span className="text-red-500">*</span>
                </label>
                <div
                  id="showMerchantList"
                  ref={dropdownRef}
                  className="relative rounded-[4px] my-2 md:my-0"
                >
                  <div
                    id="country"
                    className={`border flex items-center justify-between text-gray-900 rounded-[4px] w-full px-2 py-3 ${
                      showCountryList
                        ? "focus:ring-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setShowCountryList((prev) => !prev)}
                  >
                    <h2>
                      {searchTerm?.length > 0 ? searchTerm : "Select Country"}
                    </h2>
                    {searchTerm ? (
                      <div className="absolute top-3 right-2">
                        <FaTimes
                          className="w-5 h-5 rounded-full cursor-pointer text-lg text-white bg-[#2F65EC] p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchTerm("");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="absolute top-5 right-2">
                        <FaChevronDown
                          className={`transition-transform duration-300 ${
                            showCountryList ? "rotate-180" : ""
                          } text-xs text-gray-500`}
                        />
                      </div>
                    )}
                  </div>

                  {showCountryList && (
                    <div
                      id="country-list"
                      className="absolute top-12 left-0 right-0 bg-white rounded-b-md z-10 max-h-[200px] overflow-y-auto shadow-lg"
                    >
                      <input
                        type="text"
                        id="country"
                        placeholder="Search countries..."
                        className="w-full border-b bg-gray-50 px-3 py-2 outline-none transition duration-100"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowCountryList(true);
                        }}
                        name="random-country"
                        autoComplete="random-country"
                      />
                      {filteredCountries?.length > 0 ? (
                        filteredCountries.map((country, index) => (
                          <div
                            key={index}
                            className="px-2 py-2 lg:py-2 lg:px-3 text-black text-sm cursor-pointer hover:bg-gradient-to-r from-blue-500 to-purple-600 hover:text-white w-full flex items-center justify-between"
                            onClick={() => handleCountryClick(country)}
                          >
                            {country.name}
                            <span>{country.phone_code}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-sm">
                          No countries available
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {errors.countryId && (
                  <p className="text-red-500">{errors.countryId}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 inline-block text-sm sm:text-base"
                >
                  Phone No <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border relative flex items-center text-gray-900 rounded-[4px] w-full p-1 ${
                    phoneNumber
                      ? "focus:ring-blue-500 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <span
                    onClick={() => setShowCountryList(true)}
                    id="showMerchantList"
                    className="ml-2 text-slate-600 cursor-pointer"
                  >
                    {phoneCode}
                  </span>
                  <input
                    className="w-full p-2 bg-transparent rounded-r-md outline-none"
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    placeholder="Phone No."
                    name="uniquePhoneInput"
                    autoComplete="off"
                    required
                  />
                  {phoneNumber && (
                    <span
                      className="absolute top-[24px] right-2 transform -translate-y-1/2 text-gray-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhoneNumber("");
                      }}
                    >
                      <FaTimes className="w-5 h-5 rounded-full cursor-pointer text-white bg-[#2F65EC] p-1" />
                    </span>
                  )}
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="grid gap-1">
                <InputField
                  label="Password"
                  id="password"
                  value={password}
                  onChange={setPassword}
                  required={true}
                  error={errors.password}
                  type={showPassword ? "text" : "password"}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onclickFunction={handlePrevious}
                  cssClass="bg-gray-500"
                  text="Previous"
                />
                <Button
                  onclickFunction={handleNext}
                  cssClass="bg-gradient-to-r from-[#2F65EC] to-[#7073F3]"
                  text="Next"
                />
              </div>
            </div>
          )}

          {(isAdmin ? step === 3 : step === 2) && (
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
