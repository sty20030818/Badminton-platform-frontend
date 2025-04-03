import request from '../../request'

export default {
	// 获取活动列表
	getEventList(params) {
		// console.log('API 请求参数:', params)
		return request({
			url: '/events',
			method: 'get',
			params,
			mock: false,
		})
	},

	// 获取活动详情
	getEventDetail(id) {
		return request({
			url: `/events/${id}`,
			method: 'get',
			mock: false,
		})
	},

	//创建活动
	createEvent(data) {
		return request({
			url: '/events',
			method: 'post',
			data,
			mock: false,
		})
	},

	// 修改活动
	updateEvent(id, data) {
		return request({
			url: `/events/${id}`,
			method: 'put',
			data,
			mock: false,
		})
	},

	// 删除活动
	deleteEvent(id) {
		return request({
			url: `/events/${id}`,
			method: 'delete',
			mock: false,
		})
	},
}
