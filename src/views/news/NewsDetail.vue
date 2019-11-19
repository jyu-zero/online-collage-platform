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
            <div class="news-item"  v-for="newsvalue in news" :key="newsvalue.news_id">
                <!-- <div class="title">{{ newsvalue.news_id }}</div> -->
                <div class="title">{{ newsvalue.news_title }}</div>
                <span class="time">{{ newsvalue.created_at }}</span>
                <span class="author">{{ newsvalue.author }}</span>
                <div class="block"></div>
                <div class="content">
                    {{ newsvalue.news_content }}
                    <div class="appendix">附件：</div>
                    <div>{{storagePath}}</div>
                    <button class="" @click.stop="downLoad(storagePath)">下载</button>
                </div>
            </div>
            <div class="demo-image__lazy">
                <!-- <el-image v-for="url in storage_path" :key="url" :src="url" lazy></el-image> -->
            </div>
            <div class="block"></div>
            <div>{{pre}}</div>
            <div>{{next}}</div>
            
        </div>
    </div>
</template>
<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Message } from 'element-ui'
// import { resolve } from 'dns'
export default {
    name: 'Detail',
    responseType: 'blob',
    components: {
        [Message.name]: Message
    },
    data() {
        return {
            id: this.$route.query.newsId,
            news: [
                {
                    news_id: 3,
                    news_title: ' 新闻标题三 ',
                    created_at: ' 2019-11-13 ',
                    author: ' 张三 ',
                    news_content: ' 内容111 '
                }
            ],
            pre: ' ',
            next: ' ',
            storagePath: [
                ' http://localhost:8081/online-collage-platform-server/public/uploadFile/3.jpg ',
                ' http://localhost:8081/online-collage-platform-server/public/uploadFile/3.jpg '
            ]
        }
    },
    created() {
        console.log(this.id)
        this.getNewDetail()
        this.getRouterData()
    },
    methods: {
        toHomePage(){
            console.log('跳转至主页')
            this.$router.push({ path: '/' })
        },
        toIndex(){
            console.log('跳转至新闻中心')
            this.$router.push({ path: '/News-center' })
        },
        getNewDetail(){
            this.$axios.get(prefix.api + newsApi.getNewDetail, {
                params: {
                    news_id: this.id
                }
            }).then(response => {
                console.log(response)
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                this.news = response.data.data.new
                this.pre = response.data.data.pre
                this.next = response.data.data.next
                this.storagePath = response.data.data.storage_path
            })
        },
        getRouterData(){
            this.id = this.$route.params.id
        },
        downLoad(storagePath){
            // console.log(storagePath)
            // this.$axios.get(prefix.api + newsApi.downLoad, {
            //     responseType: `arraybuffer`
            // }).then(response => {
            //     if(response.status === 200){
            //         // 字符内容转变成blob地址
            //         let blob = new Blob([response.data], {
            //             type: `application/msword`
            //         })
            //         // URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL，这个URL的生命仅存在于它被创建的这个document里，新的对象URL指向执行的File对象或者是Blob对象。
            //         let objectUrl = URL.createObjectURL(blob)
            //         // 创建隐藏的可下载链接
            //         let link = document.createElement('a')
            //         let fname = `我的文档`
            //         link.href = objectUrl
            //         link.setAttribute('download', fname)
            //         // 触发点击
            //         document.body.appendChild(link)
            //         link.click()
            //     }else {
            //         this.$message({
            //             type: 'error',
            //             message: '导出失败'
            //         })
            //     }
            // })
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
    // 附件样式
    .appendix{
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>
