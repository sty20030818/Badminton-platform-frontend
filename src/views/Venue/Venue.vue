<template>
	<div class="container mx-auto min-h-screen px-4 py-8 bg-gray-100 max-w-[1800px]">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-16">
			<!-- 场馆卡片 -->
			<div
				v-for="venue in venues"
				:key="venue.id"
				class="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
				@click="handleVenueClick(venue)"
			>
				<!-- 场馆图片 -->
				<div class="relative h-100 w-full overflow-hidden">
					<img
						:src="`/src/assets/images/venues/${venue.cover}.png`"
						:alt="venue.name"
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="p-8">
					<!-- 场馆头部 -->
					<div class="flex items-center justify-between mb-6">
						<div class="flex items-center space-x-3">
							<span class="text-base text-gray-600">
								{{ venue.location }}
							</span>
							<span class="text-gray-400">|</span>
							<span class="text-base text-blue-500">{{ venue.status }}</span>
						</div>
						<div class="flex items-center space-x-2 text-gray-600 text-base">
							<environment-outlined />
							<span>{{ venue.latitude }}, {{ venue.longitude }}</span>
						</div>
					</div>

					<!-- 场馆名称 -->
					<h2 class="text-3xl font-bold text-gray-800 mb-4 line-clamp-2">
						{{ venue.name }}
					</h2>

					<!-- 场馆描述 -->
					<p class="text-lg text-gray-600 mb-6 line-clamp-3">{{ venue.description }}</p>

					<!-- 场馆信息 -->
					<div class="flex flex-col space-y-4">
						<!-- 第一行：开放时间 -->
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<clock-circle-outlined class="text-gray-500 text-xl" />
								<span class="text-lg text-gray-600">
									{{ venue.openTime }} - {{ venue.closeTime }}
								</span>
							</div>
							<!-- 右边：状态标签 -->
							<div class="flex items-center justify-end">
								<a-tag
									:class="[
										'!px-4 !py-2 !text-base !border-none !rounded-full',
										venue.status === '可用'
											? '!bg-green-100 !text-green-600'
											: '!bg-red-100 !text-red-600',
									]"
								>
									{{ venue.status }}
								</a-tag>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { useRouter } from 'vue-router'
	import { message } from 'ant-design-vue'
	import { useAllDataStore } from '@/stores'
	import venueApi from '@/api/api'
	import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons-vue'

	const router = useRouter()
	const store = useAllDataStore()
	const venues = ref([])
	const loading = ref(false)

	// 获取场馆列表
	const fetchVenues = async () => {
		loading.value = true
		try {
			const { status, message: msg, data } = await venueApi.getVenueList()
			if (status) {
				venues.value = data.venues
			} else {
				message.error(msg || '获取场馆列表失败')
			}
		} catch (error) {
			message.error('获取场馆列表失败')
		} finally {
			loading.value = false
		}
	}

	// 点击场馆卡片
	const handleVenueClick = (venue) => {
		// 重置滚动位置
		window.scrollTo(0, 0)
		router.push(`/venue/${venue.id}`)
	}

	// 页面加载时获取数据和设置当前页面
	onMounted(() => {
		// 重置滚动位置
		window.scrollTo(0, 0)
		fetchVenues()
		store.state.currentPage = 'venue'
	})

	// 组件卸载时清除当前页面
	onUnmounted(() => {
		store.state.currentPage = ''
	})
</script>

<style scoped>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
