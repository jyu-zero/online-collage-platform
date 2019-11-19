<template>
    <div class="question">
        <h1 class="questioin-status">待解决</h1>
            <!-- 待解决问题列表 -->
            <div class="wait-for-solve-container">
                <div class="question-box" v-for="questionItem of waitToSolveQuestionList" :key="questionItem.questionId">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple left-align">
                                <el-checkbox @change="checkId(questionItem.questionId)">{{questionItem.title}}</el-checkbox>
                                <p class="time-container">{{questionItem.time}}</p>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple right-align">
                                <i class="el-icon-s-promotion">{{questionItem.typeName}}</i>
                                <i class="el-icon-view">{{questionItem.views}}</i>
                                <i class="el-icon-chat-dot-round">{{questionItem.solutionsNum}}</i>
                                <el-button @click.native="goToDetailedQuestion(questionItem.questionId)">查看</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!-- 待解决问题列表 [完]-->
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleWaitToSolveQuestionChange"
                :page-count="waitToSolvePageCount">
            </el-pagination>
            <!-- 分页 [完] -->

            <h1 class="questioin-status">已解决</h1>
            <!-- 已解决问题列表 -->
            <div class="solved-container">
                <div class="question-box" v-for="questionItem of solvedQuestionList" :key="questionItem.questionId">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple left-align">
                                <el-checkbox @change="checkId(questionItem.questionId)">{{questionItem.title}}</el-checkbox>
                                <p class="time-container">{{questionItem.time}}</p>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple right-align">
                                <i class="el-icon-s-promotion">{{questionItem.typeName}}</i>
                                <i class="el-icon-view">{{questionItem.views}}</i>
                                <i class="el-icon-chat-dot-round">{{questionItem.solutionsNum}}</i>
                                <el-button @click.native="goToDetailedQuestion(questionItem.questionId)">查看</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!-- 已解决问题列表 [完]-->
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleSolvedQuestionChange"
                :page-count="solvedPageCount">
            </el-pagination>
            <!-- 分页 [完] -->
    </div>
</template>

<script>
import { prefix, responseHandler, questionApi } from '@/api'
import { Button, Message, Row, Col, Checkbox, Pagination } from 'element-ui'
export default {
    name: 'Question',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Row.name]: Row,
        [Col.name]: Col,
        [Checkbox.name]: Checkbox,
        [Pagination.name]: Pagination
    },
    data(){
        return {
            // 获取待解决的所有问题
            waitToSolveQuestionList: [],
            // 获取已解决的所有问题
            solvedQuestionList: [],
            // 获取用户选择要进行查看的问题的id,只能是一条
            checkQuestionId: [],
            // 待解决问题列表的页数
            waitToSolvePageCount: 5,
            // 已解决问题列表的页数
            solvedPageCount: 5,
            // 记录当前待解决问题所在页数
            waitToSolvePage: 1,
            // 记录当前已解决问题所在页数
            solvedPage: 1
        }
    },
    created(){
        // 获取当前页面的待解决和已解决问题
        this.getWaitToSolveQuestion()
        this.getSolvedQuestion()
    },
    methods: {
        // 将选择的问题id传给 checkQuestionId
        checkId(id){
            var index = this.checkQuestionId.indexOf(id)
            if(index > -1){
                this.checkQuestionId.splice(index, 1)
                return
            }
            this.checkQuestionId.push(id)
        },
        // 获取用户的待解决问题
        getWaitToSolveQuestion(page = 1){
            this.$axios.get(prefix.api + questionApi.getAnswerWaitToSolveQuestion, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO
                    Message.error('请求失败')
                }
                this.waitToSolvePageCount = response.data.data.pageCount
                this.waitToSolveQuestionList = response.data.data.information
                for(var i = 0; i < this.waitToSolveQuestionList.length; i++){
                    if(this.waitToSolveQuestionList[i].status === 0){
                        this.waitToSolveQuestionList[i].status = '待解决'
                    } else{
                        this.waitToSolveQuestionList[i].status = '已解决'
                    }
                }
            })
        },
        // 获取用户的已解决的问题
        getSolvedQuestion(page = 1){
            this.$axios.get(prefix.api + questionApi.getAnswerSolvedQuestion, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO
                    Message.error('请求失败')
                }
                this.solvedPageCount = response.data.data.pageCount
                this.solvedQuestionList = response.data.data.information
                for(var i = 0; i < this.solvedQuestionList.length; i++){
                    if(this.solvedQuestionList[i].status === 0){
                        this.solvedQuestionList[i].status = '待解决'
                    } else{
                        this.solvedQuestionList[i].status = '已解决'
                    }
                }
            })
        },
        // 待解决问题分页
        handleWaitToSolveQuestionChange(val){
            this.getWaitToSolveQuestion(val)
            this.getSolvedQuestion(this.solvedPageCount)
            this.waitToSolvePage = val
        },
        // 已解决问题分页
        handleSolvedQuestionChange(val){
            this.getSolvedQuestion(val)
            this.getWaitToSolveQuestion(this.waitTosolvePageCount)
            this.solvedPage = val
        }
    }
}
</script>

<style lang="less">
    .question{
        .questioin-status{
            font-size: 24px;
        }

        .question-box{
            width: 100%;
            height: 80px;
            border: 1px solid rgb(49, 49, 49);
            border-top: 0;
            padding: 0 40px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            &:nth-child(1){
                border: 1px solid rgb(49, 49, 49);
            }

            .el-row{
                height:100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .left-align{
                    text-align: left;
                }

                .right-align{
                    text-align: right;
                }

                .el-checkbox{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }

                .time-container{
                    width:100%;
                    margin: 5px 0 0;
                    font-size: 12px;
                }

                i{
                    margin-right: 18px;
                }
            }
        }

        .el-pagination{
            margin: 10px 0;
            text-align: center;
        }
    }
</style>
