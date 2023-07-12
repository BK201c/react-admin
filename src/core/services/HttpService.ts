import axios from "axios";
import { toast } from "amis";
import appStore from "@/core/stores/appStore";
import APP_SETTING from "@/config/application.json";

const HttpService = axios.create({
  baseURL: APP_SETTING.baseUrl,
  timeout: 60000,
});

// request interceptor
HttpService.interceptors.request.use(
  (config: any) => {
    config.url = decodeURI(encodeURI(config.url).replace(/%E2%80%8B/g, ""));
    config.headers["Authorization"] = appStore.userStore.getToken();
    config.headers["Accept-Language"] =
      localStorage.getItem("language") || "zh-Hans";

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptor
HttpService.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 200 || res.code === 0) {
      return res;
    } else {
      toast["error"]("service error！", "消息");
      console.log("service error:", res);
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  (error) => {
    console.log("service error:", error);
    return Promise.reject(error);
  }
);

export default HttpService;
