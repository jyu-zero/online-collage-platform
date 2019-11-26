<template>
    <div id="questions-platform">
        <header>
             <!-- 头部面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>在线问答</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 头部面包屑 [完]-->
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <h1>在线问答</h1>
                    </div>
                </el-col>

                <!-- 发起新问题按钮 -->
                <el-col :span="4" :offset="6">
                    <div class="grid-content bg-purple right-align">
                        <el-button type="primary" @click.native="newQuestion">发起新问题</el-button>
                    </div>
                </el-col>
                <!-- 发起新问题按钮 [完]-->

                <!-- 搜索框及搜索图标 -->
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-input
                            placeholder="搜索问题"
                            v-model="searchContent"
                            clearable>
                            <el-button slot="append" icon="el-icon-search" @click="searchQuestions"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <!-- 搜索框及搜索图标 [完]-->
                
            </el-row>
        </header>

        <!-- 问题列表 -->
        <main>
            <div class="question-box" v-for="questionItem of questionList" :key="questionItem.questionId">
                <el-row :gutter="20">
                    <el-col :span="14">
                        <div class="grid-content bg-purple left-align">
                            <div class="question-title">
                                <el-button type="text" disabled>{{questionItem.status}}</el-button>
                                <h2>{{questionItem.title}}</h2>
                            </div>
                            <div class="description">
                                <p>提问人{{questionItem.name}} {{questionItem.time}}</p>
                                <div class="comment">
                                    <i class="el-icon-s-promotion">{{questionItem.typeName}}</i>
                                    <i class="el-icon-view">{{questionItem.views}}</i>
                                    <i class="el-icon-chat-dot-round">{{questionItem.solutionsNum}}</i>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="6">
                        <div class="grid-content bg-purple right-align">
                            <el-button @click="goToSpecificQuestion(questionItem.questionId)">查看</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </main>
        <!-- 问题列表 -->

        <!-- 分页 -->
        <footer>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-count="pageCount">
            </el-pagination>
        </footer>
        <!-- 分页 [完]-->
    </div>
</template>

<script>
import { prefix, responseHandler, questionApi } from '@/api'
import { Button, Message, Breadcrumb, Row, Col, Input, BreadcrumbItem, Pagination } from 'element-ui'
export default {
    name: 'Question',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Breadcrumb.name]: Breadcrumb,
        [Row.name]: Row,
        [Col.name]: Col,
        [Input.name]: Input,
        [BreadcrumbItem.name]: BreadcrumbItem,
        [Pagination.name]: Pagination
    },
    data(){
        return {
            // 问题列表
            questionList: [
                {
                    'questionId': 50,
                    'name': 'zhangs',
                    'title': '这是问题的标题sdgsdgshsfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdagsd',
                    'description': '描述',
                    'status': '已解决',
                    'time': '2019-11-15',
                    'typeName': '类型名',
                    'views': 20,
                    'solutionsNum': 11
                }
            ],
            pageCount: 1, // 总的页数
            searchContent: '', // 搜索的问题内容
            page: 1
        }
    },
    mounted(){
        this.getQuestions()
    },
    methods: {
        handleCurrentChange(val){
            this.getQuestions(val)
            this.page = val
        },
        newQuestion(){
            this.$router.push({ name: 'NewQuestion' })
        },
        // 搜索问题
        searchQuestions(){
            this.$axios.post(prefix.api + questionApi.searchQuestions, {
                'content': this.searchContent
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    if(response.data.code === '0001'){
                        Message.error('搜索问题的条件不能为空')
                    }
                    if(response.data.code === '0002'){
                        Message.error('搜索内容过长')
                    }
                }
                Message.success('请求成功')
                this.pageCount = response.data.data.pageCount
                this.questionList = response.data.data.information
                for(var i = 0; i < this.questionList.length; i++){
                    if(this.questionList[i].status === 0){
                        this.questionList[i].status = '待解决'
                    }else{
                        this.questionList[i].status = '已解决'
                    }
                }
            })
        },
        // 获取问题
        getQuestions(page = 1){
            this.$axios.get(prefix.api + questionApi.getQuestions, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO:
                    Message.error('获取失败')
                }
                this.pageCount = response.data.data.pageCount
                this.questionList = response.data.data.information
                for(var i = 0; i < this.questionList.length; i++){
                    if(this.questionList[i].status === 0){
                        this.questionList[i].status = '待解决'
                    } else{
                        this.questionList[i].status = '已解决'
                    }
                }
            })
        },
        goToSpecificQuestion(questionId){
            this.$router.push({ path: `/question/questions-specific/${questionId}` })
        }
    }
}
</script>

<style lang='less' scoped>
    *{
        box-sizing: border-box;
    }
    #questions-platform{
        width: 980px;
        height: 100%;
        margin: 20px auto;

        .el-row{
            margin:16px 0 20px;

            h1{
                font-size: 24px;
                margin: 0;
            }

            .right-align{
                text-align: right;
            }
        }

        main{
            margin-bottom: 15px;

            .question-box{
                width: 100%;
                height: 120px;
                border: 1px solid rgb(49, 49, 49);
                border-top: 0;
                padding: 30px 40px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

                &:first-child {
                    border: 1px solid rgb(49, 49, 49);
                }

                .el-row{
                    height:100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin:0;

                    .left-align{
                        text-align: left;

                        .question-title{
                            width: 100%;
                            display: flex;
                            align-content: center;
                            padding: 0 0 15px;

                            .is-disabled{
                                margin-right: 8px;
                                padding: 0;
                            }

                            h2{
                                display: inline;
                                font-size: 18px;
                                margin: 0;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }

                        }

                        .description{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            p{
                                margin: 0;
                            }

                            .comment{
                                width: 40%;
                                display: flex;
                                justify-content: space-between;
                            }
                            
                        }

                        i{
                            float: right;
                            margin-left: 18px;
                        }
                    }

                    .right-align{
                        text-align: right;
                    }
     
                }
            }
        }

        footer{
            .el-pagination{
                text-align: center;
            }
        }
    }
</style>
