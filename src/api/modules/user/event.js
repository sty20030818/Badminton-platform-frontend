import request from '../../request'

export default {
	// 获取活动列表
	getEventList(params) {
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

	// 报名参加活动
	joinEvent(id) {
		return request({
			url: `/events/${id}/join`,
			method: 'post',
			mock: false,
		})
	},

	// 取消报名
	cancelJoin(id) {
		return request({
			url: `/events/${id}/cancel`,
			method: 'post',
			mock: false,
		})
	},
}
