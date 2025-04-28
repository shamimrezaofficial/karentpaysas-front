"use client";
import { deleteCookies, GetCookies } from "@/app/lib/cookiesSetting";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import UserLogin from "./UserLogin";

import {
  FaChevronDown,
  FaChevronUp,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoClose, IoSettings } from "react-icons/io5";
import {
  FaHome,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaCode,
  FaNewspaper,
  FaStar,
  FaEnvelope,
  FaFileAlt,
  FaTachometerAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaMoneyCheckAlt,
  FaHandsHelping,
} from "react-icons/fa";
import { IoIosMenu, IoMdLogIn } from "react-icons/io";
import Dropdown from "./Dropdown";
import useFetchingData from "@/app/lib/useFetchingData";
import useUserData from "@/app/lib/useUserData";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdBalance,
  MdDeveloperMode,
  MdPayments,
} from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { DrawerDialogDemo } from "../BecomeMerchant/DrawerDialogDemo";

const NavBar = ({ gradientColors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false); // Initially closed
  const menuRef = useRef(null); // Ref for the menu
  const buttonRef = useRef(null);

  const { fetchData } = useFetchingData("/api/front/pages");
  const { fetchData: logo, loading } = useFetchingData(
    "/api/front/setting/logo-identity"
  );
  const { fetchData: socialLinksDynamic } = useFetchingData(
    "/api/front/setting/footer-setting"
  );

  // get user

  const { user } = useUserData();
  const userButtonRef = useRef(null);

  const logOut = async () => {
    if (localStorage.getItem("secret_key")) {
      localStorage.removeItem("secret_key");
    }
    const deleteToken = await deleteCookies({ name: "auth_token_font" });
    if (deleteToken) {
      location.reload(true);
      toast.success("Successfully Logged Out");
    } else {
    }
  };
  const [dropdownDefaultButton, setDropdownDefaultButton] = useState(false);

  const handleUserMenuClickOutside = (event) => {
    if (
      dropdown.current &&
      !dropdown.current.contains(event.target) &&
      userButtonRef.current &&
      !userButtonRef.current.contains(event.target)
    ) {
      setDropdownDefaultButton(false);
    }
  };

  useEffect(() => {
    if (dropdownDefaultButton) {
      document.addEventListener("mousedown", handleUserMenuClickOutside);
    } else {
      document.removeEventListener("mousedown", handleUserMenuClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleUserMenuClickOutside);
    };
  }, [dropdownDefaultButton]);

  const handleOpenDrawer = async (e) => {
    e.preventDefault();
    const token = await GetCookies({ name: "auth_token_font" });
    if (!token) {
      toast.error("Please Login First, To Become Merchant");
    } else {
      setIsOpen(false);
      setIsDrawerOpen(true);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1023) {
        setIsOpen(false);
        setIsDrawerOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen, setIsDrawerOpen]);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [submenuItems, setSubmenuItems] = useState([]);
  useEffect(() => {
    if (fetchData?.data?.length > 0) {
      const getSubmenuItems = async () => {
        try {
          const mappedSubmenuItems = Array.isArray(fetchData?.data)
            ? fetchData?.data?.map((item) => ({
                label: item?.page_name,
                href: `/${item?.slug}`,
              }))
            : [];
          setSubmenuItems(mappedSubmenuItems);
        } catch (error) {
          // console.error("Error fetching submenu items:", error);
        }
      };
      getSubmenuItems();
    }
  }, [fetchData]);

  const dropdownItemsMainMenu = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Payment Gateway", href: "/payment-gateway" },
    { label: "Api", href: "/documentations" },
    { label: "News", href: "/news" },
    { label: "Customer Reviews", href: "/customer-reviews" },
    { label: "Contact", href: "/contact" },
    {
      label: "Pages",
      submenu: submenuItems,
    },
  ];

  const dropdownItemsDashboard = [
    {
      href: "/dashboard/cash-in",
      icon: <MdAccountBalanceWallet className="mr-2 text-2xl" />,
      label: "Deposit",
    },
    {
      href: "/dashboard/payout",
      icon: <FaMoneyCheckAlt className="mr-2 text-2xl" />,
      label: "Payout",
    },
    {
      href: "/dashboard/settlement",
      icon: <MdBalance className="mr-2 text-2xl" />,
      label: "Settlement",
    },
    {
      href: "/dashboard/payments",
      icon: <MdPayments className="mr-2 text-2xl" />,
      label: "Payments",
    },
    {
      href: "/dashboard/statement",
      icon: <MdAccountBalance className="mr-2 text-2xl" />,
      label: "Statement Balance",
    },
    {
      href: "/dashboard/developer",
      icon: <MdDeveloperMode className="mr-2 text-2xl" />,
      label: "Developer",
    },
    {
      href: "/dashboard/support",
      icon: <FaHandsHelping className="mr-2 text-2xl" />,
      label: "Support",
    },
    {
      href: "/dashboard/reports",
      icon: <HiDocumentReport className="mr-2 text-2xl" />,
      label: "Reports",
    },
    {
      href: "/dashboard/settings",
      icon: <IoSettings className="mr-2 text-2xl" />,
      label: "Settings",
    },
  ];

  const logoImage = logo?.settings?.logoImage;

  const pathname = usePathname();

  const isActiveLink = (path) => {
    return pathname === path;
  };

  const dropdown = useRef(null);
  return (
    <nav
      className={`py-0 border-b-[1px] lg:border-0  border-gray-200   sticky top-0 ${
        gradientColors?.GradientColor1 && gradientColors?.GradientColor2
          ? "text-gray-200"
          : "text-gray-800"
      }`}
    >
      {/* large screens */}
      <div
        className="py-2 hidden lg:block "
        style={{
          background:
            gradientColors?.GradientColor1 && gradientColors?.GradientColor2
              ? `linear-gradient(to right, ${gradientColors?.GradientColor1}, ${gradientColors?.GradientColor2})`
              : "#ffffff",
        }}
      >
        <div className="relative items-center justify-between hidden mx-auto container lg:flex wide-laptop:flex small-laptop:flex">
          <ul className="flex items-center h-10 gap-5">
            {[
              { href: "/", label: "Home", prefetch: true },
              { href: "/pricing", label: "Pricing", prefetch: false },
              {
                href: "/payment-gateway",
                label: "Payment Gateway",
                prefetch: false,
              },
              { href: "/downloads", label: "Downloads", prefetch: false },
              { href: "/documentations", label: "API", prefetch: true },
              { href: "/news", label: "News", prefetch: false },
              { href: "/customer-reviews", label: "Customer Reviews" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li
                key={item.label}
                className=" rounded hover:text-white hover:bg-blue-800"
              >
                <Link href={item.href} prefetch={item.prefetch} className="p-1">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="z-[9999]">
              <Dropdown
                label="Pages"
                items={
                  dropdownItemsMainMenu.find((item) => item?.label === "Pages")
                    .submenu
                }
              />
            </li>
          </ul>
          {socialLinksDynamic?.settings?.FacebookUrl && (
            <div className="flex gap-4">
              <Link
                href={socialLinksDynamic?.settings?.FacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                <span className="p-1 rounded hover:text-white bg-[#238df7] hover:bg-[#2274c7] w-8 h-8 flex items-center justify-center text-xl">
                  <FaFacebookF />
                </span>
              </Link>
              <Link
                href={socialLinksDynamic?.settings?.YoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                <span className="p-1 rounded hover:text-white bg-[#fd3838] hover:bg-[#d82828] w-8 h-8 flex items-center justify-center text-xl">
                  <FaYoutube />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* small and medium screens */}
      <div className="container mx-auto px-2 sm:px-5 relative flex items-center justify-between lg:hidden wide-laptop:hidden small-laptop:hidden ">
        <div className="flex items-center justify-between w-full pb-3">
          <div className="flex items-center  ">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="mx-0 sm:-mx-1 xs:p-1 pr-0 m-0 h-8 text-black  w-8"
            >
              <IoIosMenu className="h-full w-full" />
            </button>

            {logoImage ? (
              <Link href="/" prefetch={false}>
                <Image
                  src={logoImage}
                  alt="Logo"
                  height={200}
                  width={400}
                  className="h-10 px-2 py-1 ml-1 bg-white rounded w-44"
                  priority
                />
              </Link>
            ) : (
              <div className="w-44 h-10 bg-gray-200 animate-pulse rounded-md"></div>
            )}
          </div>
          {user ? (
            <div className="relative">
              <button
                ref={userButtonRef}
                onClick={() => {
                  setDropdownDefaultButton(!dropdownDefaultButton);
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded group focus:outline-none bg-gradient-2 mr-1.5"
              >
                <span className="relative px-2 py-1.5 transition-all ease-in duration-75 text-white bg-gray-900 rounded group-hover:bg-opacity-0 flex items-center gap-1">
                  {user && user?.name?.length < 6
                    ? user?.name
                    : user?.name?.slice(0, 6) + "..."}
                  {user?.avatar == null || user?.avatar == undefined ? (
                    ""
                  ) : (
                    <Image
                      src={user?.avatar}
                      width={100}
                      height={100}
                      alt="avatar"
                      className="rounded-full w-6 h-6"
                      priority
                    />
                  )}
                </span>
              </button>

              {dropdownDefaultButton && (
                <div
                  className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute button-0 right-0"
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
                        onClick={() => {
                          setDropdownDefaultButton(false);
                        }}
                        className="block px-4 py-2 hover:bg-[#351476] hover:text-white"
                        prefetch={false}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          logOut();
                          setDropdownDefaultButton(false);
                        }}
                        href="#"
                        className="block px-4 py-2 hover:bg-[#351476] hover:text-white"
                        prefetch={false}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Link
                href="/auth/register"
                className="px-2 py-1.5 rounded flex items-center gap-1 text-white bg-gradient-2 mr-1"
                prefetch={false}
              >
                <FaSignInAlt className="h-4 w-4" />
                <span className="hidden sm:block">Sign Up</span>
              </Link>
              <Link
                href="/auth/login"
                className="px-2 py-1.5 rounded flex items-center gap-1 text-white bg-gradient-2 mr-1"
                prefetch={false}
              >
                <IoMdLogIn className="h-4 w-4" />
                <span className="hidden sm:block">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 bg-opacity-50 transition-opacity z-40 "
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-64 bg-white pb-20 text-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } overflow-y-auto shadow-lg`}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center ">
              {logoImage ? (
                <Image
                  src={logoImage}
                  alt="Logo"
                  height={200}
                  width={400}
                  className="h-10 px-2 py-1 bg-white rounded w-44"
                  priority
                />
              ) : (
                <div className="w-44 h-10 bg-gray-200 animate-pulse rounded-md"></div>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {/* Dashboard Items */}
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                      ${
                        isActiveLink("/dashboard")
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    onClick={() => setIsOpen(false)}
                    prefetch={false}
                  >
                    <FaTachometerAlt className="w-5 h-5" />
                    Dashboard
                  </Link>

                  {dropdownItemsDashboard?.map((item) => (
                    <Link
                      key={item?.href}
                      href={item?.href}
                      className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                        ${
                          isActiveLink(item?.href)
                            ? "bg-gray-100 text-gray-900"
                            : "hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item?.icon}
                      {item?.label}
                    </Link>
                  ))}
                  <div className="h-px bg-gray-200 my-3"></div>
                </>
              )}
              {/* Main Menu Items */}
              {Array.isArray(dropdownItemsMainMenu) &&
                dropdownItemsMainMenu?.slice(0, 7)?.map((item) => {
                  const getIcon = (label) => {
                    switch (label) {
                      case "Home":
                        return <FaHome className="w-5 h-5" />;
                      case "Pricing":
                        return <FaMoneyBillWave className="w-5 h-5" />;
                      case "Payment Gateway":
                        return <FaFileInvoiceDollar className="w-5 h-5" />;
                      case "API":
                        return <FaCode className="w-5 h-5" />;
                      case "News":
                        return <FaNewspaper className="w-5 h-5" />;
                      case "Customer Reviews":
                        return <FaStar className="w-5 h-5" />;
                      case "Contact":
                        return <FaEnvelope className="w-5 h-5" />;
                      default:
                        return <FaFileAlt className="w-5 h-5" />;
                    }
                  };

                  return (
                    <Link
                      key={item?.label}
                      href={item?.href}
                      className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                      ${
                        isActiveLink(item?.href)
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setIsOpen(false)}
                      prefetch={false}
                    >
                      {getIcon(item?.label)}
                      {item?.label}
                    </Link>
                  );
                })}

              {/* Pages Menu with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPagesMenuOpen(!pagesMenuOpen)}
                  className="w-full p-2 text-left rounded transition-colors duration-200 flex items-center justify-between gap-3 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <FaFileAlt className="w-5 h-5" />
                    Pages
                  </div>
                  {pagesMenuOpen ? (
                    <FaChevronUp className="w-4 h-4" />
                  ) : (
                    <FaChevronDown className="w-4 h-4" />
                  )}
                </button>

                {pagesMenuOpen && (
                  <div className="pl-4">
                    {Array.isArray(dropdownItemsMainMenu) &&
                      dropdownItemsMainMenu
                        ?.find((item) => item?.label === "Pages")
                        ?.submenu?.map((subItem) => (
                          <Link
                            key={subItem?.label}
                            href={subItem?.href}
                            className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                            ${
                              isActiveLink(subItem?.href)
                                ? "bg-gray-100 text-gray-900"
                                : "hover:bg-gray-50 hover:text-gray-900"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <FaFileAlt className="w-5 h-5" />
                            {subItem?.label}
                          </Link>
                        ))}
                  </div>
                )}
              </div>

              {/* Additional links */}
              <UserLogin />
              <Link
                href="/become_merchant"
                className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                  ${
                    isActiveLink("/become_merchant")
                      ? "bg-gray-100 text-gray-900"
                      : "hover:bg-gray-50 hover:text-gray-900"
                  }`}
                onClick={handleOpenDrawer}
                prefetch={false}
              >
                <FaUserPlus className="w-5 h-5" />
                Become a Merchant
              </Link>

              {user ? (
                <Link
                  href="/auth/login"
                  className="w-full p-2 text-left rounded hover:text-white hover:bg-blue-800 flex items-center gap-3"
                  onClick={() => logOut()}
                  prefetch={false}
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  Sign out
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                    ${
                      isActiveLink("/auth/register")
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                    prefetch={false}
                  >
                    <IoMdLogIn className="w-5 h-5" />
                    Merchant Sign Up
                  </Link>
                  <Link
                    href="/auth/login"
                    className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center gap-3
                    ${
                      isActiveLink("/auth/login")
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                    prefetch={false}
                  >
                    <FaSignInAlt className="w-5 h-5" />
                    Merchant Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Drawer Dialog */}
      {isDrawerOpen && (
        <DrawerDialogDemo open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      )}
    </nav>
  );
};

export default NavBar;
