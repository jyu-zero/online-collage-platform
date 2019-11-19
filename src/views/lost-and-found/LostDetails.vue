
<template>
        <el-main>
            <div class="lost-details-main">
                <el-row type="flex" justify="center" class="lost-title"><h1>求救大家，有没有谁看见我丢的东西</h1></el-row>
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
                                <div slot="header">
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
                                        {{lostPlace}}
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <el-row type="flex">
                                    <el-col>
                                        丢失时间：
                                    </el-col>
                                    <el-col>
                                        {{lostTime}}
                                    </el-col>
                                </el-row>
                                <el-row class="contact-information">
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item title="点击查看联系人信息" name="1">
                                            <el-row class="contact-information-contain">{{contact}}</el-row>
                                        </el-collapse-item>
                                    </el-collapse>
                                </el-row>
                            </el-card>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-main>
</template>

<script>
import { Button, Select, Divider, Image, Container, Card, Row, Col, Main, Collapse, CollapseItem } from 'element-ui'
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
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem
    },
    data() {
        return {
            lostImageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            title: '',
            goodName: '金士顿U盘',
            lostPlace: '嘉应学院',
            lostTime: '2019.11.11',
            contact: '小胖欣 1312311646'
        }
    },
    created () {
        axios
            .post(prefix.api + goodsApi.getLostDetails, {
                good_id: 1
            })
            .then(response => {
                this.goodName = response.data.data.name
                this.lostPlace = response.data.data.place
                this.lostTime = response.data.data.time
            })
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
    .contact-information{
        margin-top: 24px;
    }
    .lost-title{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        padding-bottom: 20px;
    }
}
.contact-information-contain{
    padding-top: 20px;
}
</style>
