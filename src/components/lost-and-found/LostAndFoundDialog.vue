<template>
    <!-- 失物招领弹窗组件 -->
    <div :class="['dialog']">
        <el-button :class="[{ head,list }]" :type="typeStyle" @click="dialogVisible=true" :disabled="disabled"
        :title="buttonTitle">
            <slot></slot>
        </el-button>
        <el-dialog
            :title="prompt"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <!-- 发布失物信息弹窗 -->
            <div v-if="prompt==='我丢东西了'||sort=='0'">
                <!-- 失物标题 -->
                <span>标题
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputTitle"
                    clearable>
                    </el-input>
                </span>
                <!-- 丢失物品名字 -->
                <span>需要找回的物品名称
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputName"
                    clearable>
                    </el-input>
                </span>
                <!-- 丢失地点 -->
                <span>可能遗失的地点
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputPlace"
                    clearable>
                    </el-input>
                </span>
                <!-- 遗失时间 -->
                <span>遗失的时间
                    <el-date-picker
                    v-model="inputTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </span>
                <!-- 遗失物品图片 -->
                <span>遗失物品图片
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">选择图片</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </span>
                <!-- 遗失者姓名 -->
                <span>您的姓名
                <el-input
                    placeholder="请输入内容"
                    v-model="inputUserName"
                    clearable>
                    </el-input>
                </span>
                <!-- 遗失者联系方式 -->
                <span>您的联系方式
                <el-input
                    placeholder="请输入内容"
                    v-model="inputTelephone"
                    clearable>
                    </el-input>
                </span>
            </div>

            <!-- 发布招领信息弹窗 -->
            <div v-if="prompt==='我捡到东西了'||sort=='1'" class="found">
                <!-- 招领标题 -->
                <span>标题
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputTitle"
                    clearable>
                    </el-input>
                </span>
                <!-- 拾到物品名字 -->
                <span>拾到的物品名称
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputName"
                    clearable>
                    </el-input>
                </span>
                <!-- 拾到地点 -->
                <span>拾到的地点
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputPlace"
                    clearable>
                    </el-input>
                </span>
                <!-- 拾到时间 -->
                <span>拾到的时间
                    <el-date-picker
                    v-model="inputTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </span>
                <!-- 拾到物品图片 -->
                <span>拾到物品图片
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">选择图片</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </span>
                <!-- 拾到人姓名 -->
                <span>您的姓名
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputUserName"
                    clearable>
                    </el-input>
                </span>
                <!-- 拾到人联系方式 -->
                <span>您的联系方式
                    <el-input
                    placeholder="请输入内容"
                    v-model="inputTelephone"
                    clearable>
                    </el-input>
                </span>
                <!-- 物品校验问题 -->
                <div class="question-list">
                    <h3>设置三个物品校验问题</h3>
                    <span>仅有回答全部正确的人才能取得您的联系方式</span>
                    <!-- question.goods_id这个东西怎么获取 -->
                    <ul class="check-questions">
                        <li v-for="(question,index) of questionAndAnswers" :key="question.questionContent">
                            <span>问题{{index+1}}
                                <el-input
                                placeholder="请输入内容"
                                v-model="question.questionContent"
                                clearable>
                                </el-input>
                            </span>
                            <dl>
                                <dt>
                                    <div class="option"><span>A</span></div>
                                    <el-input
                                    placeholder="请输入内容"
                                    v-model="question.questionAnswer[0].answer"
                                    clearable>
                                    </el-input>
                                </dt>
                                <dt>
                                    <div class="option"><span>B</span></div>
                                    <el-input
                                    placeholder="请输入内容"
                                    v-model="question.questionAnswer[1].answer"
                                    clearable>
                                    </el-input>
                                </dt>
                                <dt>
                                    <div class="option"><span>C</span></div>
                                    <el-input
                                    placeholder="请输入内容"
                                    v-model="question.questionAnswer[2].answer"
                                    clearable>
                                    </el-input>
                                </dt>
                                <dt>
                                    <div class="option"><span>D</span></div>
                                    <el-input
                                    placeholder="请输入内容"
                                    v-model="question.questionAnswer[3].answer"
                                    clearable>
                                    </el-input>
                                </dt>
                            </dl>
                            <!-- 正确答案 -->
                            <dl>
                                <el-select v-model="value" placeholder="请设置正确选项">
                                    <el-option
                                    v-for="item in question.questionAnswer"
                                    :key="item.value"
                                    :label="item.answer"
                                    :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 确认认领弹窗 -->
            <div v-if="prompt==='确认认领'">
                <!-- 招领人姓名 -->
                <span>招领人姓名
                    <el-input
                    placeholder="请输入内容"
                    v-model="foundUserName"
                    clearable>
                    </el-input>
                </span>
                <!-- 招领人联系方式 -->
                <span>招领人联系方式
                    <el-input
                    placeholder="请输入内容"
                    v-model="foundUserTelephone"
                    clearable>
                    </el-input>
                </span>
            </div>
            <!-- 提交或取消 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="lostSubmit" v-if="prompt==='我丢东西了'">发 布</el-button>
                <el-button type="primary" @click="foundSubmit" v-if="prompt==='我捡到东西了'">发 布</el-button>
                <el-button type="primary" @click="lostSubmitChange" v-if="sort=='0'">修 改</el-button>
                <el-button type="primary" @click="foundSubmitChange" v-if="sort=='1'">修 改</el-button>
                <el-button type="primary" @click="setRecovered" v-if="prompt==='设置失物状态'">已找回</el-button>
                <el-button type="primary" @click="setAbandon" v-if="prompt==='设置失物状态'">放 弃</el-button>
                <el-button type="primary" @click="setDelete" v-if="prompt==='设置失物状态'">删 除</el-button>
                <el-button type="primary" @click="setClaim" v-if="prompt==='确认认领'">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Button, Dialog, Input, Upload, MessageBox, Radio, Message, Select, Option, DatePicker } from 'element-ui'
