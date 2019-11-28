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
                    type="datetime"
                    :editable="false"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择时间">
                    </el-date-picker>
                </span>
                <!-- 遗失物品图片 -->
                <span>遗失物品图片
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :on-change="handleSelectFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :before-upload="beforeAvatarUpload"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    >
                    <el-button size="small" type="primary">选择图片</el-button>
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
                    type="datetime"
                    :editable="false"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择时间">
                    </el-date-picker>
                </span>
                <!-- 拾到物品图片 -->
                <span>拾到物品图片
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :on-change="handleSelectFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :before-upload="beforeAvatarUpload"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    >
                    <el-button size="small" type="primary">选择图片</el-button>
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
                    <ul class="check-questions">
                        <li v-for="(question,index) of questionAndAnswers" :key="index">
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
                                    value-key="item.value"
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
import { prefix, goodsApi, responseHandler } from '@/api'
export default {
    components: {
        // name: 'LostAndFoundDialog',
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
            // 图片

            // 发布者名字
            inputUserName: '',
            // 发布者联系方式
            inputTelephone: '',
            // 正确答案
            value: '',
            // 问题及其答案
            questionAndAnswers: [
                {
                    questionContent: '',
                    questionAnswer: [
                        { value: '选项A', answer: '' },
                        { value: '选项B', answer: '' },
                        { value: '选项C', answer: '' },
                        { value: '选项D', answer: '' }
                    ]
                },
                {
                    questionContent: '',
                    questionAnswer: [
                        { value: '选项A', answer: '' },
                        { value: '选项B', answer: '' },
                        { value: '选项C', answer: '' },
                        { value: '选项D', answer: '' }
                    ]
                },
                {
                    questionContent: '',
                    questionAnswer: [
                        { value: '选项A', answer: '' },
                        { value: '选项B', answer: '' },
                        { value: '选项C', answer: '' },
                        { value: '选项D', answer: '' }
                    ]
                }
            ],
            // 图片列表
            fileList: [],
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
        // 判断信息失物还是招领
        sort: {
            type: Number,
            default: 3
        },
        // 用于传给组件进行后台数据传递
        sorts: {
            type: Number,
            default: 3
        },
        // 物品id,用于状态设置时向后台传递
        good_id: {
            type: Number,
            default: 0
        },
        // 用户id,用于状态设置时向后台传递
        user_id: {
            type: String,
            default: ''
        }
    },
    methods: {
        // handleClick(){
        //     this.$emit('click')
        // },
        // 关闭element对话框
        handleClose(done) {
            MessageBox.confirm('确认关闭?')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        // 删除上传图片 TODO:添加上传成功或失败的message
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        handleSelectFile(file, fileList){
            console.log(file)
            console.log(fileList)
            this.fileList = fileList
        },
        // 点击文件列表中已上传的文件时的钩子(还不知道有什么用,先留着)
        handlePreview(file) {
            // console.log(file)
        },
        // 限制上传图片的大小
        beforeAvatarUpload(file){
            const isLt10M = file.size / 1024 / 1024 < 10
            if(!isLt10M){
                Message.error('上传的图片大小不能超过10MB,请重新上传')
            }
            return isLt10M
        },
        // 限制图上传数量
        handleExceed(files, fileList) {
            MessageBox.message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        // 确认删除图片
        beforeRemove(file, fileList) {
            return MessageBox.confirm(`确定移除 ${file.name}？`)
        },
        // 确定失物发布
        lostSubmit() {
            if(this.inputTitle.trim() === ''){
                Message.error('标题不能为空')
                return
            }
            if(this.inputName.trim() === ''){
                Message.error('物品名称不能为空')
                return
            }
            if(this.inputPlace.trim() === ''){
                Message.error('遗失地点不能为空')
                return
            }
            if(this.inputTime === ''){
                Message.error('遗失时间不能为空')
                return
            }
            if(this.inputUserName.trim() === ''){
                Message.error('姓名不能为空')
                return
            }
            if(this.inputTelephone.trim() === ''){
                Message.error('联系方式不能为空')
                return
            }else if(!(/^1[3456789]\d{9}$/.test(this.inputTelephone.trim()))){
                Message.error('联系方式的格式不对,请输入正确的手机长号')
                return
            }
            MessageBox.confirm('确定发布吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let lostData = new FormData()
                lostData.append('title', this.inputTitle)
                lostData.append('name', this.inputName)
                lostData.append('place', this.inputPlace)
                lostData.append('time', this.inputTime)
                for(let file of this.fileList){
                    lostData.append('image', file.raw)
                }
                lostData.append('contact_name', this.inputUserName)
                lostData.append('contact_num', this.inputTelephone)
                console.log(lostData.get('time'))
                this.$axios.post(prefix.api + goodsApi.addLost, lostData).then(response => {
                    console.log(response.data)
                    // 发布失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('发布失败,请重新发布一次')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消发布'
                })
            })
        },
        // 确定招领发布
        foundSubmit() {
            if(this.inputTitle.trim() === ''){
                Message.error('标题不能为空')
                return
            }
            if(this.inputName.trim() === ''){
                Message.error('物品名称不能为空')
                return
            }
            if(this.inputPlace.trim() === ''){
                Message.error('拾到地点不能为空')
                return
            }
            if(this.inputTime === ''){
                Message.error('拾到时间不能为空')
                return
            }
            if(this.inputUserName.trim() === ''){
                Message.error('姓名不能为空')
                return
            }
            if(this.inputTelephone.trim() === ''){
                Message.error('联系方式不能为空')
                return
            }else if(!(/^1[3456789]\d{9}$/.test(this.inputTelephone.trim()))){
                Message.error('联系方式的格式不对,请输入正确的手机长号')
                return
            }
            // 判断问题是否为空
            // if(this.questionAndAnswers){

            // }
            MessageBox.confirm('确定发布吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let foundData = new FormData()
                foundData.append('title', this.inputTitle)
                foundData.append('name', this.inputName)
                foundData.append('place', this.inputPlace)
                foundData.append('time', this.inputTime)
                for(let file of this.fileList){
                    foundData.append('image', file.raw)
                }
                foundData.append('contact_name', this.inputUserName)
                foundData.append('contact_num', this.inputTelephone)
                for(let question of this.questionAndAnswers){
                    foundData.append('questionContent[]', question.questionContent)
                    foundData.append('questionAnswer[]', question.questionAnswer)
                    // 正确答案
                    foundData.append('answer', this.value)
                }
                this.$axios.post(prefix.api + goodsApi.addFound, foundData).then(response => {
                    console.log(response.data)
                    // 发布失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('发布失败,请重新发布一次')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消发布'
                })
            })
        },
        // 失物信息修改
        lostSubmitChange() {
            if(this.inputTitle.trim() === ''){
                Message.error('标题不能为空')
                return
            }
            if(this.inputName.trim() === ''){
                Message.error('物品名称不能为空')
                return
            }
            if(this.inputPlace.trim() === ''){
                Message.error('遗失地点不能为空')
                return
            }
            if(this.inputTime === ''){
                Message.error('遗失时间不能为空')
                return
            }
            if(this.inputUserName.trim() === ''){
                Message.error('姓名不能为空')
                return
            }
            if(this.inputTelephone.trim() === ''){
                Message.error('联系方式不能为空')
                return
            }else if(!(/^1[3456789]\d{9}$/.test(this.inputTelephone.trim()))){
                Message.error('联系方式的格式不对,请输入正确的手机长号')
                return
            }
            MessageBox.confirm('', '确定修改吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let lostData = new FormData()
                lostData.append('good_id', this.good_id)
                lostData.append('sort', this.sort)
                lostData.append('title', this.inputTitle)
                lostData.append('name', this.inputName)
                lostData.append('place', this.inputPlace)
                lostData.append('time', this.inputTime)
                for(let file of this.fileList){
                    lostData.append('image', file.raw)
                }
                lostData.append('contact_name', this.inputUserName)
                lostData.append('contact_num', this.inputTelephone)
                this.$axios.post(prefix.api + goodsApi.submitChange, lostData).then(response => {
                    console.log(response.data)
                    // 发布失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('修改失败,请重新修改')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消修改'
                })
            })
        },
        // 招领信息修改
        foundSubmitChange() {
            if(this.inputTitle.trim() === ''){
                Message.error('标题不能为空')
                return
            }
            if(this.inputName.trim() === ''){
                Message.error('物品名称不能为空')
                return
            }
            if(this.inputPlace.trim() === ''){
                Message.error('拾到地点不能为空')
                return
            }
            if(this.inputTime === ''){
                Message.error('拾到时间不能为空')
                return
            }
            if(this.inputUserName.trim() === ''){
                Message.error('姓名不能为空')
                return
            }
            if(this.inputTelephone.trim() === ''){
                Message.error('联系方式不能为空')
                return
            }else if(!(/^1[3456789]\d{9}$/.test(this.inputTelephone.trim()))){
                Message.error('联系方式的格式不对,请输入正确的手机长号')
                return
            }
            // 判断问题是否为空
            // if(this.questionAndAnswers){

            // }
            MessageBox.confirm('', '确定修改吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let foundData = new FormData()
                foundData.append('good_id', this.good_id)
                foundData.append('sort', this.sort)
                foundData.append('title', this.inputTitle)
                foundData.append('name', this.inputName)
                foundData.append('place', this.inputPlace)
                foundData.append('time', this.inputTime)
                for(let file of this.fileList){
                    foundData.append('image', file.raw)
                }
                foundData.append('contact_name', this.inputUserName)
                foundData.append('contact_num', this.inputTelephone)
                for(let question of this.questionAndAnswers){
                    foundData.append('questionContent[]', question.questionContent)
                    foundData.append('questionAnswer[]', question.questionAnswer)
                    // 正确答案
                    foundData.append('answer', this.value)
                }
                this.$axios.post(prefix.api + goodsApi.submitChange, foundData).then(response => {
                    console.log(response.data)
                    // 发布失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('发布失败,请重新发布一次')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
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
                this.$axios.post(prefix.api + goodsApi.setRecovered, {
                    good_id: this.good_id
                }).then(response => {
                    console.log(response.data)
                    // 发布失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('设置失败,请重新发设置')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
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
                this.$axios.post(prefix.api + goodsApi.setAbandon, {
                    good_id: this.good_id,
                    sort: this.sorts,
                    user_id: this.user_id
                }).then(response => {
                    console.log(response.data)
                    // 设置失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('设置失败,请重新发设置')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
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
                this.$axios.post(prefix.api + goodsApi.setDelete, {
                    // 这里要发送的数据还是获取不到,为空
                    good_id: this.good_id,
                    sort: this.sorts,
                    user_id: this.user_id
                }).then(response => {
                    console.log(response.data)
                    // 设置失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('设置失败,请重新发设置')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消设置'
                })
            })
        },
        // 确定认领
        setClaim() {
            if(this.foundUserName.trim() === ''){
                Message.error('姓名不能为空')
                return
            }
            if(this.foundUserTelephone.trim() === ''){
                Message.error('联系方式不能为空')
                return
            }
            if(!(/^1[3456789]\d{9}$/.test(this.foundUserTelephone.trim()))){
                Message.error('联系方式的格式不对,请输入正确的手机长号')
                return
            }
            MessageBox.confirm('此操作将永久设置该物品状态为确定认领, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(prefix.api + goodsApi.setClaim, {
                    good_id: this.good_id,
                    found_name: this.foundUserName,
                    found_num: this.foundUserTelephone
                }).then(response => {
                    console.log(response.data)
                    // 设置失败提示
                    if(!responseHandler(response.data, this)){
                        Message.error('设置失败,请重新发设置')
                        return
                    }
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                    this.dialogVisible = false
                })
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
