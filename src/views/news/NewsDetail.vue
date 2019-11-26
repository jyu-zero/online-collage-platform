<template>
    <div class="index">
        <el-breadcrumb class="up" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/news-center' }">新闻中心</el-breadcrumb-item>
            <el-breadcrumb-item>新闻页面</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="news">
            <div class="news-item"  v-for="newsvalue in news" :key="newsvalue.news_id">
                <div class="title">{{ newsvalue.news_title }}</div>
                <span class="time">{{ newsvalue.created_at }}</span>
                <span class="author">{{ newsvalue.author }}</span>
                <div class="content">
                    <div class="">
                        <el-divider></el-divider>
                    </div>
                    {{ newsvalue.news_content }}
                    <div class="">
                        <el-divider></el-divider>
                    </div>
                    <div class="appendix">附件：</div>
                </div>
            <!-- 附件下载链接 -->
                <div class="" v-for="path in storagePath" :key="path.index">
                    <a :href="`${prefix.api}`+path" download="w3logo">{{path.split("/")[2]}}</a>
                    <br>
                </div>
            </div>
            <!-- 附件下载链接完 -->
            <div class="block"></div>
            <!-- 上、下一篇 -->
            <el-tooltip content="Top center" placement="top">
                <el-button @click="goToPre()">{{pre.news_title}}</el-button>
                </el-tooltip>
                <el-tooltip content="Bottom center" placement="bottom" effect="light">
                <el-button @click="goToNext()">{{next.news_title}}</el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Message, Button, Divider, Tooltip, BreadcrumbItem, Breadcrumb } from 'element-ui'
export default {
    name: 'Detail',
    components: {
        [Message.name]: Message,
        [Button.name]: Button,
        [Divider.name]: Divider,
        [Tooltip.name]: Tooltip,
        [BreadcrumbItem.name]: BreadcrumbItem,
        [Breadcrumb.name]: Breadcrumb
    },
    data() {
        return {
            prefix,
            // 接收参数
            id: this.$route.params.newsId,
            news: [
                {
                    news_id: 3,
                    news_title: '',
                    created_at: '',
                    author: '',
                    news_content: ''
                }
            ],
            pre: {
                news_id: 2,
                news_title: ''
            },
            next: {
                news_id: 4,
                news_title: ''
            },
            storagePath: [ ]
        }
    },
    created() {
        console.log(this.id)
        this.getNewDetail()
    },
    methods: {
        // 跳转至主页
        toHomePage(){
            console.log('跳转至主页')
            // this.$router.push({ path: '/' })
            this.$router.push({ name: 'Index' })
        },
        // 跳转回新闻中心页
        toIndex(){
            console.log('跳转至新闻中心')
            // this.$router.push({ path: '/News-center' })
            this.$router.push({ name: 'NewsCenter' })
        },
        // 传参、获取详情页id及相关信息
        getNewDetail(){
            this.$axios.get(prefix.api + newsApi.getNewDetail, {
                params: {
                    Newsid: this.id
                }
            }).then(response => {
                // console.log(response.data)
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('请求失败')
                }
                console.log(response)
                this.news = response.data.data.new
                this.pre = response.data.data.pre
                this.next = response.data.data.next
                this.storagePath = response.data.data.storage_path
            })
        },
        // 跳转回上一篇新闻
        goToPre(){
            console.log('跳转至上一篇')
            // 接收id
            this.$axios.get(prefix.api + newsApi.getNewDetail, {
                params: {
                    Newsid: this.id
                }
            }).then(response => {
                // console.log(response.data)
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('请求失败')
                }
                console.log(response)
                this.news = response.data.data.new
                this.pre = response.data.data.pre
                this.next = response.data.data.next
                this.storagePath = response.data.data.storage_path
            })
        },
        // 跳转到下一篇新闻
        goToNext(){
            console.log('跳转至下一篇')
            // 接收id
            this.$axios.get(prefix.api + newsApi.getNewDetail, {
                params: {
                    Newsid: this.id
                }
            }).then(response => {
                // console.log(response.data)
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('请求失败')
                }
                console.log(response)
                this.news = response.data.data.new
                this.pre = response.data.data.pre
                this.next = response.data.data.next
                this.storagePath = response.data.data.storage_path
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .index{
        width: 1300px;
        height: 800px;
        margin-left: 250px;
        margin-top: 30px;
        // border: 1px solid rgb(255, 4, 4);
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
        height: 100%;
        // border: 1px solid rgb(0, 0, 0);
    }
    .title{
        width: 1300px;
        height: 45px;
        margin-top: 20px;
        font-size: 30px;
        // border: 1px solid rgb(0, 0, 0);
    }
    .time{
        margin-right: 15px;
        // border: 1px solid rgb(0, 0, 0);
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
    // 附件样式
    .appendix{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .pre{
        width: 125px;
        // border: 1px solid rgb(0, 0, 0);
        height: 25px;
        text-align: center;
        background: #f8f8f9;
        // margin: 20px;
        // border: none;
    }
    .next{
        width: 125px;
        // border: 1px solid rgb(0, 0, 0);
        text-align: center;
        height: 25px;
        background-color:#f8f8f9;
        // border: none;
    }
</style>
