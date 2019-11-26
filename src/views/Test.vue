<template>
  <div class="test">
      <el-button>这是一个element按钮</el-button>
      <p>这是一个 font-awesome 图标示例</p>
      <font-awesome-icon icon="user-secret" />
    <!--头部-->
    <header>
      <h1>线上学院平台</h1>
      <!--下拉菜单-->
      <div class="header-right"  v-if="isLogin" >
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
      <!--下拉菜单.结束-->
      <!--登录按钮-->
      <el-button  id="go-to-login" type="info"  plain v-if="!isLogin" @click="showLoginWindow" >登录</el-button>
    </header>

  </div>
</template>

<script>
import { prefix, responseHandler, testApi } from '@/api'
import { Button, Message } from 'element-ui'
export default {
    name: 'Test',
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    created () {
        this.$axios.post(prefix.api + testApi.test).then((response)=>{
            if(!responseHandler(response.data, this)){
                // 在这里处理错误
                Message.error('请求失败')
            }
            Message.success('请求成功')
        })
    }
}
</script>

<style lang="less" scoped>
    .test{
        height:100%;
    }

</style>
