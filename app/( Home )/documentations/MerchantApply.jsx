"use client";

import { DrawerDialogDemo } from "@/app/components/BecomeMerchant/DrawerDialogDemo";
import { useState } from "react";

function MerchantApply() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div className="flex justify-center">
        <div className="scale-x-95 lg:scale-x-100 w-[98%] lg:w-[60%]">
          <div className="mt-[70px] space-y-5">
            <div className="bg-white rounded-md px-5 py-4 lg:px-10 lg:py-5 text-justify">
              <h2 className="text-2xl my-2">
                Please apply as a merchant to access the documentation.
                <span
                  className="gradient-text cursor-pointer"
                  onClick={() => setIsDrawerOpen(true)}
                >
                {" "}  Apply Now
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <DrawerDialogDemo open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      )}
    </>
  );
}

export default MerchantApply;
