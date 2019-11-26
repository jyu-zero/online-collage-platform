<template>
    <div class="home-page" >
      <!--头部-->
      <header v-cloak>
        <h1>在线学院平台</h1>
        <!--下拉菜单-->
        <div class="header-right" v-if="isLogin" >
          <div class="new-msg">
            <i class="el-icon-message"></i>
            <span class="msg-num">996</span>
          </div>
          <el-dropdown trigger="click"  >
                  <span class="el-dropdown-link " id='dropdown-btn'>
                      <div>
                          <div class="user-name" >{{this.name}}</div>
                          <div class="user-id" >{{this.account}}</div>
                      </div>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
            <el-dropdown-menu slot="dropdown" class="header-dropdown">
              <el-dropdown-item icon="el-icon-user" @click.native="goToUserCenter">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close" @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--登录按钮-->
        <el-button  id="go-to-login" type="info"  plain v-if="!isLogin" @click="goToLogin" >登录</el-button>
        <!--下拉菜单.结束-->
      </header>

      <!--主体部分-->
        <main v-cloak>
            <!--主体左侧-->
            <div class="main-left">
                <!--新闻内容-->
                <div class="news-container">
                  <div class="container-header">
                      <h2>新闻中心</h2>
                      <span @click="goToNewsPage">查看更多</span>
                  </div>
                  <ul class="news-list" @click="goToNewsPage">
                      <li class="news-item"
                        v-for="item of news"
                        :key="item.news_id"
                        :data-id='item.news_id'>
                          <span class="set-top-label" v-if="item.is_pinned===1">[置顶] </span>
                          <span class="news-title">{{item.news_title}}  </span>
                          <span class="news-date">({{item.created_at}})</span>
                          <span class="watch-times-count">
                              <font-awesome-icon icon="eye" />
                              {{item.views}}
                          </span>
                      </li>
                  </ul>
                </div>
                <!--在线问答-->
                <div class="online-question">
                  <div class="container-header">
                      <h2>在线问答</h2>
                      <span @click="goToQuestionPage()">查看更多</span>
                  </div>
                  <dl class="question-list"
                  @click="goToQuestionPage">
                      <dt class="question-item"
                        v-for="item of questions"
                        :key="item.questionId"
                        :data-id="item.questionId"
                        >
                          <div class="question-status">
                              <span v-if="item.status===1">已解决</span>
                              <span v-else>待解决</span>
                          </div>
                          <div class="question-info">
                              <h3>{{item.title}}<span v-if="item.isPinned">置顶</span></h3>
                              <div>
                                  <div>
                                      由
                                      <span class="quizzer"> {{item.name}} </span>
                                      提问
                                      <span class="question-time">{{item.time}}  </span>
                                      <font-awesome-icon icon="tag" />
                                      <span class="question-type">{{item.typeName}}</span>
                                  </div>
                                  <div class="view-reply-count">
                                      <font-awesome-icon icon="eye" />
                                      <span class="count">{{item.viewCount}}</span>
                                      <font-awesome-icon icon="comment-dots" />
                                      <span class="count">{{item.solutionsNum}}</span>
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
                <div class="user-info">
                  <div id="num-msg">
                    <ul>
                      <li><p id="article-count">24</p>我的问题</li>
                      <li><p id="member-count">30</p>我的回答</li>
                      <li><p id="reply-count">41</p>我的失物</li>
                    </ul>
                  </div>
                  <div id="user-center" @click="goToUserCenter()">个人中心</div>
                </div>
                <!--失物招领-->
                <div class="lost-and-found">
                  <div class="container-header">
                    <h2>失物招领</h2>
                    <span @click="goToLostAndFound()">查看更多</span>
                  </div>
                  <dl class="lost-item-list">
                    <dt class="lost-item"
                        v-for="(item,index) of goods"
                        :key="index"
                        @click="goToLostAndFound(item.good_id,item.sort)">
                      <div class="item-status">
                        <span v-if="item.sort">认领</span>
                        <span v-if="!item.sort">遗失</span>
                        <h3 class="goods-name">{{item.name}}</h3>
                        <span v-if="item.host">学院托管</span>
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
    </div>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem, Button, Input, Message, Dialog } from 'element-ui'
