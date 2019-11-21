<template>
        <el-main>
            <div class="lost-details-main">
                <el-row type="flex" justify="center" class="lost-title"><h1>{{goodTitle}}</h1></el-row>
                <el-row type="flex" >
                    <!-- 展示物品图 -->
                    <el-col>
                        <div class="container">
                            <el-image style="width: 500px; height: 374px" :src="lostImageUrl"></el-image>
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
                                        {{goodName}}
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <el-row type="flex">
                                    <el-col>
                                        丢失地点：
                                    </el-col>
                                    <el-col>
                                        {{foundPlace}}
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <el-row type="flex">
                                    <el-col>
                                        丢失时间：
                                    </el-col>
                                    <el-col>
                                        {{foundTime}}
                                    </el-col>
                                </el-row>
                                <!-- 问题弹窗 -->
                                <el-row class="contact-information" type="flex" justify="end">
                                    <el-button type="success" @click="questionPopUp">获取拾取者联系信息</el-button>
                                        <el-dialog
                                            title="失物信息确认"
                                            :visible.sync="dialogVisible"
                                            width="50%"
                                            :before-close="handleClose">
                                            <router-view></router-view>
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
import { Button, Select, Divider, Image, Container, Card, Row, Col, Main, Dialog, MessageBox } from 'element-ui'
import axios from 'axios'
import { prefix, goodsApi } from '@/api'
export default {
    name: 'Lost-Details',
    components: {
        [Button.name]: Button,
        [Select.name]: Select,
        [Divider.name]: Divider,
        [Image.name]: Image,
        [Container.name]: Container,
        [Card.name]: Card,
        [Row.name]: Row,
        [Col.name]: Col,
        [Main.name]: Main,
        [Dialog.name]: Dialog,
        [MessageBox.name]: MessageBox
    },
    data() {
        return {
            goodTitle: '',
            dialogVisible: false,
            lostImageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            title: '',
            goodName: '',
            foundPlace: '',
            foundTime: '2019.12.16',
            contact: ''
        }
    },
    created () {
        this.getRouterData()
        axios
            .post(prefix.api + goodsApi.getFoundDetails, {
                good_id: this.id,
                sort: this.sort
            })
            .then(response => {
                this.goodTitle = response.data.data.rs[0].title
                this.goodName = response.data.data.rs[0].name
                this.foundPlace = response.data.data.rs[0].place
                this.foundTime = response.data.data.rs[0].time
                this.contactName = response.data.data.rs[0].contact_name
                this.contactPhone = response.data.data.rs[0].contact_num
                this.lostImageUrl = response.data.data.rs[0].contact_image
            })
    },
    methods: {
        // 获取物品的id和类别
        getRouterData() {
            this.good_id = this.$route.params.good_id
            this.good_id = this.$route.params.sort
        },
        // 招领详情页弹出问题窗口
        questionPopUp() {
            this.dialogVisible = true
            this.$router.push({ name: 'questionPopUp' })
        },
        // 关闭弹窗
        handleClose(done) {
            MessageBox.confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        }
    }
}
</script>

<style lang="less" scoped>
.el-main{
    background-color: #fafafa;
}
.lost-details-main{
    width: 1166px;
    margin: auto;
    .lost-title{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        padding-bottom: 20px;
    }
    .contact-information{
        padding-top:24px;
    }
}
</style>
