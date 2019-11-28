<template>
    <!-- 我的失物招领[开始] -->
    <div class="my-lost-and-found">
        <div class="my-lost-and-found-handle">
            <LostAndFoundDialog :buttonTitle="'我丢东西了'" :typeStyle="'warning'" list :prompt="'我丢东西了'">我丢东西了</LostAndFoundDialog>
            <!-- @submit="handleSubmit" -->
            <LostAndFoundDialog :buttonTitle="'我捡到东西了'" :typeStyle="'warning'" list :prompt="'我捡到东西了'">我捡到东西了</LostAndFoundDialog>
        </div>
        <!-- 正在进行 -->
        <div class="my-lost-and-found-do">
            <h2>正在进行</h2>
            <div class="lost-and-found-list">
                <ul v-for="itemDoing of goods" :key="itemDoing.good_id">
                    <!-- 进行与完成的列表最多放4列 -->
                    <li v-if="itemDoing.status==0">
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p v-if="itemDoing.sort==0"><span>我丢失的</span></p>
                                <p v-if="itemDoing.sort==1"><span>我捡到的</span></p>
                            </div>
                            <div class="top">
                                <div class="goods-title">
                                    <p><span>{{itemDoing.title}}</span></p>
                                </div>
                                <div class="goods-condition">
                                    <p v-if="itemDoing.host==1"><span>学院托管</span></p>
                                    <p v-if="itemDoing.host==0"><span>请联系我</span></p>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="lost-and-found-time">
                                    <p><span>于 {{itemDoing.time}} 在</span></p>
                                </div>
                                <div class="lost-and-found-place">
                                    <p v-if="itemDoing.sort==0"><span>{{itemDoing.place}} 丢失</span></p>
                                    <p v-if="itemDoing.sort==1"><span>{{itemDoing.place}} 捡到</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片" v-if="itemDoing.sort==0" @click="goToLostDetails">查看详情</el-button>
                            <el-button type="text" title="点击查看详情和图片" v-if="itemDoing.sort==1" @click="goToFoundDetails">查看详情</el-button>
                        </div>
                        <div class="list-button">
                            <LostAndFoundDialog list :buttonTitle="'点击重新编辑失物信息'" v-if="itemDoing.sort==0" :sort="0">编辑</LostAndFoundDialog>
                            <LostAndFoundDialog list :buttonTitle="'点击重新编辑招领信息'" v-if="itemDoing.sort==1" :sort="1">编辑</LostAndFoundDialog>
                            <LostAndFoundDialog :buttonTitle="'点击设置失物状态'" v-if="itemDoing.sort==0" :typeStyle="'primary'" list :prompt="'设置失物状态'" :good_id="itemDoing.good_id" :user_id="user_id" :sorts="itemDoing.sort">未找回</LostAndFoundDialog>
                            <LostAndFoundDialog :buttonTitle="'点击设置招领状态'" v-if="itemDoing.sort==1" :typeStyle="'primary'" list :prompt="'确认认领'" :good_id="itemDoing.good_id">未归还失主</LostAndFoundDialog>
                        </div>
                    </li>
                </ul>
                <!-- 分页 -->
                <div class="list-pagination">
                    <template>
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="getMyLostAndFoundList"
                            :current-page.sync="currentPage"
                            :page-size="4"
                            layout="prev, pager, next, jumper"
                            :page-count="pageCount">
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
                <ul v-for="itemDone of goods" :key="itemDone.good_id">
                    <li v-if="itemDone.status==1">
                        <div class="lost-and-found-list-left">
                            <div class="lost-and-found-type">
                                <p v-if="itemDone.sort==0"><span>我丢失的</span></p>
                                <p v-if="itemDone.sort==1"><span>我捡到的</span></p>
                            </div>
                            <div class="top">
                                <div class="goods-title">
                                    <p><span>{{itemDone.title}}</span></p>
                                </div>
                                <div class="goods-condition">
                                    <p v-if="!itemDone.hoster"><span>学院托管</span></p>
                                    <p v-if="itemDone.hoster"><span>请联系我</span></p>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="lost-and-found-time">
                                    <p><span>于 {{itemDone.time}} 在</span></p>
                                </div>
                                <div class="lost-and-found-place">
                                    <p v-if="itemDone.sort==0"><span>{{itemDone.place}} 丢失</span></p>
                                    <p v-if="itemDone.sort==1"><span>{{itemDone.place}} 捡到</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="to-details">
                            <el-button type="text" title="点击查看详情和图片" v-if="itemDone.sort==0" @click="goToLostDetails">查看详情</el-button>
                            <el-button type="text" title="点击查看详情和图片" v-if="itemDone.sort==1" @click="goToFoundDetails">查看详情</el-button>
                        </div>
                    </li>
                </ul>
                <!-- 分页 -->
                <div class="list-pagination">
                    <template>
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="getMyLostAndFoundList"
                            :current-page.sync="currentPage"
                            :page-size="4"
                            layout="prev, pager, next, jumper"
                            :page-count="pageCount">
                            </el-pagination>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    <div>

    </div>
    </div>
    <!-- 我的失物招领[结束] -->
