<template>
	<div class="container mx-auto px-4 py-8 h-screen">
		<a-spin :spinning="loading">
			<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				<!-- 活动封面图 -->
				<div class="relative h-96 bg-gray-100">
					<div
						class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
					>
						<h1 class="text-3xl font-bold text-white mb-2">
							{{ eventData.name }}
						</h1>
						<div class="flex items-center gap-4 text-white/90">
							<span class="flex items-center gap-1">
								<CalendarOutlined />
								{{ formatDate(eventData.time) }}
							</span>
							<span class="flex items-center gap-1">
								<ClockCircleOutlined />
								{{ formatTime(eventData.time) }}
							</span>
							<span class="flex items-center gap-1">
								<TeamOutlined />
								{{ eventData.participants || 0 }}人已报名
							</span>
						</div>
					</div>
				</div>

				<!-- 活动内容 -->
				<div class="p-6">
					<!-- 活动状态和报名按钮 -->
					<div class="flex justify-between items-center mb-8">
						<div class="flex items-center gap-4">
							<a-tag :color="getDifficultyColor(eventData.difficulty)">
								难度：{{ getDifficultyText(eventData.difficulty) }}
							</a-tag>
							<a-tag color="blue">{{ eventData.eventType }}</a-tag>
							<span class="text-gray-600">
								报名截止时间：{{ formatDateTime(eventData.registrationDeadline) }}
							</span>
						</div>
						<a-button
							type="primary"
							size="large"
							class="register-btn"
							:disabled="isDeadlinePassed"
							@click="handleRegister"
						>
							{{ getRegisterButtonText() }}
						</a-button>
					</div>

					<!-- 活动详情 -->
					<div class="space-y-6">
						<div>
							<h2 class="text-xl font-bold mb-3">活动地点</h2>
							<div class="flex items-start gap-2 text-gray-600">
								<EnvironmentOutlined class="mt-1" />
								<div>
									<p class="font-medium">{{ eventData.venue?.name }}</p>
									<p class="text-sm">{{ eventData.venue?.location }}</p>
									<p class="text-sm text-gray-500 mt-1">
										{{ eventData.venue?.description }}
									</p>
								</div>
							</div>
						</div>

						<div>
							<h2 class="text-xl font-bold mb-3">活动详情</h2>
							<div class="text-gray-600 space-y-2">
								<p>{{ eventData.description }}</p>
							</div>
						</div>

						<!-- 创建者信息 -->
						<div>
							<h2 class="text-xl font-bold mb-3">活动发起人</h2>
							<div class="flex items-center gap-3">
								<a-avatar :src="getImageUrl(eventData.creator?.avatar)">
									{{ eventData.creator?.nickname?.[0] }}
								</a-avatar>
								<div>
									<p class="font-medium">{{ eventData.creator?.nickname }}</p>
									<p class="text-sm text-gray-500">{{ eventData.creator?.introduce }}</p>
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
		CalendarOutlined,
		ClockCircleOutlined,
		TeamOutlined,
		EnvironmentOutlined,
	} from '@ant-design/icons-vue'
	import { ref, onMounted, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { message } from 'ant-design-vue'
	import eventApi from '@/api/modules/event'
	import dayjs from 'dayjs'

	const route = useRoute()
	const eventId = route.params.id
	const eventData = ref({})
	const loading = ref(true)

	// 获取活动详情
	const fetchEventDetail = async () => {
		try {
			loading.value = true
			const { status, data } = await eventApi.getEventDetail(eventId)
			if (status) {
				eventData.value = data.event
				console.log(eventData.value)
			}
		} catch (error) {
			message.error('获取活动详情失败')
			console.error('获取活动详情失败:', error)
		} finally {
			loading.value = false
		}
	}

	// 处理报名
	const handleRegister = async () => {
		if (isDeadlinePassed.value) return
		try {
			const res = await eventApi.joinEvent(eventId)
			if (res.code === 200) {
				message.success('报名成功！')
				await fetchEventDetail()
			}
		} catch (error) {
			message.error('报名失败，请稍后重试')
			console.error('报名失败:', error)
		}
	}

	// 格式化日期时间
	const formatDate = (date) => {
		return dayjs(date).format('YYYY年MM月DD日')
	}

	const formatTime = (date) => {
		return dayjs(date).format('HH:mm')
	}

	const formatDateTime = (date) => {
		return dayjs(date).format('YYYY年MM月DD日 HH:mm')
	}

	// 判断是否已过报名截止时间
	const isDeadlinePassed = computed(() => {
		return dayjs().isAfter(dayjs(eventData.value.registrationDeadline))
	})

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

	const getRegisterButtonText = () => {
		if (isDeadlinePassed.value) {
			return '报名已截止'
		}
		return '立即报名'
	}

	const getImageUrl = (avatar) => {
		return new URL(`../assets/images/avatars/${avatar}.png`, import.meta.url).href
	}

	// 页面加载时获取活动详情
	onMounted(() => {
		fetchEventDetail()
	})
</script>

<style scoped>
	.register-btn {
		background: #ff7eb3;
		border: none;
	}

	.register-btn:not(:disabled):hover {
		background: #ff6b9e;
	}

	.register-btn:disabled {
		background: #ffd4e5;
		color: white;
	}
</style>
