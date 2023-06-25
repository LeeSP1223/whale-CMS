import request from '@/utils/request'

export default {
  getUserList(searchList) {
    return request({
      url: '/user/list',
      method: 'get',
      params: {
        pageNo: searchList.pageNo,
        pageSize: searchList.pageSize,
        username: searchList.username,
        phone: searchList.phone
      }
    })
  },
  addUser(user) {
    return request({
      url: '/user',
      method: 'post',
      data: user
    })
  },
  getUserById(id) {
    return request({
      url: `/user/${id}`,
      method: 'get'
    })
  },
  updateUser(user) {
    return request({
      url: '/user',
      method: 'put',
      data: user
    })
  },
  saveUser(user) {
    if (user.id == null && user.id === undefined) {
      return this.addUser(user)
    }
    return this.updateUser(user)
  },
  deleteUserById(id) {
    return request({
      url: `/user/${id}`,
      method: 'delete'
    })
  }
}
