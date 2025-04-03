import request from '../../request'

export default {
	// 获取小组详情
	getGroupDetail(id) {
		return request({
			url: `/groups/${id}`,
			method: 'get',
			mock: false,
		})
	},

	//创建小组
	createGroup(data) {
		return request({
			url: '/groups',
			method: 'post',
			data,
			mock: false,
		})
	},

	// 加入/退出小组
	joinGroup(id) {
		return request({
			url: `/groups/${id}/join`,
			method: 'post',
			mock: false,
		})
	},
}
