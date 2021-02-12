import request from '@/utils/request'

export function query(data) {
  return request({
    url: 'api/system/menus/query',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/system/menus/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: 'api/system/menus/edit',
    method: 'put',
    data
  })
}
export function del(ids) {
  return request({
    url: 'api/system/menus/del',
    method: 'delete',
    data: ids
  })
}

export function findById(id){
   return request({
     url: 'api/system/menus/findById?pid=' + id,
     method: 'get',
   })
}

export function saveSvgIcon(data) {
  return request({
    url: 'api/system/menus/saveSvgIcon',
    method: 'post',
    data
  })
}
export default {
  add, edit, del, query, findById, saveSvgIcon
}