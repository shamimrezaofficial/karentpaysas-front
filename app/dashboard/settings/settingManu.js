"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SettingMenu() {
  const pathName = usePathname();

  return (
    <>
      <Link
        href="/dashboard/settings"
        className={`cursor-pointer rounded p-2 w-full text-center sm:w-fit ${
          pathName === "/dashboard/settings" ? "bg-gradient-2 " : ""
        }`}
        prefetch={false}
      >
        Profile
      </Link>

      <Link
        href="/dashboard/settings/payment"
        className={`cursor-pointer rounded p-2 w-full text-center sm:w-fit ${
          pathName === "/dashboard/settings/payment" ? "bg-gradient-2" : ""
        }`}
        prefetch={false}
      >
        Payment Settings
      </Link>

      <Link
        href="/dashboard/settings/allowed-ip"
        className={`cursor-pointer rounded p-2 w-full text-center sm:w-fit ${
          pathName === "/dashboard/settings/allowed-ip" ? "bg-gradient-2" : ""
        }`}
        prefetch={false}
      >
        Allowed IP
      </Link>
    </>
  );
}

export default SettingMenu;
