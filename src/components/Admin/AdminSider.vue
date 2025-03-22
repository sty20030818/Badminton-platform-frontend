<template>
	<a-layout-sider class="ant-sider" width="225px" :collapsed="isCollapse">
		<div class="logo-container">
			<img src="../../assets/images/logo.png" alt="logo" />
			<span :style="{ opacity: isCollapse ? 0 : 1 }">在线约球平台</span>
		</div>

		<a-menu
			v-model:openKeys="openKeys"
			v-model:selectedKeys="selectedKeys"
			mode="vertical"
			:items="items"
			@click="handleClick"
		/>
	</a-layout-sider>
</template>

<script setup>
	import { computed, h, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAllDataStore } from '@/stores'
	import { HomeOutlined, UserOutlined, CalendarOutlined, GroupOutlined, BankOutlined } from '@ant-design/icons-vue'

	const router = useRouter()
	const selectedKeys = ref([])
	const openKeys = ref([])
	const store = useAllDataStore()
	const isCollapse = computed(() => store.state.isCollapse)

	const items = ref([
		{
			key: '1',
			icon: () => h(HomeOutlined),
			label: '首页',
			title: '首页',
			path: '/admin/home',
		},
		{
			key: '2',
			icon: () => h(UserOutlined),
			label: '用户管理',
			title: '用户管理',
			path: '/admin/users',
		},
		{
			key: '3',
			icon: () => h(CalendarOutlined),
			label: '活动管理',
			title: '活动管理',
			path: '/admin/events',
		},
		{
			key: '4',
			icon: () => h(GroupOutlined),
			label: '分组管理',
			title: '分组管理',
			path: '/admin/groups',
		},
		{
			key: '5',
			icon: () => h(BankOutlined),
			label: '场馆管理',
			title: '场馆管理',
			path: '/admin/venues',
		},
	])

	const handleClick = (menuInfo) => {
		// console.log('click ', menuInfo);
		const selectedItem = items.value.find((item) => item.key === menuInfo.key)
		if (selectedItem && selectedItem.path) {
			router.push(selectedItem.path)
		}
	}
</script>

<style lang="less" scoped>
	.ant-sider {
		width: 225px;
		background: #fff;
		box-shadow: 0 2px 6px rgba(0, 21, 41, 0.35);
	}
	.logo-container {
		height: 35px;
		margin: 10px 18px;
		padding: 0 5px;
		background: rgba(255, 255, 255, 0.15);
		display: flex;
		align-items: center;
		img {
			height: 100%;
			border-radius: 6px;
		}
		span {
			font-size: 1.4em;
			color: rgb(3, 7, 18);
			font-weight: 500;
			margin-left: 12px;
			opacity: 1;
			transition: opacity 0.3s ease;
			white-space: nowrap;
		}
	}
</style>
