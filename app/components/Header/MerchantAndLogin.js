"use client";
import { deleteCookies } from "@/app/lib/cookiesSetting";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function MerchantAndLogin({ user, authToken, adminUrl }) {
  const [dropdownDefaultButton, setDropdownDefaultButton] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const secret_pass = Cookies.get("secret_pass");

  const logOut = async () => {
    if (localStorage.getItem("secret_key")) {
      localStorage.removeItem("secret_key");
    }
    const deleteToken = await deleteCookies({ name: "auth_token_font" });
    if (deleteToken) {
      location.reload(true);
      toast.success("Successfully Logged Out");
    }
  };

  useEffect(() => {
    const handleClickOutsideOperator = (event) => {
      if (!event.target.closest("#setDropdownDefaultButton")) {
        setDropdownDefaultButton(false);
      }
    };
    window.document.addEventListener("click", handleClickOutsideOperator);

    return () => {
      window.document.removeEventListener("click", handleClickOutsideOperator);
    };
  }, []);

  /*   const loginAdmin = (user) => {
    if (
      user?.roles?.some(
        (role) => role.name === "Merchant" || role.name === "Admin"
      )
    ) {
      window.open(
        `${adminUrl}/login?email=${user?.email}&secret_pass=${secret_pass}`,
        "_blank"
      );
    }
  }; */
  const loginAdmin = (user) => {
    if (
      user?.roles?.some(
        (role) => role.name === "Merchant" || role.name === "Admin"
      )
    ) {
      const adminWindow = window.open(adminUrl+"/login", "_blank");

      const data = {
        email: user?.email,
        secret_pass: secret_pass,
      };
      setTimeout(() => {
        adminWindow.postMessage(
          data,
          adminUrl+"/login"
        );
      }, 1000); 
    }
  };

  return (
    <div className="min-w-[100px]">
      {authToken && user && (
        <div className="relative">
          {user && (
            <div
              ref={trigger}
              id="setDropdownDefaultButton"
              onClick={() => setDropdownDefaultButton(!dropdownDefaultButton)}
              className="relative inline-flex cursor-pointer items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded group-hover:bg-transparent group-hover:text-white flex items-center gap-1">
                {user && user?.name}
                {user?.avatar == null || user?.avatar == undefined ? (
                  ""
                ) : (
                  <Image
                    src={user?.avatar}
                    width={100}
                    height={100}
                    alt="avatar"
                    className="rounded-full w-6 h-6"
                    loading="lazy"
                  />
                )}
              </span>
            </div>
          )}

          {dropdownDefaultButton && (
            <div
              className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute button-0 left-0 "
              style={{ zIndex: "1000" }}
              ref={dropdown}
            >
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    prefetch={false}
                    className="block px-4 py-2 hover:bg-[#4944E3] hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>

                {user?.roles?.some(
                  (role) => role.name === "Merchant" || role.name === "Admin"
                ) && (
                  <li>
                    <h2
                      onClick={() => loginAdmin(user)}
                      className="block px-4 py-2 hover:bg-[#4944E3] hover:text-white cursor-pointer"
                    >
                      Admin
                    </h2>
                  </li>
                )}
                <li>
                  <Link
                    onClick={() => logOut()}
                    href="#"
                    prefetch={false}
                    className="block px-4 py-2 hover:bg-[#4944E3] hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MerchantAndLogin;
