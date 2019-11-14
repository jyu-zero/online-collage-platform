<template>
    <div class="home-page" >
        <!--头部-->
        <header>
            <h1>线上学院平台</h1>
            <!--下拉菜单-->
            <div class="header-right"  v-if="isLogin" >
                <div class="new-msg">
                    <i class="el-icon-message"></i>
                    <span class="msg-num">996</span>
                </div>
                <el-dropdown trigger="click"  >
                  <span class="el-dropdown-link " id='dropdown-btn'>
                      <div >
                          <div class="user-name" >{{this.studentName}}</div>
                          <div class="user-id" >{{this.studentId}}</div>
                      </div>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-user" ><span @click="goToUserCenter">个人中心</span></el-dropdown-item>
                      <el-dropdown-item icon="el-icon-close" ><span @click="logout">注销</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!--下拉菜单.结束-->
            <!--登录按钮-->
            <el-button  id="go-to-login" type="info"  plain v-if="!isLogin" @click="showLoginWindow" >登录</el-button>
        </header>

        <!--主体部分-->
        <main>
            <!--主体左侧-->
            <div class="main-left">
                <!--新闻内容-->
                <div class="news-container">
                  <div class="container-header">
                      <h2>新闻中心</h2>
                      <span @click="goToNewsPage">查看更多</span>
                  </div>
                  <dl class="news-list">
                    <dt class="news-item" v-for="item of news" :key="item.id" >
                      <span class="set-top-label" v-if="item.setTop===1">[置顶] </span>
                      <span class="news-title">{{item.title}}  </span>
                      <span class="news-date">({{item.time}})</span>
                      <span class="watch-times-count">
                        <font-awesome-icon icon="eye" />
                         {{item.viewCount}}
                      </span>
                    </dt>
                  </dl>
                </div>
                <!--在线问答-->
                <div class="online-question">
                  <div class="container-header">
                      <h2>在线问答</h2>
                      <span @click="goToQuestionPage">查看更多</span>
                  </div>
                  <dl class="question-list">
                    <dt class="question-item" v-for="item of questions" :key="item.id" >
                      <div class="question-status">
                        <span v-if="item.solve">已解决</span>
                        <span v-if="!item.solve">待解决</span>
                      </div>
                      <div class="question-info">
                        <h3>{{item.content}}                   <span v-if="item.setTop">置顶</span></h3>
                        <div>
                          <div>
                            由
                            <span class="quizzer"> {{item.name}} </span>
                            提问
                            <span class="question-time">{{item.time}}  </span>
                            <font-awesome-icon icon="tag" />
                            <span class="question-type">{{item.type}}</span>
                          </div>
                          <div class="view-reply-count">
                            <font-awesome-icon icon="eye" />
                            <span class="count">{{item.viewCount}}</span>
                            <font-awesome-icon icon="comment-dots" />
                            <span class="count">{{item.comment}}</span>
                          </div>
                        </div>
                      </div>
                    </dt>
                  </dl>
                </div>
            </div>

            <!--主体右侧-->
            <div class="main-right">
                <!--用户中心-->
                <div class="user-info"  v-if="isLogin">
                  <div id="num-msg">
                    <ul>
                      <li><p id="article-count">24</p>我的问题</li>
                      <li><p id="member-count">30</p>我的回答</li>
                      <li><p id="reply-count">41</p>我的失物</li>
                    </ul>
                  </div>
                  <div id="user-center" @click="goToUserCenter">个人中心</div>
                </div>
                <!--失物招领-->
                <div class="lost-and-found">
                  <div class="container-header">
                    <h2>失物招领</h2>
                    <span @click="goToLostAndFound">查看更多</span>
                  </div>
                  <dl class="lost-item-list">
                    <dt class="lost-item" v-for="item of goods" :key="item.good_id" >
                      <div class="item-status">
                        <span v-if="!item.lost">认领</span>
                        <span v-if="item.lost">遗失</span>
                        <h3 class="goods-name">{{item.name}}</h3>
                        <span>{{item.hoster}}</span>
                      </div>
                      <div class="lost-msg">
                        <span class="lost-place">
                          {{item.place}}
                        </span>
                        <span class="lost-time">
                          {{item.time}}
                        </span>
                      </div>
                    </dt>
                  </dl>
                </div>
                <!--资源共享-->
                <div class="source-share">
              <div class="container-header">
                <h2>资料共享</h2>
                <span @click="goToSourceShare">查看更多</span>
              </div>
              <dl class="document-list">
                <dt class="document-item" v-for="item of documents" :key="item.id" >
                  <div>
                  <i class="el-icon-document document-icon"></i>
                  </div>
                  <div class="document-info">
                    <p>
                      <span>{{item.name}}</span>
                    </p>
                    <p>
                      <font-awesome-icon icon="tag" />
                      <span class="label-content">{{item.type}}</span>
                      <font-awesome-icon icon="download" />
                      <span class="label-content">{{item.downloadTimes}}</span>
                      <span class="upload-time">{{item.time}}</span>
                    </p>
                  </div>
                  <el-button  class="download-btn" type="info"  plain>下载</el-button>
                </dt>
              </dl>
            </div>
            </div>

        </main>

        <div id="login-container" v-if="loginWindow" v-cloak>
          <span id="cancel-btn"  @click="showLoginWindow">×</span>
          <h2>登录窗口</h2>
          <p>学号</p>
          <el-input  v-model="account" placeholder="请输入学号" ></el-input>
          <p>密码</p>
          <el-input  type="password" v-model="password" placeholder="请输入密码"></el-input>
          <p><el-button type="text" @click="dialogVisible = true">忘记密码？</el-button></p>
          <div class="btn-container">
          <el-button  id="login-btn" type="info" @click="login"  plain >登录</el-button>
          </div>
        </div>
        <!--忘记密码的弹窗提示-->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
       >
        <span>若忘记密码，请带上学生证前往锡昌科技大楼116重置密码</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="info" plain class="understand-btn">了解</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem, Button, Input, Message, Dialog } from 'element-ui'
