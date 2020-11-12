import axios from "axios";
import { Toast } from "vant";
import Loading from "../store/index";

// 接口部分失效,真实接口请联系coderwhy001
const url = "http://123.207.32.32:8000";

let config = {
  baseURL: url,
  timeout: 10000
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  req => {
    // 当getters里面的isLoading为true再显示请求加载
    if (Loading.getters.isLoading) {
      Toast.loading({
        forbidClick: true,
        message: "加载中..."
      });
    }
    return req;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  res => {
    Toast.clear();
    return res.data;
  },
  err => {
    Toast.clear();
    return Promise.reject(err);
  }
);

// 全局注册axios
window.axios = _axios;
