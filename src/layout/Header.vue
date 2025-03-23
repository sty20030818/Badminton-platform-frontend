<template>
	<a-layout-header
		class="flex justify-between items-center px-16 py-5 bg-transparent h-20"
	>
		<div class="flex items-center gap-2.5">
			<img
				src="@/assets/images/logo.png"
				alt="Badminton"
				class="h-10"
			/>
			<span class="text-2xl font-bold text-blue-500">羽你同乐</span>
		</div>
		<div class="flex justify-center items-center gap-10">
			<a
				href="#"
				class="nav-item"
			>
				活动预约
			</a>
			<a
				href="#"
				class="nav-item"
			>
				场地预约
			</a>
			<a
				href="#"
				class="nav-item"
			>
				赛事活动
			</a>
			<a
				href="#"
				class="nav-item"
			>
				关于我们
			</a>
		</div>

		<div class="mr-20">
			<template v-if="authStore.isAuthenticated">
				<a-dropdown>
					<div class="flex items-center gap-3 cursor-pointer">
						<span class="text-lg font-medium text-gray-500 mr-4">
							你好 , {{ userInfo?.user?.username }}
						</span>
						<a-avatar
							:size="52"
							:src="getImageUrl(userInfo?.user?.avatar)"
						/>
					</div>
					<template #overlay>
						<a-menu>
							<a-menu-item>
								<a-space size="middle">
									<a-avatar
										size="large"
										:src="getImageUrl(userInfo?.user?.avatar)"
									/>

									<a-space
										direction="vertical"
										style="gap: 0"
									>
										<p>{{ userInfo?.user?.username }}</p>
										<p style="color: #a4b0be">{{ userInfo?.user?.email }}</p>
									</a-space>
								</a-space>
							</a-menu-item>
							<a-menu-divider />

							<a-menu-item
								key="personal"
								@click="handlePersonal"
							>
								<UserOutlined />
								<span class="ml-2">个人中心</span>
							</a-menu-item>
							<a-menu-divider />

							<a-menu-item
								key="document"
								@click="handleDocument"
							>
								<ReadOutlined />
								<span class="ml-2">文档</span>
							</a-menu-item>
							<a-menu-item
								key="github"
								@click="handleGithub"
							>
								<GithubOutlined />
								<span class="ml-2">Github</span>
							</a-menu-item>
							<a-menu-divider />

							<a-menu-item
								key="logout"
								@click="handleLogout"
							>
								<LogoutOutlined />
								<span class="ml-2">退出登录</span>
							</a-menu-item>
						</a-menu>
					</template>
					<!-- <template #overlay>
						<a-menu>
							<a-menu-item key="profile">
								<user-outlined />
								<span>个人中心</span>
							</a-menu-item>
							<a-menu-item key="settings">
								<setting-outlined />
								<span>设置</span>
							</a-menu-item>
							<a-menu-divider />
							<a-menu-item
								key="logout"
								@click="handleLogout"
							>
								<logout-outlined />
								<span>退出登录</span>
							</a-menu-item>
						</a-menu>
					</template> -->
				</a-dropdown>
			</template>
			<a-button
				v-else
				type="primary"
				class="register-btn"
				shape="round"
				size="large"
				@click="goToLogin"
			>
				登录
			</a-button>
		</div>
	</a-layout-header>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '@/stores/auth'
	import {
		UserOutlined,
		LogoutOutlined,
		GithubOutlined,
		ReadOutlined,
	} from '@ant-design/icons-vue'
	import { message } from 'ant-design-vue'

	const router = useRouter()
	const authStore = useAuthStore()
	const userInfo = computed(() => authStore.getUser())

	const getImageUrl = (user) => {
		return new URL(`../assets/images/avatars/${user}.png`, import.meta.url).href
	}

	const goToLogin = () => {
		router.push('/login')
	}

	const handlePersonal = () => {
		router.push('/personal')
	}

	const handleDocument = () => {
		window.open('https://www.baidu.com', '_blank')
	}

	const handleGithub = () => {
		window.open('https://www.baidu.com', '_blank')
	}

	const handleLogout = () => {
		authStore.clearToken()
		message.success('已退出登录')
		// router.push('/login')
		router.push('/')
	}
</script>

<style scoped>
	.nav-item {
		color: #333333b2;
		text-decoration: none;
		font-size: 22px;
		font-weight: 500;
		transition: color 0.3s;
	}

	.nav-item:hover {
		color: #ff7eb3;
	}

	.register-btn {
		background: #ff7eb3;
		border: none;
		padding: 8px 24px;
		height: auto;
		font-size: 18px;
		font-weight: 500;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
	}

	.register-btn:hover {
		background: #ff6b9e;
	}

	:deep(.ant-avatar) {
		/* background: #ff7eb3; */
		transition: transform 0.3s ease;
	}

	:deep(.ant-dropdown-trigger:hover .ant-avatar) {
		transform: scale(1.15);
	}

	:deep(.ant-menu-item) {
		/* padding: 12px 20px; */
	}

	:deep(.ant-menu-item .anticon) {
		margin-right: 10px;
	}

	:deep(.ant-menu-item:hover) {
		background: #fff5f8;
	}
</style>
