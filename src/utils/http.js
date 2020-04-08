import axios from "axios";

// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create({
  baseURL: "https://b2capigateway.yiguo.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "appName": "3000025"
  }
});


const instance2 = axios.create({
  baseURL: "/info"
});


instance2.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    }

    return config;
  }
);


instance2.interceptors.response.use((res) => {
  if (res.data.err === 0) {
    return res.data;
  } else {
    return Promise.reject(res.data.msg);
  }

  return res;
});

export { instance, instance2 };

