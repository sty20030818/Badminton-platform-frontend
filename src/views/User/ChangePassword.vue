<template>
	<div class="min-h-screen bg-gray-50 py-12">
		<div class="px-8">
			<div class="max-w-[2000px] mx-auto bg-white rounded-2xl shadow-xl">
				<!-- 表单头部 -->
				<div class="p-8 border-b border-gray-100">
					<h1 class="text-3xl font-bold text-gray-800 flex items-center">
						<span class="text-pink-500 mr-3 flex items-center">
							<LockOutlined class="text-2xl" />
						</span>
						修改密码
					</h1>
					<p class="mt-2 text-gray-500">修改您的登录密码</p>
				</div>

				<!-- 表单内容 -->
				<div class="p-8">
					<a-form
						:model="passwordForm"
						:rules="rules"
						layout="vertical"
						@finish="handleSubmit"
					>
						<div class="max-w-md mx-auto space-y-6">
							<a-form-item
								label="当前密码"
								name="oldPassword"
							>
								<a-input-password
									v-model:value="passwordForm.oldPassword"
									placeholder="请输入当前密码"
									size="large"
									class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
								/>
							</a-form-item>

							<a-form-item
								label="新密码"
								name="newPassword"
							>
								<a-input-password
									v-model:value="passwordForm.newPassword"
									placeholder="请输入新密码"
									size="large"
									class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
								/>
							</a-form-item>

							<a-form-item
								label="确认新密码"
								name="confirmPassword"
							>
								<a-input-password
									v-model:value="passwordForm.confirmPassword"
									placeholder="请再次输入新密码"
									size="large"
									class="rounded-lg hover:border-pink-300 focus:border-pink-500 transition-colors"
								/>
							</a-form-item>
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
								修改密码
							</a-button>
						</div>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { message } from 'ant-design-vue'
	import { useRouter } from 'vue-router'
	import { LockOutlined } from '@ant-design/icons-vue'
	import api from '@/api/api'

	const router = useRouter()
	const submitting = ref(false)
	const passwordForm = ref({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	})

	const validateConfirmPassword = async (rule, value) => {
		if (value === '') {
			throw new Error('请再次输入新密码')
		} else if (value !== passwordForm.value.newPassword) {
			throw new Error('两次输入的密码不一致')
		} else {
			return Promise.resolve()
		}
	}

	const rules = {
		oldPassword: [
			{ required: true, message: '请输入当前密码', trigger: 'blur' },
			{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
		],
		newPassword: [
			{ required: true, message: '请输入新密码', trigger: 'blur' },
			{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
		],
		confirmPassword: [
			{ required: true, message: '请再次输入新密码', trigger: 'blur' },
			{ validator: validateConfirmPassword, trigger: 'blur' },
		],
	}

	// 取消修改
	const handleCancel = () => {
		router.back()
	}

	// 提交表单
	const handleSubmit = async () => {
		try {
			submitting.value = true
			const params = {
				oldPassword: passwordForm.value.oldPassword,
				newPassword: passwordForm.value.newPassword,
			}
			const res = await api.updatePassword(params)
			if (res.status) {
				message.success('密码修改成功')
				router.back()
			} else {
				message.error(res.errors?.[0] || res.message || '密码修改失败')
			}
		} catch (error) {
			message.error('密码修改失败：' + error.message)
		} finally {
			submitting.value = false
		}
	}
</script>

<style scoped>
	:deep(.ant-form-item-label > label) {
		font-weight: 500;
		color: #374151;
	}

	:deep(.ant-input-password) {
		border-radius: 0.5rem;
		transition: all 0.3s ease;
	}

	:deep(.ant-input-password:hover) {
		border-color: #f9a8d4 !important;
	}

	:deep(.ant-input-password-focused) {
		border-color: #ec4899 !important;
		box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.1) !important;
	}

	:deep(.ant-form-item-explain-error) {
		color: #f43f5e;
		margin-top: 0.25rem;
		font-size: 0.875rem;
	}
</style>
