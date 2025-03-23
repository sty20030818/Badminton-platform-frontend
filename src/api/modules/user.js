import request from '../request'

export default {
	// 获取当前用户信息
	getUser() {
		return request({
			url: '/user',
			method: 'get',
			mock: false,
		})
	},
	// 更新当前用户信息
	updateUser(data) {
		return request({
			url: '/user',
			method: 'put',
			data,
			mock: false,
		})
	},
	// 删除当前用户
	deleteUser() {
		return request({
			url: '/user',
			method: 'delete',
			mock: false,
		})
	},
}
