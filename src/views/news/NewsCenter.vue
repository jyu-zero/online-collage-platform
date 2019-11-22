<template>
    <div class="index">
        <el-breadcrumb class="head" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>新闻中心</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>新闻中心</h1>
        <el-card class="box-card">
            <div class="news" @click="goToDetailPage(news.news_id)" v-for="news of newsList" :key="news.id">
                <!-- <span class="">{{news.is_pinned}}</span> -->
                <div class="up">
                    <div class="left">
                        <div class="" v-if="news.is_pinned===1">[置顶] </div>
                        <div class="content">{{news.news_title}}</div>
                        <div class="time">({{news.created_at}})</div>
                        <!-- <el-divider></el-divider> -->
                    </div>
                    <div class="eye"><font-awesome-icon icon="eye" /></div>
                    <div class="right">{{news.views}}</div>
                </div>
                <!-- <el-divider></el-divider> -->
                <div class="dowm">
                    <el-divider></el-divider>
                </div>
            </div>
        </el-card>
        <div class="page">
            <el-pagination
                :page-count="pageCount"
                @current-change="getNewsList"
                layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
    
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Pagination, Message, Table, Card, Divider, BreadcrumbItem, Breadcrumb } from 'element-ui'
export default {
    name: 'News',
    data() {
        return {
            newsList: [
                {
                    is_pinned: 1,
                    news_title: '',
                    created_at: '',
                    views: 3,
                    news_id: 6
                }
            ],
            pageCount: 1
        }
    },
    components: {
        [Pagination.name]: Pagination,
        [Message.name]: Message,
        [Table.name]: Table,
        [Card.name]: Card,
        [Divider.name]: Divider,
        [BreadcrumbItem.name]: BreadcrumbItem,
        [Breadcrumb.name]: Breadcrumb
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(page = 1){
            this.$axios.get(prefix.api + newsApi.getNewsList, {
                params: {
                    // 传参 page
                    page
                }
            })
                .then((response)=>{
                    console.log(response.data)
                    if(!responseHandler(response.data, this)){
                        // 在这里处理错误
                        Message.error('请求失败')
                    }
                    this.newsList = response.data.data.news
                    this.pageCount = response.data.data.pageCount
                })
        },
        toHomePage(){
            console.log('跳转至主页')
            this.$router.push({ name: 'Index' })
            // this.$router.push({ path: '/' })
        },
        // param
        goToDetailPage(id){
            console.log('跳转至新闻具体页面')
            console.log(id)
            // this.$router.push({ name: 'NewsDetail',
            this.$router.push({ name: 'NewsDetail',
                params: {
                    newsId: id
                } })
        }
    }
}

</script>

<style lang="less" scoped>
    .index{
        width: 1300px;
        height: 600px;
        // border: 1px solid rgb(0, 0, 0);
        margin-left: 175px;
        margin-top: 30px;
    }
    .head{
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
    // 左侧：标题
    .left{
        width: 1180px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
        display: flex;
        // 手势
        cursor: pointer;
    }
    // 眼睛
    .eye{
        width: 30px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
    }
    // 右侧：浏览人数
    .right{
        height: 100%;
        display: flex;
        // border: 1px solid rgb(0, 0, 0);
        width: 50px;
    }
    // 新闻列表
    .news{
        width: 1260px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
        font-size: 20px;
        margin-top: 20px;
        // display: flex;
    }
    .up{
        display: flex;
    }
    .pagination{
        margin-top: 20px;
    }
    .box-card {
        width: 1300px;
    }
</style>
