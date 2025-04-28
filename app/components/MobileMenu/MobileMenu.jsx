"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCloudDownloadAlt, FaLock, FaMoneyCheckAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { HiDocumentReport } from "react-icons/hi";
import { MdAccountBalanceWallet, MdPriceChange, MdSpaceDashboard } from "react-icons/md";
import { TiHome } from "react-icons/ti";

function MobileMenu() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [token, setToken] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setToken(Cookies.get("auth_token_font") || "");
  }, []);

  const loggedInMenu = [
    { href: "/dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
    { href: "/dashboard/cash-in", label: "Deposit", icon: <MdAccountBalanceWallet /> },
    { href: "/dashboard/payout", label: "Payout", icon: <FaMoneyCheckAlt /> },
    { href: "/dashboard/reports", label: "Reports", icon: <HiDocumentReport /> },
  ];

  const guestMenu = [
    { href: "/", label: "Home", icon: <TiHome /> },
    { href: "/pricing", label: "Pricing", icon: <MdPriceChange /> },
    { href: "/downloads", label: "Downloads", icon: <FaCloudDownloadAlt /> },
    { href: "/auth/login", label: "Login", icon: <FaLock /> },
  ];

  const menuItems = token ? loggedInMenu : guestMenu;

  return (
    <div
      className={`block fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 ${
        scrollDirection === "down" ? "translate-y-full" : "translate-y-0"
      } transition-transform duration-300`}
    >
      <aside className="px-4 py-1">
        <ul className="flex justify-between items-center container mx-auto  gap-1">
          {menuItems.map(({ href, label, icon }) => (
            <li
              key={href}
              className={`${
                pathname === href ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              <Link
                href={href}
                prefetch={false}
                className="flex flex-col items-center p-2 rounded-md"
              >
                <span className="text-xl md:text-2xl">{icon}</span>
                <span className="text-sm sm:text-lg font-medium mt-1">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default MobileMenu;
