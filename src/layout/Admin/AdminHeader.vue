<template>
	<a-layout-header class="ant-header">
		<a-space size="middle">
			<a-button
				type="text"
				:icon="h(MenuOutlined)"
				@click="toggleCollapse"
			/>
			<a-button
				type="text"
				:icon="h(ReloadOutlined)"
				@click="reloadPage"
			/>

			<!-- <a-breadcrumb :routes="routes" separator=">">
                <template #itemRender="{ route, paths }">
                    <span v-if="routes.indexOf(route) === routes.length - 1">
                    {{ route.breadcrumbName }}
                    </span>

                    <router-link v-else :to="`${basePath}/${paths.join('/')}`">
                    {{ route.breadcrumbName }}
                    </router-link>
                </template>
            </a-breadcrumb> -->

			<a-breadcrumb separator=">">
				<a-breadcrumb-item href="/">
					<HomeOutlined />
					<span>首页</span>
				</a-breadcrumb-item>
				<a-breadcrumb-item href="/ApplicationList">
					<UserOutlined />
					<span>个人</span>
				</a-breadcrumb-item>
				<a-breadcrumb-item>
					<span>工作台</span>
				</a-breadcrumb-item>
			</a-breadcrumb>
		</a-space>

		<a-space class="r-content">
			<a-dropdown
				placement="topRight"
				:arrow="{ pointAtCenter: true }"
				:overlay-style="{ width: '270px' }"
			>
				<a-badge>
					<a-avatar
						size="large"
						:src="getImageUrl('user')"
					/>
				</a-badge>

				<template #overlay>
					<a-menu>
						<a-menu-item>
							<a-space size="middle">
								<a-avatar
									size="large"
									:src="getImageUrl('user')"
								/>

								<a-space
									direction="vertical"
									style="gap: 0"
								>
									<p>我叫石头鱼</p>
									<p style="color: #a4b0be">2985707459@qq.com</p>
								</a-space>
							</a-space>
						</a-menu-item>
						<a-menu-divider />

						<a-menu-item
							key="personal"
							@click="handlePersonal"
						>
							<div class="flex items-center gap-2">
								<UserOutlined />
								<span>个人中心</span>
							</div>
						</a-menu-item>
						<a-menu-divider />

						<a-menu-item
							key="home"
							@click="handleHome"
						>
							<div class="flex items-center gap-2">
								<HomeOutlined />
								<span>首页</span>
							</div>
						</a-menu-item>
						<a-menu-item
							key="document"
							@click="handleDocument"
						>
							<div class="flex items-center gap-2">
								<ReadOutlined />
								<span>文档</span>
							</div>
						</a-menu-item>
						<a-menu-item
							key="github"
							@click="handleGithub"
						>
							<div class="flex items-center gap-2">
								<GithubOutlined />
								<span>Github</span>
							</div>
						</a-menu-item>
						<a-menu-divider />

						<a-menu-item
							key="logout"
							@click="handleLogout"
						>
							<div class="flex items-center gap-2">
								<LogoutOutlined />
								<span>退出登录</span>
							</div>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</a-space>
	</a-layout-header>
</template>

<script setup>
	import { h, ref } from 'vue'
	import { useAllDataStore } from '@/stores'
	import {
		MenuOutlined,
		ReloadOutlined,
		UserOutlined,
		ReadOutlined,
		GithubOutlined,
		LogoutOutlined,
		HomeOutlined,
	} from '@ant-design/icons-vue'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '@/stores/auth'
	import { message } from 'ant-design-vue'

	const store = useAllDataStore()
	const router = useRouter()
	const authStore = useAuthStore()

	const toggleCollapse = () => {
		store.state.isCollapse = !store.state.isCollapse
	}
	const reloadPage = () => {
		window.location.reload()
	}
	const getImageUrl = (user) => {
		return new URL(`../../assets/images/avatars/${user}.png`, import.meta.url).href
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

	const handleHome = () => {
		router.push('/')
	}

	const handleLogout = () => {
		authStore.clearToken()
		message.success('已退出登录')
		// router.push('/login')
		router.push('/')
	}

	const basePath = ''
	const routes = ref([
		{
			path: 'home',
			breadcrumbName: 'home',
		},
		{
			path: 'first',
			breadcrumbName: 'first',
			children: [
				{
					path: '/general',
					breadcrumbName: 'General',
				},
				{
					path: '/layout',
					breadcrumbName: 'Layout',
				},
			],
		},
		{
			path: 'second',
			breadcrumbName: 'second',
		},
	])
</script>

<style scoped>
	.ant-header {
		height: 55px;
		line-height: 50px;
		background: #fff;
		padding-inline: 20px;
	}

	.r-content {
		float: right;
		display: flex;
		align-items: center;
	}
</style>
