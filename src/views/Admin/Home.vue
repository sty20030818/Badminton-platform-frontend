<template>
	<div class="home">
		<a-row :gutter="[16, 16]">
			<a-col :span="24">
				<a-card hoverable>
					<a-card-meta>
						<template #title>
							<p style="font-size: 22px">你好 , 石头鱼! 请开始你新的一天叭 ~</p>
						</template>
						<template #description>
							<p style="font-size: 16px">今天 晴 , 温度 : 0~100°C</p>
						</template>
						<template #avatar>
							<a-avatar
								:size="88"
								:src="getImageUrl('user')"
							/>
						</template>
					</a-card-meta>
				</a-card>
			</a-col>

			<a-col :span="16">
				<a-card
					title="技术栈"
					hoverable
				>
					<a-card-grid
						style="width: 25%"
						v-for="item in tableData"
						:key="item.title"
					>
						<div class="card-content">
							<div class="card-header">
								<img
									:src="item.logo"
									alt="item.title"
									class="card-logo"
								/>
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
				<a-card
					title="标题"
					:bordered="false"
				>
					<p>Card content</p>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import vue from '@/assets/images/adminHome/vue.png'
	import vueRouter from '@/assets/images/adminHome/vueRouter.svg'
	import vite from '@/assets/images/adminHome/vite.svg'
	import pinia from '@/assets/images/adminHome/pinia.svg'
	import axios from '@/assets/images/adminHome/axios.png'
	import tailwindcss from '@/assets/images/adminHome/tailwindcss.png'
	import websocket from '@/assets/images/adminHome/websocket.png'
	import antDesignVue from '@/assets/images/adminHome/antDesignVue.svg'
	// 这个proxy相当于组件对象
	// getCurrentInstance它的作用是获取当前组件的实例对象。
	// const { proxy } = getCurrentInstance()

	const tableData = ref([
		{
			logo: vue,
			title: 'Vue3',
			description: '渐进式 JavaScript 框架，易于上手，适用于构建用户界面。',
			class: '前端',
			date: '2014-02-06',
		},
		{
			logo: vueRouter,
			title: 'Vue Router',
			description: 'Vue.js 的官方路由,为单页应用 (SPA) 提供导航功能。',
			class: '前端',
			date: '2015-12-17',
		},
		{
			logo: vite,
			title: 'Vite',
			description: '下一代前端工具链,提供极速的开发体验。',
			class: '前端',
			date: '2020-01-17',
		},
		{
			logo: pinia,
			title: 'Pinia',
			description: 'Vue 的直观、类型安全和灵活的存储库，可以轻松管理应用状态。',
			class: '前端',
			date: '2019-11-11',
		},
		{
			logo: axios,
			title: 'Axios',
			description: '基于 Promise 的 HTTP 客户端，用于浏览器和 node.js。',
			class: '前端',
			date: '2014-04-09',
		},
		{
			logo: antDesignVue,
			title: 'Ant Design Vue',
			description: '一套企业级的 UI 设计语言和 Vue 的实现。',
			class: '前端',
			date: '2018-09-30',
		},
		{
			logo: tailwindcss,
			title: 'Tailwind CSS',
			description: '一个实用为先的 CSS 框架，能够快速构建自定义设计。',
			class: '前端',
			date: '2017-11-01',
		},
		{
			logo: websocket,
			title: 'WebSocket',
			description: '在单个 TCP 连接上提供全双工通信协议。',
			class: '前端',
			date: '2011-12-01',
		},
	])

	const getImageUrl = (user) => {
		return new URL(`../../assets/images/avatars/${user}.png`, import.meta.url).href
	}

	//* 请求tabledata数据的方法
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
		background-color: #f1f3f6;
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
