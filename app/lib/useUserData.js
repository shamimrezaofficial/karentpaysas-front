
"use client"
import { useEffect, useState } from 'react';
import { GetCookies } from './cookiesSetting';
import ApiRequest from './Api_request';

function useUserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async () => {
    const token = await GetCookies({ name: "auth_token_font" });
    if (token) {
      setLoading(true)
      const response = await ApiRequest({
        url: "/user",
        method: "get",
      });
      if (response?.status == 200) {
        setLoading(false)
        setUser(response?.data?.user);
      }
    }
    else {
      setUser(null)
    }
  };
  return { user, loading };
}

export default useUserData;