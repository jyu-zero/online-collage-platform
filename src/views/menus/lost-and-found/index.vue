<template>
    <!-- 我的失物招领[开始] -->
    <div class="my-lost-and-found">
        <!-- 处理按钮 -->
        <div class="my-lost-and-found-handle">
            <el-row>
                <el-button type="warning">我丢东西了</el-button>
                <el-button type="warning">我捡到东西了</el-button>
            </el-row>
        </div>
        <!-- 正在进行 -->
        <div class="my-lost-and-found-do">
            <h2>正在进行</h2>
            <div class="lost-and-found-list">
                <ul>
                    <li>
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p><span>我丢失的</span></p>
                            </div>
                            <div class="goods-name">
                                <p><span>蓝色金士顿U盘</span></p>
                            </div>
                            <div class="goods-condition">
                                <p><span>学院托管</span></p>
                            </div>
                            <div class="lost-and-found-time">
                                <p><span>于 2019-11-09 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p><span>锡科202 丢失</span></p>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片">查看详情</el-button>
                        </div>
                        <div class="lost-and-found-list-right">
                            <el-row>
                                <el-button>编辑</el-button>
                                <el-button type="primary">未找回</el-button>
                            </el-row>
                        </div>
                    </li>
                    <li>
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p><span>我丢失的</span></p>
                            </div>
                            <div class="goods-name">
                                <p><span>蓝色金士顿U盘</span></p>
                            </div>
                            <div class="goods-condition">
                                <p><span>学院托管</span></p>
                            </div>
                            <div class="lost-and-found-time">
                                <p><span>于 2019-11-09 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p><span>锡科202 丢失</span></p>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片">查看详情</el-button>
                        </div>
                        <div class="lost-and-found-list-right">
                            <el-row>
                                <el-button>编辑</el-button>
                                <el-button type="primary" disabled>已找回</el-button>
                            </el-row>
                        </div>
                    </li>
                    <li>
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p><span>我捡到的</span></p>
                            </div>
                            <div class="goods-name">
                                <p><span>蓝色金士顿U盘</span></p>
                            </div>
                            <div class="goods-condition">
                                <p><span>学院托管</span></p>
                            </div>
                            <div class="lost-and-found-time">
                                <p><span>于 2019-11-09 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p><span>锡科202 丢失</span></p>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片">查看详情</el-button>
                        </div>
                        <div class="lost-and-found-list-right">
                            <el-row>
                                <el-button>编辑</el-button>
                                <el-button type="primary" disabled>已归还</el-button>
                            </el-row>
                        </div>
                    </li>
                </ul>
                <!-- 分页 -->
                <div class="list-pagination">
                    <template>
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage3"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="500">
                            </el-pagination>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <!-- 已经完成 -->
        <div class="my-lost-and-found-do">
            <h2>已经完成</h2>
            <div class="lost-and-found-list">
                <ul>
                    <li>
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p><span>我丢失的</span></p>
                            </div>
                            <div class="goods-name">
                                <p><span>蓝色金士顿U盘</span></p>
                            </div>
                            <div class="goods-condition">
                                <p><span>学院托管</span></p>
                            </div>
                            <div class="lost-and-found-time">
                                <p><span>于 2019-11-09 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p><span>锡科202 丢失</span></p>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片">查看详情</el-button>
                        </div>
                        <!-- <div class="lost-and-found-list-right">
                            <el-row>
                                <el-button>编辑</el-button>
                                <el-button type="primary" disabled>已找回</el-button>
                            </el-row>
                        </div> -->
                    </li>
                    <li>
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p><span>我丢失的</span></p>
                            </div>
                            <div class="goods-name">
                                <p><span>蓝色金士顿U盘</span></p>
                            </div>
                            <div class="goods-condition">
                                <p><span>学院托管</span></p>
                            </div>
                            <div class="lost-and-found-time">
                                <p><span>于 2019-11-09 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p><span>锡科202 丢失</span></p>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片">查看详情</el-button>
                        </div>
                        <!-- <div class="lost-and-found-list-right">
                            <el-row>
                                <el-button>编辑</el-button>
                                <el-button type="primary" disabled>已找回</el-button>
                            </el-row>
                        </div> -->
                    </li>
                    <li>
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p><span>我丢失的</span></p>
                            </div>
                            <div class="goods-name">
                                <p><span>蓝色金士顿U盘</span></p>
                            </div>
                            <div class="goods-condition">
                                <p><span>学院托管</span></p>
                            </div>
                            <div class="lost-and-found-time">
                                <p><span>于 2019-11-09 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p><span>锡科202 丢失</span></p>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片">查看详情</el-button>
                        </div>
                        <!-- <div class="lost-and-found-list-right">
                            <el-row>
                                <el-button>编辑</el-button>
                                <el-button type="primary" disabled>已找回</el-button>
                            </el-row>
                        </div> -->
                    </li>
                </ul>
                <!-- 分页 -->
                <div class="list-pagination">
                    <template>
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage3"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="500">
                            </el-pagination>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </div>
    <!-- 我的失物招领[结束] -->
</template>

<script>
export default {
    name: 'FileShare'
}
</script>

<style lang="less" scoped>
    .overview{
        height:100%;
        display: flex;
        flex-direction: column;
    }
    ul,li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    // p{
    //     margin: 0;
    //     padding:0;
    //     width: 38px;
    //     height: 18px;
    // }
    span{
        font-size: 14px;
        color: #333;
    }
    h2{
        margin: 0;
    }
    .my-lost-and-found{
        // background-color: pink;
        margin: 0px 50px 0px 50px;
        // 处理按钮
        .my-lost-and-found-handle{
            height: 50px;
            margin-top: 30px;
            // border: 1px solid #333;
            :nth-child(2){
                margin-left: 80px;
            }
        }
        // 正在进行与已经完成
        .my-lost-and-found-do{
            height: 320px;
            margin-top: 30px;
            margin-bottom: 50px;
            .lost-and-found-list{
                margin:30px 0 10px 0;
                li{
                    display: flex;
                    margin:0px 0px -1px -1px;
                    height: 80px;
                    border: 1px solid #000;
                    // padding:12px;
                    .lost-and-found-list-left{
                        width: 350px;
                        height: 80px;
                        // margin-right: 300px;
                        p{
                            display: inline;
                            text-align: center;
                            padding: 6px;
                        }
                        .lost-and-found-type{
                            float: left;
                            line-height: 80px;
                            margin: 0 20px 0 20px;
                            p{
                                background-color: #d7d7d7;
                            }
                        }
                        .goods-name{
                            float: left;
                            margin-top: 20px;
                            p{
                                font-weight: 650;
                                margin-right: 10px;
                                span{
                                    font-size: 18px;
                                }
                            }
                        }
                        .goods-condition{
                            float: left;
                            margin: 15px 0 0 -5px;
                            p{
                                background-color: #d7d7d7;
                            }
                        }
                        .lost-and-found-time{
                            float: left;
                        }
                        .lost-and-found-place{
                            float: left;
                            margin: 1px 0 0 -5px;
                        }
                    }
                    .to-details{
                        margin: 20px 300px 0 0px;
                    }
                    .lost-and-found-list-right{
                        padding-top: 10px;
                        :nth-child(n){
                            float: left;
                            line-height: 2;
                            padding: 5px 25px;
                        }
                    }
                }
                .list-pagination{
                    // display: flex;
                    margin-top: 20px;
                }
            }
        }
        .list-pagination:nth-child(1){
            margin-bottom: 30px;
        }
    }
</style>
