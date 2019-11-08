<template>
    <div class="home-page">
      <header>
        <h1>线上学院平台</h1>
        <el-button  id="go-to-login" type="info"  plain v-if="!isLogin" @click="showLoginWindow">登录</el-button>
        <div class="header-right"  v-if="isLogin">
          <div class="new-msg">
            <i class="el-icon-message"></i>
            <span class="msg-num">996</span>
          </div>
          <el-dropdown trigger="click"  >
          <span class="el-dropdown-link " id='dropdown-btn'>
            <span >
              <div class="user-name">李三</div>
              <div class="user-id">171100220</div>
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <main>
        <div class="main-left">
          <div class="news-container">
            <div class="container-header">
                <h2>新闻中心</h2>
                <span>查看更多</span>
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
          <div class="online-question">
            <div class="container-header">
                <h2>在线问答</h2>
                <span>查看更多</span>
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
        <div class="main-right">
          <div class="user-info">
            <div id="num-msg">
              <ul>
                <li><p id="article-count">24</p>我的问题</li>
                <li><p id="member-count">30</p>我的回答</li>
                <li><p id="reply-count">41</p>我的失物</li>
              </ul>
            </div>
            <div id="user-center">个人中心</div>
          </div>
          <div class="lost-and-found">
            <div class="container-header">
              <h2>失物招领</h2>
              <span>查看更多</span>
            </div>
            <dl class="lost-item-list">
              <dt class="lost-item" v-for="item of things" :key="item.id" >
                <div class="item-status">
                  <span v-if="!item.lost">认领</span>
                  <span v-if="item.lost">遗失</span>
                  <h3 class="things-name">{{item.name}}</h3>
                  <span v-if="item.trusteeship">学院托管</span>
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
          <div class="source-share">
            <div class="container-header">
              <h2>资料共享</h2>
              <span>查看更多</span>
            </div>
            <dl class="document-list">
              <dt class="document-item" v-for="(item,index) of 4" :key="index" >
                <div>
                <i class="el-icon-document document-icon"></i>
                </div>
                <div class="document-info">
                  <p>
                    <span>30G考研英语真题</span>
                  </p>
                  <p>
                    <font-awesome-icon icon="tag" />
                    <span>类别名称</span>
                    <i class="el-icon-download"></i>
                    <span>12</span>
                    <span>(2018-11-02)</span>
                  </p>
                </div>
                <el-button  class="download-btn" type="info"  plain>下载</el-button>
              </dt>
            </dl>
          </div>
        </div>
      </main>
      <div id="login-container" v-if="loginWindow">
        <span id="cancel-btn"  @click="showLoginWindow">×</span>
        <h2>登录窗口</h2>
        <p>学号</p>
        <el-input v-model="account" placeholder="请输入帐号"></el-input>
        <p>密码</p>
        <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
        <p><el-button type="text" @click="dialogVisible = true">忘记密码？</el-button></p>
        <div class="btn-container">
        <el-button  id="login-btn" type="info"  plain>登录</el-button>
        </div>
      </div>
      <!--忘记密码的弹窗提示-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
       >
        <span>忘记密码，请带上学生证前往锡昌科技大楼116</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="info" plain class="understand-btn">了解</el-button>
        </span>
      </el-dialog>
    </div>

</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem, Button, Input, Message, Dialog } from 'element-ui'
import { prefix, responseHandler, testApi } from '@/api'

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
            things: [
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

                }
            ]

        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        showLoginWindow() {
            this.loginWindow = !this.loginWindow
            this.account = ''
            this.password = ''
        },
        created () {
            // this.$axios.post(prefix.api + testApi.test).then((response)=>{
            //     if(!responseHandler(response.data, this)){
            //         // 在这里处理错误
            //         Message.error('请求失败')
            //     }
            //     Message.success('请求成功')
            // })
        }
    }
}
</script>

<style lang='less' scoped>

*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.home-page{
    height: 100%;
    width: 100%;
}
header{
  height: 70px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  h1{
    margin: 0;
    font-size: 40px;
    font-weight: 600;
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
      .container-header{
        h2{
          margin: 0;
        }
      }
      .news-list{
        overflow: hidden;
        .news-item{
          position: relative;
          margin: 15px;
          span:nth-last-child(1){
            position: absolute;
            right: 0;
          }
        }
      }
    }
    .online-question{
      .question-list{
        border-top: 1px black solid;
        border-right: 1px black solid;
        border-left: 1px black solid;
        .question-item{
          display: flex;

          padding: 20px 10px 10px 20px;
          border-bottom: 1px black solid;
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
      .lost-item-list{
        border-top: 1px black solid;
        border-right: 1px black solid;
        border-left: 1px black solid;
        .lost-item{
          display: flex;
          flex-direction: column;
          padding: 15px 10px 10px 15px;
          border-bottom: 1px black solid;
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
          }
        }
      }
    }
    .source-share{
      .document-list{
        border-top: 1px black solid;
        border-right: 1px black solid;
        border-left: 1px black solid;
        .document-item{
          display: flex;
          position: relative;
          padding: 15px 10px 10px 15px;
          border-bottom: 1px black solid;
          .document-icon{
            font-size: 40px;
          }
          .document-info{
            flex: 1;
            i{
              font-size: 20px;
            }
            p{
              span:nth-child(1),span:nth-child(2){
                margin-right: 10px;
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
      border: 1px solid black;
      padding: 15px;
      box-sizing: border-box;
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

  padding: 10px;
}
</style>
