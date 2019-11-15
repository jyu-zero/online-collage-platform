<template>
    <!-- 失物招领弹窗组件 -->
    <div :class="['dialog']">
        <el-button :type="[{ warning, primary }]" @click="dialogVisible=true">
            <slot></slot>
        </el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Button, Dialog } from 'element-ui'
export default {
    components: {
        name: 'LostAndFoundDialog',
        [Button.name]: Button,
        [Dialog.name]: Dialog
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    props: {
        warning: {
            type: Boolean,
            default: false
        },
        primary: {
            type: Boolean,
            default: false
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

<style scoped lang="less">
.dialog {
    .el-button{
        width: 120px;
        height: 50px;
        margin-right: 20px;
    }
}
</style>
