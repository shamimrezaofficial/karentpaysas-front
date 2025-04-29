"use client";

import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

function MerchantLogin() {
  const tokenFromCookies = Cookies.get("auth_token_font");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      let tokenFromLocalStorage = window?.localStorage?.getItem("auth_token_font");

      if (tokenFromCookies || tokenFromLocalStorage) {
        Cookies.remove("auth_token_font");
        window.localStorage.removeItem("auth_token_font");
      }

      // Ensure 'id' is a valid string before setting it
      if (typeof id === "string" && id.trim() !== "") {
        Cookies.set("auth_token_font", id);
        window.localStorage.setItem("auth_token_font", id);
      }
      toast.success("Successfully Logged In");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    }
  }, [id, tokenFromCookies]);

  return null;
}

export default MerchantLogin;
