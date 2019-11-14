<template>
<!-- 个人资料管理页面 -->
  <div class="profile-manage">
    <!-- 修改密码按钮 -->
    <el-button class="p1-button" type="primary">修改密码</el-button>
    <!-- 学生个人信息 -->
    <div id="p1-test" class="test">
      <p>姓名</p>
    </div>
    <div class="test">
      <p>{{name}}</p>
    </div>
    <div id="p1-test" class="test">
      <p>学号</p>
    </div>
    <div class="test">
      <p>{{account}}</p>
    </div>
    <div id="p1-test" class="test">
      <p>联系方式</p>
    </div>
    <div class="test">
      <p>{{contact}}</p>
    </div>
    <div id="p1-test" class="test">
      <p>宿舍</p>
    </div>
    <div class="test">
      <p>{{dormitory}}</p>
    </div>
    <div id="p1-test" class="test">
      <p>性别</p>
    </div>
    <div class="test">
      <p>{{sex}}</p>
    </div>
    <!-- 学生个人信息【完】 -->
  </div>
</template>

<script>
import { userApi } from '@/api'
import { Button, Message  } from 'element-ui'
export default {
    name: 'ProfileManage',
    components: {
		[Button.name]: Button,
		[Message.name]: Message
	},
	created () {
        this.$axios.post(prefix.api + userApi.profileManage).then((response)=>{
            // if(!responseHandler(response.data, this)){
            //     // 在这里处理错误
            //     Message.error('请求失败')
            // }
            // Message.success('请求成功')
        })
    }
}
</script>

<style lang="less" scoped>
  .overview{
    height:100%;
    display: flex;
    flex-direction: column;
  }
</style>
