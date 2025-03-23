import request from '../request'

export default {
	// 登录
	signIn(data) {
		return request({
			url: '/auth/sign_in',
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
