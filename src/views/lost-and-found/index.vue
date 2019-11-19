<template>
    <!-- 失物招领列表页面[开始] -->
    <div class="lost-found-page">
        <div class="lost-found-head-list">
            <h2>失物招领</h2>
            <el-button type="primary" title="点击去我的失物招领" @click="goToUserCenterLostAndFound">我的失物招领</el-button>
            <LostAndFoundDialog :buttonTitle="'点击发布失物信息'" :typeStyle="'warning'" head :prompt="'我丢东西了'">我丢东西了</LostAndFoundDialog>
            <LostAndFoundDialog :buttonTitle="'点击发布招领信息'" :typeStyle="'warning'" head :prompt="'我捡到东西了'">我捡到东西了</LostAndFoundDialog>
            <el-input class="el-input" placeholder="请输入内容" v-model="input" clearable></el-input>
        </div>
        <div class="lost-found-list">
            <ul v-for="item of goods" :key="item.good_id">
                <li>
                    <div class="lost-and-found-list-left">
                        <div class="lost-and-found-type">
                            <p v-if="item.sort==0"><span>遗失</span></p>
                            <p v-if="item.sort==1"><span>认领</span></p>
                        </div>
                        <div class="top">
                            <div class="goods-name">
                                <p><span>{{item.name}}</span></p>
                            </div>
                            <div class="goods-condition">
                                <p v-if="!item.trusteeship"><span>学院托管</span></p>
                                <p v-if="item.trusteeship"><span>请联系我</span></p>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="lost-and-found-time">
                                <p><span>于 {{item.time}} 在</span></p>
                            </div>
                            <div class="lost-and-found-place">
                                <p v-if="item.sort==0"><span>{{item.place}} 丢失</span></p>
                                <p v-if="item.sort==1"><span>{{item.place}} 捡到</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="to-details">
                        <el-button title="点击查看详情和图片" type="primary" v-if="item.sort==0" @click="goToLostDetails">查看详情</el-button>
                        <el-button title="点击查看详情和图片" type="primary" v-if="item.sort==1" @click="goToFoundDetails">查看详情</el-button>
                        <!-- :buttonTitle="'点击设置失物状态'" -->
                        <LostAndFoundDialog :typeStyle="'primary'" :disabled="'disabled'" v-if="item.status==0&&item.sort==0" list :prompt="'未完成'">未完成</LostAndFoundDialog>
                        <!-- :buttonTitle="'点击设置招领状态'" -->
                        <LostAndFoundDialog :typeStyle="'primary'" :disabled="'disabled'" v-if="item.status==0&&item.sort==1" list :prompt="'未完成'">未完成</LostAndFoundDialog>
                        <LostAndFoundDialog :typeStyle="'warning'" :disabled="'disabled'" v-if="item.status==1" list>已完成</LostAndFoundDialog>
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
    <!-- 失物招领列表页面[结束] -->
</template>

