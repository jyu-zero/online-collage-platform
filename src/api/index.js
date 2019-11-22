import user from './user'
import goods from './goods'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'
import question from './question'
import news from './news'

export const userApi = user

export const goodsApi = goods

export const testApi = { test: '/test' }

export const questionApi = question

export const responseHandler = _responseHandler

export const prefix = apiPrefix

export const newsApi = news
