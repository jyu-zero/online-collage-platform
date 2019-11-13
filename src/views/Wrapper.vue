<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <header>
            <h1>个人中心</h1>
        </header>
        <!-- 顶部导航栏 [完] -->
        <div class="wrapper-body">
            <el-menu
                :default-active="currentRouteName"
                class="menu"
                background-color="#22466f"
                text-color="#779cc6"
                active-text-color="#fff">
                <el-menu-item @click="goToMenu(menuItem)" v-for="(menuItem,index) of menus" :index="menuItem.routeName" :key="index" :route="menuItem.route">
                    <span slot="title">{{menuItem.title}}</span>
                </el-menu-item>
            </el-menu>
            <main>
                <router-view/>
            </main>
        </div>

    </div>
</template>

<script>
import { Menu, MenuItem } from 'element-ui'
export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem
    },
    name: 'Wrapper',
    computed: {
        currentRouteName(){
            return this.$route.name
        }
    },
    data() {
        return {
            menus: [
                {
                    title: '通知栏',
                    routeName: 'Notification'
                },
                {
                    title: '我的问答',
                    routeName: 'Question'
                },
                {
                    title: '我的失物招领',
                    routeName: 'LostAndFound'
                },
                {
                    title: '我共享的资料',
                    routeName: 'FileShare'
                },
                {
                    title: '个人资料管理',
                    routeName: 'Profile'
                },
                {
                    title: '新闻中心',
                    routeName: 'News'
                }
            ]
        }
    },
    methods: {
        goToMenu(menuItem) {
            this.$router.push({ name: menuItem.routeName })
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    height:100%;
    display: flex;
    flex-direction: column;

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:60px;
        padding: 0 20px;
        background:#5e91fa;
        color:#fff;

        h1{
            margin:0;
            font-size:20px;
        }
    }

    .wrapper-body{
        flex: 1;
        display: flex;
        overflow: hidden;

        .menu{
            width:200px;
            height:100%;
            font-family: 'Source Han Sans CN',sans-serif;
            font-weight: normal;
        }

        main{
            flex:1;
            height:100%;
            overflow: auto;
        }
    }
}
</style>
