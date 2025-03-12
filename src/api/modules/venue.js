import request from '../request'

export default {
    // 获取场馆列表
    getVenueList(params) {
        return request({
            url: '/admin/venues',
            method: 'get',
            params,
            mock: false
        })
    },

    // 新增场馆
    addVenue(data) {
        return request({
            url: '/admin/venues',
            method: 'post',
            data,
            mock: false
        })
    },

    // 编辑场馆
    updateVenue(id, data) {
        return request({
            url: `/admin/venues/${id}`,
            method: 'put',
            data,
            mock: false
        })
    },

    // 删除场馆
    deleteVenue(id) {
        return request({
            url: `/admin/venues/${id}`,
            method: 'delete',
            mock: false
        })
    }
}
