import { fetchingDataGet } from "@/app/lib/fetchingDataGet";


const IframeMap = async () => {
  const fetchData = await fetchingDataGet("/api/front/settings/contact-page");

  if (fetchData?.settings?.GoogleMapIframeLink) {
    return (
      <div style={{ width: "100%", height: "450px" }}>
        <iframe
          src={fetchData?.settings?.GoogleMapIframeLink}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "5px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  }
};

export default IframeMap;
