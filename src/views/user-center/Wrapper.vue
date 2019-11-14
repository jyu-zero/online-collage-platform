<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <header>
            <h1>个人中心</h1>
          <div class="header-right"  >
            <div class="new-msg">
              <i class="el-icon-message"></i>
              <span class="msg-num">996</span>
            </div>
            <el-dropdown trigger="click"  >
                  <span class="el-dropdown-link " id='dropdown-btn'>
                      <div >
                          <div class="user-name" >{{this.studentName}}</div>
                          <div class="user-id" >{{this.studentId}}</div>
                      </div>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user" ><span @click="goToUserCenter">个人中心</span></el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" ><span @click="logout">注销</span></el-dropdown-item>
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
import { prefix, responseHandler, userApi } from '@/api'
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
            studentName: 'aaa',
            studentId: '111111',
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
        // 注销
        logout(){
            // console.log('sss')
            this.$axios.post(prefix.api + userApi.logout).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                }
                Message.success(response.data.msg)
                this.$router.push({ name: 'HomePage' })
            })
        },
        // 获取学生姓名卡号
        // getStudentName(){
        //     // this.$axios.get(prefix.api + userApi.getStudentName).then((response)=>{
        //     //     if(!responseHandler(response.data, this)){
        //     //         // 提示出错
        //     //         Message.error('您还未登录')
        //     //         this.$router.push({ name: 'HomePage' })
        //     //         return
        //     //     }
        //     //     // 更新姓名以及一卡通id
        //     //     this.studentName = response.data.data.name
        //     //     this.studentId = response.data.data.student_id
        //     })
        // }
        // 跳转至个人中心，相当于跳转通知栏页面
        goToUserCenter(){
            console.log('跳转至个人中心')
            this.$router.push({ path: '/user-center/' })
        }
    },
    created() {
        // 获取学生姓名卡号

        // this.getStudentName()
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
                .new-msg{
                      margin-right: 30px;
                      display: flex;
                      align-items: center;
                      i{
                        margin-right: 10px;
                        font-size: 35px;
                      }
                }
                #dropdown-btn{
                      width: 100px;
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
</style>
