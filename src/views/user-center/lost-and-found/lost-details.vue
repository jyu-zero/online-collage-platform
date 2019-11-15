<template>
    <!-- 失物招领列表页面[开始] -->
    <div class="lost-details-page">
        <!-- 头部部分[开始] -->
        <header>
            <h1>线上学院平台</h1>

            <!-- 用户登录[开始] -->
            <div class="lost-details-login">
                <i class="login">
                    <!-- <div class="icon"><img src="/src/assets/login.png" alt=""></div> -->
                    <span>shenhongzhen</span>
                    <!-- <div class="icon"><img src="/src/assets/list.png" alt=""></div> -->
                </i>
                <i class="list"></i>
            </div>
            <!-- 用户登录[结束] -->

            <!-- 头部列表[开始] -->
            <div class="breadcrumb">
                <a href="#" title="首页"><span class="white">首页</span></a>
                <span class="white">＞</span>
                <a href="#" title="失物招领"><span class="white">失物招领</span></a>
                <span class="white">＞</span>
                <span class="white">招领</span>
            </div>
            <!-- 头部列表[结束] -->
        </header>
        <!-- 头部部分[结束] -->

        <!-- 中间部分[开始] -->
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
                                    <span>物品信息</span>
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
        <!-- 中间部分[结束] -->

        <!-- 底部部分[开始] -->
        <footer>
            <div class="lost-details-footer">
                <p>
                    <span class="white">
                        版权所有©ZERO软件开发中心<br>
                        地址：广东省梅州市梅松路 邮编：514015
                    </span>
                </p>
            </div>
        </footer>
        <!-- 底部部分[结束] -->
    </div>
    <!-- 失物招领列表页面[结束] -->

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
html,body {
  background: #fff;
  margin: 0;
  padding: 0;
}
ul,li {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration:none;
  color: #fff;
}
span{
    color: #333;
}
h3{
    margin: 0;
}
p{
    margin: 0;
    padding:0;
    width: 38px;
    height: 18px;
}
.white{
    color: #fff;
}
// 头部部分[开始]
.lost-details-page{
    height:100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    header{
        height: 160px;
        h1{
            // width: 200px;
            margin: 20px 0 20px 100px;
        }
        .lost-details-login{
            
            // display: flex;
            float: right;
            margin-top: -50px;
            // justify-content:flex-end;
            // align-items: center;
            .login {
                display: flex;
                background-size: 16px;
                margin-right: 8px;
                justify-content:center;
                // .icon{
                //     height: 16px;
                //     width: 16px;
                //     }
                // img{
                //     height: 12px;
                //     width: 12px;
                //     background-color: pink;
                // }
            }
            span {
                margin-right: 20px;
                text-align: center;
                // font-size: 12px;
                color: #000;
            }
            & :hover {
                color: #169BD5;
            }
        }
        .breadcrumb{
            display: flex;
            height: 50px;
            line-height: 50px;
            background-color: #169BD5;
            padding-left: 100px;

            span:nth-child(even){
                margin: 0px 10px;
            }
            a :hover{
                color: #000;
            }
        }
    }
}
// 头部部分[结束]

// 中间部分[开始]
.lost-details-main{
    // display: flex;
    width: 1166px;
    // border:1px solid #000;
    margin: auto;

    .lost-details-head-list{
        width: 1166px;
        height: 60px;
        line-height: 60px;
        display: flex;
        margin-top: 20px;
        background-color: #555;
        h3{
            margin: 0 316px 0 70px;
        }
        .el-row{
            margin-right: 20px;
        }
        .el-input{
            width: 300px;
 
        }
    }

    .lost-details-list{
        width: 1026px;
        height: 750px;
        margin: auto;
        background-color: pink;
        padding: 50px 0  0 20px;
    }

    .lost-title{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    
    .contact-information{
        padding-top:24px;

    }
}
// 中间部分[结束]

// 底部部分[开始]
.lost-details-footer{
    width: 100%;
    height: 70px;
    text-align:center;
    background-color:#169BD5;
    padding-top: 16px;
    p{
        display: inline;
        span{
            font-size: 14px;
        }
    }
}
// 底部部分[结束]
</style>
