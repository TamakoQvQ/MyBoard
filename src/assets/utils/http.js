import Axios from "axios";
import { message } from 'ant-design-vue';

const baseURL = 'http://62.234.4.199:8080/api';
const timeout = 50000;

//axios实例对象
const http = Axios.create({
    baseURL: baseURL,
    timeout
});

//请求拦截器
http.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('e-token');
        if (config.url.indexOf('/user/login') === -1 && config.url.indexOf('/user/register') === -1 && token) {
            config.headers['token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//响应拦截器
http.interceptors.response.use(
    (response) => {
        if (response.data.code === 0) {
            // message.success(response.data.message);
        } else {
            message.error(response.data.message);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { http };
