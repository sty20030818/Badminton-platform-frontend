import request from '../../request'

export default {
	// 登录
	login(data) {
		return request({
			url: '/auth/login',
			method: 'post',
			data,
			mock: false,
		})
	},
	// 注册
	register(data) {
		return request({
			url: '/auth/register',
			method: 'post',
			data,
			mock: false,
		})
	},
}
