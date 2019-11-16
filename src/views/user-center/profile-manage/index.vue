<template>
<!-- 个人资料管理页面 -->
    <div class="profile-manage">
    <!-- 修改密码按钮 -->
    <div class="p1-button">
        <el-button type="primary">修改密码</el-button>
    </div>
    <!-- 学生个人信息 -->
    <div class="p1-test">
        <p>姓名</p>
    </div>
    <div class="test">
        <p>{{name}}</p>
    </div>
    <div class="p1-test">
        <p>学号</p>
    </div>
    <div class="test">
        <p>{{account}}</p>
    </div>
    <div class="p1-test">
        <p>联系方式</p>
    </div>
    <div class="test">
        <p>{{contact}}</p>
    </div>
    <div class="p1-test">
        <p>宿舍</p>
    </div>
    <div class="test">
        <p>{{dormitory}}</p>
    </div>
    <div class="p1-test">
        <p>性别</p>
    </div>
    <div class="test">
        <p>{{sex}}</p>
    </div>
    <!-- 学生个人信息【完】 -->
    </div>
    
</template>

<script>
import { userApi, prefix, responseHandler } from '@/api'
import { Button, Message } from 'element-ui'
export default {
    name: 'ProfileManage',
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    data(){
        return {
            name: '赖',
            account: '123',
            contact: '123654',
            dormitory: '203',
            sex: '1'
        }
    },
    methods: {
        // 获取个人资料管理中的内容
        getProfileManage(){
            this.$axios.get(prefix.api + userApi.profileManage).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.name = response.data.data.name
                this.account = response.data.data.account
                this.contact = response.data.data.contact
                this.dormitory = response.data.data.dormitory
                this.sex = response.data.data.sex
            })
        }
        // 修改密码
    },
    created(){
        this.getProfileManage()
    }

}
</script>

<style lang="less" scoped>
.overview{
    // height:100%;
    display: flex;
    flex-direction: column;
}
.profile-manage{
    padding: 40px;
}
.p1-button{
    font-size: 13px;
    width: 140px;
    height: 40px;
}
.p1-test{
    font-size: 18px;
    font-weight: bold;
}
</style>
