<template>
	<div class="admin-layout">
		<a-layout class="lay-container">
			<AdminSider />
			<a-layout>
				<AdminHeader />
				<a-layout-content class="ant-content">
					<RouterView />
				</a-layout-content>
				<AdminFooter />
			</a-layout>
		</a-layout>
	</div>
</template>

<script setup>
	import AdminSider from '@/components/Admin/AdminSider.vue'
	import AdminHeader from '@/components/Admin/AdminHeader.vue'
	import AdminFooter from '@/components/Admin/AdminFooter.vue'
	import { RouterView } from 'vue-router'
</script>

<style scoped>
	.admin-layout,
	.lay-container {
		height: 100%;
	}
</style>
