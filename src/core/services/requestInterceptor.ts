import axios, { AxiosRequestConfig } from "axios";
import { toast } from "amis";
import APP_SETTING from "@/config/application.json";

const baseURL =
  process.env.NODE_ENV === "production" ? APP_SETTING.baseUrl : "";
/**
 * 全局请求拦截，方便对错误进行统一处理
 * @param config
 */
export function request(config: AxiosRequestConfig) {
  let instance = axios.create({
    baseURL: baseURL,
    timeout: 60000,
  });
  return new Promise((resolve, reject) => {
    let onSuccess = (res: any) => {
      // console.log("onSuccess", res);
      if (res.data == null) {
        console.log("reject data");
        reject(res);
      } else if (res.data.status == 40001) {
        // 未登陆
        console.log("redirect url", res.data.redirectUrl);
        window.location.href = res.data.redirectUrl;
      } else if (res.data.status == 40002) {
        // 无权限
        console.log("not permission, url", config.url);
        toast["error"]("您无访问权限，请申请！", "消息");
        reject(res);
      } else {
        resolve(res);
      }
    };

    let onFail = (error: any) => {
      console.log("onFail", error);
      reject(error);
    };
    return instance.request(config).then(onSuccess, onFail).catch(onFail);
  });
}
