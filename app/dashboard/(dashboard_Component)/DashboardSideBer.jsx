"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdSpaceDashboard,
  MdAccountBalanceWallet,
  MdPayments,
  MdAccountBalance,
  MdBalance,
} from "react-icons/md";
import { FaMoneyCheckAlt, FaHandsHelping, FaUserCog } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { MdDeveloperMode } from "react-icons/md";
import useFetchingData from "@/app/lib/useFetchingData";
import useUserData from "@/app/lib/useUserData";
import { TbWorldDown } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";

function DashboardSideBer({setPathname}) {
  const [scrollDirection, setScrollDirection] = useState("up");
  const token = Cookies.get("auth_token_font");
  const [storesUser, setStoresUser] = useState(null);

  const { user } = useUserData();
  const pathname = usePathname();
  const router = useRouter();

  const redirect = (path) => {
    router.push(path);
  };

  useEffect(() => {
    if (!token) {
      redirect("/auth/login");
    }
  }, [token, router]);

  const [isGradient, setIsGradient] = useState(false);
  const { fetchData } = useFetchingData("/api/front/setting/color-setting");

  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  useEffect(() => {
    if (
      fetchData?.settings?.GradientColor1 &&
      fetchData?.settings?.GradientColor2
    ) {
      setColor1(fetchData.settings.GradientColor1);
      setColor2(fetchData.settings.GradientColor2);
      setIsGradient(true);
    } else {
      setColor1("");
      setColor2("");
      setIsGradient(false);
    }
  }, [fetchData]);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("store"));
    if (store) {
      setStoresUser(store);
    }
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasRole = (roleNames = []) =>
    user?.roles?.some((role) => roleNames.includes(role.name));
  const menuItems = [
    {
      href: "/dashboard",
      icon: <MdSpaceDashboard className="mr-2 text-2xl" />,
      label: "Dashboard",
      roles: ["Merchant", "Admin"],
    },
    {
      href: "/dashboard/cash-in",
      icon: <MdAccountBalanceWallet className="mr-2 text-2xl" />,
      label: "Deposit",
      roles: storesUser?.api_id ? ["Merchant", "Admin"] : [],
    },
    {
      href: "/dashboard/payout",
      icon: <FaMoneyCheckAlt className="mr-2 text-2xl" />,
      label: "Payout",
      roles: storesUser?.api_id ? ["Merchant", "Admin"] : [],
    },
    {
      href: "/dashboard/settlement",
      icon: <MdBalance className="mr-2 text-2xl" />,
      label: "Settlement",
      roles: storesUser?.api_id ? [] : ["Merchant", "Admin"],
    },
    {
      href: "/dashboard/payments",
      icon: <MdPayments className="mr-2 text-2xl" />,
      label: "Payments",
      roles: storesUser?.api_id ? ["Merchant", "Admin"] : [],
    },
    {
      href: "/dashboard/statement",
      icon: <MdAccountBalance className="mr-2 text-2xl" />,
      label: "Statement Balance",
      roles: storesUser?.api_id ? ["Merchant", "Admin"] : [],
    },
    {
      href: "/dashboard/developer",
      icon: <MdDeveloperMode className="mr-2 text-2xl" />,
      label: "Developer",
      roles: storesUser?.api_id ? ["Merchant", "Admin"] : [],
    },
    {
      href: "/dashboard/support",
      icon: <FaHandsHelping className="mr-2 text-2xl" />,
      label: "Support",
      roles: storesUser?.api_id ? [] : ["Merchant", "Admin"],
    },
    {
      href: "/dashboard/reports",
      icon: <HiDocumentReport className="mr-2 text-2xl" />,
      label: "Reports",
      roles: storesUser?.api_id ? [] : ["Merchant", "Admin"],
    },
    {
      href: "/dashboard/profile",
      icon: <FaUserCog className="mr-2 text-2xl" />,
      label: "Profile",
      roles: storesUser?.api_id ? [] : ["Merchant", "Admin"],
    },
    {
      href: "/dashboard/allowed_ip",
      icon: <TbWorldDown className="mr-2 text-2xl" />,
      label: "Allowed IP",
      roles: storesUser?.api_id ? [] : ["Merchant", "Admin"],
    },
    {
      href: "/dashboard/payment_page",
      icon: <RiSecurePaymentFill className="mr-2 text-2xl" />,
      label: "Payment Page",
      roles: storesUser?.api_id ? ["Merchant", "Admin"] : [],
    },
  ];

  const visibleMenu = menuItems.filter((item) => hasRole(item.roles));
  useEffect(() => {
    const checkPathname = visibleMenu.find((item) => item.href === pathname);
    if (!checkPathname) {
      redirect("/dashboard");
    }
  }, [pathname]);
  return (
    <div
      className={`hidden lg:block lg:w-[300px] mr-5 mt-10 rounded-md ${
        isGradient ? "text-gray-200" : "text-gray-800"
      }`}
      style={{
        background: isGradient
          ? `linear-gradient(to bottom, ${color1 || "#3b82f6"}, ${
              color2 || "#9333ea"
            })`
          : "#ffffff",
      }}
    >
      <aside className="px-4 mt-5">
        <ul>
          {visibleMenu.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
}

function MenuItem({ href, icon, label, active }) {
  return (
    <li
      className={`mb-4 cursor-pointer flex items-center rounded-md transition-transform duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-purple-400"
          : "hover:bg-gradient-to-r from-blue-600 to-purple-400"
      }`}
    >
      <Link
        href={href}
        className="flex items-center p-2 w-full"
        prefetch={false}
      >
        {icon}
        <span className="ml-2 text-sm font-medium">{label}</span>
      </Link>
    </li>
  );
}

export default DashboardSideBer;
