import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

//*制定路由规则
const routes = [
	{
		path: '/',
		name: 'Index',
		redirect: '/home',
		component: () => import('@/views/Index.vue'),
		meta: { auth: true },
		children: [
			{
				path: 'home',
				name: 'Home',
				component: () => import('@/views/Home/Home.vue'),
				meta: { title: '羽你同乐 • 首页' },
			},
			{
				path: 'event',
				name: 'Event',
				component: () => import('@/views/Event/Event.vue'),
				meta: { title: '羽你同乐 • 活动' },
			},
			{
				path: 'event/create',
				name: 'EventCreate',
				component: () => import('@/views/Event/EventCreate.vue'),
				meta: { title: '羽你同乐 • 创建活动' },
			},
			{
				path: 'event/:id',
				name: 'EventDetail',
				component: () => import('@/views/Event/EventDetail.vue'),
				meta: { title: '羽你同乐 • 活动详情' },
			},
			{
				path: 'event/:id/edit',
				name: 'EventEdit',
				component: () => import('@/views/Event/EventEdit.vue'),
				meta: { title: '羽你同乐 • 编辑活动' },
			},
			{
				path: 'venue',
				name: 'Venue',
				component: () => import('@/views/Venue/Venue.vue'),
				meta: { title: '羽你同乐 • 场地' },
			},
			{
				path: 'venue/:id',
				name: 'VenueDetail',
				component: () => import('@/views/Venue/VenueDetail.vue'),
				meta: { title: '羽你同乐 • 场馆详情' },
			},
			{
				path: 'profile',
				name: 'Profile',
				component: () => import('@/views/User/Profile.vue'),
				meta: { title: '羽你同乐 • 个人中心' },
			},
			{
				path: 'profile/edit',
				name: 'ProfileEdit',
				component: () => import('@/views/User/ProfileEdit.vue'),
				meta: { title: '羽你同乐 • 编辑个人信息' },
			},
			{
				path: 'profile/password',
				name: 'ChangePassword',
				component: () => import('@/views/User/ChangePassword.vue'),
				meta: { title: '羽你同乐 • 修改密码' },
			},
			// {
			// 	path: 'race',
			// 	name: 'Race',
			// 	component: () => import('@/views/Race.vue'),
			// 	meta: { title: '羽你同乐 • 赛事' },
			// },
			// {
			// 	path: 'about',
			// 	name: 'About',
			// 	component: () => import('@/views/About.vue'),
			// 	meta: { title: '羽你同乐 • 关于我们' },
			// },
		],
	},
	{
		path: '/admin',
		name: 'Admin',
		redirect: '/admin/home',
		component: () => import('@/views/Admin/Admin.vue'),
		meta: { auth: true },
		children: [
			{
				path: 'home',
				name: 'Admin-Home',
				component: () => import('@/views/Admin/Home.vue'),
				meta: { title: '羽你同乐 • 管理后台' },
			},
			{
				path: 'users',
				name: 'Admin-Users',
				component: () => import('@/views/Admin/Users.vue'),
				meta: { title: '羽你同乐 • 用户管理' },
			},
			{
				path: 'events',
				name: 'Admin-Events',
				component: () => import('../views/Admin/Events.vue'),
				meta: { title: '羽你同乐 • 活动管理' },
			},
			{
				path: 'groups',
				name: 'Admin-Groups',
				component: () => import('../views/Admin/Groups.vue'),
				meta: { title: '羽你同乐 • 群组管理' },
			},
			{
				path: 'venues',
				name: 'Admin-Venues',
				component: () => import('../views/Admin/Venues.vue'),
				meta: { title: '羽你同乐 • 场馆管理' },
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login/Login.vue'),
		meta: { auth: false, title: '羽你同乐 • 登录' },
	},
	{
		path: '/:catchAll(.*)', //* 捕获所有未匹配的路由
		name: 'NotFound',
		component: () => import('@/views/System/NotFound.vue'),
		meta: { auth: false, title: '羽你同乐 • 404' },
	},
	{
		path: '/403',
		name: '403',
		component: () => import('@/views/System/Forbidden.vue'),
		meta: { auth: false, title: '羽你同乐 • 403' },
	},
	{
		path: '/404', // 捕获所有未匹配的路由
		name: '404',
		component: () => import('@/views/System/NotFound.vue'),
		meta: { auth: false, title: '羽你同乐 • 404' },
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/views/System/InternalServerError.vue'),
		meta: { auth: false, title: '羽你同乐 • 500' },
	},
]

const router = createRouter({
	//*设置路由模式
	history: createWebHashHistory(),
	routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()
	const token = authStore.getToken()
	// 设置页面标题
	const { title } = to.meta
	if (title) {
		document.title = title
	}

	// 如果路由需要认证
	if (to.meta.auth) {
		// 如果没有token，重定向到登录页
		if (!token) {
			next('/login')
		} else {
			next()
		}
	} else {
		// 如果路由不需要认证，直接放行
		next()
	}
})

export default router
