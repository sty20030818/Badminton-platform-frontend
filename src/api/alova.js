import { createAlova } from 'alova'
import VueHook from '@alova/vue-options'
import adapterXhr from '@alova/adapter-xhr'
import { message } from 'ant-design-vue'
import config from '@/config'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

/**
 * 创建 alova 实例
 * 配置基础 URL、超时时间、请求和响应拦截器
 */
const alovaInstance = createAlova({
  // Vue 3 状态管理 hook
  statesHook: VueHook,
  
  // 请求适配器 (使用 XHR 适配器替代 fetch)
  requestAdapter: adapterXhr(),
  
  // 基础配置
  baseURL: config.BASE_API,
  timeout: 10000,
  
  // 全局请求拦截器
  beforeRequest(method) {
    // Token 处理 - 从 auth store 获取 token
    const authStore = useAuthStore()
    const token = authStore.getToken()
    
    if (token) {
      // 使用与原 axios 配置相同的 header 名称
      method.config.headers.token = token
    }
    
    // Mock 环境处理
    let isMock = config.mock
    if (typeof method.config.mock !== 'undefined') {
      isMock = method.config.mock
    }
    
    // 根据环境和 mock 设置调整 baseURL
    if (config.env === 'production') {
      method.baseURL = config.BASE_API
    } else {
      method.baseURL = isMock ? config.MOCK_API : config.BASE_API
    }
  },
  
  // 全局响应拦截器
  responded: {
    // 成功响应处理
    onSuccess: async (response, method) => {
      const data = response.json ? await response.json() : response
      
      // 处理 token 过期的情况 (401 状态码)
      if (response.status === 401) {
        const authStore = useAuthStore()
        authStore.clearToken()
        message.error('登录已过期，请重新登录')
        router.push('/login')
        throw new Error('登录已过期')
      }
      
      return data
    },
    
    // 错误响应处理
    onError: (error, method) => {
      let errorMessage = '网络请求异常，请稍后重试'
      
      if (error.response?.data) {
        // 处理服务器返回的错误信息
        if (error.response.status === 401) {
          const authStore = useAuthStore()
          authStore.clearToken()
          message.error('登录已过期，请重新登录')
          router.push('/login')
          return {
            status: false,
            message: '登录已过期',
            errors: ['登录已过期']
          }
        }
        return error.response.data
      }
      
      // 网络错误或其他错误
      message.error(errorMessage)
      return {
        status: false,
        message: errorMessage,
        errors: [errorMessage]
      }
    }
  }
})

export default alovaInstance