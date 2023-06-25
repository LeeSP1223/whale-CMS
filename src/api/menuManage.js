import request from '@/utils/request'

export default {
  getAllMenuList() {
    return request({
      url: '/menu',
      method: 'get'
    })
  }
}
