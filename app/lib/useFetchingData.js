import axios from "axios";
import { useEffect, useState } from "react";


function useFetchingData(url) {
  const [fetchData, setFetchData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setFetchData(response?.data);
      } catch (err) {
        // console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { fetchData, loading };
}

export default useFetchingData;