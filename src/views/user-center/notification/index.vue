<template>
  <div id="notification">
    <main>
      <div id="btn-container">
      <el-button type="primary" @click="toggle">发送通知</el-button>
      <el-button @click="setSelectRead">标记为已读</el-button>
      <el-button @click="setSelectNoRead">标记为未读</el-button>
        <el-button @click="checkAll">
          <input type="checkbox"  id="check-all" v-model="checked"  style="display:none">
          <span  @click.stop="checkAll">全选</span>
        </el-button>
      </div>
      <div class="notification-list" >
        <div v-for="notification of notifications" :key="notification.id" >
          <div class="notification-item" >
            <div class="checkbox-container" >
                <input type="checkbox" v-model="checkModel" class="check_box tui-checkbox"  :value="notification.id">
            </div>
            <span class="notification-title" :class="{'alreadyRead' :readArray.indexOf(notification.id)>0}" v-if="notification.type===0" @click="clickTitle(notification.id)">{{notification.title}}--</span>
            <span class="notification-title" :class="{'alreadyRead' :readArray.indexOf(notification.id)>0}" v-if="notification.type===1" @click="clickTitle(notification.id)">{{notification.title}}--</span>
            <span class="notification-title" :class="{'alreadyRead' :readArray.indexOf(notification.id)>0}" v-if="notification.type===2" @click="clickTitle(notification.id)">{{notification.title}}--</span>
            <span class="check" @click="checkDetail($event,notification.type,notification.id)">查看</span>
          </div>
          <div class="content-container hidden" v-if="notification.type===0">
              <p>
                {{notification.content}}
              </p>
          </div>
        </div>
      </div>
      <div id="pagination-container">
          <el-pagination
            :background="true"
            :page-size="pageSize"
            :page-count="pageCount"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="total"
            @prev-click="changePage('prev')"
            @next-click="changePage('next')"
            @current-change="changePage()">
            </el-pagination>
      </div>
      
    </main>
    <div id="send-notification-container-bg" v-if="showSendWindow" @click.self="toggle">
        <div id="send-notification-container">
            <div class="window-header">
                <div id="close-window-btn"  @click.self="toggle">X</div>
            </div>
            <div class="window-body">
                <label for="input-title" class="label-title">标题</label>
                <el-input
                placeholder="请输入通知标题"
                v-model="inputTitle"
                id="input-title"
                maxlength="25"
                show-word-limit
                clearable>
                </el-input>
                <label for="input-content" class="label-title" >内容</label>
                <el-input
                size="large"
                type="textarea"
                placeholder="请输入内容"
                v-model="inputContent"
                id="input-content"
                class="input-content"
                maxlength="200"
                show-word-limit
                >
                </el-input>
                <div id="send-btn-container">
                    <el-button type="primary"  plain @click="sendNotification">发送</el-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Button, Input, Checkbox, CheckboxGroup, Message, Pagination } from 'element-ui'