import { prefix, responseHandler, userApi, goodsApi } from '@/api'
export default {
    name: 'HomePage',
    components: {
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Button.name]: Button,
        [Input.name]: Input,
        [Message.name]: Message,
        [Dialog.name]: Dialog
    },
    data() {
        return {
            studentName: '',
            studentId: '',
            account: '',
            password: '',
            // 当前是否已登录
            isLogin: false,
            // 登录窗口开关变量
            loginWindow: false,
            dialogVisible: false,
            // 新闻数据
            news: [
                {
                    id: 0,
                    title: '身体棒棒',
                    time: '2019-11-8',
                    setTop: 1,
                    viewCount: 22
                },
                {
                    id: 1,
                    title: '身体棒棒身体棒棒身体棒棒身体棒棒',
                    time: '2019-11-8',
                    setTop: 1,
                    viewCount: 5
                },
                {
                    id: 2,
                    title: '身体棒棒身体棒棒身体棒棒身体棒棒身体棒棒',
                    time: '2019-11-8',
                    setTop: 1,
                    viewCount: 3
                }
            ],
            questions: [
                {
                    id: 0,
                    content: '怎么吃饭吃不胖',
                    name: '张三',
                    type: '生活帮助',
                    time: '2019-6-8',
                    setTop: false,
                    solve: true,
                    viewCount: 22,
                    comment: 66
                },
                {
                    id: 1,
                    content: '不存在的，越吃越胖',
                    name: '李四',
                    type: '生活帮助',
                    time: '2019-6-8',
                    setTop: false,
                    solve: true,
                    viewCount: 0,
                    comment: 7
                },
                {
                    id: 2,
                    content: '迈开腿管住嘴',
                    name: '刘五',
                    type: '生活帮助',
                    time: '2019-6-8',
                    setTop: true,
                    solve: true,
                    viewCount: 8,
                    comment: 23
                },
                {
                    id: 3,
                    content: '不存在的',
                    name: '张三',
                    type: '生活帮助',
                    time: '2019-6-8',
                    setTop: false,
                    solve: false,
                    viewCount: 12,
                    comment: 3
                }
            ],
            goods: [
                {
                    id: 0,
                    lost: true,
                    name: '蓝色小水杯',
                    // 是否学院托管
                    trusteeship: false,
                    place: '中区主球场',
                    time: '2019-02-23'
                },
                {
                    id: 1,
                    lost: false,
                    name: '卡西欧手表',
                    // 是否学院托管
                    trusteeship: true,
                    place: '中区篮球场',
                    time: '2019-06-04'
                },
                {
                    id: 2,
                    lost: false,
                    name: '小米手机',
                    // 是否学院托管
                    trusteeship: true,
                    place: '南区食堂',
                    time: '2018-12-16'
                },
                {
                    id: 3,
                    lost: false,
                    name: '一卡通171100220',
                    // 是否学院托管
                    trusteeship: false,
                    place: '全校',
                    time: '2019-06-11'
                }
            ],
            documents: [
                {
                    id: 0,
                    name: '30G考研英语真题',
                    type: '学习资料',
                    downloadTimes: 99,
                    time: '2018-05-16'
                },
                {
                    id: 1,
                    name: '大学英语一期末题库',
                    type: '学习资料',
                    downloadTimes: 1,
                    time: '2018-05-16'
                },
                {
                    id: 2,
                    name: '心理学视频',
                    type: '学习资料',
                    downloadTimes: 22,
                    time: '2018-05-16'
                },
                {
                    id: 3,
                    name: '计算机基础视频',
                    type: '学习资料',
                    downloadTimes: 52,
                    time: '2018-05-16'
                }
            ]
        }
    },
    methods: {
        // 获取一卡通号和姓名
        getUserName(){
            this.$axios.get(prefix.api + userApi.getStudentName).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('您还未登录')
                    return
                }
                this.isLogin = true
                // 更新姓名以及一卡通id
                this.studentName = response.data.data.name
                this.studentId = response.data.data.student_id
                // 获取失物招领内容
                this.getGoods()
            })
        },
        // 弹出登录框
        showLoginWindow() {
            this.loginWindow = !this.loginWindow
            this.account = ''
            this.password = ''
        },
        // 登录
        login(){
            if(!this.account || !this.password){
                Message.error('帐号密码不能为空')
                return
            }
            this.$axios
                .post(prefix.api + userApi.login, { account: this.account, password: this.password })
                .then((response)=>{
                    if(!responseHandler(response.data, this)){
                        // 提示出错
                        Message.error(response.data.msg)
                    }
                    this.getUserName()
                    this.showLoginWindow()
                    this.account = ''
                    this.password = ''
                    Message.success(response.data.msg)
                })
        },
        // 注销
        logout(){
            // console.log('sss')
            this.$axios.post(prefix.api + userApi.logout).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                }
                this.isLogin = false
                Message.success(response.data.msg)
            })
        },

        // TODO : 接口没给
        // 获取新闻列表
        // getNews(){
        //     this.$axios.get(prefix.api + newsApi.getNews).then((response)=>{
        //         if(!responseHandler(response.data, this)){
        //             // 提示出错
        //             Message.error(response.data.msg)
        //             return
        //         }
        //         this.news = response.data.data
        //     })
        // },

        // TODO : 接口没给
        // 获取问题列表
        // getQuestions(){
        //     this.$axios.get(prefix.api + questionsApi.getQusetion).then((response)=>{
        //         if(!responseHandler(response.data, this)){
        //             // 提示出错
        //             Message.error(response.data.msg)
        //             return
        //         }
        //         this.news = response.data.data
        //     })
        // },

        // 获取失物招领内容
        getGoods(){
            this.$axios.get(prefix.api + goodsApi.getGoods).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('您还未登录')
                    return
                }
                this.goods = response.data.data
                console.log(response.data.data)
            })
        },

        // TODO : 接口没给
        // 获取分享资料
        // getSources(){
        //     this.$axios.get(prefix.api + SourcesApi.getSources).then((response)=>{
        //         if(!responseHandler(response.data, this)){
        //             // 提示出错
        //             Message.error(response.data.msg)
        //             return
        //         }
        //         this.document = response.data.data
        //     })
        // },

        // 跳转部分
        // 跳转人中心页面
        goToUserCenter(){
            console.log('跳转至个人中心')
            this.$router.push({ path: '/user-center/' })
        },
        // 跳转至新闻中心页面
        goToNewsPage(){
            console.log('跳转至新闻中心')
            // this.$router.push({ name: 'NewPage' })
        },
        // 跳转至在线问答页面
        goToQuestionPage(){
            console.log('跳转至在线问答页面')
            // this.$router.push({ name: 'NewPage' })
        },
        // 跳转至失物招领页面
        goToLostAndFound(){
            console.log('跳转至失物招领页面')
            this.$router.push({ name: 'LostAndFound' })
        },
        // 跳转至资源共享页面
        goToSourceShare(){
            console.log('跳转至资源共享页面')
            // this.$router.push({ name: 'SourceShare' })
        }
    },
    created () {
        // 获取一卡通号和姓名
        this.$axios.get(prefix.api + userApi.getStudentName).then((response)=>{
            if(!responseHandler(response.data, this)){
                // 提示出错
                Message.error('您还未登录')
                return
            }
            this.isLogin = true
            // 更新姓名以及一卡通id
            this.studentName = response.data.data.name
            this.studentId = response.data.data.student_id
            // 获取失物招领内容
            this.getGoods()
        })
    }
}
</script>

