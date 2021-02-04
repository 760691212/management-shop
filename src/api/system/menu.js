import request from '@/utils/request'

export function getMenusAll() {
  return request({
    url: 'api/menus/list',
    method: 'get'
  })
}
export default {
  getMenusAll
}