<template>
	<div class="container mx-auto px-4 py-8 min-h-screen max-w-[1800px]">
		<a-spin :spinning="loading">
			<!-- 场馆信息卡片 -->
			<div class="mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-8 relative">
				<!-- 返回按钮 -->
				<div class="w-[200px] flex justify-end absolute top-6 right-6 z-10">
					<a-button
						class="back-btn !text-lg !h-12 !px-8"
						size="large"
						@click="router.push('/venue')"
					>
						<div class="flex items-center gap-2">
							<ArrowLeftOutlined class="text-xl" />
							返回场馆列表
						</div>
					</a-button>
				</div>
				<div class="flex">
					<!-- 场馆封面图 -->
					<div class="w-[600px] h-[400px]">
						<img
							:src="`/src/assets/images/venues/${venueData.venue?.cover}.png`"
							alt="场馆封面"
							class="w-full h-full object-cover"
						/>
					</div>
					<!-- 场馆信息 -->
					<div class="flex-1 p-8">
						<div class="flex justify-between items-start mb-6">
							<div class="flex-1">
								<div class="flex items-center gap-4 mb-4">
									<h1 class="text-4xl font-bold">{{ venueData.venue?.name }}</h1>
									<a-tag
										:color="venueData.venue?.status === '可用' ? 'success' : 'error'"
										class="!text-base !px-4 !py-1.5"
									>
										{{ venueData.venue?.status }}
									</a-tag>
								</div>
								<p class="text-gray-500 text-lg mb-6">
									{{ venueData.venue?.description }}
								</p>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-6 mb-8">
							<div class="space-y-5">
								<div class="flex items-center gap-3 text-gray-600 text-lg">
									<EnvironmentOutlined class="text-xl text-blue-500" />
									<span>{{ venueData.venue?.location }}</span>
								</div>
								<div class="flex items-center gap-3 text-gray-600 text-lg">
									<ClockCircleOutlined class="text-xl text-green-500" />
									<span>
										{{ venueData.venue?.openTime }} - {{ venueData.venue?.closeTime }}
									</span>
								</div>
							</div>
							<div class="space-y-5">
								<div class="flex items-center gap-3 text-gray-600 text-lg">
									<GlobalOutlined class="text-xl text-purple-500" />
									<span>经度：{{ venueData.venue?.longitude }}</span>
								</div>
								<div class="flex items-center gap-3 text-gray-600 text-lg">
									<GlobalOutlined class="text-xl text-purple-500" />
									<span>纬度：{{ venueData.venue?.latitude }}</span>
								</div>
							</div>
						</div>

						<div class="flex items-center justify-between pt-8">
							<div class="w-[80px]"><!-- 左侧占位 --></div>
							<div class="flex items-center gap-12">
								<div class="text-center">
									<p class="text-3xl font-bold text-pink-500 mb-1">
										{{ venueData.events?.length || 0 }}
									</p>
									<p class="text-gray-500">进行中的活动</p>
								</div>
								<div class="text-center">
									<p class="text-3xl font-bold text-blue-500 mb-1">
										{{ venueData.venue?.status === '可用' ? '营业中' : '已关闭' }}
									</p>
									<p class="text-gray-500">场馆状态</p>
								</div>
							</div>
							<div class="w-[200px] flex justify-end">
								<a-button
									type="primary"
									class="create-btn !text-lg !h-12 !px-8"
									@click="router.push('/event/create')"
								>
									<div class="flex items-center gap-2">
										<PlusOutlined class="text-xl" />
										发起活动
									</div>
								</a-button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 活动列表 -->
			<div class="max-w-[1800px] mx-auto">
				<div class="flex justify-between items-center mb-8">
					<h2 class="text-2xl font-bold">场馆活动</h2>
					<div class="flex gap-4">
						<a-select
							v-model:value="filterStatus"
							style="width: 120px"
							placeholder="活动状态"
						>
							<a-select-option value="">全部状态</a-select-option>
							<a-select-option value="报名中">报名中</a-select-option>
							<a-select-option value="已结束">已结束</a-select-option>
						</a-select>
						<a-select
							v-model:value="sortBy"
							style="width: 120px"
							placeholder="排序方式"
						>
							<a-select-option value="time">时间排序</a-select-option>
							<a-select-option value="popular">人气排序</a-select-option>
						</a-select>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					<div
						v-for="event in venueData.events"
						:key="event.id"
						class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
						@click="
							router.push({
								path: `/event/${event.id}`,
								query: {
									from: 'venue',
									venueId: venueId,
								},
							})
						"
					>
						<!-- 活动封面图 -->
						<div class="relative h-48">
							<img
								:src="`/src/assets/images/events/${event.cover}.png`"
								alt="活动封面"
								class="w-full h-full object-cover"
							/>
							<div
								class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
							>
								<h3 class="text-lg font-medium text-white mb-1">{{ event.title }}</h3>
								<div class="flex items-center gap-2 text-white/90">
									<CalendarOutlined />
									<span class="text-sm">{{ formatDate(event.startTime) }}</span>
								</div>
							</div>
						</div>
						<!-- 活动信息 -->
						<div class="p-4">
							<div class="flex justify-between items-start mb-3">
								<div class="flex flex-wrap gap-2">
									<a-tag color="pink">{{ event.type }}</a-tag>
									<a-tag :color="getDifficultyColor(event.difficulty)">
										难度：{{ getDifficultyText(event.difficulty) }}
									</a-tag>
									<a-tag :color="event.feeType === '免费' ? 'green' : 'blue'">
										{{ event.feeType === '免费' ? '免费' : `￥${event.feeAmount}` }}
									</a-tag>
								</div>
								<a-tag color="orange">
									<div class="flex items-center gap-1">
										<ClockCircleOutlined />
										{{ formatTime(event.startTime) }}~{{ formatTime(event.endTime) }}
									</div>
								</a-tag>
							</div>
							<p class="text-gray-600 text-sm mb-4 line-clamp-2">
								{{ event.description }}
							</p>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<a-avatar
										:size="24"
										:src="`/src/assets/images/avatars/${event.creator?.avatar}.png`"
									>
										{{ event.creator?.nickname?.[0] }}
									</a-avatar>
									<span class="text-sm text-gray-600">{{ event.creator?.nickname }}</span>
								</div>
								<div class="flex items-center gap-1 text-sm text-gray-500">
									<UserOutlined />
									<span>{{ event.registeredCount }}/{{ event.capacity }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</a-spin>
	</div>
</template>

<script setup>
	import {
		EnvironmentOutlined,
		ClockCircleOutlined,
		GlobalOutlined,
		CalendarOutlined,
		UserOutlined,
		WalletOutlined,
		PlusOutlined,
		ArrowLeftOutlined,
	} from '@ant-design/icons-vue'
	import { ref, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { message } from 'ant-design-vue'
	import venueApi from '@/api/modules/user/venue'
	import dayjs from 'dayjs'

	const route = useRoute()
	const router = useRouter()
	const venueId = route.params.id
	const venueData = ref({
		venue: null,
		events: [],
	})
	const loading = ref(true)
	const filterStatus = ref('')
	const sortBy = ref('time')

	// 获取场馆详情
	const fetchVenueDetail = async () => {
		try {
			loading.value = true
			const { status, data } = await venueApi.getVenueDetail(venueId)
			if (status) {
				venueData.value = data
			}
		} catch (error) {
			message.error('获取场馆详情失败')
		} finally {
			loading.value = false
		}
	}

	// 格式化日期
	const formatDate = (date) => {
		return dayjs(date).format('YYYY年MM月DD日')
	}

	// 获取难度文本和颜色
	const getDifficultyText = (difficulty) => {
		const difficultyMap = {
			1: '新手',
			2: '初级',
			3: '中级',
			4: '高级',
			5: '专业',
		}
		return difficultyMap[difficulty] || '未知'
	}

	const getDifficultyColor = (difficulty) => {
		const colorMap = {
			1: 'green',
			2: 'cyan',
			3: 'blue',
			4: 'purple',
			5: 'red',
		}
		return colorMap[difficulty] || 'default'
	}

	// 格式化时间
	const formatTime = (date) => {
		return dayjs(date).format('HH:mm')
	}

	// 页面加载时获取场馆详情
	onMounted(() => {
		fetchVenueDetail()
	})
</script>

<style scoped>
	.create-btn {
		background: #ff7eb3;
		border: none;
		box-shadow: 0 2px 8px rgba(255, 126, 179, 0.3);
	}

	.create-btn:hover {
		background: #ff6b9e;
		box-shadow: 0 4px 12px rgba(255, 126, 179, 0.4);
	}

	.create-btn:active {
		background: #ff6b9e;
		box-shadow: 0 2px 4px rgba(255, 126, 179, 0.2);
	}

	.back-btn {
		background: #ff7eb3;
		border: none;
		color: white !important;
		padding: 0 24px;
		height: 48px;
		font-size: 16px;
		box-shadow: 0 2px 8px rgba(255, 126, 179, 0.3);
	}

	.back-btn:hover {
		background: #ff6b9e;
		box-shadow: 0 4px 12px rgba(255, 126, 179, 0.4);
		color: white !important;
	}

	.back-btn:active {
		color: white !important;
	}
</style>
