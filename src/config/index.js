/**
 ** 环境配置文件
 ** 一般在企业级项目里面有三个环境
 ** 开发环境
 ** 测试环境
 ** 线上环境
 */

// 当前的环境
const env = import.meta.env.MODE || 'production'

const EnvConfig = {
  development: {
    // BASE_API: '/api',
    BASE_API: 'http://localhost:3000',
    MOCK_API: 'https://apifoxmock.com/m1/5941848-5629784-default/api',
  },
  text: {
    BASE_API: 'https://test.example.com',
    MOCK_API: 'https://api.example.com',
  },
  production: {
    BASE_API: 'https://example.com',
    MOCK_API: 'https://api.example.com',
  },
}


export default {
    env,
    ...EnvConfig[env],

    //*mock
    mock:false
  }
