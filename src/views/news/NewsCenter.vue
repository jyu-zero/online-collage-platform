<template>
    <div class="index">
        <div class="up">
            <span @click="toHomePage">主页</span>
            <span class="a">></span>
            <span>新闻中心</span>
        </div>

        <h1>新闻中心</h1>
        <el-card class="box-card">
            <div class="news">
                <div class="title">
                    <div class="new" @click="goToDetailPage(news.news_id)" v-for="news of newsList" :key="news.id">
                        <!-- <span class="">{{news.is_pinned}}</span> -->
                        <span class="" v-if="news.is_pinned===1">[置顶] </span>
                        <span class="content">{{news.news_title}}</span>
                        <span class="time">{{news.created_at}}</span>
                        <el-divider></el-divider>
                    </div>
                </div>

                <div class="views">
                    <div class="new" v-for="news of newsList" :key="news.id">
                        <span class="views"><font-awesome-icon icon="eye" /> {{news.views}}</span>
                        <el-divider></el-divider>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="5"
                layout="total, prev, pager, next"
                :total="4">
            </el-pagination>
        </div>
    </div>
    
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Pagination, Message, Table, Card } from 'element-ui'
export default {
    name: 'News',
    data() {
        return {
            newsList: [
                {
                    is_pinned: 1,
                    news_title: '新闻标题6 ',
                    created_at: '(2019-11-16)',
                    views: 3,
                    news_id: 6
                },
                {
                    is_pinned: 0,
                    news_title: '121212121 ',
                    created_at: '(2019-10-30)',
                    views: 0,
                    news_id: 1
                },
                {
                    is_pinned: 0,
                    news_title: '这是新闻标题2 ',
                    created_at: '(2019-11-12)',
                    views: 0,
                    news_id: 2
                },
                {
                    is_pinned: 0,
                    news_title: '111 ',
                    created_at: '(2019-11-15)',
                    views: 0,
                    news_id: 5
                }
            ],
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        }
    },
    components: {
        [Pagination.name]: Pagination,
        [Message.name]: Message,
        [Table.name]: Table,
        // [el-table-column.name]: el-table-columnElTableColumn
        // [util.name]: util
        [Card.name]: Card
    },
    methods: {
        getNewList(page = 1){
            this.$axios.get(prefix.api + newsApi.getNewList).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                    this.newsLists = this.response.data.news[0]
                }
            })
        },
        toHomePage(){
            console.log('跳转至主页')
            this.$router.push({ path: '/' })
        },
        goToDetailPage(id){
            console.log('跳转至新闻具体页面')
            console.log(id)
            this.$router.push({ path: '/news-detail',
                query: {
                    newsId: id
                } })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        }
    }
}

</script>
<style lang="less">
    .index{
        width: 1300px;
        height: 600px;
        // border: 1px solid rgb(0, 0, 0);
        margin-left: 175px;
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
        width: 1260px;
        // border: 1px solid rgb(0, 0, 0);
        display: flex;
    }
    .new{
        margin-bottom: 10px;
        margin-top: 10px;
        font-size: 15px;
    }
    .title{
        width: 1200px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
        font-size: 20px;
    }
    .views{
        width: 100px;
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
        // font-size: 20px;
        // margin-bottom: 10px;
    }
    .pagination{
        margin-top: 20px;
    }

    .box-card {
        width: 1300px;
    }
</style>
