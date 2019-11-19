import user from './user'
import goods from './goods'
import news from './news'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'
import question from './question'

export const userApi = user

export const goodsApi = goods

export const newsApi = news

export const testApi = { test: '/test' }

export const questionApi = question

export const responseHandler = _responseHandler

export const prefix = apiPrefix
