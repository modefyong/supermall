import axios from 'axios';
/**
 * 
 * @param {*} config 使用axios时， 传递参数config 是个配置对象，包括请求数据的url，params...
 * 
 * 因为params是添加到url的请求字符串中的，用于get请求。 
　　而data是添加到请求体（body）中的， 用于post请求
 */
export function request(config){
    // 1.创建axios的实例
    const instance = axios.create({
        // 注意baseURL拼写
        baseURL: 'http://152.136.185.210:8000/api/z8',
        timeout: 5000
    })
    // 2.axios的拦截器
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        // console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        return res
    }, err => {
        // console.log(err);
    })

    // 3.发送真正的网络请求.(返回一个promise对象)
    return instance(config)

}