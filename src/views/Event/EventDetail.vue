<template>
	<div class="container mx-auto px-4 py-8 min-h-screen max-w-[1800px]">
		<a-spin :spinning="loading">
			<div class="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				<!-- 返回按钮 -->
				<div class="absolute top-4 right-20 z-10">
					<a-button
						class="back-btn"
						size="large"
						@click="handleBack"
					>
						<div class="flex items-center gap-2">
							<ArrowLeftOutlined />
							{{ route.query.from === 'venue' ? '返回场馆详情' : '返回活动列表' }}
						</div>
					</a-button>
				</div>

				<!-- 创建者操作按钮 -->
				<div
					v-if="isCreator"
					class="absolute top-24 right-24 flex flex-col gap-2 z-10"
				>
					<a-button
						class="edit-btn"
						size="large"
						@click="handleEdit"
					>
						<div class="flex items-center gap-2">
							<EditOutlined />
							修改活动
						</div>
					</a-button>
					<a-button
						class="delete-btn"
						size="large"
						@click="handleDelete"
					>
						<div class="flex items-center gap-2">
							<DeleteOutlined />
							删除活动
						</div>
					</a-button>
				</div>

				<!-- 活动封面图 -->
				<div class="relative h-[24rem]">
					<img
						:src="getCoverImageUrl(eventData.cover)"
						alt="活动封面"
						class="w-full h-full object-cover"
					/>
					<div
						class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
					>
						<h1 class="text-3xl font-bold text-white mb-2">
							{{ eventData.title }}
						</h1>
						<div class="flex items-center gap-4 text-white/90 text-base">
							<span class="flex items-center gap-2">
								<CalendarOutlined />
								{{ formatDate(eventData.startTime) }}
							</span>
							<span class="flex items-center gap-2">
								<ClockCircleOutlined />
								{{ formatTime(eventData.startTime) }} -
								{{ formatTime(eventData.endTime) }}
							</span>
							<span class="flex items-center gap-2">
								<TeamOutlined />
								{{ eventData.registeredCount }}人已报名
							</span>
						</div>
					</div>
				</div>

				<!-- 活动内容 -->
				<div class="p-6">
					<!-- 活动状态和报名按钮 -->
					<div class="flex justify-between items-center mb-8">
						<div class="flex items-center gap-4">
							<a-tag
								:color="getDifficultyColor(eventData.difficulty)"
								class="!text-sm !px-3 !py-1"
							>
								难度：{{ getDifficultyText(eventData.difficulty) }}
							</a-tag>
							<a-tag
								color="blue"
								class="!text-sm !px-3 !py-1"
							>
								{{ eventData.type }}
							</a-tag>
							<span class="text-gray-600 text-base">
								报名截止时间：{{ formatDateTime(eventData.regEnd) }}
							</span>
						</div>
						<a-button
							type="primary"
							size="large"
							class="register-btn !text-base !px-6 !h-10"
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
							<div class="flex items-start gap-2 text-gray-800 text-base">
								<EnvironmentOutlined class="mt-1 text-lg" />
								<div>
									<p class="font-medium text-lg">{{ eventData.venue?.name }}</p>
									<p class="text-sm">{{ eventData.venue?.location }}</p>
									<p class="text-sm text-gray-500 mt-1">
										{{ eventData.venue?.description }}
									</p>
								</div>
							</div>
						</div>

						<div>
							<h2 class="text-xl font-bold mb-3">活动详情</h2>
							<div class="text-gray-600 space-y-2 text-base">
								<p>{{ eventData.description }}</p>
								<div class="mt-4 grid grid-cols-2 gap-4">
									<div class="flex items-center gap-2">
										<UserOutlined class="text-lg" />
										<span>
											已报名：{{ eventData.registeredCount }}/{{ eventData.capacity }}人
										</span>
									</div>
									<div class="flex items-center gap-2">
										<WalletOutlined class="text-lg" />
										<span>
											活动费用：{{
												eventData.feeType === '免费' ? '免费' : `￥${eventData.feeAmount}`
											}}
										</span>
									</div>
								</div>
							</div>
						</div>

						<!-- 分组信息 -->
						<div v-if="eventData.groups && eventData.groups.length > 0">
							<h2 class="text-xl font-bold mb-3">活动分组</h2>
							<div class="space-y-4">
								<div
									v-for="group in eventData.groups"
									:key="group.id"
									class="border rounded-lg p-4 transition-all duration-200"
									:class="{
										'border-pink-500 bg-pink-50':
											selectedGroup?.id === group.id || userJoinedGroup?.id === group.id,
										'border-gray-200 hover:border-pink-300':
											selectedGroup?.id !== group.id && !isDeadlinePassed,
										'cursor-pointer': !isDeadlinePassed,
										'opacity-70': isDeadlinePassed,
									}"
									@click="!isDeadlinePassed && selectGroup(group)"
								>
									<div class="flex justify-between items-start mb-2">
										<div class="flex items-center gap-2">
											<h3 class="text-lg font-medium">{{ group.name }}</h3>
											<a-tag
												v-if="userJoinedGroup?.id === group.id"
												color="green"
												class="!text-sm !px-3 !py-1"
											>
												已加入
											</a-tag>
											<a-tag
												v-if="selectedGroup?.id === group.id"
												color="pink"
												class="!text-sm !px-3 !py-1"
											>
												已选择
											</a-tag>
										</div>
										<a-tag
											color="blue"
											class="!text-sm !px-3 !py-1"
										>
											已报名 {{ group.members.length }}/{{ group.capacity }}人
										</a-tag>
									</div>
									<p class="text-gray-600 mb-3 text-base">{{ group.description }}</p>
									<div class="flex flex-wrap gap-2">
										<div
											v-for="member in group.members"
											:key="member.id"
											class="flex items-center gap-1"
										>
											<a-avatar
												:size="32"
												:src="getAvatarImageUrl(member.avatar)"
											>
												{{ member.nickname[0] }}
											</a-avatar>
											<span class="text-sm">{{ member.nickname }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- 创建者信息 -->
						<div>
							<h2 class="text-xl font-bold mb-3">活动发起人</h2>
							<div class="flex items-center gap-3">
								<a-avatar
									:size="48"
									:src="getAvatarImageUrl(eventData.creator?.avatar)"
								>
									{{ eventData.creator?.nickname?.[0] }}
								</a-avatar>
								<div>
									<p class="font-medium text-lg">{{ eventData.creator?.nickname }}</p>
									<p class="text-sm text-gray-500">
										{{ eventData.creator?.introduce }}
									</p>
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
		UserOutlined,
		WalletOutlined,
		ArrowLeftOutlined,
		EditOutlined,
		DeleteOutlined,
	} from '@ant-design/icons-vue'
	import { ref, onMounted, computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { message, Modal } from 'ant-design-vue'
	import api from '@/api/api'
	import { useAuthStore } from '@/stores/auth'
	import dayjs from 'dayjs'

	const route = useRoute()
	const router = useRouter()
	const eventId = route.params.id
	const eventData = ref({})
	const loading = ref(true)
	const selectedGroup = ref(null)
	const authStore = useAuthStore()

	// 检查用户是否已加入某个小组
	const userJoinedGroup = computed(() => {
		if (!eventData.value.groups) return null
		const userId = authStore.getUser()?.user.id
		for (const group of eventData.value.groups) {
			if (group.members?.some((member) => member.id === userId)) {
				return group
			}
		}
		return null
	})

	// 判断是否是活动创建者
	const isCreator = computed(() => {
		return eventData.value.creator?.id === authStore.getUser()?.user.id
	})

	// 获取小组详情
	const fetchGroupDetail = async (groupId) => {
		try {
			const { status, data } = await api.getGroupDetail(groupId)
			if (status) {
				return {
					...data.group,
					members: data.members,
				}
			}
			return null
		} catch (error) {
			console.error('获取小组详情失败:', error)
			return null
		}
	}

	// 获取活动详情
	const fetchEventDetail = async () => {
		try {
			loading.value = true
			const { status, data } = await api.getEventDetail(eventId)
			if (status) {
				// 获取所有小组的详细信息
				const groupsWithDetails = await Promise.all(
					data.groups.map(async (group) => {
						const groupDetail = await fetchGroupDetail(group.id)
						return groupDetail || group
					}),
				)

				eventData.value = {
					...data.event,
					creator: data.creator,
					venue: data.venue,
					groups: groupsWithDetails,
				}

				// 自动选择用户已加入的小组
				const joinedGroup = eventData.value.groups.find((group) =>
					group.members?.some((member) => member.id === authStore.getUser()?.user.id),
				)
				if (joinedGroup) {
					selectedGroup.value = joinedGroup
				}
			}
		} catch (error) {
			message.error('获取活动详情失败')
			// console.error('获取活动详情失败:', error)
		} finally {
			loading.value = false
		}
	}

	// 选择组
	const selectGroup = (group) => {
		if (isDeadlinePassed.value) {
			message.warning('报名已截止')
			return
		}
		if (group.members?.length >= group.capacity) {
			message.warning('该组已满，请选择其他组')
			return
		}
		selectedGroup.value = group
	}

	// 处理报名或退出
	const handleRegister = async () => {
		if (isDeadlinePassed.value || !selectedGroup.value) return

		// 如果用户已经加入了其他组，显示确认弹窗
		if (userJoinedGroup.value && userJoinedGroup.value.id !== selectedGroup.value.id) {
			Modal.confirm({
				title: '确认切换小组',
				content: `您当前已加入"${userJoinedGroup.value.name}"组，是否退出并加入"${selectedGroup.value.name}"组？`,
				okText: '确认',
				cancelText: '取消',
				centered: true,
				width: 400,
				okType: 'primary',
				okButtonProps: {
					style: {
						background: '#ff7eb3',
						border: 'none',
					},
				},
				okButtonClass: 'hover:bg-[#ff6b9e]',
				async onOk() {
					try {
						const res = await api.joinGroup(selectedGroup.value.id)
						if (res.status) {
							message.success('已加入小组')
							selectedGroup.value = null
							await fetchEventDetail()
						} else {
							message.error(res.message || '操作失败')
						}
					} catch (error) {
						message.error('操作失败，请稍后重试')
						console.error('操作失败:', error)
					}
				},
			})
			return
		}

		try {
			const res = await api.joinGroup(selectedGroup.value.id)
			if (res.status) {
				// 如果是退出操作
				if (selectedGroup.value.id === userJoinedGroup.value?.id) {
					message.success('已退出小组')
				} else {
					message.success('已加入小组')
				}
				selectedGroup.value = null
				await fetchEventDetail()
			} else {
				message.error(res.message || '操作失败')
			}
		} catch (error) {
			message.error('操作失败，请稍后重试')
			console.error('操作失败:', error)
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
		return dayjs().isAfter(dayjs(eventData.value.regEnd))
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

	// 获取按钮文本
	const getRegisterButtonText = () => {
		if (isDeadlinePassed.value) {
			return '报名已截止'
		}
		if (!selectedGroup.value) {
			return '请选择分组'
		}
		// 如果选中的组是当前已加入的组，显示退出
		if (selectedGroup.value.id === userJoinedGroup.value?.id) {
			return '退出小组'
		}
		return '加入小组'
	}

	const getAvatarImageUrl = (avatar) => {
		return new URL(`../../assets/images/avatars/${avatar}.png`, import.meta.url).href
	}
	const getCoverImageUrl = (cover) => {
		return new URL(`../../assets/images/events/${cover}.png`, import.meta.url).href
	}

	// 处理修改活动
	const handleEdit = () => {
		router.push(`/event/${eventId}/edit`)
	}

	// 处理删除活动
	const handleDelete = () => {
		Modal.confirm({
			title: '确认删除活动',
			content: '删除后活动将无法恢复，是否继续？',
			okText: '确认删除',
			cancelText: '取消',
			centered: true,
			width: 400,
			okType: 'danger',
			async onOk() {
				try {
					const res = await api.deleteEvent(eventId)
					if (res.status) {
						message.success('活动已删除')
						router.push('/event')
					} else {
						message.error(res.message || '删除失败')
					}
				} catch (error) {
					message.error('删除失败，请稍后重试')
					console.error('删除失败:', error)
				}
			},
		})
	}

	// 处理返回按钮点击
	const handleBack = () => {
		if (route.query.from === 'venue') {
			router.push(`/venue/${route.query.venueId}`)
		} else {
			router.push('/event')
		}
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

	.edit-btn {
		background: #1890ff;
		border: none;
		color: white !important;
		padding: 0 24px;
		height: 40px;
		font-size: 16px;
		box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
	}

	.edit-btn:hover {
		background: #40a9ff;
		box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
		color: white !important;
	}

	.edit-btn:active {
		color: white !important;
	}

	.delete-btn {
		background: #ff4d4f;
		border: none;
		color: white !important;
		padding: 0 24px;
		height: 40px;
		font-size: 16px;
		box-shadow: 0 2px 8px rgba(255, 77, 79, 0.3);
	}

	.delete-btn:hover {
		background: #ff1f1f;
		box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4);
		color: white !important;
	}

	.delete-btn:active {
		color: white !important;
	}
</style>