<style lang='less' scoped>
@PageHeaderBg: #5fd9cd;
@pageBg : #B8f4ff;
@listHeaderBg: #B8FFB8;
@itemBg: #fff;
*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.home-page{
    width: 100%;
    background: @pageBg;
}
header{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: @PageHeaderBg;
  h1{
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }
  #go-to-login{
    position: absolute;
    right: 30px;
    height: 40px;
    margin-left: 10px;
    padding: 0 15px;
  }
  .header-right{
    display: flex;
    justify-content: center;
    align-items: center;
    .new-msg{
      margin-right: 30px;
      display: flex;
      align-items: center;
      i{
        margin-right: 10px;
        font-size: 35px;
      }
    }
    #dropdown-btn{
      width: 100px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      span{
        text-align: center;
      }
    }
  }
}
@left:65%;
@right:100%-@left;
@labelBackground: #eaedeb;
main{
  height: 100%;
  /*宽度问题有必要探讨一下*/
  max-width: 1400px;
  display: flex;
  margin: 0 auto;
  .main-left{
    margin: 25px;
    height: 100%;
    width: @left;
    /*border: 1px solid black;*/
    .news-container{
      margin-bottom: 20px;
      .container-header{
        h2{
          margin: 0;
        }
      }
      .news-list{
        overflow: hidden;
        .news-item{
          background: @itemBg;
          box-sizing: border-box;
          position: relative;
          margin: 15px 0;
          padding: 10px 20px;
          border-radius: 5px;
          span:nth-last-child(1){
            position: absolute;
            right: 20px;
          }
        }
      }
    }
    .online-question{
      .question-list{
        .question-item{
          display: flex;
          background: @itemBg;
          padding: 15px ;
          margin: 10px 0;
          .question-status{
            padding-top: 5px;

            span{
              font-size: 14px;
              padding: 3px;
              background: @labelBackground;
              margin: 0 5px;
            }
          }
          .question-info{
            flex: 1;
            margin-top: -2px;
            .quizzer{
              padding: 0 5px;
            }
            h3{
              font-size: 22px;
              margin: 0;
              display: flex;
              align-items: center;
              span{
                font-size: 14px;
                padding: 3px;
                background:red;
                margin: 0 5px;
              }
            }
            .question-time{
              margin: 0 20px;
              padding-top: 3px;
            }
            div{
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .count{
              margin: 0 5px;
            }

          }
        }
      }

    }
  }
  .main-right{
    height: 100%;
    width:@right ;
    margin: 25px;
    /*border: 1px solid black;*/
    .lost-and-found{
      margin-bottom: 20px;
      .lost-item-list{
        padding: 10px 15px;
        box-sizing: border-box;
        background: @itemBg;
        border-radius: 5px;
        /*border-top: 1px black solid;*/
        /*border-right: 1px black solid;*/
        /*border-left: 1px black solid;*/
        .lost-item{
          display: flex;
          padding: 15px 0;
          box-sizing: border-box;
          flex-direction: column;
          box-sizing: border-box;
          &:nth-child(n+2){
            border-top: 1px solid gray;

          }
          .item-status{
            display: flex;
            flex: 1;
            span{
              font-size: 14px;
              padding: 3px;
              background: @labelBackground;
              margin: 0 5px;
            }
          }
          .lost-msg{
            display: flex;
            margin-top: 10px;
            justify-content: space-between;
            width: 100%;
            flex: 1;
            .lost-place{
              margin-left: 5px;
            }
          }
        }
      }
    }
    .source-share{
      margin-bottom: 20px;
      .document-list{
        border-top: 1px black solid;
        border-right: 1px black solid;
        border-left: 1px black solid;
        .document-item{
          display: flex;
          position: relative;
          padding: 15px 10px 10px 15px;
          border-bottom: 1px black solid;
          background: @itemBg;
          .document-icon{
            font-size: 40px;
          }
          .document-info{
            flex: 1;
            i{
              font-size: 20px;
            }
            p{
              display: flex;
              align-items: center;
              .label-content{
                margin-right: 10px;
                font-size: 15px;
              }
              .upload-time{
                font-size: 13px;
              }
            }
          }
          .download-btn{
            height: 40px;
            margin-left: 10px;
            padding: 0 15px;
            flex: revert;
          }
        }
      }
    }
    .user-info{
      margin-bottom: 20px;
      padding: 15px;
      box-sizing: border-box;
      background: #fff;
      #num-msg {
        padding: 20px 0;
        ul{
          display: flex;
          li{
            display: block;
            text-align: center;
            width: 33%;
            height: 70px;
            font-size: 18px;
          }
        }
      }
      #user-center{
        height: 50px;
        line-height: 50px;
        width: 60%;
        margin: 0 auto;
        cursor: pointer;
        text-align: center;
        border-radius: 8px;
        border: 1px solid black;

      }
    }
  }
}
.understand-btn{
  font-size: 20px;
  padding: 5px 5px ;
}
#login-container{
  position: absolute;
  height: 400px;
  width: 400px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid black;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  p{
    margin-top: 10px;
  }
  h2{
    margin-bottom: 40px;
  }
  .btn-container{
    width: 100%;
    text-align: center;
    margin-top: 25px;
    #login-btn{
      font-size: 15px;
      height: 40px;
      width: 40%;
    }
  }
  #cancel-btn{
    position: absolute;
    right: 15px;
    top: 10px;
    font-size: 40px;
    font-weight: 600;
    cursor: pointer;
  }
}

.container-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: @listHeaderBg;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 10px;
  h2{
    font-size: 22px;
    font-weight: 500;
  }
  span{
    cursor: pointer;
  }
}
</style>
