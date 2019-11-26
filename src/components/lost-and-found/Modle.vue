<template>
    <!-- 失物招领弹窗组件 -->
    <div :class="['dialog']">
        <el-button :class="[{ head,list }]" :type="typeStyle" @click="dialogVisible=true" :disabled="disabled">
            <slot></slot>
        </el-button>
        <el-dialog
            :title="prompt"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <!-- 标题 -->
            <span>标题</span>
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <!-- 物品名字 -->
            <span>需要找回的物品名</span>
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <!-- 地点 -->
            <span>可能遗失的地点</span>
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <!-- 物品图片 -->
            <span>遗失物品图片</span>
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
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <!-- 姓名 -->
            <span>您的姓名</span>
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <!-- 联系方式 -->
            <span>您的联系方式</span>
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Button, Dialog, Input } from 'element-ui'
export default {
    components: {
        name: 'LostAndFoundDialog',
        [Button.name]: Button,
        [Dialog.name]: Dialog,
        [Input.name]: Input
    },
    data() {
        return {
            // 设置弹窗是否可见
            dialogVisible: false,
            input: ''
        }
    },
    props: {
        typeStyle: {
            type: String,
            default: ''
        },
        head: {
            type: Boolean,
            default: false
        },
        list: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        prompt: {
            type: String,
            default: '编辑'
        }
    },
    methods: {
        handleClick(){
            this.$emit('click')
        },
        // 关闭element对话框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        }
    }
}
</script>

<style lang="less">
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
    }
}

</style>