import { prefix, responseHandler, userApi, goodsApi, newsApi, questionApi } from '@/api'
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
            // 页眉处的姓名学号
            name: '',
            account: '',
            // 当前是否已登录
            isLogin: false,
            // 新闻数据
            news: [
                {
                    'news_title': '啊哈哈哈',
                    'views': 66,
                    'created_at': '2019-06-08'
                },
                {
                    'news_title': '啊哈哈哈',
                    'views': 66,
                    'created_at': '2019-06-08'
                },
                {
                    'news_title': '啊哈哈哈',
                    'views': 66,
                    'created_at': '2019-06-08'
                }
            ],
            questions: [],
            goods: [],
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
                    Message.error('对不起，您还未登录')
                    return false
                }
                this.isLogin = true
                // 更新姓名以及一卡通id
                this.name = response.data.data.name
                this.account = response.data.data.account
            })
        },
        // 注销
        logout(){
            this.$axios.post(prefix.api + userApi.logout).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                }
                this.$router.push({ name: 'Login' })
                Message.success(response.data.msg)
            })
        },
        // 跳转登录界面
        goToLogin(){
            this.$router.push({ name: 'Login' })
        },
        // 获取新闻列表
        getNewsList(){
            this.$axios.get(prefix.api + newsApi.getNews).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                    return
                }
                this.news = response.data.data
            })
        },
        // 获取问题列表
        getQuestion(){
            this.$axios.get(prefix.api + questionApi.getQuestions).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                    return
                }
                this.questions = response.data.data.information
            })
        },

        // 获取失物招领内容
        getGoods(){
            this.$axios.get(prefix.api + goodsApi.getGoods).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error(response.data.msg)
                    return
                }
                this.goods = response.data.data.rs
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
        // 个人中心跳转
        goToUserCenter(){
            // auth
            if (!this.isLogin){
                Message.error('对不起，请先登录再进行操作')
                return
            }
            this.$router.push({ path: '/user-center/' })
        },
        // 递归寻找dt元素
        recursion(e){
            // 不断往上爬直到获取dt，遇到body则返回null
            if(e.tagName !== 'DT'){
                if(e.tagName === 'BODY'){
                    return null
                }
                return this.recursion(e.parentNode)
            }
            return e
        },
        // 新闻中心跳转
        goToNewsPage(event){
            let element = this.recursion(event.target)
            // 1.空则跳转至新闻中心
            if (!element){
                this.$router.push({ name: 'NewsCenter' })
            }
            // 2.element(dt)存在则跳转至详情页
            this.$router.push({ name: `NewsDetail`,
                params: {
                    newsId: element.dataset.index
                }
            })
        },

        // 在线问答跳转
        goToQuestionPage(event){
            let element = this.recursion(event.target)
            // 1.id为null就跳转至在线问答主页
            if (!element){
                this.$router.push({ name: 'Question' })
            }
            // 2.element(dt)存在就跳转至在线问答详情页
            this.$router.push({ name: `QuestionSpecific`,
                params: {
                    questionId: element.dataset.id
                }
            })
        },

        // 失物招领跳转
        goToLostAndFound(goodsId, sort){
            // 判断sort的值
            // 1则跳转至认领页面
            // 2则跳转至失物招领主页
            // undefined则跳转至丢失页面
            switch (sort) {
                case 0:
                    this.$router.push({ name: `LostDetails`,
                        params: {
                            good_id: goodsId,
                            sort
                        }
                    })
                    break
                case 1:
                    this.$router.push({ name: `FoundDetails`,
                        params: {
                            good_id: goodsId,
                            sort
                        }
                    })
                    break
                case undefined:
                    this.$router.push({ name: `LostAndFound` })
                    break
            }
        },
        // 资源共享跳转
        goToSourceShare(){
            this.$router.push({ name: 'SourceShare' })
        }
    },
    created () {
        // 获取一卡通号和姓名
        this.getUserName()
        this.getGoods()
        this.getNewsList()
        this.getQuestion()
    }
}
</script>

<style lang='less' scoped>
@pageBg : #fff;
@listHeaderBg: #5e91fa;
@itemBg: #f8f8ff;

.home-page{
  width: 100%;
  background: @pageBg;
  min-width: 1200px;
}
header{
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:60px;
  padding: 0 20px;
  background:#5e91fa;
  color:#fff;

  h1{
    margin:0;
    font-size:20px;
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
    ul{
      li{
        width: 140px;
      }
    }
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
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      div{
        color: #fff;
        text-align: center;
      }
    }
  }
}
.header-dropdown{
  li{
    width: 140px;
  }
}
@left:65%;
@right:100%-@left;
@labelBackground: #eaedeb;
main{
  position: relative;
  top: 60px;
  z-index: 1;
  height: 100%;
  /*宽度问题有必要探讨一下*/
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  margin: 0 auto;
  *{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
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
      background: @itemBg;
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
        background: #a8bfff;
      }
    }
  }
}
.understand-btn{
  font-size: 20px;
  padding: 5px 5px ;
}
#login-container{
  z-index: 3;
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
