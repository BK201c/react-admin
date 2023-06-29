import axios from "axios";
import { toast } from "amis";
import { getToken } from "@/utils/auth";

const HttpService = axios.create({
  timeout: 6000,
});

// request interceptor
HttpService.interceptors.request.use(
  (config: any) => {
    config.url = decodeURI(encodeURI(config.url).replace(/%E2%80%8B/g, ""));
    config.headers["Authorization"] = getToken();
    config.headers["Accept-Language"] =
      localStorage.getItem("language") === "zh" ? "zh-Hans" : "en";

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