import { prefix, goodsApi } from '@/api'
export default {
    components: {
        name: 'LostAndFoundDialog',
        [Button.name]: Button,
        [Dialog.name]: Dialog,
        [Input.name]: Input,
        [Upload.name]: Upload,
        [MessageBox.name]: MessageBox,
        [Radio.name]: Radio,
        [Message.name]: Message,
        [Select.name]: Select,
        [Option.name]: Option,
        [DatePicker.name]: DatePicker
    },
    data() {
        return {
            // 设置弹窗是否可见
            dialogVisible: false,
            // 发布信息的标题
            inputTitle: '',
            // 物品的名字
            inputName: '',
            // 地点
            inputPlace: '',
            // 时间
            inputTime: '',
            // 发布者名字
            inputUserName: '',
            // 发布者联系方式
            inputTelephone: '',
            // 正确答案
            value: '',
            // 问题及其答案
            questionAndAnswers: [
                {
                    questionContent: '1',
                    questionAnswer: [
                        { value: '选项1', answer: '11' },
                        { value: '选项2', answer: '12' },
                        { value: '选项3', answer: '13' },
                        { value: '选项4', answer: '14' }
                    ]
                },
                {
                    questionContent: '2',
                    questionAnswer: [
                        { value: '选项1', answer: '21' },
                        { value: '选项2', answer: '22' },
                        { value: '选项3', answer: '23' },
                        { value: '选项4', answer: '24' }
                    ]
                },
                {
                    questionContent: '3',
                    questionAnswer: [
                        { value: '选项1', answer: '31' },
                        { value: '选项2', answer: '32' },
                        { value: '选项3', answer: '33' },
                        { value: '选项4', answer: '34' }
                    ]
                }
            ],
            // 图片的名字和url
            fileList: [
                // { name: '', url: '' }
            ],
            // 招领人姓名
            foundUserName: '',
            // 招领人联系方式
            foundUserTelephone: ''
        }
    },
    props: {
        // 改变按钮组件type的属性
        typeStyle: {
            type: String,
            default: ''
        },
        // 主页头部按钮的样式
        head: {
            type: Boolean,
            default: false
        },
        // 列表按钮的样式
        list: {
            type: Boolean,
            default: false
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 弹窗的标题提示,用于选择弹窗的内容
        prompt: {
            type: String,
            default: '编辑'
        },
        // 改变按钮的提示
        buttonTitle: {
            type: String,
            default: ''
        },
        sort: {
            type: Number,
            default: 3
        }
    },
    methods: {
        handleClick(){
            this.$emit('click')
        },
        // 关闭element对话框
        handleClose(done) {
            MessageBox.confirm('确认关闭?')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        // 删除上传图片
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        // 浏览图片原图
        handlePreview(file) {
            console.log(file)
        },
        // 限制图上传数量
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        // 确认删除图片
        beforeRemove(file, fileList) {
            return MessageBox.confirm(`确定移除 ${file.name}？`)
        },
        // 确定失物发布
        lostSubmit() {
            MessageBox.confirm('', '确定发布吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(prefix.api + goodsApi.addLost, {
                    user_id: 1,
                    title: this.inputTitle,
                    name: this.inputName,
                    place: this.inputPlace,
                    time: this.inputTime,
                    contact_name: this.inputUserName,
                    contact_num: this.inputTelephone
                })
                    .then(response => {
                        console.log(response.data)
                    })
                Message({
                    type: 'success',
                    message: '发布成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消发布'
                })
            })
        },
        // 确定招领发布
        foundSubmit() {
            MessageBox.confirm('', '确定发布吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '发布成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消发布'
                })
            })
        },
        // 失物信息修改
        lostSubmitChange() {
            MessageBox.confirm('', '确定修改吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '修改成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消修改'
                })
            })
        },
        // 招领信息修改
        foundSubmitChange() {
            MessageBox.confirm('', '确定修改吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '修改成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消修改'
                })
            })
        },
        // 确定设置成已找回
        setRecovered() {
            MessageBox.confirm('此操作将永久设置该物品状态为已找回, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '设置成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消设置'
                })
            })
        },
        // 确定设置成放弃
        setAbandon() {
            MessageBox.confirm('此操作将永久设置该物品状态为放弃, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '设置成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消设置'
                })
            })
        },
        // 确定设置成删除
        setDelete() {
            MessageBox.confirm('此操作将永久设置该物品状态为删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '设置成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消设置'
                })
            })
        },
        // 确定认领
        setClaim() {
            MessageBox.confirm('此操作将永久设置该物品状态为确定认领, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '设置成功!'
                })
                this.dialogVisible = false
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消设置'
                })
            })
        }
    }
}
</script>

<style lang="less">
h3{
    margin: 0;
    font-weight: 600;
}
ul,li {
    list-style: none;
    margin: 0;
    padding: 0;
}
.dialog {
    line-height: 30px;
    .list{
        width: 120px;
        height: 50px;
        margin-right: 20px;
    }
    .head{
        width: 160px;
        height: 50px;
        margin: 5px 20px 0 0;
    }
    .el-dialog{
        .el-dialog__title{
            font-weight: 600;
            font-size: 24px;
        }
        .el-dialog__body{
            div{
                :nth-child(4){
                    .el-date-editor{
                        display: flex;
                    }
                }
            }
        }
    }
    .found{
        .question-list{
            .check-questions{
                dt{
                    height: 45px;
                    line-height: 45px;
                    display: flex;
                    span{
                        display: block;
                        width: 16px;
                        height: 20px;
                        // background-color: pink;
                    }
                    .el-input__inner{
                        width: 350px;
                        height: 35px;
                    }
                    .el-input__suffix{
                        margin-right: 10px;
                    }
                }
                :nth-child(5){
                    i{
                        line-height: 16px;
                        // background-color: pink;
                        transform-origin: center;
                    }
                }
                
            }
        }
    }
}

</style>
