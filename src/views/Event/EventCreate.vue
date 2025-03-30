<template>
	<div class="min-h-screen bg-gray-50 py-12">
		<div class="px-8">
			<div class="max-w-[2000px] mx-auto bg-white rounded-2xl shadow-xl">
				<!-- 表单头部 -->
				<div class="p-8 border-b border-gray-100">
					<h1 class="text-3xl font-bold text-gray-800 flex items-center">
						<span class="text-pink-500 mr-3 flex items-center">
							<EditOutlined class="text-2xl" />
						</span>
						创建活动
					</h1>
					<p class="mt-2 text-gray-500">创建一个新的羽毛球活动，让更多人参与进来</p>
				</div>

				<!-- 表单内容 -->
				<div class="p-8">
					<a-form
						:model="formState"
						:rules="rules"
						layout="vertical"
						@finish="handleCreate"
					>
						<div class="grid grid-cols-2 gap-8">
							<!-- 左列 -->
							<div class="space-y-8">
								<!-- 活动封面 -->
								<a-form-item
									label="活动封面"
									name="cover"
								>
									<!-- <div
										class="bg-gray-50 rounded-2xl p-8 text-center transition-all hover:bg-gray-100"
									>
										<a-upload
											v-model:fileList="formState.cover"
											list-type="picture-card"
											:max-count="1"
											:before-upload="beforeUpload"
											class="cover-uploader"
										>
											<div
												v-if="!formState.cover.length"
												class="upload-hint"
											>
												<div class="text-5xl text-pink-300 mb-4">
													<PictureOutlined />
												</div>
												<div class="text-gray-500">点击或拖拽图片上传封面</div>
												<div class="text-gray-400 text-sm mt-2">建议尺寸 1920x1080px</div>
											</div>
										</a-upload>
									</div> -->
									<div class="bg-gray-50 rounded-2xl p-8">
										<a-input
											v-model:value="formState.cover"
											placeholder="请输入封面图片名称，默认为 eventDefault"
											size="large"
											class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
										/>
									</div>
								</a-form-item>

								<!-- 基本信息卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<InfoCircleOutlined class="text-pink-500 mr-2" />
										基本信息
									</h2>

									<!-- 活动标题 -->
									<a-form-item
										label="活动标题"
										name="title"
									>
										<a-input
											v-model:value="formState.title"
											placeholder="请输入活动标题"
											size="large"
											class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
										/>
									</a-form-item>

									<!-- 活动类型和难度 -->
									<div class="grid grid-cols-2 gap-6">
										<a-form-item
											label="活动类型"
											name="type"
										>
											<a-select
												v-model:value="formState.type"
												placeholder="请选择活动类型"
												size="large"
												class="rounded-lg"
											>
												<a-select-option value="羽毛球">羽毛球</a-select-option>
												<a-select-option value="篮球">篮球</a-select-option>
												<a-select-option value="足球">足球</a-select-option>
												<a-select-option value="乒乓球">乒乓球</a-select-option>
												<a-select-option value="网球">网球</a-select-option>
											</a-select>
										</a-form-item>

										<a-form-item
											label="活动难度"
											name="difficulty"
										>
											<a-rate
												v-model:value="formState.difficulty"
												:count="5"
												class="text-pink-500"
											/>
										</a-form-item>
									</div>
								</div>

								<!-- 时间地点卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<ClockCircleOutlined class="text-pink-500 mr-2" />
										时间地点
									</h2>

									<!-- 活动时间 -->
									<div class="grid grid-cols-2 gap-6">
										<a-form-item
											label="活动时间"
											name="activityTime"
										>
											<a-range-picker
												v-model:value="formState.activityTime"
												:show-time="{ format: 'HH:mm' }"
												format="YYYY-MM-DD HH:mm"
												size="large"
												class="w-full rounded-lg"
											/>
										</a-form-item>

										<a-form-item
											label="报名时间"
											name="registrationTime"
										>
											<a-range-picker
												v-model:value="formState.registrationTime"
												:show-time="{ format: 'HH:mm' }"
												format="YYYY-MM-DD HH:mm"
												size="large"
												class="w-full rounded-lg"
											/>
										</a-form-item>
									</div>

									<!-- 活动地点 -->
									<a-form-item
										label="活动地点"
										name="venueId"
									>
										<a-select
											v-model:value="formState.venueId"
											placeholder="请选择活动地点"
											size="large"
											:options="venueOptions"
											class="rounded-lg"
										>
											<template #option="{ label, address }">
												<div class="flex flex-col">
													<span>{{ label }}</span>
													<span class="text-gray-400 text-sm">{{ address }}</span>
												</div>
											</template>
										</a-select>
									</a-form-item>
								</div>

								<!-- 费用设置卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<WalletOutlined class="text-pink-500 mr-2" />
										费用设置
									</h2>

									<div class="grid grid-cols-2 gap-6">
										<a-form-item
											label="收费方式"
											name="feeType"
										>
											<a-select
												v-model:value="formState.feeType"
												size="large"
												class="rounded-lg"
											>
												<a-select-option value="固定费用">固定费用</a-select-option>
												<a-select-option value="AA制">AA制</a-select-option>
												<a-select-option value="免费">免费</a-select-option>
											</a-select>
										</a-form-item>

										<a-form-item
											label="费用金额"
											name="feeAmount"
											v-if="formState.feeType !== '免费'"
										>
											<a-input-number
												v-model:value="formState.feeAmount"
												:min="0"
												:precision="2"
												:step="10"
												size="large"
												class="w-full rounded-lg"
												:formatter="
													(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
												"
												:parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
											/>
										</a-form-item>
									</div>
								</div>
							</div>

							<!-- 右列 -->
							<div class="space-y-8">
								<!-- 分组设置卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2
										class="text-xl font-semibold text-gray-700 mb-6 flex items-center justify-between"
									>
										<div class="flex items-center">
											<TeamOutlined class="text-pink-500 mr-2" />
											分组设置
										</div>
										<div class="text-lg font-medium text-gray-600 mr-12">
											总人数：
											<span class="text-2xl text-pink-500">{{ formState.capacity }}</span>
											人
										</div>
									</h2>

									<a-form-item
										label="活动分组"
										name="groups"
									>
										<div class="space-y-4">
											<div
												v-for="(group, index) in formState.groups"
												:key="index"
												class="bg-white rounded-xl p-6 border border-gray-100 transition-shadow hover:shadow-md"
											>
												<div class="flex justify-between items-center mb-4">
													<h3 class="text-lg font-medium flex items-center">
														<TeamOutlined class="text-pink-400 mr-2" />
														分组 {{ index + 1 }}
													</h3>
													<a-button
														type="primary"
														danger
														@click="removeGroup(index)"
														class="hover:scale-110 transition-transform"
													>
														<div class="flex items-center">
															<DeleteOutlined />
														</div>
													</a-button>
												</div>
												<a-form-item-rest>
													<div class="grid grid-cols-2 gap-4 mb-4">
														<a-input
															v-model:value="group.name"
															placeholder="分组名称"
															class="rounded-lg"
														/>
														<a-input-number
															v-model:value="group.capacity"
															:min="1"
															placeholder="分组人数"
															class="w-full rounded-lg"
															@change="(value) => watchGroupCapacity(index, value)"
														/>
													</div>
													<a-textarea
														v-model:value="group.description"
														placeholder="分组描述"
														:rows="2"
														class="rounded-lg"
													/>
												</a-form-item-rest>
											</div>
											<a-button
												type="dashed"
												block
												@click="addGroup"
												class="rounded-xl h-12 border-pink-200 border-dashed hover:border-pink-400 hover:text-pink-500 transition-colors"
											>
												<div class="flex items-center justify-center">
													<PlusOutlined />
													<span class="ml-2">添加分组</span>
												</div>
											</a-button>
										</div>
									</a-form-item>
								</div>

								<!-- 活动详情卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<FileTextOutlined class="text-pink-500 mr-2" />
										活动详情
									</h2>

									<!-- 活动描述 -->
									<a-form-item
										label="活动描述"
										name="description"
									>
										<a-textarea
											v-model:value="formState.description"
											:rows="4"
											placeholder="请详细描述活动内容、要求等信息"
											class="rounded-lg"
										/>
									</a-form-item>

									<!-- 活动状态 -->
									<a-form-item
										label="活动状态"
										name="status"
									>
										<a-radio-group
											v-model:value="formState.status"
											button-style="solid"
										>
											<a-radio-button value="公开">公开</a-radio-button>
											<a-radio-button value="私密">私密</a-radio-button>
											<a-radio-button value="需要申请">需要申请</a-radio-button>
										</a-radio-group>
									</a-form-item>
								</div>
							</div>
						</div>

						<!-- 提交按钮 -->
						<div
							class="flex justify-end space-x-4 sticky bottom-0 bg-white p-6 border-t border-gray-100 mt-8"
						>
							<a-button
								size="large"
								@click="onCancel"
								class="rounded-lg min-w-[120px]"
							>
								取消
							</a-button>
							<a-button
								type="primary"
								size="large"
								html-type="submit"
								:loading="submitting"
								class="rounded-lg bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600 min-w-[120px]"
							>
								创建活动
							</a-button>
						</div>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive } from 'vue'
	import { message } from 'ant-design-vue'
	import dayjs from 'dayjs'
	import {
		PlusOutlined,
		DeleteOutlined,
		PictureOutlined,
		InfoCircleOutlined,
		ClockCircleOutlined,
		TeamOutlined,
		WalletOutlined,
		FileTextOutlined,
		EditOutlined,
	} from '@ant-design/icons-vue'
	import eventApi from '@/api/api'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const submitting = ref(false)

	// 表单数据
	const defaultStartTime = dayjs().add(1, 'day').hour(20).minute(0).second(0)
	const defaultEndTime = dayjs().add(1, 'day').hour(22).minute(0).second(0)

	const formState = reactive({
		title: `${defaultStartTime.format('M月D日')} 江体${defaultStartTime.format('H')}-${defaultEndTime.format('H')}`,
		cover: 'eventDefault',
		type: '羽毛球',
		difficulty: 3,
		activityTime: [defaultStartTime, defaultEndTime], // [startTime, endTime]
		registrationTime: [dayjs().hour(20).minute(0).second(0), defaultStartTime], // [regStart, regEnd]
		venueId: 1,
		groups: [
			{
				name: '休闲组',
				capacity: 6,
				description: '我是休闲组',
			},
		],
		capacity: 6, // 总容量
		feeType: '固定费用',
		feeAmount: 35,
		description: '我是活动描述',
		status: '公开',
	})

	// 表单验证规则
	const rules = {
		title: [
			{ required: true, message: '请输入活动标题', trigger: 'blur' },
			{ min: 2, max: 15, message: '标题长度应在 2-15 个字符之间', trigger: 'blur' },
		],
		// cover: [{ required: true, message: '请上传活动封面', trigger: 'change' }],
		type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
		difficulty: [{ required: true, message: '请选择活动难度', trigger: 'change' }],
		activityTime: [
			{ required: true, message: '请选择活动时间', trigger: 'change', type: 'array' },
		],
		// registrationTime: [
		// 	{ required: true, message: '请选择报名时间', trigger: 'change', type: 'array' },
		// ],
		venueId: [{ required: true, message: '请选择活动地点', trigger: 'change' }],
		'groups.*.name': [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
		'groups.*.capacity': [
			{ required: true, message: '请设置分组人数', trigger: 'change' },
		],
		feeType: [{ required: true, message: '请选择收费方式', trigger: 'change' }],
		description: [
			// { required: true, message: '请输入活动描述', trigger: 'blur' },
			{ max: 200, message: '描述长度应在 200 个字符之间', trigger: 'blur' },
		],
		status: [{ required: true, message: '请选择活动状态', trigger: 'change' }],
	}

	// 场馆选项（这里需要从API获取）
	const venueOptions = [
		{
			value: 1,
			label: '江南体育馆',
			address: '杭州市滨江区江南大道100号',
		},
		{
			value: 2,
			label: '滨江体育馆',
			address: '杭州市滨江区滨盛路200号',
		},
		{
			value: 3,
			label: '星光体育馆',
			address: '杭州市滨江区星光大道300号',
		},
	]

	// 更新总容量
	const updateTotalCapacity = () => {
		formState.capacity = formState.groups.reduce((sum, group) => sum + group.capacity, 0)
	}

	// 添加分组
	const addGroup = () => {
		formState.groups.push({
			name: '',
			capacity: 6,
			description: '',
		})
		updateTotalCapacity()
	}

	// 删除分组
	const removeGroup = (index) => {
		if (formState.groups.length === 1) {
			message.warning('至少需要保留一个分组')
			return
		}
		formState.groups.splice(index, 1)
		updateTotalCapacity()
	}

	// 监听分组容量变化
	const watchGroupCapacity = (index, value) => {
		formState.groups[index].capacity = value
		updateTotalCapacity()
	}

	// 图片上传前的处理
	// const beforeUpload = (file) => {
	// 	const isImage = file.type.startsWith('image/')
	// 	if (!isImage) {
	// 		message.error('只能上传图片文件！')
	// 		return false
	// 	}
	// 	const isLt2M = file.size / 1024 / 1024 < 2
	// 	if (!isLt2M) {
	// 		message.error('图片大小不能超过 2MB！')
	// 		return false
	// 	}
	// 	return true
	// }

	// 提交表单
	const handleCreate = async () => {
		try {
			submitting.value = true
			// 处理数据格式
			const params = {
				...formState, // 使用 formState 而不是 values
				startTime: formState.activityTime[0],
				endTime: formState.activityTime[1],
				regStart: formState.registrationTime[0],
				regEnd: formState.registrationTime[1],
			}
			console.log('提交的数据：', params) // 添加日志
			const { status, message: msg, errors } = await eventApi.createEvent(params)
			if (status) {
				message.success('活动创建成功')
			} else {
				message.error(errors?.[0] || msg || '活动创建失败')
			}

			router.push('/event')
		} catch (error) {
			message.error('活动创建失败：' + error.message)
		} finally {
			submitting.value = false
		}
	}

	// 取消创建
	const onCancel = () => {
		router.back()
	}
</script>

<style scoped>
	.cover-uploader :deep(.ant-upload) {
		width: 100% !important;
		height: 240px !important;
		background: transparent !important;
	}

	.upload-hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	:deep(.ant-form-item-label > label) {
		font-weight: 500;
		color: #374151;
	}

	:deep(.ant-input),
	:deep(.ant-input-number),
	:deep(.ant-select-selector),
	:deep(.ant-picker) {
		border-radius: 0.5rem;
		transition: all 0.3s ease;
	}

	:deep(.ant-input:hover),
	:deep(.ant-input-number:hover),
	:deep(.ant-select-selector:hover),
	:deep(.ant-picker:hover) {
		border-color: #f9a8d4 !important;
	}

	:deep(.ant-input:focus),
	:deep(.ant-input-number-focused),
	:deep(.ant-select-focused .ant-select-selector),
	:deep(.ant-picker-focused) {
		border-color: #ec4899 !important;
		box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.1) !important;
	}

	:deep(.ant-radio-button-wrapper) {
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		margin-right: 0.5rem;
	}

	:deep(.ant-radio-button-wrapper:not(:first-child)::before) {
		display: none;
	}

	:deep(.ant-radio-button-wrapper:first-child) {
		border-radius: 0.5rem;
	}

	:deep(.ant-radio-button-wrapper:last-child) {
		border-radius: 0.5rem;
	}

	/* :deep(.ant-radio-button-wrapper-checked) {
		border-color: #ec4899 !important;
		color: #ec4899 !important;
	} */

	:deep(.ant-btn) {
		border-radius: 0.5rem;
		transition: all 0.3s ease;
	}

	:deep(.ant-form-item-explain-error) {
		color: #f43f5e;
		margin-top: 0.25rem;
		font-size: 0.875rem;
	}

	:deep(.ant-rate-star) {
		margin-inline-end: 4px;
	}
</style>
