<template>
<!-- 个人资料管理页面 -->
    <div class="profile-manage">
    <!-- 修改密码按钮 -->
    <div class="p1-button">
        <el-button type="primary" v-on:click="eject(true)">修改密码</el-button>
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
    <!-- 出现修改密码框样式 -->
    <div class="input-box" v-if="isAppear">
        <div class="close" v-on:click="eject(false)">×</div>
        <p class="password">旧密码:</p>
        <el-input placeholder="请输入旧密码" v-model="old_password" show-password></el-input>
        <p class="password">新密码:</p>
        <el-input placeholder="请输入新密码" v-model="new_password" show-password></el-input>
        <p class="password">确认新密码:</p>
        <el-input placeholder="请在次输入新密码" v-model="sure_password" show-password></el-input>
        <el-button type="primary" class="sure" @click="sentPassword">确认</el-button>
    </div>
    <!-- 修改密码框样式【完】 -->
    <!-- 学生个人信息【完】 -->
    </div>

</template>

<script>
import { userApi, prefix, responseHandler } from '@/api'
import { Button, Message, Input } from 'element-ui'
export default {
    name: 'ProfileManage',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Input.name]: Input
    },
    data(){
        return {
            name: '赖',
            account: '123',
            contact: '123654',
            dormitory: '203',
            sex: '1',
            isAppear: false,
            old_password: '',
            new_password: '',
            sure_password: ''
        }
    },
    methods: {
        // 弹出修改密码输入页面
        eject(val){
            this.isAppear = val
        },
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
        },
        // 修改密码
        sentPassword(){
            // 判断三个输入框是否为空
            if(this.old_password === '' || this.new_password === '' || this.sure_password === ''){
                Message.error('密码不能为空！')
                return
            }
            // 判断新旧密码是否一致
            if(this.old_password === this.new_password){
                Message.error('新旧密码一样，请重新输入新密码')
                return
            }
            // 判断新旧密码是否一致
            if(this.new_password !== this.sure_password){
                Message.error('新旧密码不一致！')
                return
            }
            this.$axios.post(prefix.api + userApi.changePassword, {
                old_password: this.old_password,
                new_password: this.new_password,
                account: this.account
            }).then((response)=>{
                console.log(response)
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
            })
            this.eject(false)
        }
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
.input-box{
    padding: 20px;
    width: 300px;
    height: 400px;
    border: 1px solid black;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -200px;
    text-align: center;
}
.el-input{
    width: 250px;
}
.password{
    text-align: left;
}
.sure{
    margin-top: 20px;
    width: 100px;
}
.close{
    float: right;
    font-size: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>
