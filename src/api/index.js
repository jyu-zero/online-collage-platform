import user from './user'
import goods from './goods'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'

export const userApi = user

export const goodsApi = goods

export const testApi = { test: '/test' }

export const responseHandler = _responseHandler

export const prefix = apiPrefix
