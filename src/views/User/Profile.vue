<template>
	<div class="min-h-screen bg-gray-50 py-12">
		<div class="px-8">
			<div class="max-w-[2000px] mx-auto bg-white rounded-2xl shadow-xl">
				<!-- 页面头部 -->
				<div class="p-8 border-b border-gray-100">
					<div class="flex items-center justify-between">
						<h1 class="text-3xl font-bold text-gray-800 flex items-center">
							<span class="text-pink-500 mr-3 flex items-center">
								<UserOutlined class="text-2xl" />
							</span>
							个人中心
						</h1>
						<div class="flex items-center space-x-6">
							<div class="text-gray-500 flex items-center">
								<StarOutlined class="text-pink-500 mr-2" />
								信用分：
								<span class="text-pink-500 font-semibold text-xl">
									{{ userInfo.creditScore }}
								</span>
							</div>
							<div class="text-gray-500 flex items-center">
								<CrownOutlined class="text-pink-500 mr-2" />
								等级：
								<span class="text-pink-500 font-semibold text-xl">
									{{ userInfo.level }}
								</span>
							</div>
						</div>
					</div>
					<p class="mt-2 text-gray-500">查看和管理您的个人信息</p>
				</div>

				<!-- 页面内容 -->
				<div class="p-8">
					<div class="grid grid-cols-2 gap-8">
						<!-- 左列 -->
						<div class="space-y-8">
							<!-- 基本信息卡片 -->
							<div class="bg-gray-50 rounded-2xl p-10 space-y-8">
								<div class="flex items-center justify-between">
									<h2 class="text-2xl font-semibold text-gray-700 flex items-center">
										<InfoCircleOutlined class="text-pink-500 mr-3 text-2xl" />
										基本信息
									</h2>
									<a-button
										type="primary"
										@click="router.push('/profile/edit')"
										class="text-pink-500 hover:text-pink-600"
										size="large"
									>
										<div class="flex items-center text-lg">
											<EditOutlined class="mr-2" />
											编辑
										</div>
									</a-button>
								</div>

								<div class="flex items-center space-x-12">
									<!-- 头像 -->
									<div
										class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
									>
										<img
											v-if="userInfo.avatar"
											:src="`/src/assets/images/avatars/${userInfo.avatar}.png`"
											alt="用户头像"
											class="w-full h-full object-cover"
										/>
										<UserOutlined
											v-else
											class="text-6xl text-gray-400"
										/>
									</div>

									<!-- 用户基本信息 -->
									<div class="flex-1">
										<div class="flex items-center space-x-4">
											<h3 class="text-2xl font-semibold text-gray-800">
												{{ userInfo.nickname || userInfo.username }}
											</h3>
											<a-tag
												:color="
													userInfo.gender === 0
														? 'blue'
														: userInfo.gender === 1
															? 'pink'
															: 'default'
												"
												class="text-base px-4 py-1"
											>
												{{
													userInfo.gender === 0
														? '男'
														: userInfo.gender === 1
															? '女'
															: '未知'
												}}
											</a-tag>
										</div>
										<div class="mt-3 text-gray-500 text-lg">
											{{ userInfo.introduce || '这个人很懒，什么都没写~' }}
										</div>
									</div>

									<!-- 球技等级 -->
									<div class="flex flex-col items-center space-y-3">
										<span class="text-gray-600 text-base font-medium">球技等级</span>
										<Stars
											v-model="userInfo.level"
											disabled
										/>
									</div>
								</div>

								<div class="grid grid-cols-2 gap-6">
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">个人简介</p>
										<p class="text-lg text-gray-900">
											{{ userInfo.introduce || '这个人很懒，什么都没写~' }}
										</p>
									</div>
								</div>
							</div>

							<!-- 联系方式卡片 -->
							<div class="bg-gray-50 rounded-2xl p-10 space-y-8">
								<h2 class="text-2xl font-semibold text-gray-700 flex items-center">
									<PhoneOutlined class="text-pink-500 mr-3 text-2xl" />
									联系方式
								</h2>

								<div class="grid grid-cols-2 gap-6">
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">邮箱</p>
										<p class="text-lg text-gray-900">{{ userInfo.email }}</p>
									</div>
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">手机号</p>
										<p class="text-lg text-gray-900">{{ userInfo.phone }}</p>
									</div>
								</div>
							</div>
						</div>

						<!-- 右列 -->
						<div class="space-y-8">
							<!-- 账号信息卡片 -->
							<div class="bg-gray-50 rounded-2xl p-10 space-y-8">
								<div class="flex items-center justify-between">
									<h2 class="text-2xl font-semibold text-gray-700 flex items-center">
										<SafetyCertificateOutlined class="text-pink-500 mr-3 text-2xl" />
										账号信息
									</h2>
									<a-button
										type="primary"
										@click="router.push('/profile/password')"
										class="text-pink-500 hover:text-pink-600"
										size="large"
										danger
									>
										<div class="flex items-center text-lg">
											<LockOutlined class="mr-2" />
											修改密码
										</div>
									</a-button>
								</div>

								<div class="grid grid-cols-2 gap-6">
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">用户等级</p>
										<p class="text-lg text-gray-900">{{ userInfo.level }}</p>
									</div>
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">信用分</p>
										<p class="text-lg text-gray-900">{{ userInfo.creditScore }}</p>
									</div>
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">注册时间</p>
										<p class="text-lg text-gray-900">
											{{ formatDate(userInfo.createdAt) }}
										</p>
									</div>
									<div class="bg-white rounded-xl p-6">
										<p class="text-base text-gray-500 mb-2">最后更新</p>
										<p class="text-lg text-gray-900">
											{{ formatDate(userInfo.updatedAt) }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRouter } from 'vue-router'
	import {
		UserOutlined,
		InfoCircleOutlined,
		PhoneOutlined,
		SafetyCertificateOutlined,
		EditOutlined,
		LockOutlined,
		StarOutlined,
		CrownOutlined,
	} from '@ant-design/icons-vue'
	import userApi from '@/api/modules/user/user'
	import Stars from '@/components/Stars.vue'

	const router = useRouter()
	const userInfo = ref({
		username: '',
		nickname: '',
		email: '',
		phone: '',
		gender: 1,
		avatar: '',
		introduce: '',
		level: 0,
		creditScore: 0,
		createdAt: '',
		updatedAt: '',
	})

	// 获取用户信息
	const getUserInfo = async () => {
		try {
			const res = await userApi.getUser()
			if (res.status && res.data.user) {
				userInfo.value = res.data.user
			}
		} catch (error) {
			console.error('获取用户信息失败:', error)
		}
	}

	// 格式化日期
	const formatDate = (date) => {
		if (!date) return ''
		return new Date(date).toLocaleString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	onMounted(() => {
		getUserInfo()
	})
</script>

<style scoped>
	:deep(.ant-btn-link) {
		padding: 0;
		height: auto;
	}

	:deep(.ant-btn-link:hover) {
		background: transparent;
	}
</style>
