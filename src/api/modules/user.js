import request from '../request'

export default {
    // 获取用户列表
    getUserList(params) {
        return request({
            url: '/admin/users',
            method: 'get',
            params,
            mock: false
        })
    },

    // 新增用户
    addUser(data) {
        return request({
            url: '/admin/users',
            method: 'post',
            data,
            mock: false
        })
    },

    // 编辑用户
    updateUser(id, data) {
        return request({
            url: `/admin/users/${id}`,
            method: 'put',
            data,
            mock: false
        })
    },

    // 删除用户
    deleteUser(id) {
        return request({
            url: `/admin/users/${id}`,
            method: 'delete',
            mock: false
        })
    }
}
