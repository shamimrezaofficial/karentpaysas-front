"use client";
import { SetCookies } from "@/app/lib/cookiesSetting";
import axios from "axios";
import Cookies from "js-cookie";
import {useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserLogin() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userID, setUserID] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      setUserID(id);
    }
  }, [id]);

  useEffect(() => {
    if (userID) {
      handleUserLogin();
    }
  }, [userID]);

  const token = Cookies.get("auth_token_font");
  const handleUserLogin = async () => {
    if (!userID) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/impersonate/${userID}`
      );
      if (response && response?.status === 200) {
        if (token) {
          Cookies.remove("auth_token_font");
        }

        localStorage.setItem("auth_token_font", response?.data?.data?.trim());
        const setToken = await SetCookies({
          name: "auth_token_font",
          value: response?.data?.data?.trim(),
        });
        if (setToken) {
          toast.success("Successfully Logged In");
          router.push("/dashboard");
          // location.reload();
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error(
          response?.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      //toast.dismiss(id);
      // console.error("Login error:", error);
    }
  };

  return <></>;
}

export default UserLogin;
