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
                    <span class="content">{{news.headline}}</span>
                    <span class="time">{{news.time}}</span>
                </div>
                <!-- <p>[置顶]新闻一(时间)</p>
                <p>[置顶]新闻二(时间)</p>
                <p>[置顶]新闻三(时间)</p>
                <p>新闻四*****(时间)</p>
                <p>新闻二*******(时间)</p>
                <p>新闻四*****(时间)</p> -->
            </div>

            <div class="amount">
                <div class="question-item" v-for="news of newsList" :key="news.id">
                    <span class="amount">{{news.amount}}</span>
                </div>
                <!-- <p>>></p>
                <p>>></p>
                <p>>></p>
                <p>>></p>
                <p>>></p>
                <p>>></p> -->
            </div>
        </div>
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getQuestionList"
                :page-count="pageCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { Pagination } from 'element-ui'
    export default {
        name: 'News',
        components: {
            [Pagination.name]: Pagination
        },
        data(){
            return{
                pageCount:1,
                news:[]
            };
        },
        created() {
            this.getNews();
        },
        methods: {
            toHomePage(){
                console.log('跳转至主页')
                this.$router.push({ name: 'HomePage' })
            },
            getNews(page=1){
                axios
                    .get("/api" + api.getNews,{
                        params:{
                            page
                        }
                    })
                    .then(response => {
                        this.news = response.data.data.news;
                        this.pageCount = response.data.data.pageCount;
                    });
            }
        }
    };
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
