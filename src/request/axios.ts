import axios from "axios";
import {hideLoading, showLoading} from "../store/globalStore";
import {message} from "antd";
import docCookies from "../utils/cookies";

const Axios = axios.create({
    timeout: 20000,
});

// 添加请求拦截器
Axios.interceptors.request.use(
    (config)=> {
        // 在发送请求之前做些什么
        // undefined 与 下面的 false 都可，表示未给globalLoading赋值
        if (config.headers.globalLoading === undefined) {
            showLoading();
        }
        config.headers.Authorization = docCookies.getItem("sessionId") || "";
        return config;
}, (err) => {
        // 对请求错误做些什么
        if (err.config.headers.globalLoading !== false) {
            hideLoading();
        }
        return Promise.reject(err);
});

// 添加响应拦截器
Axios.interceptors.response.use((res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(res.config.headers.globalLoading !== false) {
        hideLoading();
    }
    if (res.status === 200) {
        let code = res.data.code;
        if (code === 200) {
            return res.data.result;
        } else if (code === 401) {
            message.info("请先登录！");
        } else {
            message.warning(res.data.msg || "信息有误，失败！");
        }
    } else {
        message.warning(res.data.msg || "信息有误，失败！");
    }
}, (err) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (err.config.headers.globalLoading !== false) {
        hideLoading();
    }
    return Promise.reject(err);
});

export default Axios;