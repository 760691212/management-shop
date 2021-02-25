import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    responseType: 'blob',
    url: 'api/auth/login/getCaptcha',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}
