<template>
	<div class="container mx-auto h-screen px-4 py-8 bg-gray-100">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- 活动卡片 -->
			<div
				v-for="event in events"
				:key="event.id"
				class="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
				@click="handleEventClick(event)"
			>
				<div class="p-6">
					<!-- 活动头部 -->
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center space-x-2">
							<span class="text-sm text-gray-500">
								{{ new Date(event.startTime).toLocaleDateString() }}
							</span>
							<span class="text-sm text-gray-400">|</span>
							<span class="text-sm text-blue-500">{{ event.type }}</span>
						</div>
						<div class="flex items-center space-x-2 text-gray-500 text-sm">
							<team-outlined />
							<span>{{ getTotalParticipants(event) }}/{{ event.capacity }}人</span>
						</div>
					</div>

					<!-- 活动标题 -->
					<h2 class="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
						{{ event.title }}
					</h2>

					<!-- 活动描述 -->
					<p class="text-gray-600 mb-4 line-clamp-3">{{ event.description }}</p>

					<!-- 活动信息 -->
					<div class="flex flex-col space-y-3">
						<!-- 第一行：时间和地点 -->
						<div class="flex items-center justify-between text-sm">
							<div class="flex items-center space-x-2">
								<clock-circle-outlined class="text-gray-400" />
								<span class="text-gray-500">
									{{
										new Date(event.startTime).toLocaleString('zh-CN', {
											month: '2-digit',
											day: '2-digit',
											hour: '2-digit',
											minute: '2-digit',
										})
									}}
									-
									{{
										new Date(event.endTime).toLocaleString('zh-CN', {
											hour: '2-digit',
											minute: '2-digit',
										})
									}}
								</span>
							</div>
							<div class="flex items-center space-x-1">
								<environment-outlined class="text-gray-400" />
								<span class="text-gray-500">{{ event.venue.name }}</span>
							</div>
						</div>

						<!-- 第二行：创建者和难度 -->
						<div class="flex items-center justify-between text-sm">
							<div class="flex items-center space-x-2">
								<user-outlined class="text-gray-400" />
								<span class="text-gray-500">{{ event.creator.nickname }}</span>
							</div>
							<div class="flex items-center space-x-1">
								<a-rate
									:value="event.difficulty"
									:count="5"
									disabled
									class="!text-base"
								/>
							</div>
						</div>

						<!-- 第三行：费用和类型 -->
						<div class="flex items-center justify-between text-sm">
							<div class="flex items-center space-x-2">
								<money-collect-outlined class="text-gray-400" />
								<span class="text-gray-500">
									{{
										event.feeType === '免费'
											? '免费'
											: `${event.feeType}: ${event.feeAmount} 元`
									}}
								</span>
							</div>
							<a-tag
								class="!px-2 !py-1 !bg-blue-100 !text-blue-600 !border-none !rounded-full"
							>
								{{ event.type }}
							</a-tag>
						</div>

						<!-- 第四行：报名截止时间和状态 -->
						<div class="flex items-center justify-between text-sm">
							<div class="flex items-center space-x-2 text-red-500">
								<calendar-outlined />
								<span>
									报名截止:
									{{
										new Date(event.regEnd).toLocaleString('zh-CN', {
											month: '2-digit',
											day: '2-digit',
											hour: '2-digit',
											minute: '2-digit',
										})
									}}
								</span>
							</div>
							<a-tag
								:class="[
									'!px-2 !py-1 !border-none !rounded-full',
									isDeadlinePassed(event.regEnd)
										? '!bg-red-100 !text-red-600'
										: '!bg-green-100 !text-green-600',
								]"
							>
								{{ isDeadlinePassed(event.regEnd) ? '已截止' : '报名中' }}
							</a-tag>
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
	import eventApi from '@/api/api'
	import dayjs from 'dayjs'
	import {
		TeamOutlined,
		ClockCircleOutlined,
		EnvironmentOutlined,
		UserOutlined,
		CalendarOutlined,
		MoneyCollectOutlined,
	} from '@ant-design/icons-vue'

	const router = useRouter()
	const store = useAllDataStore()
	const events = ref([])
	const loading = ref(false)

	// 计算活动的参与人数
	const getTotalParticipants = (event) => {
		if (!event.groups) return 0
		return event.groups.reduce((total, group) => {
			return total + (group.members?.length || 0)
		}, 0)
	}

	// 获取活动列表
	const fetchEvents = async () => {
		loading.value = true
		try {
			const { status, message: msg, data } = await eventApi.getEventList()
			if (status) {
				events.value = data.events
				// console.log(events.value)
			} else {
				message.error(msg || '获取活动列表失败')
			}
		} catch (error) {
			message.error('获取活动列表失败')
			// console.error('获取活动列表失败:', error)
		} finally {
			loading.value = false
		}
	}

	// 点击活动卡片
	const handleEventClick = (event) => {
		router.push(`/event/${event.id}`)
	}

	// 判断是否已过报名截止时间
	const isDeadlinePassed = (deadline) => {
		return dayjs().isAfter(dayjs(deadline))
	}

	// 页面加载时获取数据和设置当前页面
	onMounted(() => {
		fetchEvents()
		store.state.currentPage = 'event'
		// console.log('当前页面已设置为:', store.state.currentPage)
	})

	// 组件卸载时清除当前页面
	onUnmounted(() => {
		store.state.currentPage = ''
		// console.log('当前页面已清除')
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
