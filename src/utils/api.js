import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default class APIService {
  static getConfig(contentType = "application/json", authorized = true, user = "customer") {
    const headers = {
      "Content-Type": contentType,
    };

    if (authorized) {
      const tokenMap = {
        customer: "TABLE_ACCESS_TOKEN",
        admin: "Token",
        waiter: "Token",
      };

      const tokenKey = tokenMap[user];
      const token = localStorage.getItem(tokenKey)?.trim();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.warn("No token found for user:", user);
      }
    }

    return { headers };
  }

  static async request(method, endpoint, body = {}, config = {}) {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios({
        method,
        url: endpoint,
        data: body,
        ...config,
      });

      if (method.toLowerCase() === "post" || method.toLowerCase() === "patch") {
        toast.success(response?.data?.message || `added Successfully`);
      } if (method.toLowerCase() === "delete") toast.success(response?.data?.message || `Item deleted Successfully`);
      return response;
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        try {
          console.log("refreshed")
          const refreshResponse = await axios.post("/session/refresh", {}, { withCredentials: true });
          const newToken = refreshResponse?.data?.NEW_TOKEN;


          if (localStorage.getItem("Token")) localStorage.setItem("Token", newToken);
          else localStorage.setItem("TABLE_ACCESS_TOKEN", newToken);


          const retryConfig = { ...config };
          retryConfig.headers["Authorization"] = `Bearer ${newToken}`;
          const retryResponse = await axios({ method, url: endpoint, data: body, ...retryConfig });
          return retryResponse;

        } catch (refreshError) {
          localStorage.clear();
          toast.error("Session expired. Please login again.");
        }
      }
      this.handleError(error, `Failed to ${method} data`);
    }
  }

  static async get(endpoint, authorized = true, user = "customer") {
    const config = this.getConfig(undefined, authorized, user);
    const response = await this.request("get", endpoint, null, config);
    return response?.data;
  }

  static post(endpoint, body, authorized = true, user = "customer") {
    const isFormData = body instanceof FormData;
    const contentType = isFormData ? "multipart/form-data" : "application/json";
    const config = this.getConfig(contentType, authorized, user);
    return this.request("post", endpoint, body, config);
  }

  static patch(endpoint, body, authorized = true, user = "customer") {
    const isFormData = body instanceof FormData;
    const contentType = isFormData ? "multipart/form-data" : "application/json";
    const config = this.getConfig(contentType, authorized, user);
    return this.request("patch", endpoint, body, config);
  }

  static delete(endpoint, authorized = true, user = "customer") {
    const config = this.getConfig(undefined, authorized, user);
    return this.request("delete", endpoint, {}, config);
  }

  static handleError(error, defaultMsg) {
    const isNetwork = error.code === "ERR_NETWORK";
    const msg = isNetwork
      ? "Network Error: Check your internet connection"
      : error?.response?.data?.errMsg || defaultMsg;


    toast.error(msg, { transition: Bounce });
  }
}