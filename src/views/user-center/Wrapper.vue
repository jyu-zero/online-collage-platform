<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <header>
            <h1>个人中心</h1>
          <div class="header-right">
            <div id="home-page-btn" @click="goToHomePage">主页</div>
            <div class="new-msg">
              <i class="el-icon-message"></i>
              <span class="msg-num">{{unReadNum}}</span>
            </div>
            <el-dropdown trigger="click"  >
                  <span class="el-dropdown-link " id='dropdown-btn'>
                      <div >
                          <div class="user-name" >{{this.name}}</div>
                          <div class="user-id" >{{this.account}}</div>
                      </div>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
              <el-dropdown-menu slot="dropdown" class="header-dropdown">
                <el-dropdown-item icon="el-icon-user" @click.native="goToUserCenter">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" @click.native="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
import { Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Message } from 'element-ui'
import { prefix, responseHandler, userApi, notificationApi } from '@/api'
export default {
    components: {
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
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
            name: 'aaa',
            account: '111111',
            unReadNum: 0,
            menus: [
                {
                    title: '通知栏',
                    routeName: 'UserCenterNotification'
                },
                {
                    title: '我的问答',
                    routeName: 'UserCenterQuestion'
                },
                {
                    title: '我的失物招领',
                    routeName: 'UserCenterLostAndFound'
                },
                {
                    title: '我共享的资料',
                    routeName: 'UserCenterFileShare'
                },
                {
                    title: '个人资料管理',
                    routeName: 'UserCenterProfile'
                }
            ]
        }
    },
    methods: {
        // 跳转菜单
        goToMenu(menuItem) {
            this.$router.push({ name: menuItem.routeName })
        },
        goToHomePage(){
            this.$router.push({ name: 'Index' })
        },
        // 注销
        logout(){
            this.$axios.post(prefix.api + userApi.logout).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                }
                Message.success(response.data.msg)
                this.$router.push({ name: 'Index' })
            })
        },
        // 获取学生姓名卡号
        getName(){
            this.$axios.get(prefix.api + userApi.getStudentName).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    this.$router.push({ name: 'Index' })
                    return
                }
                // 更新姓名以及一卡通id
                this.name = response.data.data.name
                this.account = response.data.data.account
            })
        },
        // 跳转至个人中心，相当于跳转通知栏页面
        goToUserCenter(){
            this.$router.push({ name: 'Login' })
        },
        // 获取未读通知条数
        getNotificationNum(){
            // 先判断本地存储是否有alreadyReadList
            if(!localStorage.getItem('alreadyReadList')){
                // 没有则创建一个
                localStorage.setItem('alreadyReadList', '')
            }
            // 将alreadyReadList存储到本地的已读列表中
            this.readArray = localStorage.getItem('alreadyReadList').split(',')
            let numberic = []
            this.readArray.forEach(element => {
                numberic.push(Number(element))
            })
            this.readArray = numberic

            this.$axios.get(prefix.api + notificationApi.getIdList).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('通知模块发生了未知的问题')
                    return
                }
                let unReadCount = 0
                response.data.data.idList.forEach(item => {
                    if (this.readArray.indexOf(item) === -1){
                        unReadCount++
                    }
                })
                // 大于99条则显示为99
                this.unReadNum = unReadCount > 99 ? 99 : unReadCount
            })
        }

    },
    created() {
        // 获取学生姓名卡号
        this.getName()
        this.getNotificationNum()
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

        .header-right{
            display: flex;
            justify-content: center;
            align-items: center;
                #home-page-btn{
                  margin-right: 20px;
                  cursor: pointer;
                }
                .new-msg{
                      margin-right: 30px;
                      display: flex;
                      align-items: center;
                      &:hover{
                        cursor: pointer;
                      }
                      i{
                        margin-right: 10px;
                        font-size: 30px;
                      }
                }
                #dropdown-btn{
                      -webkit-user-select:none;
                      -moz-user-select:none;
                      -ms-user-select:none;
                      user-select:none;
                      display: flex;
                      flex-wrap: nowrap;
                      align-items: center;
                div{
                      color: #fff;
                      text-align: center;
                }
        }
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
.header-dropdown{
    li{
        width: 140px;
    }
}
</style>
