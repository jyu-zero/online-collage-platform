import user from './user'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'

export const userApi = {
    // 获取用户姓名
    getStudentName: '/getStudentName',
    login: '/login',
    logout: '/logout'
}

export const goodsApi = { getGoods: '/goods/display' }

export const testApi = { test: '/test' }

export const responseHandler = _responseHandler

export const prefix = apiPrefix
