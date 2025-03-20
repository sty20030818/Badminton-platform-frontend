# 羽毛球平台前端项目

## 项目概述
这是一个基于 Vue 3 开发的羽毛球平台前端项目，旨在为用户提供羽毛球相关的在线服务。

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
├── components/            # 公共组件
│   ├── common/          # 通用组件
│   └── layout/          # 布局组件
├── config/                # 配置文件
│   ├── constants.js     # 常量配置
│   └── settings.js      # 项目配置
├── router/                # 路由配置
│   └── index.js         # 路由主文件
├── stores/                # Pinia 状态管理
│   └── index.js         # 状态管理主文件
├── views/                 # 页面视图组件
│   ├── Admin/           # 管理员相关页面
│   └── Home.vue         # 首页
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

- **components**: 可复用的组件
  - `common/`: 通用组件，如按钮、表单等
  - `layout/`: 布局相关组件，如头部、侧边栏等

- **config**: 项目配置文件
  - `constants.js`: 常量定义
  - `settings.js`: 项目配置项

- **router**: 路由配置
  - `index.js`: 路由定义和配置

- **stores**: Pinia 状态管理
  - `index.js`: 状态管理配置和模块定义

- **views**: 页面级组件
  - `Admin/`: 管理员相关页面
  - `Home.vue`: 首页组件

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
- 使用 Prettier 进行代码格式化
- 使用 ESLint 进行代码检查
- 遵循 Vue 3 组合式 API 的开发规范

## 开发进度
- [x] 项目初始化
- [x] 基础框架搭建
- [ ] 功能模块开发
- [ ] 测试与优化
- [ ] 部署上线

## 注意事项
- 开发前请确保已安装 Node.js 和 pnpm
- 遵循项目的代码规范和提交规范
- 保持代码的可维护性和可扩展性

## 贡献指南
1. Fork 本仓库
2. 创建新的功能分支
3. 提交你的更改
4. 发起 Pull Request

## 许可证
待定
