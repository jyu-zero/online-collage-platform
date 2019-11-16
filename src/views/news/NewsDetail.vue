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
            <div class="question-item"  v-for="newsvalue in news" :key="newsvalue.news_id">
                <!-- <div class="title">{{ newsvalue.news_id }}</div> -->
                <div class="title">{{ newsvalue.news_title }}</div>
                <span class="time">{{ newsvalue.created_at }}</span>
                <span class="author">{{ newsvalue.author }}</span>
                <div class="block"></div>
                <div class="content">
                    {{ newsvalue.news_content }}
                <div>{{storage_path}}</div></div>
                <div class="block"></div>
            </div>
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
    data() {
        return {
            news: [
                {
                    // news_id: 3,
                    news_title: ' 新闻标题三 ',
                    created_at: ' 2019-11-13 ',
                    author: ' 张三 ',
                    news_content: ' 内容111 '
                }
            ],
            pre: ' 这是新闻标题2 ',
            next: ' 没有下一篇 ',
            storage_path: [
                ' http://localhost:8081/online-collage-platform-server/public/uploadFile/3.jpg ',
                ' http://localhost:8081/online-collage-platform-server/public/uploadFile/3.jpg '
            ]
        }
    },
    methods: {
        toHomePage(){
            console.log('跳转至主页')
            this.$router.push({ name: 'HomePage' })
        },
        toIndex(){
            console.log('跳转至新闻中心')
            this.$router.push({ name: 'News-de-center' })
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
    .title{
        width: 1300px;
        height: 45px;
        margin-top: 20px;
        font-size: 30px;
    }
    .time{
        margin-right: 15px;
    }
    // 内容和时间、内容和下面链接的空白
    .block{
        width: 1300px;
        height: 35px;
        // border: 1px solid rgb(0, 0, 0);
    }
    .content{
        width: 1120px;
        // height: 100px;
        // border: 1px solid rgb(0, 0, 0);
    }
</style>
