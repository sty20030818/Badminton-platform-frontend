<template>
	<div>
		<!-- 背景装饰 -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-20 left-40 w-100 h-100 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
			></div>
			<div
				class="absolute top-220 left-180 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
			></div>
		</div>

		<!-- 主要内容区 -->
		<a-layout-content class="p-0 relative h-[calc(100vh-80px)]">
			<div class="flex justify-between items-center relative px-[400px] h-full">
				<div class="flex-1 z-10 max-w-[600px] text-left mr-20 relative">
					<h1 class="text-pink-400 text-7xl font-bold leading-tight mb-10">羽毛球场地</h1>
					<h1 class="text-sky-500 text-8xl font-bold leading-tight mb-16">
						智能预约平台
					</h1>
					<p class="text-gray-500 text-2xl mb-2 max-w-[500px]">
						一站式羽毛球场地预约系统
					</p>
					<p class="text-gray-500 text-2xl mb-10 max-w-[500px]">让每一次运动都轻松愉快</p>
					<a-button
						type="primary"
						class="explore-btn"
						shape="round"
						size="large"
						@click="goToEvent"
					>
						立即体验
					</a-button>

					<div class="flex gap-10 mt-16">
						<div class="text-left">
							<div class="text-blue-500 text-4xl font-bold mb-2">0+</div>
							<div class="text-gray-800 text-base">合作场馆</div>
						</div>
						<div class="text-left">
							<div class="text-blue-500 text-4xl font-bold mb-2">0+</div>
							<div class="text-gray-800 text-base">注册用户</div>
						</div>
						<div class="text-left">
							<div class="text-blue-500 text-4xl font-bold mb-2">0+</div>
							<div class="text-gray-800 text-base">成功预约</div>
						</div>
					</div>
				</div>

				<!-- Badminton Images -->
				<div
					class="absolute right-50 top-0 bottom-0 w-[1000px] grid grid-cols-2 grid-rows-2 gap-4 z-20 user-select-none"
				>
					<!-- 羽毛球 - 左上角 -->
					<div class="self-start justify-self-start mt-60 ml-20">
						<img
							src="@/assets/images/badminton.png"
							alt="Badminton"
							class="h-60 w-auto object-contain hover:scale-145 hover:rotate-0 transition-transform -rotate-15"
							draggable="false"
						/>
					</div>
					<!-- 羽毛球拍 - 右上角 -->
					<div class="self-start justify-self-end mt-40">
						<img
							src="@/assets/images/badminton-1.png"
							alt="Badminton racket"
							class="h-130 w-auto object-contain hover:scale-130 hover:rotate-0 transition-transform rotate-15"
							draggable="false"
						/>
					</div>
					<!-- 羽毛球场地 - 底部居中 -->
					<div class="col-span-2 self-end justify-self-center mr-20 mb-40">
						<img
							src="@/assets/images/badminton-2.png"
							alt="Badminton court"
							class="h-110 w-auto object-contain hover:scale-115 hover:rotate-5 transition-transform"
							draggable="false"
						/>
					</div>
				</div>
			</div>
		</a-layout-content>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'
	import { useAllDataStore } from '@/stores'

	const router = useRouter()
	const store = useAllDataStore()

	// 页面加载时获取数据和设置当前页面
	onMounted(() => {
		store.state.currentPage = 'home'
		// console.log('当前页面已设置为:', store.state.currentPage)
	})

	// 组件卸载时清除当前页面
	onUnmounted(() => {
		store.state.currentPage = ''
		// console.log('当前页面已清除')
	})

	const goToEvent = () => {
		router.push('/event')
	}
</script>

<style scoped>
	.explore-btn {
		background: #ff7eb3;
		border: none;
		padding: 12px 60px;
		height: auto;
		font-size: 24px;
		font-weight: 500;
		box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.2);
	}

	.explore-btn:hover {
		background: #ff6b9e;
	}
</style>
