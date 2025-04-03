<template>
	<div class="min-h-[calc(100vh-55px)] pb-[55px]">
		<div class="container mx-auto px-4 py-8 max-w-[2000px]">
			<!-- 搜索和排序区域 -->
			<div
				class="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-6"
			>
				<!-- 搜索框 -->
				<div class="w-full md:w-[400px]">
					<a-tooltip
						placement="topLeft"
						title="输入活动标题关键词搜索"
					>
						<div class="search-wrapper">
							<a-input
								v-model:value="searchQuery.title"
								placeholder="搜索活动标题"
								class="custom-search-input"
								@pressEnter="handleSearch"
							/>
							<a-button
								type="primary"
								:loading="loading"
								class="custom-search-button"
								@click="handleSearch"
							>
								<div class="icon-wrapper">
									<search-outlined />
								</div>
							</a-button>
						</div>
					</a-tooltip>
				</div>

				<!-- 排序和筛选按钮 -->
				<div class="flex items-center space-x-4 flex-wrap gap-y-2">
					<a-tooltip
						placement="top"
						title="选择活动类型"
					>
						<a-select
							v-model:value="searchQuery.type"
							placeholder="活动类型"
							style="width: 130px"
							@change="handleSearch"
							class="!rounded-xl filter-select"
						>
							<a-select-option value="">全部类型</a-select-option>
							<a-select-option value="羽毛球">羽毛球</a-select-option>
							<a-select-option value="乒乓球">乒乓球</a-select-option>
							<a-select-option value="网球">网球</a-select-option>
						</a-select>
					</a-tooltip>

					<a-tooltip
						placement="top"
						title="选择费用类型"
					>
						<a-select
							v-model:value="searchQuery.feeType"
							placeholder="费用类型"
							style="width: 130px"
							@change="handleSearch"
							class="!rounded-xl filter-select"
						>
							<a-select-option value="">全部费用</a-select-option>
							<a-select-option value="免费">免费</a-select-option>
							<a-select-option value="AA制">AA制</a-select-option>
							<a-select-option value="固定费用">固定费用</a-select-option>
						</a-select>
					</a-tooltip>

					<a-tooltip
						placement="top"
						title="选择活动难度等级"
					>
						<a-select
							v-model:value="searchQuery.difficulty"
							placeholder="难度等级"
							style="width: 130px"
							@change="handleSearch"
							class="!rounded-xl filter-select"
						>
							<a-select-option value="">全部难度</a-select-option>
							<a-select-option :value="1">1星 (入门)</a-select-option>
							<a-select-option :value="2">2星 (初级)</a-select-option>
							<a-select-option :value="3">3星 (中级)</a-select-option>
							<a-select-option :value="4">4星 (高级)</a-select-option>
							<a-select-option :value="5">5星 (专业)</a-select-option>
						</a-select>
					</a-tooltip>

					<!-- <a-tooltip
						placement="top"
						title="选择排序方式"
					>
						<a-select
							v-model:value="sortBy"
							placeholder="排序方式"
							style="width: 130px"
							@change="handleSort"
							class="!rounded-xl filter-select"
						>
							<a-select-option value="startTime">开始时间</a-select-option>
							<a-select-option value="regEnd">报名截止</a-select-option>
							<a-select-option value="registeredCount">参与人数</a-select-option>
						</a-select>
					</a-tooltip> -->
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- 活动卡片 -->
				<div
					v-for="event in events"
					:key="event.id"
					class="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
					@click="handleEventClick(event)"
				>
					<div class="relative h-60 w-full overflow-hidden">
						<img
							:src="`/src/assets/images/events/${event.cover}.png`"
							:alt="event.title"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="p-5">
						<!-- 活动头部 -->
						<div class="flex items-center justify-between mb-3">
							<div class="flex items-center space-x-3">
								<span class="text-base text-gray-600">
									{{ new Date(event.startTime).toLocaleDateString() }}
								</span>
								<span class="text-gray-400">|</span>
								<span class="text-base text-blue-500">{{ event.type }}</span>
							</div>
							<div class="flex items-center space-x-2 text-gray-600 text-base">
								<team-outlined />
								<span>{{ event.registeredCount }}/{{ event.capacity }}人</span>
							</div>
						</div>

						<!-- 活动标题 -->
						<h2 class="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
							{{ event.title }}
						</h2>

						<!-- 活动描述 -->
						<p class="text-base text-gray-600 mb-4 line-clamp-3">
							{{ event.description }}
						</p>

						<!-- 活动信息 -->
						<div class="flex flex-col space-y-2.5">
							<!-- 第一行：时间和地点 -->
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<clock-circle-outlined class="text-gray-500 text-lg" />
									<span class="text-base text-gray-600">
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
								<div class="flex items-center space-x-2">
									<environment-outlined class="text-gray-500 text-lg" />
									<span class="text-base text-gray-600">{{ event.venue.name }}</span>
								</div>
							</div>

							<!-- 第二行：创建者和难度 -->
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<user-outlined class="text-gray-500 text-lg" />
									<span class="text-base text-gray-600">
										{{ event.creator.nickname }}
									</span>
								</div>
								<div class="flex items-center space-x-2">
									<a-rate
										:value="event.difficulty"
										:count="5"
										disabled
										class="!text-lg"
									/>
								</div>
							</div>

							<!-- 第三行：费用和类型 -->
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<money-collect-outlined class="text-gray-500 text-lg" />
									<span class="text-base text-gray-600">
										{{
											event.feeType === '免费'
												? '免费'
												: `${event.feeType}: ${event.feeAmount} 元`
										}}
									</span>
								</div>
								<a-tag
									class="!px-3 !py-1.5 !text-sm !bg-blue-100 !text-blue-600 !border-none !rounded-full"
								>
									{{ event.type }}
								</a-tag>
							</div>

							<!-- 第四行：报名截止时间和状态 -->
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3 text-red-500">
									<calendar-outlined class="text-lg" />
									<span class="text-base">
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
										'!px-3 !py-1.5 !text-sm !border-none !rounded-full',
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
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { useRouter } from 'vue-router'
	import { message } from 'ant-design-vue'
	import { useAllDataStore } from '@/stores'
	import api from '@/api/api'
	import dayjs from 'dayjs'
	import {
		TeamOutlined,
		ClockCircleOutlined,
		EnvironmentOutlined,
		UserOutlined,
		CalendarOutlined,
		MoneyCollectOutlined,
		SearchOutlined,
	} from '@ant-design/icons-vue'

	const router = useRouter()
	const store = useAllDataStore()
	const events = ref([])
	const loading = ref(false)

	// 分页相关
	const currentPage = ref(1)
	const pageSize = ref(9)
	const total = ref(0)

	// 搜索条件
	const searchQuery = ref({
		title: '',
		type: '',
		feeType: '',
		difficulty: '',
		startTime: '',
		endTime: '',
	})

	// 排序
	const sortBy = ref('startTime')
	const sortOrder = ref('asc')

	// 获取活动列表
	const fetchEvents = async () => {
		loading.value = true
		try {
			// 过滤掉空值
			const params = {
				currentPage: currentPage.value,
				pageSize: pageSize.value,
				...Object.fromEntries(
					Object.entries(searchQuery.value).filter(([_, value]) => value !== ''),
				),
				// sortBy: sortBy.value,
				// sortOrder: sortOrder.value,
			}

			// console.log('当前搜索条件:', searchQuery.value)
			// console.log('过滤后的参数:', params)

			const { status, message: msg, data } = await api.getEventList(params)
			if (status) {
				events.value = data.events
				total.value = data.pagination.total
				currentPage.value = data.pagination.currentPage
				pageSize.value = data.pagination.pageSize

				// 更新分页状态
				store.state.pagination = {
					currentPage: currentPage.value,
					pageSize: pageSize.value,
					total: total.value,
					onChange: handlePageChange,
					onShowSizeChange: handlePageSizeChange,
				}

				if (events.value.length === 0) {
					message.info('未找到相关活动')
				}
			} else {
				message.error(msg || '获取活动列表失败')
			}
		} catch (error) {
			console.error('获取活动列表失败:', error)
			message.error('获取活动列表失败')
		} finally {
			loading.value = false
		}
	}

	// 处理搜索
	const handleSearch = () => {
		// console.log('触发搜索，当前搜索条件:', searchQuery.value)
		currentPage.value = 1 // 重置到第一页
		fetchEvents()
	}

	// 处理排序
	const handleSort = () => {
		// console.log('触发排序，当前排序条件:', {
		// 	sortBy: sortBy.value,
		// 	sortOrder: sortOrder.value,
		// })
		currentPage.value = 1 // 重置到第一页
		fetchEvents()
	}

	// 处理分页变化
	const handlePageChange = (page) => {
		console.log('触发分页变化:', { page })
		currentPage.value = page
		fetchEvents()
	}

	// 处理每页条数变化
	const handlePageSizeChange = (current, size) => {
		console.log('触发每页条数变化:', { current, size })
		pageSize.value = size
		currentPage.value = 1 // 重置到第一页
		fetchEvents()
	}

	// 重置搜索条件
	const resetSearch = () => {
		searchQuery.value = {
			title: '',
			type: '',
			feeType: '',
			difficulty: '',
			startTime: '',
			endTime: '',
		}
		handleSearch()
	}

	// 点击活动卡片
	const handleEventClick = (event) => {
		// 重置滚动位置
		window.scrollTo(0, 0)
		router.push(`/event/${event.id}`)
	}

	// 判断是否已过报名截止时间
	const isDeadlinePassed = (deadline) => {
		return dayjs().isAfter(dayjs(deadline))
	}

	onMounted(() => {
		window.scrollTo(0, 0)
		fetchEvents()
		store.state.currentPage = 'event'
	})

	onUnmounted(() => {
		store.state.currentPage = ''
		store.state.pagination = null
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

	/* 搜索框样式 */
	.search-wrapper {
		display: flex;
		height: 44px;
		border-radius: 12px;
		overflow: hidden;
		border: 2px solid #fbcfe8;
		background-color: white;
		align-items: stretch;
	}

	.search-wrapper:hover {
		border-color: #f472b6;
	}

	.search-wrapper:focus-within {
		border-color: #f472b6;
		box-shadow: 0 0 0 2px rgba(244, 114, 182, 0.1);
	}

	:deep(.custom-search-input) {
		flex: 1;
		font-size: 16px;
		border: none !important;
		box-shadow: none !important;
		height: 100% !important;
		line-height: 40px;
		padding: 0 12px;
		margin: 0;
		display: flex;
		align-items: center;
	}

	:deep(.custom-search-input:hover),
	:deep(.custom-search-input:focus) {
		border: none !important;
		box-shadow: none !important;
	}

	:deep(.custom-search-button) {
		height: 100%;
		min-height: 100%;
		width: 56px;
		border: none !important;
		background-color: #f472b6 !important;
		border-radius: 0 10px 10px 0;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	:deep(.custom-search-button:hover) {
		background-color: #ec4899 !important;
	}

	:deep(.custom-search-button .icon-wrapper) {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	:deep(.custom-search-button .anticon) {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		color: white;
		line-height: 1;
	}

	/* 筛选下拉框样式 */
	:deep(.filter-select .ant-select-selector) {
		height: 44px !important;
		display: flex;
		align-items: center;
		border: 2px solid #e5e7eb !important;
		border-radius: 12px !important;
	}

	:deep(.filter-select:hover .ant-select-selector) {
		border-color: #f472b6 !important;
	}

	:deep(.filter-select.ant-select-focused .ant-select-selector) {
		border-color: #ec4899 !important;
		box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.1) !important;
	}

	:deep(.filter-select .ant-select-selection-placeholder) {
		color: #9ca3af;
	}

	:deep(.filter-select .ant-select-selection-item) {
		color: #374151;
		font-weight: 500;
	}
</style>
