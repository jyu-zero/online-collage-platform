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

            <div class="title">新闻标题</div>
            <!-- <span class="title">{{item.title}}</span> -->
            <span class="time">2019-02-12</span>
            <span>林某某</span>
            <div class="block"></div>
            <span>asdfghjkl</span>
            <p>附件：</p>
            <div><i class="el-icon-document-remove"></i>XXXXXXX.doc</div>
            <div class="block"></div>
            <div>上一篇：</div>
            <div>下一篇：</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    methods: {
        toHomePage(){
            console.log('跳转至主页')
            this.$router.push({ name: 'HomePage' })
        },
        toIndex(){
            console.log('跳转至新闻中心')
            this.$router.push({ name: 'News' })
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
    .block{
        width: 1300px;
        height: 40px;
    }
</style>