import { prefix, responseHandler, notificationApi } from '@/api'
export default {
    name: 'Notification',
    components: {
        [Button.name]: Button,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Pagination.name]: Pagination
    },
    data(){
        return{
            // 发送通知窗口的开关，和标题内容
            showSendWindow: false,
            inputTitle: '',
            inputContent: '',
            // 用于存储id的数组
            notifications: [
                {
                    'id': 9,
                    'title': '上课通知',
                    'content': '这个周末补课哈',
                    'type': 0
                },
                {
                    'id': 5,
                    'title': '上课通知',
                    'content': '这个周末补课哈',
                    'type': 0
                },
                {
                    'id': 22,
                    'title': '上课通知',
                    'content': '这个周末补课哈',
                    'type': 0
                },
                {
                    'id': 44,
                    'title': '问答',
                    'type': 2
                },
                {
                    'id': 32,
                    'title': '新闻',
                    'type': 1
                }
            ],
            checked: false,
            checkModel: [],
            checkedNames: '',
            // 总页数，尺寸，当前页面，总条数
            pageCount: 5,
            pageSize: 5,
            currentPage: 1,
            total: 30,
            // 已读item会被记录在这里
            readArray: []
        }
    },
    methods: {
        // 获取通知栏数据
        getNotifications(page = 1){
            this.$axios.get(prefix.api + notificationApi.getNotifications, {
                params: {
                    page,
                    pageSize: 1
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('服务器裂开了')
                    return
                }
                this.notifications = []
                this.notifications = response.data.data.notificationList
                this.pageCount = response.data.data.pageCount
                this.total = this.pageCount * this.pageSize
                let arr = []
                this.notifications.forEach(element => {
                    arr.push([element.id, 0])
                })
            })
        },
        // 开关发送通知窗口
        toggle(){
            this.showSendWindow = !this.showSendWindow
        },
        // ------------------------------上半部分的<按钮功能>--------------
        // 发送通知
        sendNotification(){
            this.$axios.get(prefix.api + notificationApi.getNotifications, {
                params: {
                    title: this.inputTitle,
                    content: this.inputContent
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 提示出错
                    Message.error('服务器裂开了')
                    return
                }
                // 关闭窗口
                this.toggle()
                // 清空输入内容
                this.inputContent = ''
                this.inputTitle = ''
                Message.success('发送成功')
            })
        },
        // 点击标题时勾上复选框
        clickTitle(id){
            if (this.checkModel.indexOf(id) < 0){
                this.checkModel.push(id)
                return
            }
            this.checkModel.splice(this.checkModel.findIndex(item => item === id), 1)
        },
        // 选择项设置已读
        setSelectRead(){
            this.checkModel.forEach(element => {
                this.setRead(element)
            })
            localStorage.setItem('alreadyReadList', this.readArray)
        },
        // 选择项设置未读
        setSelectNoRead(){
            this.checkModel.forEach(element => {
                this.readArray = this.readArray.filter(function(item) {
                    return String(item) !== String(element)
                })
            })
            localStorage.setItem('alreadyReadList', this.readArray)
            this.checkModel = []
        },
        // 设置已读
        setRead(id) {
            this.readArray.push(id)
            this.readArray = this.unique(this.readArray)
            localStorage.setItem('alreadyReadList', this.readArray)
            this.checkModel = []
        },
        // 这个是查看通知详情的按钮
        checkDetail(e, type, id){
            if(type === 0){
                e.currentTarget.parentElement.nextSibling.classList['value'] = e.currentTarget.parentElement.nextSibling.classList['value'] === 'content-container display' ? 'content-container hidden' : 'content-container display'
                this.setRead(id)
                return
            }
            if(type === 1){
                this.goToNewsPage(id)
            }
            if(type === 2){
                this.goToQuestionPage(id)
            }
        },
        // 全选按钮
        checkAll(){
            // 如果全选按钮被点过一次，下次点就是取消全选
            if(this.checked){
                this.checkModel = []
            }else{
                // 如果是第一次点，就是全选了
                this.notifications.forEach((item)=>{
                    if(this.checkModel.indexOf(item.id) === -1){
                        this.checkModel.push(item.id)
                    }
                })
            }
        },
        // ------------------------------下半部分的<换页功能>--------------
        // 换页
        changePage(val){
            switch(val){
                case 'prev':
                    this.getNotifications(--this.currentPage)
                    break
                case 'next':
                    this.getNotifications(++this.currentPage)
                    break
                default:
                    this.getNotifications(this.currentPage)
            }
        },
        // 跳转新闻页
        goToNewsPage(newsId){
            this.$router.push({ name: `NewsDetail`,
                params: {
                    newsId
                }
            })
            this.setRead(newsId)
        },
        // 跳转至在线问答详情页
        goToQuestionPage(questionId){
            this.$router.push({ name: `QuestionSpecific`,
                params: {
                    questionId
                }
            })
            this.setRead(questionId)
        },

        // 数组去重
        unique(arr){
            let newArr = []
            arr.forEach(item=>{
                if(newArr.indexOf(item) === -1){
                    newArr.push(item)
                }
            })
            return newArr
        }
    },
    watch: {
        // 观察用户选择了哪个通知项，同步到checkmodel中
        checkModel(){
            if(this.checkModel.length === this.notifications.length){
                this.checked = true
            }else{
                this.checked = false
            }
        }
    },
    created() {
        this.getNotifications()
        // 先判断本地存储是否有alreadyReadList
        if(!localStorage.getItem('alreadyReadList')){
            // 没有则创建一个
            localStorage.setItem('alreadyReadList', '')
        }
        // 将alreadyReadList存储到本地的已读列表中
        this.readArray = localStorage.getItem('alreadyReadList').split(',')
        let numberic = []
        this.readArray.forEach(element => {
            numberic.push(Number(element))
        })
        this.readArray = numberic
    }
}
</script>

