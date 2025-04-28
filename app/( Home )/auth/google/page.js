'use client';
import { SetCookies } from '@/app/lib/cookiesSetting';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
function Page() {
  useEffect(() => {
    // Get the full URL of the current page
    const fullUrl = window.location.href;
    const url = fullUrl?.split('?')[1];
    const googleCallback = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/google/auth/callback?${url}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        if (data) {
          const token = await SetCookies({
            name: 'auth_token_font',
            value: data?.access_token.trim()
          });
          toast.success('Google Login Successful');
          return (window.location.href = '/dashboard');
        }
      }
    };
    googleCallback();
  }, []);
  return;
}

export default Page;
