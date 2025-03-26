# 羽毛球平台前端项目

## 项目概述
这是一个基于 Vue 3 开发的羽毛球平台前端项目，旨在为用户提供羽毛球相关的在线服务。项目采用现代化的前端技术栈，注重用户体验和开发效率。

## 技术栈
- 核心框架：Vue 3
- 构建工具：Vite
- UI 框架：Ant Design Vue 4.x
- 状态管理：Pinia
- 路由管理：Vue Router
- HTTP 客户端：Axios
- CSS 框架：Tailwind CSS
- 开发语言：JavaScript
- 包管理器：pnpm

## 项目结构
```
src/
├── api/                    # API 接口定义
│   ├── modules/           # API 模块目录
│   ├── mockData/         # Mock 数据目录
│   ├── api.js            # API 接口统一导出
│   ├── request.js        # Axios 请求封装
│   └── mock.js           # Mock 数据配置
├── assets/                # 静态资源文件
│   ├── images/          # 图片资源
│   └── styles/          # 样式文件
├── layout/                # 布局组件
│   ├── Header.vue       # 公共头部组件
│   └── Admin/           # 管理后台布局组件
├── router/                # 路由配置
│   └── index.js         # 路由主文件
├── stores/                # Pinia 状态管理
│   └── index.js         # 状态管理主文件
├── views/                 # 页面视图组件
│   ├── Admin/           # 管理员相关页面
│   ├── Event/           # 活动相关页面
│   ├── Home/            # 首页相关组件
│   ├── Login/           # 登录注册相关页面
│   ├── System/          # 系统相关页面
│   └── Index.vue        # 首页入口组件
├── App.vue               # 根组件
└── main.js               # 应用入口文件
```

### 目录说明
- **api**: 包含所有后端接口的定义和请求封装
  - `modules/`: 按功能模块划分的 API 接口
  - `mockData/`: 模拟数据，用于开发测试
  - `request.js`: Axios 请求拦截器和响应处理
  - `mock.js`: Mock 数据配置和开关

- **assets**: 存放项目静态资源
  - `images/`: 图片资源
  - `styles/`: 全局样式文件

- **layout**: 布局相关组件
  - `Header.vue`: 公共头部导航组件
  - `Admin/`: 管理后台专用布局组件

- **router**: 路由配置
  - `index.js`: 路由定义和配置

- **stores**: Pinia 状态管理
  - `index.js`: 状态管理配置和模块定义

- **views**: 页面级组件
  - `Admin/`: 管理员相关页面
  - `Event/`: 活动管理相关页面
  - `Home/`: 首页相关组件
  - `Login/`: 登录注册相关页面
  - `System/`: 系统相关页面
  - `Index.vue`: 首页入口组件

## 开发环境设置
1. 安装依赖
```bash
pnpm install
```

2. 启动开发服务器
```bash
pnpm dev
```

3. 构建生产版本
```bash
pnpm build
```

4. 预览生产构建
```bash
pnpm preview
```

## 项目规范
### 代码规范
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 的最佳实践
- 使用 TypeScript 类型注解（计划中）


## 开发进度
### 已完成功能
- [x] 项目基础架构搭建
- [x] 用户登录注册页面
- [x] 基础布局组件
- [x] API 请求封装
- [x] 状态管理配置
- [x] 首页基础布局

### 进行中功能
- [ ] 管理员后台界面
  - [ ] 用户管理
  - [ ] 场地管理
  - [ ] 赛事管理
- [ ] 赛事系统
  - [ ] 赛事列表
  - [ ] 赛事详情
  - [ ] 报名功能
- [ ] 系统设置
  - [ ] 基础配置
  - [ ] 权限管理

### 待开发功能
- [ ] 用户个人中心
- [ ] 场地预约系统
- [ ] 比赛管理系统

### 待开发功能
- [ ] 实时聊天系统
- [ ] 支付系统集成


### 路由结构
```
/               # 首页
/login          # 登录页面
/admin/*        # 管理后台
  /admin/users        # 用户管理
  /admin/venues      # 场地管理
  /admin/events      # 赛事管理
/event/*        # 赛事相关
  /event/list        # 赛事列表
  /event/detail/:id  # 赛事详情
```

## 注意事项
- 开发前请确保已安装所需依赖
- 遵循项目代码规范
- 提交代码前进行代码格式化
- 保持文档的实时更新

## 贡献指南
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证
MIT License
