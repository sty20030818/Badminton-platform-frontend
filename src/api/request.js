import axios from "axios"
import { message } from "ant-design-vue"
import config from "@/config"

const service = axios.create({
    baseURL: config.BASE_API,
})
const NETWORK_ERROR = "网络请求异常，请稍后重试"

//* 请求拦截器
service.interceptors.request.use(
    function (config) {
        //* 在发送请求之前做些什么
        return config
    },

    function (error) {
        //* 对请求错误做些什么
        return Promise.reject(error)
    }
)

//* 响应拦截器
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    }
    else {
        message.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

function request(options) {
    options.method = options.method || "get"
    //*关于get请求参数的处理
    if (options.method.toLowerCase() === "get") {
        options.params = options.data
    }
    //*对mock的开关做一个处理
    let isMock = config.mock
    if(typeof options.mock !== "undefined") {
        isMock = options.mock
    }

    if(config.env === "production") {
        //*不能用mock
        service.defaults.baseURL = config.BASE_API
    }
    else {
        service.defaults.baseURL = isMock ? config.MOCK_API : config.BASE_API
    }
    return service(options)
}

export default request
