import Mock from 'mockjs'
import adminHomeApi from './mockData/adminHome'
import adminUserApi from './mockData/adminUser'

//* 拦截请求  第一个参数，是拦截的地址（这种是正则写法） 第二个是请求的方法 第三个是处理请求的方法
// Mock.mock(/api\/adminHome\/getTableData/, "get",adminHomeApi.getTableData)
// Mock.mock(/api\/adminUser\/getUserData/,"get", adminUserApi.getUserList)
