"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaSpinner } from "react-icons/fa6";
import InputFiledLabel from "../(dashboard_Component)/InputFiledLabel";
import ApiRequest from "@/app/lib/Api_request";
import { validatePhoneNumber } from "@/app/lib/formatAndValidatePhoneNumber";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const [profileImageLink, setProfileImageLink] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const [countries, setCountries] = useState([]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [countryId, setCountryId] = useState(0);
  const [phoneCode, setPhoneCode] = useState(0);

  const [loading, setLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const imageRef = useRef(null);

  const [user, setUser] = useState(null);
  const token = Cookies.get("auth_token_font");

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 200) {
        setUser(response?.data?.data?.user);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      // console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await ApiRequest({
          url: "/country",
          method: "GET",
        });

        if (response?.status === 200) {
          setCountries(response?.data);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        // console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  // replace the phone number in the country code function
  const removeCountryCode = (phone, countryCode) => {
    if (!phone || !countryCode) return phone;
    const escapedCountryCode = countryCode.replace(
      /[.*+?^=!:${}()|\[\]\/\\]/g,
      "\\$&"
    );

    const regex = new RegExp(`^${escapedCountryCode}`);
    return phone.replace(regex, "").trim();
  };

  useEffect(() => {
    if (user && countries) {
      // Set user details
      setName(user?.name);
      setEmail(user?.email);
      setProfileImageLink(user?.avatar);

      // Extract country details
      const country = countries[user?.country - 1];
      if (country) {
        setSelectedCountry(country?.name);
        setPhoneCode(country?.phone_code);
        setCountryId(user?.country);
        const phoneNumberWithoutCountryCode = removeCountryCode(
          user?.phone,
          country?.phone_code
        );
        setPhone(phoneNumberWithoutCountryCode);
      }
    }
  }, [user, countries]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country?.name);
    setCountryId(country?.id);
    setPhoneCode(country?.phone_code);
    setShowCountryList(false);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    };

    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";

    if (newPassword && !password) {
      newErrors.password = "Current password is required to set new password";
    }

    if (newPassword !== newPasswordConfirm) {
      newErrors.newPasswordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const phoneValidation = validatePhoneNumber(phoneCode, phone);
    if (!phoneValidation.isValid) {
      setErrors({ phone: phoneValidation.error });
      return;
    }
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", countryId);
    formData.append("phone", phoneValidation.formattedPhone);
    if (profileImage) {
      formData.append("avatar", profileImage);
    }
    if (newPassword) {
      if (password) {
        formData.append("password", password);
      }
      if (newPassword && newPasswordConfirm) {
        formData.append("new_password", newPassword);
        formData.append("confirm_password", newPasswordConfirm);
      }
    }

    if (!token) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchUser();
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error?.response?.data?.errors?.email)
        return toast.error(error?.response?.data?.errors?.email[0]);
      if (error?.response?.data?.error) {
        return toast.error(error?.response?.data?.error);
      }
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearImage = () => {
    setProfileImage(null);
    setProfileImageLink("");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  // outlet click close the toggle function
  useEffect(() => {
    const handleClickOutsideUsersFilter = (event) => {
      if (!event.target.closest("#showMerchantList")) {
        setShowCountryList(false);
      }
    };
    const setIsFocusedOutsite = (event) => {
      if (!event.target.closest("#setIsFocused")) {
        setIsFocused(false);
      }
    };
    window.document.addEventListener("click", handleClickOutsideUsersFilter);
    window.document.addEventListener("click", setIsFocusedOutsite);

    return () => {
      window.document.removeEventListener(
        "click",
        handleClickOutsideUsersFilter
      );
      window.document.removeEventListener("click", setIsFocusedOutsite);
    };
  }, []);

  return (
    <section className="bg-white shadow-md border border-gray-200 rounded">
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-center ">
        <InputFiledLabel
          value={name}
          onChange={setName}
          placeholder="Full Name"
          id="name"
          label="Full Name"
          errors={errors.name}
          required={true}
        />
        <InputFiledLabel
          value={email}
          placeholder="Email"
          id="email"
          label="Email"
          required={true}
          readOnly={true}
        />
        <div>
          <div
            id="showMerchantList"
            onClick={() => setShowCountryList(!showCountryList)}
            className="relative rounded-[4px]  my-2 md:my-0"
          >
            <label
              htmlFor="country"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                id="country"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded outline-[#2F65EC] block w-full p-3"
                placeholder="Select your country..."
                value={selectedCountry}
              />
              <div className="absolute top-4 right-2">
                <span
                  className={`w-2.5 h-2.5 ms-3 text-gray-400 transition-transform transform ${
                    showCountryList ? "rotate-180" : ""
                  }
                  }`}
                >
                  <FaChevronDown />
                </span>
              </div>
            </div>
            {showCountryList && (
              <div
                id="showMerchantList"
                className="absolute top-full left-0 right-0 bg-white rounded-b-md z-10 max-h-[300px] overflow-y-auto shadow-lg"
              >
                {Array.isArray(filteredCountries) &&
                  filteredCountries?.map((country, index) => (
                    <div
                      key={index}
                      className="px-2 py-2 lg:py-2 lg:px-3 text-black cursor-pointer hover:bg-gradient-to-r from-blue-500 to-purple-600 mx-auto hover:text-white w-full justify-between flex items-center "
                      onClick={() => handleCountryClick(country)}
                    >
                      {country?.name}
                      <span> {country?.phone_code}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="Number"
            className="block mb-1 text-sm font-medium text-gray-900"
          >
            Number <span className="text-red-500">*</span>
          </label>
          <div
            id="setIsFocused"
            className={`flex items-center ${
              errors.phone ? "border-red-500" : ""
            } ${isFocused ? "outline-[2px] outline-[#2F65EC] rounded" : ""}`}
            onClick={() => setIsFocused(!isFocused)}
          >
            <button
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l block w-fit p-3"
              type="button"
            >
              {phoneCode?.length > 1 ? (
                <span className="ml-2 text-slate-600">{phoneCode}</span>
              ) : (
                <span className="ml-2 text-slate-600">+93</span>
              )}
            </button>
            <div className="relative w-full">
              <input
                type="tel"
                id="Number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r border-s-0 outline-none block w-full p-3"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                  setPhone(value);
                }}
                required
              />
            </div>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="Old_Password"
            className="block mb-1 text-sm font-medium text-gray-900"
          >
            Old Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="Old_Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded outline-[#2F65EC] block w-full p-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-0 top-6 bottom-0 flex items-center pr-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye className="cursor-pointer" />
            ) : (
              <FaEyeSlash className="cursor-pointer" />
            )}
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="New_Password"
            className="block mb-1 text-sm font-medium text-gray-900"
          >
            New Password
          </label>
          <input
            id="New_Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded outline-[#2F65EC] block w-full p-3"
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-0 top-6 bottom-0 flex items-center pr-2"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <FaEye className="cursor-pointer" />
            ) : (
              <FaEyeSlash className="cursor-pointer" />
            )}
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="Old_Password"
            className="block mb-1 text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            id="Old_Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded outline-[#2F65EC] block w-full p-3"
            type={showNewPasswordConfirm ? "text" : "password"}
            placeholder="Confirm Password "
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            required
          />
          <div
            className="absolute right-0 top-6 bottom-0 flex items-center pr-2"
            onClick={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}
          >
            {showNewPasswordConfirm ? (
              <FaEye className="cursor-pointer" />
            ) : (
              <FaEyeSlash className="cursor-pointer" />
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Profile Image
          </label>
          <div className="relative border mx-auto lg:mx-0 bg-white focus-within:border-[#2F65EC] hover:border-[#2F65EC] rounded-md w-full lg:w-full">
            <input
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              name="img1"
              id="imgUpload1"
              ref={imageRef}
              onChange={(e) => {
                e.preventDefault();
                const file = e.target.files[0];
                if (file) {
                  if (!file.type.startsWith("image/")) {
                    toast.error("Only image files are allowed!", {
                      autoClose: 3000,
                    });
                    return;
                  }
                  setProfileImage(file);
                }
              }}
            />
            <div className="flex items-center justify-between rounded-md overflow-hidden">
              <label
                htmlFor="imgUpload1"
                className="px-4 py-3 text-center bg-black text-white whitespace-nowrap cursor-pointer w-1/2"
              >
                Choose file
              </label>
              <span
                id="fileName1"
                className="px-4 py-2 lg:py-3 bg-transparent text-black w-full text-center"
              >
                {profileImage ? profileImage?.name : "No file chosen"}
              </span>
            </div>
          </div>
        </div>
        <div></div>
        <div>
          {(profileImage || profileImageLink) && (
            <div className="relative">
              <Image
                src={
                  profileImage
                    ? URL?.createObjectURL(profileImage)
                    : profileImageLink
                }
                alt="logo"
                width={100}
                height={50}
                loading="lazy"
              />
              <TiDeleteOutline
                className="absolute top-0 right-0 cursor-pointer h-6 w-6"
                onClick={clearImage}
              />
            </div>
          )}
        </div>

        <div className="mt-5 md:mt-0">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-400 mx-auto lg:mx-0 w-full md:w-fit px-6 py-2.5 p-2 rounded text-center text-white flex justify-center items-center hover:from-blue-700 hover:to-purple-500 gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Loading...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProfilePage;
