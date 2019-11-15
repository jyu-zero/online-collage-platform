<template>
    <div class="index">
        <div class="up">
            <span @click="toHomePage">主页</span>
            <span class="a">></span>
            <span @click="toIndex">新闻中心</span>
            <span class="a">></span>
            <span>新闻页面</span>
        </div>

        <div class="news">
            <span class="title">{{news.news_title}}</span>
            <span class="created_at">{{news.created_at}}</span>
            <span>{{news.author}}</span>
            <div class="block"></div>
            <span>{{news.news_content}}</span>
            <p>附件：</p>
            <div><i class="el-icon-document-remove"></i>{{storage_path}}</div>
            <div class="block"></div>
            <div>{{pre}}</div>
            <div>{{next}}</div>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Message } from 'element-ui'
export default {
    name: 'Detail',
    components: {
        [Message.name]: Message
    },
    methods: {
        toHomePage(){
            console.log('跳转至主页')
            this.$router.push({ name: 'HomePage' })
        },
        toIndex(){
            console.log('跳转至新闻中心')
            this.$router.push({ name: 'News' })
        },
        getNewDetail(){
            this.$axios.get(prefix.api + newsApi.getNewDetail).then(response => {
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
            })
        }
    }
}
</script>
<style lang="less">
    .index{
        width: 1300px;
        height: 800px;
        margin-left: 250px;
        margin-top: 30px;
    }
    .up{
        width: 1300px;
        height: 25px;
        display: flex;
        font-size: 20px;
    }
    .a{
        width: 30px;
        height: 100%;
        text-align: center;
    }
    .news{
        width: 1300px;
        height: 100%;
    }
    .headline{
        width: 1300px;
        height: 45px;
        margin-top: 20px;
        font-size: 30px;
    }
    .time{
        margin-right: 15px;
    }
    .block{
        width: 1300px;
        height: 40px;
    }
</style>
