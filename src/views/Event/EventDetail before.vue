<template>
	<div class="container mx-auto px-4 py-8 h-screen">
		<a-spin :spinning="loading">
			<div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				<!-- 活动封面图 -->
				<div class="relative h-96">
					<img
						:src="eventData.coverImage"
						alt="活动封面"
						class="w-full h-full object-cover"
					/>
					<div
						class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
					>
						<h1 class="text-3xl font-bold text-white mb-2">
							{{ eventData.title }}
						</h1>
						<div class="flex items-center gap-4 text-white/90">
							<span class="flex items-center gap-1">
								<CalendarOutlined />
								{{ eventData.date }}
							</span>
							<span class="flex items-center gap-1">
								<ClockCircleOutlined />
								{{ eventData.time }}
							</span>
							<span class="flex items-center gap-1">
								<TeamOutlined />
								{{ eventData.currentParticipants }}/{{ eventData.maxParticipants }}人
							</span>
						</div>
					</div>
				</div>

				<!-- 活动内容 -->
				<div class="p-6">
					<!-- 活动状态和报名按钮 -->
					<div class="flex justify-between items-center mb-8">
						<div class="flex items-center gap-2">
							<a-tag :color="getStatusColor(eventData.status)">
								{{ getStatusText(eventData.status) }}
							</a-tag>
							<span class="text-gray-600">报名截止时间：{{ eventData.deadline }}</span>
						</div>
						<a-button
							type="primary"
							size="large"
							class="register-btn"
							:disabled="!canRegister && !eventData.isRegistered"
							@click="eventData.isRegistered ? handleCancelRegister() : handleRegister()"
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
									<p class="font-medium">{{ eventData.venue }}</p>
									<p class="text-sm">{{ eventData.address }}</p>
								</div>
							</div>
						</div>

						<div>
							<h2 class="text-xl font-bold mb-3">活动费用</h2>
							<div class="flex items-center gap-2 text-gray-600">
								<WalletOutlined />
								<span>{{ eventData.price }}元/人</span>
							</div>
						</div>

						<div>
							<h2 class="text-xl font-bold mb-3">活动详情</h2>
							<div class="text-gray-600 space-y-2">
								<p>{{ eventData.description }}</p>
							</div>
						</div>

						<div v-if="eventData.rules">
							<h2 class="text-xl font-bold mb-3">活动规则</h2>
							<div class="text-gray-600 space-y-2">
								<ul class="list-disc list-inside space-y-1">
									<li
										v-for="(rule, index) in eventData.rules"
										:key="index"
									>
										{{ rule }}
									</li>
								</ul>
							</div>
						</div>

						<!-- 已报名用户列表 -->
						<div v-if="registeredUsers.length > 0">
							<h2 class="text-xl font-bold mb-3">已报名用户</h2>
							<div class="flex flex-wrap gap-4">
								<div
									v-for="user in registeredUsers"
									:key="user.id"
									class="flex items-center gap-2"
								>
									<a-avatar :src="user.avatar">{{ user.username?.charAt(0) }}</a-avatar>
									<span class="text-gray-600">{{ user.username }}</span>
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
		WalletOutlined,
	} from '@ant-design/icons-vue'
	import { ref, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { message } from 'ant-design-vue'
	import eventApi from '@/api/modules/event'

	const route = useRoute()
	const eventId = route.params.id
	const eventData = ref({})
	const loading = ref(true)
	const registeredUsers = ref([])

	// 获取活动详情
	const fetchEventDetail = async () => {
		try {
			loading.value = true
			const res = await eventApi.getEventDetail(eventId)
			if (res.code === 200) {
				console.log(res.data)
				eventData.value = res.data.event
				// 这里假设后端返回的数据中包含了已报名用户列表
				// registeredUsers.value = res.data.registeredUsers || []
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
		if (!canRegister.value) return
		try {
			const res = await eventApi.joinEvent(eventId)
			if (res.code === 200) {
				message.success('报名成功！')
				// 重新获取活动详情，更新报名状态和人数
				await fetchEventDetail()
			}
		} catch (error) {
			message.error('报名失败，请稍后重试')
			console.error('报名失败:', error)
		}
	}

	// 取消报名
	const handleCancelRegister = async () => {
		try {
			const res = await eventApi.cancelJoin(eventId)
			if (res.code === 200) {
				message.success('已取消报名')
				// 重新获取活动详情，更新报名状态和人数
				await fetchEventDetail()
			}
		} catch (error) {
			message.error('取消报名失败，请稍后重试')
			console.error('取消报名失败:', error)
		}
	}

	const getStatusColor = (status) => {
		const statusMap = {
			registering: 'success',
			full: 'warning',
			closed: 'error',
		}
		return statusMap[status] || 'default'
	}

	const getStatusText = (status) => {
		const statusMap = {
			registering: '报名中',
			full: '已满员',
			closed: '已截止',
		}
		return statusMap[status] || '未知状态'
	}

	const canRegister = computed(() => {
		return eventData.value.status === 'registering' && !eventData.value.isRegistered
	})

	const getRegisterButtonText = () => {
		if (eventData.value.isRegistered) {
			return '取消报名'
		}
		const statusMap = {
			registering: '立即报名',
			full: '名额已满',
			closed: '报名已截止',
		}
		return statusMap[eventData.value.status] || '立即报名'
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

	.register-btn.registered {
		background: #ff6b9e;
	}
</style>
