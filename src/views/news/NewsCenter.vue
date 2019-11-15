<template>
    <div class="index">
        <div class="up">
            <span @click="toHomePage">主页</span>
            <span class="a">></span>
            <span>新闻中心</span>
        </div>

        <h1>新闻中心</h1>
        
        <div class="news">
            <div class="title">
                 <div class="question-item" v-for="news of newsList" :key="news.id">
                    <span class="content">{{news.title}}</span>
                    <span class="time">{{news.created_at}}</span>
                </div>
            </div>

            <div class="amount">
                <div class="news-item" v-for="news of newsList" :key="news.id">
                    <span class="amount">{{news.amount}}</span>
                </div>
            </div>
        </div>
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getNews"
                :page-count="pageCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Pagination, Message } from 'element-ui'
export default {
    name: 'News',
    components: {
        [Pagination.name]: Pagination,
        [Message.name]: Message
    },
    getNewList(page = 1){
        this.$axios.get(prefix.api + newsApi.getNewList).then((response)=>{
            if(!responseHandler(response.data, this)){
                // 在这里处理错误
                Message.error('请求失败')
            }
            Message.success('请求成功')
        })
    }
}
</script>
<style lang="less">
    .index{
        width: 1300px;
        height: 850px;
        // border: 1px solid rgb(0, 0, 0);
        margin-left: 250px;
        margin-top: 30px;
    }
    .up{
        width: 1300px;
        height: 25px;
        display: flex;
        font-size: 20px;
        // border: 1px solid rgb(0, 0, 0);
    }
    .a{
        width: 30px;
        height: 100%;
        text-align: center;
        // border: 1px solid rgb(0, 0, 0);
    }
    .news{
        width: 1300px;
        height: 300px;
        // border: 1px solid rgb(0, 0, 0);
        display: flex;
    }
    .title{
        width: 1200px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
        font-size: 20px;
    }
    .amount{
        width: 100px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
        font-size: 20px;
    }
</style>
