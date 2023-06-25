import request from '@/utils/request'

export default {
  getRoleList(searchList) {
    return request({
      url: '/role/list',
      method: 'get',
      params: {
        pageNo: searchList.pageNo,
        pageSize: searchList.pageSize,
        roleName: searchList.roleName
      }
    })
  },
  addRole(role) {
    return request({
      url: '/role',
      method: 'post',
      data: role
    })
  },
  getRoleById(roleId) {
    return request({
      url: `/role/${roleId}`,
      method: 'get'
    })
  },
  updateRole(role) {
    return request({
      url: '/role',
      method: 'put',
      data: role
    })
  },
  saveRole(role) {
    if (role.roleId == null && role.roleId === undefined) {
      return this.addRole(role)
    }
    return this.updateRole(role)
  },
  deleteRoleById(roleId) {
    return request({
      url: `/role/${roleId}`,
      method: 'delete'
    })
  },
  getAllRoleList() {
    return request({
      url: '/role/all',
      method: 'get'
    })
  }
}
