<template>
    <div class="question-and-answer-container">
        <header>
            <el-row>
                <el-col :span="12" @click.native="goToQuestion"><div class="grid-content bg-purple active" ref="myQuestion">我的提问</div></el-col>
                <el-col :span="12" @click.native="goToAnswer"><div class="grid-content bg-purple-light" ref="myAnswer">我的回答</div></el-col>
            </el-row>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import { Row, Col } from 'element-ui'
export default {
    name: 'Question',
    components: {
        [Row.name]: Row,
        [Col.name]: Col
    },
    methods: {
        goToQuestion(){
            this.$refs.myAnswer.classList.remove('active')
            this.$refs.myQuestion.classList.add('active')
            this.$router.push({ name: 'MyQuestion' })
        },
        goToAnswer(){
            this.$refs.myAnswer.classList.add('active')
            this.$refs.myQuestion.classList.remove('active')
            this.$router.push({ name: 'MyAnswer' })
        }
    }
}
</script>

<style lang="less" scoped>
    .question-and-answer-container{
        width:80%;
        height:100%;
        margin:0 auto;
        padding: 20px 0 0;
        box-sizing: border-box;

        header{
            .el-col .grid-content{
                text-align: center;
                line-height: 50px;
                font-size: 18px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                height: 50px;
                background: rgb(244,244,245);
                
                &:hover{
                    background: rgb(64,158,288);
                    color: white;
                    cursor: pointer;
                }
            }
            .el-col .active{
                background: rgb(64,158,288);
                color: white;
            }
        }
    }
</style>
