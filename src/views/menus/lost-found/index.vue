<template>
    <!-- 失物招领列表页面[开始] -->
    <div class="lost-found-page">
        <!-- 头部部分[开始] -->
        <header>
            <h1>线上学院平台</h1>

            <!-- 用户登录[开始] -->
            <div class="lost-found-login">
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
            </div>
            <!-- 头部列表[结束] -->
        </header>
        <!-- 头部部分[结束] -->

        <!-- 中间部分[开始] -->
        <main>
            <div class="lost-found-main">
                <div class="lost-found-head-list">
                    <h3>失物招领</h3>
                    <el-row class="el-row">
                        <el-button type="primary">我的失物招领</el-button>
                        <el-button type="primary">我丢东西了</el-button>
                        <el-button type="primary">我找到东西了</el-button>
                    </el-row>
                    <el-input class="el-input" placeholder="请输入内容" v-model="input" clearable></el-input>
                </div>
                <div class="lost-found-list">
                    <ul>
                        <li>
                            <div class="lost-found-message">
                                <div class="lost-found-message-top">
                                    <div class="lost-found-type">
                                        <p><span>认领</span></p>
                                    </div>
                                    <div class="goods-name">
                                        <p><span>蓝色金士顿U盘</span></p>
                                    </div>
                                    <div class="goods-condition">
                                        <p><span>学院托管</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-message-bottom">
                                    <div class="lost-found-place">
                                        <p><span>锡科202</span></p>
                                    </div>
                                    <div class="lost-found-time">
                                        <p><span>2019-11-09</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-details">
                                    <el-row class="el-row">
                                        <el-button type="primary">查看详情</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="lost-found-message">
                                <div class="lost-found-message-top">
                                    <div class="lost-found-type">
                                        <p><span>认领</span></p>
                                    </div>
                                    <div class="goods-name">
                                        <p><span>蓝色U盘</span></p>
                                    </div>
                                    <div class="goods-condition">
                                        <p><span>学院托管</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-message-bottom">
                                    <div class="lost-found-place">
                                        <p><span>锡科202</span></p>
                                    </div>
                                    <div class="lost-found-time">
                                        <p><span>2019-11-09</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-details">
                                    <el-row class="el-row">
                                        <el-button type="primary">查看详情</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="lost-found-message">
                                <div class="lost-found-message-top">
                                    <div class="lost-found-type">
                                        <p><span>认领</span></p>
                                    </div>
                                    <div class="goods-name">
                                        <p><span>蓝色U盘</span></p>
                                    </div>
                                    <div class="goods-condition">
                                        <p><span>学院托管</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-message-bottom">
                                    <div class="lost-found-place">
                                        <p><span>锡科202</span></p>
                                    </div>
                                    <div class="lost-found-time">
                                        <p><span>2019-11-09</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-details">
                                    <el-row class="el-row">
                                        <el-button type="primary">查看详情</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="lost-found-message">
                                <div class="lost-found-message-top">
                                    <div class="lost-found-type">
                                        <p><span>认领</span></p>
                                    </div>
                                    <div class="goods-name">
                                        <p><span>蓝色U盘</span></p>
                                    </div>
                                    <div class="goods-condition">
                                        <p><span>学院托管</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-message-bottom">
                                    <div class="lost-found-place">
                                        <p><span>锡科202</span></p>
                                    </div>
                                    <div class="lost-found-time">
                                        <p><span>2019-11-09</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-details">
                                    <el-row class="el-row">
                                        <el-button type="primary">查看详情</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="lost-found-message">
                                <div class="lost-found-message-top">
                                    <div class="lost-found-type">
                                        <p><span>认领</span></p>
                                    </div>
                                    <div class="goods-name">
                                        <p><span>蓝色U盘</span></p>
                                    </div>
                                    <div class="goods-condition">
                                        <p><span>学院托管</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-message-bottom">
                                    <div class="lost-found-place">
                                        <p><span>锡科202</span></p>
                                    </div>
                                    <div class="lost-found-time">
                                        <p><span>2019-11-09</span></p>
                                    </div>
                                </div>
                                <div class="lost-found-details">
                                    <el-row class="el-row">
                                        <el-button type="primary">查看详情</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="lost-found-list-pagination">
                        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
                    </div>
                </div>
            </div>
        </main>
        <!-- 中间部分[结束] -->

        <!-- 底部部分[开始] -->
        <footer>
            <div class="lost-found-footer">
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
    name: 'Lost-Found',
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    data() {
        return {
            input: ''
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
.lost-found-page{
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
        .lost-found-login{
            
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

            span:nth-child(2){
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
.lost-found-main{
    // display: flex;
    width: 1166px;
    // border:1px solid #000;
    margin: auto;

    .lost-found-head-list{
        width: 1166px;
        height: 60px;
        line-height: 60px;
        display: flex;
        margin-top: 20px;

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

    .lost-found-list{
        width: 1026px;
        height: 750px;
        margin: auto;
        padding: 50px 0  0 20px;
        li{
            margin:0px 0px -1px -1px;
            height: 66px;
            border: 1px solid #000;
            padding:12px;
            // 中间列表
            .lost-found-message{
                display: block;
                // width: 190px;
                height: 44px;
                font-size: 14px;
                .lost-found-message-top{
                    height: 22px;
                    p{
                        display: inline;
                        text-align: center;
                        padding: 3px;
                    }
                    .lost-found-type{
                        float: left;
                        p{
                            margin-right: 10px;
                            background-color: #d7d7d7;
                        }
                    }
                    .goods-name{
                        float: left;
                        p{
                            margin-right: 10px;
                        }
                    }
                    .goods-condition{
                        float: left;
                        p{
                            
                            background-color: #d7d7d7;
                        }
                    }
                }
                .lost-found-message-bottom{
                    p{
                        display: inline;
                        text-align: center;
                    }
                    .lost-found-place{
                        float: left;
                        p{
                            margin-right: 20px;
                        }
                    }
                    .lost-found-time{
                        float: left;
                   
                    }
                }
                .lost-found-details{
                    float: right;
                    margin-top: -20px;
                }
            }

        }
        .lost-found-list-pagination{
            margin-top:20px;
            text-align: center;
        }
    }
}
// 中间部分[结束]

// 底部部分[开始]
.lost-found-footer{
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
