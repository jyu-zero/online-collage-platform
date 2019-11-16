<template>
    <div class="question-pop-up">
        <el-row>
            <el-row class="question">你丢失的U盘是什么颜色的</el-row>
            <el-row class="select"><el-radio v-model="radio" label="1">A. {{A}}</el-radio></el-row>
            <el-row class="select"><el-radio v-model="radio" label="2">B. {{B}}</el-radio></el-row>
            <el-row class="select"><el-radio v-model="radio" label="3">c. {{C}}</el-radio></el-row>
            <el-row class="select"><el-radio v-model="radio" label="4">d. {{D}}</el-radio></el-row>
        </el-row>
    </div>
</template>

<script>
import { Row, Radio } from 'element-ui'

export default {
    components: {
        [Row.name]: Row,
        [Radio.name]: Radio
    },
    data () {
        return {
            radio: '1',
            A: '红色',
            B: '绿色',
            C: '红色和蓝色',
            D: '蓝色'
        }
    }
}
</script>

<style lang="less" scoped>
.question-pop-up{

    .question{
        padding-bottom: 15px
    }

    .select{
      padding: 10px;
    }
}
</style>
