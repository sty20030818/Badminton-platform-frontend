<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
		<div class="text-center">
			<img
				src="@/assets/images/system/403.svg"
				alt="403"
				class="w-96 mx-auto mb-8"
			/>
			<h1 class="text-4xl font-bold text-gray-800 mb-4">哎呀！访问被拒绝</h1>
			<p class="text-gray-500 text-xl mb-8">抱歉，您没有权限访问此页面。</p>
			<a-button
				type="primary"
				size="large"
				shape="round"
				class="back-btn"
				@click="router.push('/')"
			>
				返回首页
			</a-button>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'

	const router = useRouter()
</script>

<style scoped>
	.back-btn {
		background: #ff7eb3;
		border: none;
		padding: 0 32px;
		height: 44px;
		font-size: 16px;
		font-weight: 500;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
	}

	.back-btn:hover {
		background: #ff6b9e;
	}
</style>
