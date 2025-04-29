import axios from "axios";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { GetCookies } from "./cookiesSetting";
const ApiRequest = async ({ url, formdata = null, method = "post", type = "application/json" }) => {


  var token = await GetCookies({ name: 'auth_token_font' });

  if (localStorage.getItem('secret_key')) {
    var secret_key = localStorage.getItem('secret_key');
  } else {
    var secret_key = "";
  }


  const api_request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api',
  });
  api_request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = api_request({
      method: method,
      url: url,
      responseType: type,
      data: formdata,
      headers: {
        'X-SECRET-KEY': secret_key
      }
    }
    );



    let { data } = await response;
    if (type == "multipart/form-data") {
      return data
    } else {
      return JSON.parse(data);
    }

  } catch (error) {
    if (error?.response?.status == 401) {
      
      Cookies.remove('auth_token_font');

      localStorage.clear();

      redirect("/auth/login");
      return;
    }
    //return response;         

  }
}

export default ApiRequest;