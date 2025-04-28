/* eslint-disable no-undef */

import axios from "axios";
import Link from "next/link";
import MerchantApply from "./MerchantApply";
import { GetCookies } from "@/app/lib/cookiesSetting";
// import SidebarMenu from "./DocumentationSection";
import DocumentationSection from "./DocumentationSection";

export default async function Documentation() {
  const token = await GetCookies({ name: "auth_token_font" });

  const getUser = async () => {
    let user = null;
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        user = response?.data?.data.user;
      } catch (error) {
        // console.error("Error fetching user data:", error);
      }
    }
    return user;
  };

  const fetchMerchantInfo = async () => {
    let merchantStatus = null;
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get_marchent_apply_info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const merchantData = response?.data?.data;
        if (merchantData?.length > 0) {
          const merchant = merchantData[0];
          if (merchant.confirmed == 1) {
            merchantStatus = "active";
          } else if (merchant.confirmed == 0) {
            merchantStatus = "pending";
          } else if (merchant.confirmed == 2) {
            merchantStatus = "rejected";
          }
        }
      } catch (error) {
        // console.error("Error fetching merchant data:", error);
      }
    }
    return merchantStatus;
  };

  const fetchDocumentation = async () => {
    let documentations = [];
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/merchant/get_documentation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        documentations = response?.data?.data;
      } catch (error) {
        // console.error("Error fetching documentation:", error);
      }
    }
    return documentations;
  };

  const [user, merchantStatus, documentations] = await Promise.all([
    getUser(),
    fetchMerchantInfo(),
    fetchDocumentation(),
  ]);

  const renderContent = () => {
    if (
      merchantStatus === "active" &&
      Array.isArray(documentations) &&
      documentations?.length > 0
    ) {
      return <>
      {DocumentationSection && <DocumentationSection documentations={documentations} />}
      </>;
    }
    if (merchantStatus === "pending") {
      return (
        <div className="flex justify-center">
          <div className="scale-x-95 lg:scale-x-100 w-[98%] lg:w-[60%]">
            <div className="mt-[70px] space-y-5">
              <div className="bg-white rounded-md px-5 py-4 lg:px-10 lg:py-5 text-justify">
                <h2 className="text-xl font-bold my-2 gradient-text">
                  Your Merchant Request in{" "}
                  <span className="gradient-text">Pending</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (merchantStatus === "rejected") {
      return (
        <div className="flex justify-center">
          <div className="scale-x-95 lg:scale-x-100 w-[98%] lg:w-[60%]">
            <div className="mt-[70px] space-y-5">
              <div className="bg-white rounded-md px-5 py-4 lg:px-10 lg:py-5 text-justify">
                <h2 className="text-xl font-bold my-2 ">
                  Your Merchant Request in{" "}
                  <span className="gradient-text">Rejected</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <MerchantApply />;
  };

  return (
    <>
      {user ? (
        <div className="space-y-5 container mx-auto">{renderContent()}</div>
      ) : (
        <div className="flex justify-center container mx-auto">
          <div className="scale-x-95 lg:scale-x-100 w-[98%]">
            <div className="mt-[70px] space-y-5">
              <div className="bg-white rounded-md px-5 py-4 lg:px-10 lg:py-5 text-justify">
                <h2 className="text-xl font-bold my-2">
                  You need to log in to view the documentation.{" "}
                  <Link
                    href="/auth/login"
                    prefetch={false}
                    className="border-b border-b-transparent hover:border-b-gray-300 gradient-text"
                  >
                    Log in now
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
