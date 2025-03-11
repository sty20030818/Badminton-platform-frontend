<script setup>
    import { ref, getCurrentInstance, onMounted } from 'vue'
    // 这个proxy相当于组件对象
    // getCurrentInstance它的作用是获取当前组件的实例对象。
    const { proxy } = getCurrentInstance()

    const tableData = ref([]);

    const getImageUrl = (user) => {
        return new URL(`../../assets/images/${user}.jpg`, import.meta.url).href
    }

    // 请求tabledata数据的方法
    const getTableData=async ()=>{
        const data = await proxy.$api.getTableData()
        tableData.value=data.tableData
    }

    onMounted(()=>{
        getTableData()
    })
</script>

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