<style lang="less" scoped>
#notification{
    position: relative;
    height: 100%;
    width: 100%;
    padding: 30px 60px;
    .btn-container{
        #check-all-btn{
            display: block;
            padding: 5px;
        }
    }
    .notification-list{
        margin-top: 10px;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        // background: #f5f5f5;
        .notification-item{
                /*禁止圈选*/
                -moz-user-select:none; /*火狐*/
                -webkit-user-select:none; /*webkit浏览器*/
                -ms-user-select:none; /*IE10*/
                -khtml-user-select:none; /*早期浏览器*/
                box-shadow: inset 0 0 2px #CCC;
                user-select:none;
                display: flex;
                align-items: center;
                height: 60px;
                position: relative;
                background: #fff;
                margin: 0;
                font-size: 17px;
                border: #dddedf solid 1px;
                margin-top: 15px;
                &:hover{
                    color: #5e91fa;
                }
                .checkbox-container{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                input{
                    z-index: 3;
                    font-size: 25px;
                    width: 25px;
                    height: 25px;
                    opacity: 1;
                    outline: none;
                }
                }

                .notification-title{
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                    height: 100%;
                    line-height: 100%;
                }
                .check{
                    height: 100%;
                    color: #fff;
                    width: 70px;
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgb(64, 158, 255);
                &:hover{
                    opacity: 0.7;
                }
            }
      }
      .content-container{
        overflow: hidden;
        padding: 0 20px;
        background: #fbfbfb;
        box-sizing: border-box;
        word-wrap:break-word;
        font-size: 20px;
      }
    }
    #send-notification-container-bg{
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        z-index: 5;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        font-family: sans-serif;
        #send-notification-container{
            position: relative;
            z-index: 6;
            width: 400px;
            background: #fff;
            margin: 0 auto;
            margin-top: 100px;
            box-shadow: inset 0 0 5px #CCC;
            .window-header{
                height: 40px;
                background: #5e91fa;
                display: flex;
                flex-direction: row-reverse;
                #close-window-btn{
                    height: 40px;
                    line-height: 40px;
                    width: 50px;
                    color: #fff;
                    text-align: center;
                    right: 15px;
                    top: 10px;
                    cursor: pointer;
                &:hover{
                    background: rgb(250, 78, 78);
                }
            }
            }
            .window-body{
                padding:15px;
                background: rgb(251, 254, 255);
                .label-title{
                    display: block;
                    margin: 10px 0;
                    font-size: 25px;
                    font-weight: 500;
                    color: rgb(109, 109, 109);
                }
                /deep/#input-content{
                    height: 300px;
                }
                #send-btn-container{
                    margin-top: 20px;
                    display: flex;
                    flex-direction:row-reverse;
                }
            }
        }
    }
}

.hidden{
    display: none;
}
.display{
    display: block;
}
.alreadyRead{
    color: #ccc;
}
#pagination-container{
  margin-top: 20px;
  text-align: left;
}
/*复选框的diy样式*/
.tui-checkbox:checked {
    background: #427fff;
    border: solid 1px #1673ff;
}
.tui-checkbox {
    width: 5rem;
    height: 5rem;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    position: relative;
    display: inline-block;
    vertical-align: top;
    -webkit-appearance: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-transition: background-color ease 0.6s;
    transition: background-color ease 0.6s;
}
.tui-checkbox:checked::after {
    top: 0.1rem;
    left: 0.09rem;
    position: absolute;
    background: transparent;
    border: #fff solid 2px;
    border-top: none;
    border-right: none;
}

</style>
