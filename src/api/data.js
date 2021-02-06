import request from '@/utils/request'
import qs from 'qs'

export function initData(url, params, method) {
  if (method === "post") {
    return request({
      url: url,
      method: 'post',
      data: params
    })
  } else {
    return request({
      url: url + '?' + qs.stringify(params, { indices: false }),
      method: 'get'
    })
  }
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}
