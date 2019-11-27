<template>
    <div class="question-pop-up">
        <el-row class="question-contain" v-for="(questionsItem,index) of questions " :key="index" >
            <el-row class="question">问题{{index+1}}. {{questionsItem.question}}</el-row>
            <el-row class="select"><el-radio v-model="answer[index]" label="a">A. {{questionsItem.a}}</el-radio></el-row>
            <el-row class="select"><el-radio v-model="answer[index]" label="b">B. {{questionsItem.b}}</el-radio></el-row>
            <el-row class="select"><el-radio v-model="answer[index]" label="c">C. {{questionsItem.c}}</el-radio></el-row>
            <el-row class="select"><el-radio v-model="answer[index]" label="d">D. {{questionsItem.d}}</el-radio></el-row>
        </el-row>
        <el-divider></el-divider>

        <el-row type="flex" justify="space-between">
            <el-row >
                <el-col :offset="8">{{name}}</el-col>
                <el-col :offset="8">{{num}}</el-col>
            </el-row>
            <el-row><el-button type="success" @click="getInfomation">提交</el-button></el-row>
        </el-row>
    </div>
</template>

<script>
import { Row, Radio, Divider, Button, Col } from 'element-ui'
import { prefix, goodsApi } from '@/api'
import axios from 'axios'
export default {
    components: {
        [Row.name]: Row,
        [Radio.name]: Radio,
        [Divider.name]: Divider,
        [Button.name]: Button,
        [Col.name]: Col
    },
    data () {
        return {
            answer: ['', '', ''],
            questions: [],
            questionOneA: '',
            questionOneB: '',
            questionOneC: '',
            questionOneD: '',
            questionTwo: '',
            questionThree: '',
            answerOne: '',
            answerTwo: '',
            answerThree: '',
            name: '',
            num: ''
        }
    },
    created () {
        this.getRouterData()
        axios
            .post(prefix.api + goodsApi.getLostQuestion, {
                good_id: 1
            })
            .then(response => {
                this.questions = response.data.data.rs
            })
    },
    methods: {
        getRouterData() {
            this.good_id = this.$route.params.good_id
            this.good_id = this.$route.params.sort
        },
        getInfomation() {
            var answer = this.answer
            for(var i = 0; i < 3; i++){
                if(answer[i] === ''){
                    this.name = '还有选项没有选择'
                    return
                }
            }
            axios
                .post(prefix.api + goodsApi.giveLostQuestion, {
                    good_id: 1,
                    sort: 1,
                    answerOne: this.answer[0],
                    answerTwo: this.answer[1],
                    answerThree: this.answer[2]
                })
                .then(response => {
                    this.name = response.data.data.rs[0].found_name
                    this.num = response.data.data.rs[0].found_num
                })
        }
    }
}
</script>

<style lang="less" scoped>
.question-pop-up{

    .question{
        padding-bottom: 15px
    }

    .question-contain{
        margin-left: 30px;
    }

    .select{
      padding: 10px;
    }
}
</style>
