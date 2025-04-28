import axios from 'axios';
export async function fetchingDataGet(url) {
  let data = [];
  if (url) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
      );
      data = response?.data;
    } catch (err) {
      // console.error('Error fetching reviews:', err);
    }
  }
  return data;
};