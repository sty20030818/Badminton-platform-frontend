<template>
	<a-layout-header class="layoutHeader flex justify-between items-center px-16 py-5 h-20">
		<router-link
			to="/"
			class="flex items-center gap-2.5 cursor-pointer"
		>
			<img
				src="@/assets/images/logo.png"
				alt="Badminton"
				class="h-10"
			/>
			<span class="text-2xl font-bold text-blue-500">羽你同乐</span>
			<!-- <span
				v-if="store.state.currentPage"
				class="text-lg text-gray-500 ml-4"
			>
				• {{ store.state.currentPage }}
			</span> -->
		</router-link>
		<nav class="flex-1 flex justify-center items-center">
			<div class="flex items-center gap-12">
				<router-link
					to="/"
					class="nav-item"
					:class="{
						'text-pink-500 !font-bold !text-2xl': store.state.currentPage === 'home',
					}"
				>
					首页
				</router-link>
				<router-link
					to="/event"
					class="nav-item"
					:class="{
						'text-pink-500 !font-bold !text-2xl': store.state.currentPage === 'event',
					}"
				>
					活动预约
				</router-link>
				<router-link
					to="/venue"
					class="nav-item"
					:class="{
						'text-pink-500 !font-bold !text-2xl': store.state.currentPage === 'venue',
					}"
				>
					场地预约
				</router-link>
				<router-link
					to="/race"
					class="nav-item"
					:class="{
						'text-pink-500 !font-bold !text-2xl': store.state.currentPage === 'race',
					}"
				>
					赛事活动
				</router-link>
				<router-link
					to="/about"
					class="nav-item"
					:class="{
						'text-pink-500 !font-bold !text-2xl': store.state.currentPage === 'about',
					}"
				>
					关于我们
				</router-link>
				<a-dropdown>
					<a-button
						type="primary"
						size="large"
						shape="round"
						class="event-btn"
						@click="handleCreateEvent"
					>
						创建活动
						<DownOutlined class="ml-1" />
					</a-button>
					<template #overlay>
						<a-menu class="bg-white rounded-lg shadow-lg py-2">
							<a-menu-item
								@click="handleCreateEvent"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<PlusOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">创建活动</span>
								</div>
							</a-menu-item>
							<a-menu-item
								@click="handleCreateRace"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<TrophyOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">创建赛事</span>
								</div>
							</a-menu-item>
							<a-menu-item
								@click="handleCreateVenue"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<EnvironmentOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">创建场馆</span>
								</div>
							</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</div>
		</nav>

		<div class="mr-20">
			<template v-if="authStore.isAuthenticated">
				<a-dropdown
					placement="bottomRight"
					arrow
				>
					<div class="flex items-center gap-3 cursor-pointer">
						<span class="text-lg font-medium text-gray-500 mr-4">
							你好 , {{ userInfo?.user?.nickname }}
						</span>
						<a-avatar
							:size="52"
							:src="getImageUrl(userInfo?.user?.avatar)"
						/>
					</div>
					<template #overlay>
						<a-menu class="bg-white rounded-lg shadow-lg py-2">
							<a-menu-item class="px-6 py-3">
								<a-space size="middle">
									<a-avatar
										size="large"
										:src="getImageUrl(userInfo?.user?.avatar)"
										class="ring-3 ring-pink-100"
									/>

									<a-space
										direction="vertical"
										style="gap: 0"
									>
										<p class="text-gray-700 font-semibold text-lg">
											{{ userInfo?.user?.username }}
										</p>
										<p class="text-gray-500 text-base">{{ userInfo?.user?.email }}</p>
									</a-space>
								</a-space>
							</a-menu-item>
							<a-menu-divider />

							<a-menu-item
								key="personal"
								@click="handlePersonal"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<UserOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">个人中心</span>
								</div>
							</a-menu-item>
							<a-menu-divider />

							<a-menu-item
								key="admin"
								@click="handleAdmin"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<DashboardOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">管理后台</span>
								</div>
							</a-menu-item>
							<a-menu-item
								key="github"
								@click="handleGithub"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<GithubOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">Github</span>
								</div>
							</a-menu-item>
							<a-menu-divider />

							<a-menu-item
								key="logout"
								@click="handleLogout"
								class="px-6 py-2"
							>
								<div class="flex items-center">
									<LogoutOutlined class="text-gray-500 text-lg" />
									<span class="ml-2 text-gray-600 font-medium text-base">退出登录</span>
								</div>
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
	import { computed, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '@/stores/auth'
	import { useAllDataStore } from '@/stores'
	import {
		UserOutlined,
		LogoutOutlined,
		GithubOutlined,
		DashboardOutlined,
		DownOutlined,
		PlusOutlined,
		TrophyOutlined,
		EnvironmentOutlined,
	} from '@ant-design/icons-vue'
	import { message } from 'ant-design-vue'

	const router = useRouter()
	const authStore = useAuthStore()
	const store = useAllDataStore()
	const userInfo = computed(() => authStore.getUser())

	//* 监听当前页面的变化
	// watch(
	// 	() => store.state.currentPage,
	// 	(newPage) => {
	// 		console.log('Header 检测到页面变化:', newPage)
	// 	},
	// 	{ immediate: true },
	// )

	const getImageUrl = (user) => {
		return new URL(`../assets/images/avatars/${user}.png`, import.meta.url).href
	}

	const goToLogin = () => {
		router.push('/login')
	}

	const handlePersonal = () => {
		router.push('/personal')
	}

	const handleAdmin = () => {
		router.push('/admin')
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

	const handleCreateEvent = () => {
		router.push('/event/create')
	}

	const handleCreateRace = () => {
		router.push('/race/create')
	}

	const handleCreateVenue = () => {
		router.push('/venue/create')
	}
</script>

<style scoped>
	.nav-item {
		color: #333333b2;
		text-decoration: none;
		font-size: 22px;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	.nav-item:hover,
	.nav-item.text-pink-500 {
		color: #ff7eb3 !important;
		transform: translateY(-1px);
	}

	.event-btn {
		background: #ff7eb3;
		border: none;
		padding: 8px 24px;
		height: auto;
		font-size: 18px;
		font-weight: 600;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		letter-spacing: 0.5px;
	}

	.event-btn:hover {
		background: #ff6b9e;
		transform: translateY(2px);
		box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.25);
	}

	.register-btn {
		background: #ff7eb3;
		border: none;
		padding: 8px 24px;
		height: auto;
		font-size: 18px;
		font-weight: 600;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		letter-spacing: 0.5px;
	}

	.register-btn:hover {
		background: #ff6b9e;
		transform: translateY(2px);
		box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.25);
	}

	:deep(.ant-layout-header) {
		padding: 0;
	}

	:deep(.ant-avatar) {
		transition: transform 0.3s ease;
	}

	:deep(.ant-dropdown-trigger:hover .ant-avatar) {
		transform: scale(1.15);
	}

	:deep(.ant-menu-item:hover) {
		background: #fff5f8;
	}

	:deep(.ant-dropdown-trigger) {
		display: flex;
		align-items: center;
	}

	:deep(.ant-menu-item) {
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
