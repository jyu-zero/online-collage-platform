<template>
    <div id="new-question">
        <header>
            <!-- 头部面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item @click.native="onlineQuestionAndAnswer">在线问答</el-breadcrumb-item>
                <el-breadcrumb-item>发起问题</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 头部面包屑 [完]-->
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <h1>发起问题</h1>
                    </div>
                </el-col>
                <!-- 是否匿名选择框 -->
                <el-col :span="1" :offset="16">
                    <el-checkbox v-model="isAnonymous">匿名</el-checkbox>
                </el-col>
                <!-- 是否匿名选择框 [完]-->

                <!-- 确认发起按钮 -->
                <el-col :span="4">
                    <div class="grid-content bg-purple right-align">
                        <el-button type="primary" @click="ConfirmNew">确认发起</el-button>
                    </div>
                </el-col>
                <!-- 确认发起按钮 [完]-->
            </el-row>
        </header>
        <main>
            <h2>问题标题</h2>
            <el-input
                placeholder="请输入问题标题"
                v-model="title"
                clearable>
            </el-input>
            <h2>问题类别</h2>
            <!-- 类型选择的下拉菜单 -->
            <el-select v-model="selectTypeName" slot="prepend" placeholder="请选择">
                <el-option v-for="(typeItems,index) in typeName" :key="index" :label="typeItems" :value="typeItems"></el-option>
            </el-select>
            <!-- 类型选择的下拉菜单 [完]-->
            <h2>问题描述</h2>
            <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入问题的相关描述"
                v-model="description"
                resize="none">
            </el-input>
        </main>
    </div>
</template>

<script>
import { prefix, responseHandler, questionApi } from '@/api'
import { Button, Message, Breadcrumb, Row, Col, Input, BreadcrumbItem, Checkbox, Select, Option } from 'element-ui'
export default {
    name: 'NewQuestion',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Breadcrumb.name]: Breadcrumb,
        [Row.name]: Row,
        [Col.name]: Col,
        [Input.name]: Input,
        [BreadcrumbItem.name]: BreadcrumbItem,
        [Checkbox.name]: Checkbox,
        [Select.name]: Select,
        [Option.name]: Option
    },
    data(){
        return {
            typeName: '', // 获取所有问题类型名
            isAnonymous: false, // 是否匿名发送
            title: '', // 用户发起问题的标题
            selectTypeName: '', // 用户选择的问题类型名
            description: '' // 用户发起问题的描述
        }
    },
    created(){
        this.getQuestionTypes()
    },
    methods: {
        onlineQuestionAndAnswer(){
            this.$router.push({ name: 'Question' })
        },
        // 获取类型名
        getQuestionTypes(){
            this.$axios.get(prefix.api + questionApi.getQuestionTypes).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('服务器太过繁忙，请刷新重试')
                }
                this.typeName = response.data.data
            })
        },
        // 发起问题
        ConfirmNew(){
            this.$axios.post(prefix.api + questionApi.newQuestion, {
                'title': this.title,
                'typeName': this.selectTypeName,
                'description': this.description,
                'isAnonymous': this.isAnonymous
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请确认你已经填好问题的相关内容')
                }
                Message.success({
                    message: '发起成功',
                    duration: 1000
                })
            })
        }
    }
}
</script>

<style lang="less">
    *{
        box-sizing: border-box;
    }

    #new-question{
        width: 980px;
        height: 100%;
        margin: 20px auto;

        header{

            .el-breadcrumb__item{
                cursor: pointer;
            }

            .el-row{
                margin:16px 0 20px;
                display:flex;
                align-items: center;

                h1{
                    font-size: 24px;
                    margin: 0;
                    text-align: left;
                }

                .right-align{
                    text-align: right;
                }

            }
        }

        main{
            text-align: left;

            h2{
                font-size: 20px;
                margin: 0;
            }

            .el-input,.el-textarea{
                margin: 12px 0;
            }
            
        }
    }
</style>
