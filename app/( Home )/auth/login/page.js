"use client";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

import Link from "next/link";
import { toast } from "react-toastify";
import ApiRequest from "@/app/lib/Api_request";
import { SetCookies } from "@/app/lib/cookiesSetting";
import InputField from "@/app/ui/InputField";
import { ResetPasswordToast } from "../ResetPassword/ResetPasswordToast";
import Cookies from "js-cookie";

export default function Login() {
  const [errors, setErrors] = useState({});

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginGoogle, setLoginGoogle] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrors({ email: "Email is required." });
      return;
    }
    if (!password) {
      setErrors({ password: "Password is required." });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await ApiRequest({ url: "/login", formdata: formData });
    if (!response) return;

    if (response?.status == 200) {
      localStorage.setItem("auth_token_font", response?.data?.trim());

      const token = await SetCookies({
        name: "auth_token_font",
        value: response?.data?.trim(),
      });
      Cookies.set('secret_pass', password)
      if (token) {
        setLoading(false);
        toast.success("Successfully Logged In");
        location.reload();
      } else {
        toast.error("Something went wrong");
      }
    } else if (response?.status == 400) {
      setLoading(false);
      var err = JSON.parse(response?.message);
      if (err.email) {
        toast.error(err.email[0]);
      } else if (err.password) {
        toast.error(err.password[0]);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      setLoading(false);
      toast.error(response?.message);
    }

    setLoading(false);
  };

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
    <div className=" container mx-auto flex flex-row items-center justify-center">
      <div className="bg-white py-6 sm:py-8 lg:py-12 w-full">
        <div className="mx-auto w-full max-w-3xl ">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 lg:text-3xl">
            Welcome Back! Please Log In
          </h2>

          <div className="mx-auto w-full sm:w-[34rem] rounded border border-gray-300">
            <div className="space-y-4 px-4 md:px-8 pt-4 md:pt-8">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                required={true}
                errors={errors.email}
              />
              <InputField
                label="Password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                required={true}
                errors={errors.password}
                type="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <div className="flex justify-end">
                <p
                  onClick={() => setIsDrawerOpen(true)}
                  className="ml-12 lg:ml-0 text-[#2F65EC] hover:underline cursor-pointer"
                >
                  Forgot password?
                </p>
              </div>
            </div>
            <div className="flex flex-col px-4 md:px-8 py-4 pb-5 gap-3">
              <button
                className="flex items-center cursor-pointer justify-center gap-2 rounded bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-1" />
                    Loading...
                  </>
                ) : (
                  "Log In"
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
                Don{"'"}t have an account?{" "}
                <Link
                  href="/auth/register"
                  prefetch={false}
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 hover:underline active:text-indigo-700"
                >
                  Register
                </Link>
              </p>
            </div>
            {isDrawerOpen && (
              <ResetPasswordToast
                open={isDrawerOpen}
                setOpen={setIsDrawerOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
