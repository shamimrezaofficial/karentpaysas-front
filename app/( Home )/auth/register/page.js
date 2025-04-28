"use client";
import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaChevronDown, FaSpinner, FaTimes } from "react-icons/fa";
import ApiRequest from "@/app/lib/Api_request";
import { SetCookies } from "@/app/lib/cookiesSetting";
import InputField from "@/app/ui/InputField";
import Cookies from "js-cookie";
import countries from "@/public/countries.json";

export default function Register() {
  const dropdownRef = useRef(null);
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [countryId, setCountryId] = useState(0);
  const [phoneCode, setPhoneCode] = useState("+00");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [loginGoogle, setLoginGoogle] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCountryClick = (country) => {
    setSearchTerm(country.name);
    setCountryId(country.id);
    setPhoneCode(country ? country.phone_code : "+00");
    setShowCountryList(false);
  };
  const filteredCountries = countries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate name
    if (!name?.trim()) {
      formErrors.name = "Full name is required";
      isValid = false;
    }

    // Validate phone and phone code
    if (phoneCode === "+00") {
      formErrors.phoneCode = "Phone code is required";
      isValid = false;
    }
    if (!phone?.trim()) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    }

    // Validate country (searchTerm and filteredCountries)
    if (!searchTerm?.trim()) {
      formErrors.searchTerm = "Country is required";
      isValid = false;
    } else if (filteredCountries?.length === 0) {
      formErrors.searchTerm = "Country not found";
      isValid = false;
    }

    // Validate email
    if (!email?.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email format is invalid";
      isValid = false;
    }

    // Validate password
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    // Validate confirm password
    if (password && password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Set errors
    setErrors(formErrors);

    // Return form validity
    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phoneCode + phone);
        formData.append("country", countryId);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);

        const response = await ApiRequest({
          url: "/register",
          formdata: formData,
        });
        if (response?.status == 200) {
          const token = await SetCookies({
            name: "auth_token_font",
            value: response?.data?.token?.trim()
          });
          Cookies.set("secret_pass", password?.trim());
          toast.success('Successfully Registered');
          // window.location.href = '/dashboard';
        }

        if (response?.message)
          toast?.error("The email has already been taken.");
      } catch (error) {
        toast.error("An error occurred while signing up.");
      }
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
    const googleLogin = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/google/auth`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        if (data) {
          setLoginGoogle(data?.url);
        }
      }
    };
    googleLogin();
  }, []);

  return (
    <>
      <div className=" flex flex-row items-center justify-center">
        <div className="bg-white py-6 sm:py-8 lg:py-12 w-full">
          <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 lg:text-3xl">
              Welcome Back! Please Register
            </h2>

            <div className="mx-auto w-full sm:w-[34rem] rounded border border-gray-200">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <InputField
                  id="full_name"
                  name="name"
                  label="Full Name"
                  placeholder="Full Name"
                  value={name}
                  onChange={setName}
                  required={true}
                  errors={errors.name}
                />

                <InputField
                  id="email"
                  name="email"
                  label="Your Email"
                  placeholder="Your Email"
                  value={email}
                  onChange={setEmail}
                  required={true}
                  errors={errors.email}
                />

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 inline-block text-sm sm:text-base"
                  >
                    Country Name
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
                      onClick={() => setShowCountryList((prev) => !prev)}>
                      <h2
                       
                      >
                        {searchTerm?.length > 0 ? searchTerm : "Select Country"}
                      </h2>
                      {searchTerm ? (
                        <div className="absolute top-3 right-2">
                          <FaTimes
                            className="w-5 h-5 rounded-full cursor-pointer text-lg text-white bg-[#2F65EC] p-1"
                            onClick={() => setSearchTerm("")}
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
                        className="absolute top-12 left-0 right-0 bg-white rounded-b-md z-10 max-h-[300px] overflow-y-auto shadow-lg"
                      >
                        <input
                          type="text"
                          id="country"
                          placeholder="Search countries..."
                          className="w-full border-b bg-gray-50 px-3 py-2 outline-none transition duration-100 "
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowCountryList(true);
                          }}
                          name="random-country"
                          autoComplete="random-country"
                        />
                        {Array.isArray(filteredCountries) &&
                        filteredCountries?.length > 0 ? (
                          filteredCountries?.map((country, index) => (
                            <div
                              key={index}
                              className="px-2 py-2 lg:py-2 lg:px-3 text-black text-sm cursor-pointer hover:bg-gradient-to-r from-blue-500 to-purple-600 hover:text-white w-full flex items-center justify-between"
                              onClick={() => handleCountryClick(country)}
                            >
                              {country?.name}
                              <span>{country?.phone_code}</span>
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
                  {errors.searchTerm && (
                    <p className="text-red-500">{errors.searchTerm}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 inline-block text-sm  sm:text-base"
                  >
                    Phone No.
                  </label>
                  <div
                    className={`border flex items-center text-gray-900 rounded-[4px] w-full p-1 ${
                      phone
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
                      className="w-full p-2  bg-transparent rounded-r-md outline-none"
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="Phone No."
                      name="uniquePhoneInput"
                      autoComplete="off"
                      required
                    />
                    {phone && (
                      <span
                        className="absolute top-2.5 right-2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setPhone("")}
                      >
                        <FaTimes className="w-5 h-5 rounded-full cursor-pointer text-white bg-[#2F65EC] p-1" />
                      </span>
                    )}
                  </div>
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}
                </div>

                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  required={true}
                  errors={errors.password}
                  type="password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                <InputField
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  required={true}
                  errors={errors.confirmPassword}
                  type="password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                <button
                  onClick={handleSignUp}
                  className="flex items-center cursor-pointer justify-center gap-2 rounded bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-1" />
                      Loading...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <Link
                  href={`${loginGoogle}`}
                  prefetch={false}
                  className="flex items-center justify-center gap-2 rounded border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold  outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                >
                  <FcGoogle size={24} />
                  Continue with Google
                </Link>
              </div>
              <div className="flex items-center justify-center bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    prefetch={false}
                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 hover:underline active:text-indigo-700"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