<script>
import { Button, Message, Pagination, Input, MessageBox } from 'element-ui'
import LostAndFoundDialog from '../../components/lost-and-found/LostAndFoundDialog'
import { prefix, goodsApi } from '@/api'
export default {
    name: 'Lost-Found',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Pagination.name]: Pagination,
        [Input.name]: Input,
        [MessageBox.name]: MessageBox,
        LostAndFoundDialog
    },
    data() {
        return {
            // 动态改变按钮组件type的属性
            typeStyle: '',
            // 动态改变按钮组件的类型
            disabled: '',
            // 弹窗的标题提示
            prompt: '',
            // 动态改变按钮的提示,多此一步是为了解决弹窗中出现title冒泡的问题
            buttonTitle: '',
            currentPage3: 5,
            input: '',
            // 我的失物招领数据
            goods: [
                {
                    id: 0,
                    // lost: true,
                    // 0代表进行,1代表完成,主页面不显示已经完成的列表
                    status: 1,
                    // 0丢失,1认领
                    sort: 0,
                    name: '蓝色小水杯',
                    // 是否学院托管
                    trusteeship: false,
                    place: '中区主球场',
                    time: '2019-02-23'
                },
                {
                    id: 1,
                    // 0代表进行,1代表完成
                    status: 0,
                    // 0丢失,1认领
                    sort: 1,
                    name: '卡西欧手表',
                    // 是否学院托管
                    trusteeship: true,
                    place: '中区篮球场',
                    time: '2019-06-04'
                },
                {
                    id: 2,
                    // 0代表进行,1代表完成
                    status: 0,
                    // 0丢失,1认领
                    sort: 0,
                    name: '小米手机',
                    // 是否学院托管
                    trusteeship: true,
                    place: '南区食堂',
                    time: '2018-12-16'
                },
                {
                    id: 3,
                    // 0代表进行,1代表完成
                    status: 0,
                    // 0丢失,1认领
                    sort: 0,
                    name: '一卡通171100220',
                    // 是否学院托管
                    trusteeship: false,
                    place: '全校',
                    time: '2019-06-11'
                },
                {
                    id: 3,
                    // 0代表进行,1代表完成
                    status: 0,
                    // 0丢失,1认领
                    sort: 1,
                    name: '一卡通171100220',
                    // 是否学院托管
                    trusteeship: false,
                    place: '全校',
                    time: '2019-06-11'
                },
                {
                    id: 3,
                    // 0代表进行,1代表完成
                    status: 0,
                    // 0丢失,1认领
                    sort: 1,
                    name: '一卡通171100220',
                    // 是否学院托管
                    trusteeship: false,
                    place: '全校',
                    time: '2019-06-11'
                },
                {
                    id: 3,
                    // 0代表进行,1代表完成
                    status: 1,
                    // 0丢失,1认领
                    sort: 1,
                    name: '一卡通171100220',
                    // 是否学院托管
                    trusteeship: false,
                    place: '全校',
                    time: '2019-06-11'
                },
                {
                    id: 3,
                    // 0代表进行,1代表完成
                    status: 1,
                    // 0丢失,1认领
                    sort: 1,
                    name: '一卡通171100220',
                    // 是否学院托管
                    trusteeship: false,
                    place: '全校',
                    time: '2019-06-11'
                }
            ]
        }
    },
    methods: {
        // 获取失物招领内容
        getGoods(){
            this.$axios.get(prefix.api + goodsApi.getGoods).then((response)=>{
                // if(!responseHandler(response.data, this)){
                //     // 提示出错
                //     Message.error('您还未登录')
                //     return
                // }
                this.goods = response.data.data
                console.log(response.data.data)
            })
        },
        // 跳转至我的失物招领页面
        goToUserCenterLostAndFound(){
            console.log('跳转至我的失物招领页面')
            this.$router.push({ name: 'UserCenterLostAndFound' })
        },
        // 跳转至失物详情页
        goToLostDetails(){
            console.log('跳转至失物详情页')
            this.$router.push({ name: 'LostDetails' })
        },
        // 跳转至招领详情页
        goToFoundDetails(){
            console.log('跳转至招领详情页')
            this.$router.push({ name: 'FoundDetails' })
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style lang="less" scoped>
html,
body {
    background: #fff;
    margin: 0;
    padding: 0;
}
ul,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: #fff;
}
span {
    color: #333;
}
h2 {
    margin: 0;
}
p {
    margin: 0;
    padding: 0;
    width: 38px;
    height: 18px;
}
.white {
    color: #fff;
}
.lost-found-page {
    // height: 100%;
    display: flex;
    margin: auto;
    flex-direction: column;
    box-sizing: border-box;
    // background-color: pink;
    .lost-found-head-list {
        width: 1166px;
        height: 60px;
        line-height: 60px;
        display: flex;
        margin-top: 30px;
        // border: 1px solid blue;
        padding: 0 14px;
        h2 {
            margin: 0 200px 0 0px;
        }
        .el-button{
            width: 160px;
            height: 50px;
            margin: 5px 20px 0 0;
        }
        .el-input {
            width: 300px;
        }
    }

    .lost-found-list {
        width: 996px;
        margin: 30px auto;
        li{
            display: flex;
            margin:0px 0px -1px -1px;
            height: 80px;
            border: 1px solid #000;
            // padding:12px;
            .lost-and-found-list-left{
                width: 650px;
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
                .top{
                    display: flex;
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
                }
                .bottom{
                    .lost-and-found-time{
                        float: left;
                    }
                    .lost-and-found-place{
                        float: left;
                        margin: 1px 0 0 -5px;
                    }
                }

            }
            .to-details{
                display: flex;
                height: 80px;
                align-items: center;
                line-height: 80px;
                .el-button{
                    width: 120px;
                    height: 50px;
                    margin-right: 20px;
                }

            }
        }
        .list-pagination{
            display: flex;
            margin: 20px 0 20px 310px;
        }
    }
}
</style>
