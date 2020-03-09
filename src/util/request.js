//axios是作者推荐的发请求的库，支持请求和相应拦截，同时支持最新fetch语法

import axios from 'axios';
const server = axios.create({
  baseURL: "http://118.24.25.7:5000/",//配置请求的url地址
  timeout: 6000 //配置 超时时间
})

//请求拦截 ，当发出请求之前需要执行做一件事情 比如，如果在请求之前为所有的请求添加一个 请求头？

server.interceptors.request.use(function (config) {
  // 非登录的请求 token 
  // config.headers.token = "anthorR";
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// Add a response interceptor
server.interceptors.response.use(function (response) {
  // Do something with response data
  //我们的后台会给一些特殊的相应状态码 4003 代表的是 无权访问当前页面 4004 没有资源 
  return response;
}, function (error) {

  return Promise.reject(error);
});

export default server