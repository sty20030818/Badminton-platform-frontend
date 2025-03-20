import request from '../../request'

export default {
    // 获取活动列表
    getEventList(params) {
        return request({
            url: '/admin/events',
            method: 'get',
            params,
            mock: false
        })
    },

    // 新增活动
    addEvent(data) {
        return request({
            url: '/admin/events',
            method: 'post',
            data,
            mock: false
        })
    },

    // 编辑活动
    updateEvent(id, data) {
        return request({
            url: `/admin/events/${id}`,
            method: 'put',
            data,
            mock: false
        })
    },

    // 删除活动
    deleteEvent(id) {
        return request({
            url: `/admin/events/${id}`,
            method: 'delete',
            mock: false
        })
    }
}
