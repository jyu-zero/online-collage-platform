<template>
    <div class="question">
        <h1 class="questioin-status">待解决</h1>
            <!-- 待解决问题列表 -->
            <div class="wait-for-solve-container">
                <div class="question-box" v-for="questionItem of questionList" :key="questionItem.questionId">
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
                <div class="question-box" v-for="questionItem of questionList" :key="questionItem.questionId">
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
            // 获取的所有问题
            questionList: [
                // 这是测试用的数据
                {
                    'questionId': 6,
                    'title': '这是问题的标题',
                    'description': '描述',
                    'time': '2019-11-15  12:02:33',
                    'typeName': '类型名',
                    'views': 20,
                    'solutionsNum': 11
                },
                {
                    'questionId': 22,
                    'title': '这是问题的标题',
                    'description': '描述',
                    'time': '2019-11-15  12:02:33',
                    'typeName': '类型名',
                    'views': 20,
                    'solutionsNum': 11
                },
                {
                    'questionId': 30,
                    'title': '这是问题的标题',
                    'description': '描述',
                    'time': '2019-11-15  12:02:33',
                    'typeName': '类型名',
                    'views': 20,
                    'solutionsNum': 11
                }
            ],
            // 获取用户选择要进行查看的问题的id,只能是一条
            checkQuestionId: [],
            // 待解决问题列表的页数
            waitToSolvePageCount: 5,
            // 已解决问题列表的页数
            solvedPageCount: 5,
            waitToSolvePage: 1,
            solvedPage: 1
        }
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
        // 处理待解决问题的分页
        handleWaitToSolveQuestionChange(val){
            console.log(this.checkQuestionId)
            this.waitToSolvePage = val
        },
        // 处理已解决问题的分页
        handleSolvedQuestionChange(val){
            // this.getQuestions(val)
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
