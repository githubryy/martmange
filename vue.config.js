module.exports = {
  devServer: {
    proxy: {//配置反向代理
      '/api': {//将http://118.24.25.7:5000印射为/apis
        target: 'http://118.24.25.7:5000',//请求接口的域名
        changeOrigin: true  // 是否跨域
      }
    }
  }
}