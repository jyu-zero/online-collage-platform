
<template>
        <el-main>
            <div class="lost-details-main">
                <el-row type="flex" justify="center" class="lost-title"><h1>求救大家，有没有谁看见我丢的东西</h1></el-row>
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
                                <el-row class="contact-information">
                                    <el-collapse v-model=" activeNames" @change="handleChange">
                                        <el-collapse-item title="点击查看联系人信息" name="1">
                                            小明 1335465464
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
import { Button, Message } from 'element-ui'
export default {
    name: 'Lost-Details',
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    data() {
        return {
            lostImageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
    }
}
</script>

<style lang="less" scoped>
.lost-details-main{
    width: 1166px;
    margin: auto;
    .contact-information{
        margin-top: 24px;
    }
    .lost-title{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
}
</style>
