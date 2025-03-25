<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
		<div class="text-center">
			<img
				src="@/assets/images/system/500.svg"
				alt="500"
				class="w-160 mx-auto mb-8"
			/>
			<h1 class="text-4xl font-bold text-gray-800 mb-4">哎呀！出错了</h1>
			<p class="text-gray-500 mb-8 text-xl">抱歉，服务器遇到错误。</p>
			<a-button
				type="primary"
				size="large"
				shape="round"
				class="reload-btn"
				@click="router.go(0)"
			>
				刷新页面
			</a-button>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'

	const router = useRouter()
</script>

<style scoped>
	.reload-btn {
		background: #ff7eb3;
		border: none;
		padding: 0 32px;
		height: 44px;
		font-size: 16px;
		font-weight: 500;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
	}

	.reload-btn:hover {
		background: #ff6b9e;
	}
</style>
