<template>
        <el-main>
            <div class="lost-details-main">
                <el-row type="flex" justify="center" class="lost-title"><h1>哪个倒霉孩子丢东西啦</h1></el-row>
                <el-row type="flex" >
                    <!-- 展示物品图 -->
                    <el-col>
                        <div class="container">
                            <el-image style="width: 450px; height: 500px" :src="lostImageUrl"></el-image>
                        </div>
                    </el-col>
                    <!-- 展示物品信息 -->
                    <el-col>
                        <!-- 物品的基本信息 -->
                        <el-row>
                            <el-card class="box-card">
                                <div slot="header" >
                                    <el-row type="flex" justify="center">
                                        <h2>物品信息</h2>
                                    </el-row>
                                </div>
                                <el-row type="flex">
                                    <el-col>
                                        物品名：
                                    </el-col>
                                    <el-col>
                                        金士顿u盘
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <el-row type="flex">
                                    <el-col>
                                        丢失地点：
                                    </el-col>
                                    <el-col>
                                        田师201
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <el-row type="flex">
                                    <el-col>
                                        丢失时间：
                                    </el-col>
                                    <el-col>
                                        2010.12.03c
                                    </el-col>
                                </el-row>
                                <el-row class="contact-information" >
                                    <el-button type="success" @click="questionPopUp">获取拾取者联系信息</el-button>
                                        <el-dialog
                                            title="回答问题才能获取联系信息"
                                            :visible.sync="dialogVisible"
                                            width="50%"
                                            :before-close="handleClose">
                                            <router-view></router-view>
                                            <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="dialogVisible = false">下一题</el-button>
                                            </span>
                                        </el-dialog>

                                </el-row>
                            </el-card>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-main>
</template>

<script>
import { Button, Message, Main, Row, Col, Divider, Card, Dialog, Image } from 'element-ui'
export default {
    name: 'Lost-Details',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Main.name]: Main,
        [Row.name]: Row,
        [Col.name]: Col,
        [Divider.name]: Divider,
        [Card.name]: Card,
        [Dialog.name]: Dialog,
        [Image.name]: Image
    },
    data() {
        return {
            dialogVisible: false,
            lostImageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
    },
    methods: {
        // 招领详情页弹出问题窗口
        questionPopUp() {
            this.dialogVisible = true
            this.$router.push({ name: 'questionPopUp' })
        }
    }
}
</script>

<style lang="less" scoped>
.lost-details-main{
    width: 1166px;
    margin: auto;
    .lost-title{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .contact-information{
        padding-top:24px;
    }
}
</style>