</template>

<script>
import { Row, Button, Pagination, Dialog, Message, MessageBox } from 'element-ui'
import LostAndFoundDialog from '../../../components/lost-and-found/LostAndFoundDialog'
// responseHandler, userApi,
import { prefix, responseHandler, goodsApi } from '@/api'
export default {
    name: 'UserCenterLostAndFound',
    components: {
        [Row.name]: Row,
        [Button.name]: Button,
        [Pagination.name]: Pagination,
        [Dialog.name]: Dialog,
        [Message.name]: Message,
        [MessageBox.name]: MessageBox,
        LostAndFoundDialog
    },
    data(){
        return{
            user_id: this.account,
            // 改变按钮组件type的属性
            typeStyle: '',
            // 弹窗的标题提示
            prompt: '',
            // 传给子组件用于判断是失物还是招领模块
            sort: 0,
            // 用于传给组件进行后台数据传递
            sorts: '',
            dialogVisible: false,
            // 动态改变按钮的提示,多此一步是为了解决弹窗中出现title冒泡的问题
            buttonTitle: '',
            pageCount: 1,
            // 当前页数
            currentPage: 1,
            studentName: '',
            studentId: '',
            password: '',
            // 当前是否已登录
            isLogin: false,
            // 登录窗口开关变量
            loginWindow: false,
            // 我的失物招领数据
            goods: []
        }
    },
    // account为学号user_id
    props: ['account'],
    created () {
        this.getGoods()
    },
    methods: {
        // 获取失物招领内容
        getGoods(){
            this.$axios.get(prefix.api + goodsApi.getGoods, {
                user_id: this.account,
                page: this.currentPage
            }).then((response)=>{
                // if(!responseHandler(response.data, this)){
                //     // 提示出错
                //     Message.error('您还未登录')
                //     return
                // }
                this.goods = response.data.data.rs
                this.pageCount = response.data.data.totalpage
            })
        },
        // 跳转至失物详情页
        goToLostDetails(){
            console.log('跳转至失物详情页')
            this.$router.push({
                name: 'LostDetails',
                params: {
                    good_id: 1,
                    sort: 0
                }
            })
        },
        // 跳转至招领详情页
        goToFoundDetails(){
            console.log('跳转至招领详情页')
            this.$router.push({ name: 'FoundDetails' })
        },
        // 关闭element对话框
        handleClose(done) {
            MessageBox.$confirm('确认关闭？')
                .then(() => {
                    done()
                })
                .catch(() => {})
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`)
        // },
        getMyLostAndFoundList(){
            this.$axios.get(prefix.api + goodsApi.getGoods, {
                params: {
                    page: this.currentPage
                }
            }).then(response => {
                console.log(response.data)
                if(!responseHandler(response.data, this)) {
                    Message.error('获取失败,请重新刷新页面')
                    return false
                }
                this.goods = response.data.data.rs
                this.pageCount = response.data.data.totalpage
            })
        }
    }
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
    span{
        font-size: 14px;
        color: #333;
    }
    h2{
        margin: 0;
    }
    .my-lost-and-found{
        margin: 0px 50px 0px 50px;
        // 处理按钮
        .my-lost-and-found-handle{
            display: flex;
            height: 50px;
            margin-top: 30px;
        }
        // 正在进行与已经完成
        .my-lost-and-found-do{
            height: 320px;
            margin-top: 30px;
            width: 1066px;
            margin-bottom: 120px;
            .lost-and-found-list{
                margin:30px 0 10px 0;
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
                            .goods-title{
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
                        width: 80px;
                        line-height: 80px;
                        margin-right: 40px;
                    }
                    .lost-and-found-list-right{
                        padding-top: 10px;
                        :nth-child(n){
                            float: left;
                            line-height: 2;
                            padding: 5px 25px;
                        }
                    }
                    .list-button{
                        display: flex;
                        height: 80px;
                        align-items: center;
                        line-height: 80px;
                    }
                }
                .list-pagination{
                    display: flex;
                    margin-top: 10px;
                }
            }
        }
    }
</style>
