import request from '../../request'

export default {
	// 获取首页表格数据
	getAdminTableData() {
		return request({
			url: '/adminHome/getTableData',
			method: 'get',
			mock: true,
		})
	},
}
