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
						编辑个人信息
					</h1>
					<p class="mt-2 text-gray-500">修改您的个人信息</p>
				</div>

				<!-- 表单内容 -->
				<div class="p-8">
					<a-form
						:model="userForm"
						:rules="rules"
						layout="vertical"
						@finish="handleSubmit"
					>
						<div class="grid grid-cols-2 gap-8">
							<!-- 左列 -->
							<div class="space-y-8">
								<!-- 基本信息卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<InfoCircleOutlined class="text-pink-500 mr-2" />
										基本信息
									</h2>

									<a-form-item
										label="用户名"
										name="username"
									>
										<a-input
											v-model:value="userForm.username"
											disabled
											size="large"
											class="rounded-lg bg-gray-50 cursor-not-allowed"
										/>
									</a-form-item>

									<a-form-item
										label="昵称"
										name="nickname"
									>
										<a-input
											v-model:value="userForm.nickname"
											placeholder="请输入昵称"
											size="large"
											class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
										/>
									</a-form-item>

									<a-form-item
										label="性别"
										name="gender"
									>
										<a-radio-group
											v-model:value="userForm.gender"
											button-style="solid"
										>
											<a-radio-button :value="0">男</a-radio-button>
											<a-radio-button :value="1">女</a-radio-button>
											<a-radio-button :value="2">未知</a-radio-button>
										</a-radio-group>
									</a-form-item>

									<a-form-item
										label="个人简介"
										name="introduce"
									>
										<a-textarea
											v-model:value="userForm.introduce"
											:rows="3"
											placeholder="介绍一下自己吧"
											class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
										/>
									</a-form-item>
								</div>

								<!-- 联系方式卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<PhoneOutlined class="text-pink-500 mr-2" />
										联系方式
									</h2>

									<a-form-item
										label="邮箱"
										name="email"
									>
										<a-input
											v-model:value="userForm.email"
											placeholder="请输入邮箱地址"
											size="large"
											class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
										/>
									</a-form-item>

									<a-form-item
										label="手机号"
										name="phone"
									>
										<a-input
											v-model:value="userForm.phone"
											placeholder="请输入手机号"
											size="large"
											class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
										/>
									</a-form-item>
								</div>
							</div>

							<!-- 右列 -->
							<div class="space-y-8">
								<!-- 头像设置卡片 -->
								<div class="bg-gray-50 rounded-2xl p-8 space-y-6">
									<h2 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
										<PictureOutlined class="text-pink-500 mr-2" />
										头像设置
									</h2>

									<div class="flex items-center space-x-6">
										<div
											class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
										>
											<img
												v-if="userForm.avatar"
												:src="`/src/assets/images/avatars/${userForm.avatar}.png`"
												alt="用户头像"
												class="w-full h-full object-cover"
											/>
											<UserOutlined
												v-else
												class="text-4xl text-gray-400"
											/>
										</div>
										<div class="flex-1 space-y-4">
											<a-input
												v-model:value="userForm.avatar"
												placeholder="请输入头像名称,例如:userDefault"
												size="large"
												class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
											/>
											<div class="text-gray-500 text-sm">
												可选头像: admin、userDefault
											</div>
										</div>
									</div>

									<div class="mt-8 space-y-4">
										<h3 class="text-base font-medium text-gray-700">球技等级</h3>
										<Stars v-model="userForm.level" />
										<div class="text-gray-500 text-sm text-center">
											选择您的球技等级（1-5星）
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- 提交按钮 -->
						<div
							class="flex justify-end space-x-4 sticky bottom-0 bg-white p-6 border-t border-gray-100 mt-8"
						>
							<a-button
								size="large"
								@click="handleCancel"
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
								保存
							</a-button>
						</div>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { message } from 'ant-design-vue'
	import { useRouter } from 'vue-router'
	import {
		EditOutlined,
		InfoCircleOutlined,
		PhoneOutlined,
		PictureOutlined,
		UserOutlined,
	} from '@ant-design/icons-vue'
	import api from '@/api/api'
	import Stars from '@/components/Stars.vue'

	const router = useRouter()
	const submitting = ref(false)
	const userForm = ref({
		username: '',
		nickname: '',
		email: '',
		phone: '',
		gender: 1,
		avatar: '',
		introduce: '',
		level: 3,
	})

	const rules = {
		// username: [
		// 	{ required: true, message: '请输入用户名', trigger: 'blur' },
		// 	{ min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
		// ],
		nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
		email: [
			{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
		],
		phone: [
			{ required: true, message: '请输入手机号', trigger: 'blur' },
			{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
		],
		gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
		introduce: [{ max: 200, message: '个人简介不能超过200个字符', trigger: 'blur' }],
		level: [{ required: true, message: '请选择球技等级', trigger: 'change' }],
	}

	// 获取用户信息
	const getUserInfo = async () => {
		try {
			const res = await api.getUser()
			if (res.status && res.data.user) {
				userForm.value = {
					...res.data.user,
				}
			}
		} catch (error) {
			message.error('获取用户信息失败')
		}
	}

	// 取消编辑
	const handleCancel = () => {
		router.back()
	}

	// 提交表单
	const handleSubmit = async () => {
		try {
			submitting.value = true
			await api.updateUser(userForm.value)
			message.success('更新成功')
			router.back()
		} catch (error) {
			message.error('更新失败')
		} finally {
			submitting.value = false
		}
	}

	onMounted(() => {
		getUserInfo()
	})
</script>

<style scoped>
	:deep(.ant-form-item-label > label) {
		font-weight: 500;
		color: #374151;
	}

	:deep(.ant-input),
	:deep(.ant-input-textarea) {
		border-radius: 0.5rem;
		transition: all 0.3s ease;
	}

	:deep(.ant-input:hover),
	:deep(.ant-input-textarea:hover) {
		border-color: #f9a8d4 !important;
	}

	:deep(.ant-input:focus),
	:deep(.ant-input-textarea-focused) {
		border-color: #ec4899 !important;
		box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.1) !important;
	}

	:deep(.ant-form-item-explain-error) {
		color: #f43f5e;
		margin-top: 0.25rem;
		font-size: 0.875rem;
	}

	:deep(.ant-radio-button-wrapper) {
		border: 1px solid #e5e7eb !important;
		border-radius: 0.5rem !important;
		margin-right: 0.5rem;
	}

	:deep(.ant-radio-button-wrapper:not(:first-child)::before) {
		display: none !important;
	}

	:deep(.ant-radio-button-wrapper:first-child) {
		border-radius: 0.5rem !important;
	}

	:deep(.ant-radio-button-wrapper:last-child) {
		border-radius: 0.5rem !important;
	}

	:deep(.ant-upload.ant-upload-select-picture-card) {
		width: 120px;
		height: 120px;
		border-radius: 0.5rem;
	}

	:deep(.ant-upload-list-picture-card .ant-upload-list-item) {
		border-radius: 0.5rem;
	}
</style>
