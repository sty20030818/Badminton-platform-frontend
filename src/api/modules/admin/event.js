import request from '../../request'

export default {
	// 获取活动列表
	getAdminEventList(params) {
		return request({
			url: '/admin/events',
			method: 'get',
			params,
			mock: false,
		})
	},

	// 新增活动
	addAdminEvent(data) {
		return request({
			url: '/admin/events',
			method: 'post',
			data,
			mock: false,
		})
	},

	// 编辑活动
	updateAdminEvent(id, data) {
		return request({
			url: `/admin/events/${id}`,
			method: 'put',
			data,
			mock: false,
		})
	},

	// 删除活动
	deleteAdminEvent(id) {
		return request({
			url: `/admin/events/${id}`,
			method: 'delete',
			mock: false,
		})
	},
}
