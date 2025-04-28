"use client";

import dynamic from "next/dynamic";
import useFetchingData from "../lib/useFetchingData";
const DynamicChatCode = dynamic(() => import("./DynamicChatCode"), {
  ssr: false,
});

export default function LiveChart() {
  const { fetchData } = useFetchingData(`/api/front/settings/footer-script`);
  return (
    <>
      {fetchData?.settings?.FooterScript && (
        <DynamicChatCode liveChat={fetchData?.settings?.FooterScript} />
      )}
    </>
  );
}
