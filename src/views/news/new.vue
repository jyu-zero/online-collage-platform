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
                    <span v-html="newsvalue.news_content"> {{newsvalue.news_content}} </span>
                    <div class="">
                        <el-divider></el-divider>
                    </div>
                </div>
                <div class="appendix">附件：</div>
            <!-- 附件下载链接 -->
                <div class="" v-for="path in storagePath" :key="path.index">
                    <a :href="`${prefix.api}`+path" download="w3logo">{{path.split("-")[1]}}</a>
                    <!-- <a :href="`${prefix.api}`+path" download="w3logo">{{path.split("/")[2]}}</a> -->
                    <br>
                </div>
            </div>
            <!-- 附件下载链接完 -->
            <div class="block"></div>
            <!-- 上、下一篇 -->
            <div class="">
                上一篇：
                <el-button @click="goToPre()">{{pre[0].preTitle}}</el-button>
            </div>
            <br>
            <div class="">
                下一篇：
                <el-button @click="goToNext()">{{next[0].nextTitle}}</el-button>
            </div>
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
            news: [],
            pre: [],
            next: [],
            storagePath: []
        }
    },
    created() {
        this.getNewDetail()
    },
    // 使用watch监听路由变化
    watch: {
        '$route'(to, from) {
            this.$router.go(0)
        }
    },
    methods: {
        amINewViewer(){
            let newsThatIViewed = JSON.parse(localStorage.getItem('newsThatIViewed'))
            // indexOf() : 返回字符中indexof（string）中字串string在父串中首次出现的位置
            // this.$route.params.newsId) == -1 时newsThatIViewed为null
            if(newsThatIViewed !== null && newsThatIViewed.indexOf(this.$route.params.newsId) >= 0){
                return false
            }else{
                localStorage.setItem('newsThatIViewed', JSON.stringify([this.$route.params.newsId]))
            }
            return true
        },
        // 跳转至主页
        toHomePage(){
            // console.log('跳转至主页')
            // this.$router.push({ path: '/' })
            this.$router.push({ name: 'Index' })
        },
        // 跳转回新闻中心页
        toIndex(){
            // console.log('跳转至新闻中心')
            this.$router.push({ name: 'NewsCenter' })
        },
        // 传参、获取详情页id及相关信息
        getNewDetail(){
            this.$axios.get(prefix.api + newsApi.getNewDetail, {
                params: {
                    newsId: this.id,
                    isNewViewer: this.amINewViewer()
                    // isAdd: this.
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
                console.log(this.pre[0].preTitle)
                console.log(this.next[0].nextTitle)
            })
        },
        // 跳转回上一篇新闻
        goToPre(){
            // console.log(this.pre[0].preId)
            // console.log('跳转至上一篇')
            if(this.pre[0].preTitle === '没有上一篇'){
                // this.$router.push({ name: 'NewsCenter' })
                this.$router.push({ name: 'NewsDetail',
                    params: {
                        newsId: this.id
                    } })
            }else{
                this.$router.push({ name: 'NewsDetail',
                    params: {
                        newsId: this.pre[0].preId
                    } })
            }
        },
        // 跳转到下一篇新闻
        goToNext(){
            // console.log('跳转至下一篇')
            if(this.next[0].nextTitle === '没有下一篇'){
                // this.$router.push({ name: 'NewsCenter' })
                this.$router.push({ name: 'NewsDetail',
                    params: {
                        newsId: this.id
                    } })
            }else{
                this.$router.push({ name: 'NewsDetail',
                    params: {
                        newsId: this.next[0].nextId
                    } })
            }
        },
        // 设置已读
        setRead(id){
            this.readArray.push(id)
            this.readArray = this.unique(this.readArray)
            localStorage.setItem('alreadyReadList', this.readArray)
        },
        // 数组去重
        unique(arr){
            let newArr = []
            arr.forEach(item=>{
                if(newArr.indexOf(item) === -1){
                    newArr.push(item)
                }
            })
            return newArr
        }
    }
}
</script>
<style lang="less" scoped>
    .index{
        width: 1300px;
        max-height: 2000px;
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
        width: 1120px;
        height: 45px;
        margin-top: 20px;
        font-size: 30px;
        // border: 1px solid rgb(0, 0, 0);
        text-align:center
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
        text-align:center;
        img{
            text-align: center;
        }
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
    Style Attribute {
        text-align: center !important;
    }
</style>
