<template>
    <div class="home">
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-card hoverable>
                    <a-card-meta>
                        <template #title>
                            <p style="font-size: 22px;">你好 , 石头鱼! 请开始你新的一天叭 ~</p>
                        </template>
                        <template #description>
                            <p style="font-size: 16px;">今天 晴 , 温度 : 0~100°C</p>
                        </template>
                        <template #avatar>
                            <a-avatar :size="88" :src="getImageUrl('user')" />
                        </template>
                    </a-card-meta>
                </a-card>
            </a-col>

            <a-col :span="16">
                <a-card title="技术栈" hoverable>
                    <a-card-grid style="width:25%" v-for="item in tableData" :key="item.title">
                        <div class="card-content">
                            <div class="card-header">
                                <img :src="item.logo" alt="item.title" class="card-logo">
                                <span>{{ item.title }}</span>
                            </div>
                            <p class="card-description">{{ item.description }}</p>
                            <div class="card-footer">
                                <span>{{ item.class }}</span>
                                <span>{{ item.date }}</span>
                            </div>
                        </div>
                    </a-card-grid>
                </a-card>
            </a-col>

            <a-col :span="8">
                <a-card title="标题" :bordered="false">
                    <p>Card content</p>
                </a-card>
            </a-col>


        </a-row>
    </div>
</template>

<script setup>
    import { ref, getCurrentInstance, onMounted } from 'vue'
    // 这个proxy相当于组件对象
    // getCurrentInstance它的作用是获取当前组件的实例对象。
    const { proxy } = getCurrentInstance()

    const tableData = ref([
        {
            logo: 'https://vuejs.org/images/logo.png',
            title: 'Vue3',
            description: '渐进式 JavaScript 框架，易于上手，适用于构建用户界面。',
            class: '前端',
            date: '2014-02-06',
        },
        {
            logo: 'https://router.vuejs.org/logo.svg',
            title: 'Vue Router',
            description: 'Vue.js 的官方路由,为单页应用 (SPA) 提供导航功能。',
            class: '前端',
            date: '2015-12-17',
        },
        {
            logo: 'https://vitejs.dev/logo.svg',
            title: 'Vite',
            description: '下一代前端工具链,提供极速的开发体验。',
            class: '前端',
            date: '2020-01-17',
        },
        {
            logo: 'https://pinia.vuejs.org/logo.svg',
            title: 'Pinia',
            description: 'Vue 的直观、类型安全和灵活的存储库，可以轻松管理应用状态。',
            class: '前端',
            date: '2019-11-11',
        },
        {
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2nqp4S29eIZbADRrnkJ1vmJpawDogU2t74_ARzbJ6z2HfCPf8qVKi7i1PLX-dOXgcO0&usqp=CAU',
            title: 'Axios',
            description: '基于 Promise 的 HTTP 客户端，用于浏览器和 node.js。',
            class: '前端',
            date: '2014-04-09',
        },
        {
            logo: 'https://next.antdv.com/assets/logo.1ef800a8.svg',
            title: 'Ant Design Vue',
            description: '一套企业级的 UI 设计语言和 Vue 的实现。',
            class: '前端',
            date: '2018-09-30',
        },
        {
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNPDd17GydXvZPUct1BEq-63z90vtMZwqGH9F-qrOwOn8RrwVsGqWJ_SGBldjBZ2wc8Y&usqp=CAU',
            title: 'Tailwind CSS',
            description: '一个实用为先的 CSS 框架，能够快速构建自定义设计。',
            class: '前端',
            date: '2017-11-01',
        },
        {
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNF4BEuxfA4ng0SaXKfGikX6Mo0DSGDQppe97wDLXX0uHeHFmXy5vrN7ut0ahdsNP95CI&usqp=CAU',
            title: 'WebSocket',
            description: '在单个 TCP 连接上提供全双工通信协议。',
            class: '前端',
            date: '2011-12-01',
        },
    ]);

    const getImageUrl = (user) => {
        return new URL(`../../assets/images/${user}.jpg`, import.meta.url).href
    }

    // 请求tabledata数据的方法
    // const getTableData=async ()=>{
    //     const data = await proxy.$api.getTableData()
    //     tableData.value=data.tableData
    // }

    // onMounted(()=>{
    //     getTableData()
    // })
</script>

<style scoped>
    .home {
        height: 100%;
        background-color: #F1F3F6;
        padding: 20px;
    }
    .card-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 20px;
        font-weight: 600;
    }
    .card-logo {
        width: 40px;
        height: 40px;
        margin-right: 16px;
    }
    .card-description {
        flex: 1;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.75);
        margin-bottom: 8px;
    }
    .card-footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
    }
</style>
