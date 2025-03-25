<template>
	<div class="min-h-screen relative overflow-hidden">
		<a-layout class="h-full">
			<div class="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-transparent">
				<Header />
			</div>
			<a-layout-content class="mt-[64px]">
				<RouterView />
			</a-layout-content>
		</a-layout>
	</div>
</template>

<script setup>
	import Header from '@/layout/Header.vue'
	import { RouterView } from 'vue-router'
</script>

<style>
	/* 这里不使用 scoped，这样样式可以影响到子组件 */
	:where(.css-dev-only-do-not-override-1p3hq3p).ant-layout .ant-layout-header {
		background: transparent !important;
	}
</style>
