<template>
	<div class="w-full h-screen">
		<a-layout class="h-full">
			<AdminSider />
			<a-layout class="bg-white">
				<AdminHeader />
				<a-layout-content>
					<RouterView />
				</a-layout-content>
				<AdminFooter />
			</a-layout>
		</a-layout>
	</div>
</template>

<script setup>
	import AdminSider from '@/layout/Admin/AdminSider.vue'
	import AdminHeader from '@/layout/Admin/AdminHeader.vue'
	import AdminFooter from '@/layout/Admin/AdminFooter.vue'
	import { RouterView } from 'vue-router'
</script>

<style scoped></style>
