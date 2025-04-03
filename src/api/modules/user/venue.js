import request from '../../request'

export default {
	// 获取场馆列表
	getVenueList(params) {
		return request({
			url: '/venues',
			method: 'get',
			params,
			mock: false,
		})
	},

	// 获取场馆详情
	getVenueDetail(id) {
		return request({
			url: `/venues/${id}`,
			method: 'get',
			mock: false,
		})
	},

	//创建场馆
	createVenue(data) {
		return request({
			url: '/venues',
			method: 'post',
			data,
			mock: false,
		})
	},

	// 修改场馆
	updateVenue(id, data) {
		return request({
			url: `/venues/${id}`,
			method: 'put',
			data,
			mock: false,
		})
	},

	// 删除场馆
	deleteVenue(id) {
		return request({
			url: `/venues/${id}`,
			method: 'delete',
			mock: false,
		})
	},
}
