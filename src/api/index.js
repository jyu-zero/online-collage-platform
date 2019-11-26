import user from './user'
import goods from './goods'
import file from './file'
import news from './news'
import notification from './notification'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'
import question from './question'

export const userApi = user

export const goodsApi = goods

export const testApi = { test: '/test' }

export const questionApi = question

export const notificationApi = notification

export const responseHandler = _responseHandler

export const prefix = apiPrefix

export const newsApi = news

export const fileApi = file
