<template>
  <div id="notification">
    <main>
      <div id="btn-container">
      <el-button type="primary">发送通知</el-button>
      <el-button>标记为已读</el-button>
        <el-button @click="checkAll">
          <input type="checkbox"  id="check-all" v-model="checked"  style="display:none">
          <span  @click.stop="checkAll">全选</span>
        </el-button>
      </div>
      <div class="notification-list" >
        <div v-for="notification of notifications" :key="notification.id" >
          <div class="notification-item" >
            <div class="checkbox-container" >
                <input @click="clickCheckbox" type="checkbox" v-model="checkModel" class="check_box tui-checkbox"  :value="notification.id">
            </div>
            <span class="notification-title" v-if="notification.type===0" @click="clickTitle(notification.id)">{{notification.title}}--</span>
            <span class="notification-title" v-if="notification.type===1" @click="clickTitle(notification.id)">{{notification.title}}--</span>
            <span class="notification-title" v-if="notification.type===2" @click="clickTitle(notification.id)">{{notification.title}}--</span>
            <span class="check" @click="checkDetail">查看</span>
          </div>
          <div class="content-container hidden" v-if="notification.type===0">
              <p>
                {{notification.content}}
              </p>
          </div>
        </div>
      </div>
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
    </main>
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
            // checkAll: false,
            checkednotificationIdList: [],
            notificationIdList: ['123123', '1233', '12122223'],
            cityOptions: ['123123', '123123', '12123'],
            isIndeterminate: true,
            notifications: [
                {
                    id: 0,
                    title: '标题内容1',
                    content: 'bablablalba'
                },
                {
                    id: 1,
                    title: '标题内容2',
                    content: 'bablablalbbablablalbbablablalbbablablalbbablablalbbablablalbbablablalbbablablalbbablablalba'
                },
                {
                    id: 2,
                    title: '标题内容3',
                    content: 'bablablalba'
                }
            ],
            checked: false,
            checkModel: [],
            checkedNames: '',
            pageCount: 5,
            pageSize: 5,
            currentPage: 1,
            total: 0
        }
    },
    methods: {

        // 这两个方法都是绑定了checkbox的点击事件
        clickCheckbox(e){
            console.log('点击了checkbox')
            console.log(e.currentTarget.checked)
            // console.log(e.currentTarget.firstElementChild.checked)
            // e.currentTarget.firstElementChild.checked = !e.currentTarget.firstElementChild.checked
        },
        clickTitle(id){
            if (this.checkModel.indexOf(id) < 0){
                this.checkModel.push(id)
                return
            }
            this.checkModel.splice(this.checkModel.findIndex(item => item === id), 1)
        },

        // 这个是查看通知详情的按钮
        checkDetail(e){
            e.currentTarget.parentElement.nextSibling.classList['value'] = e.currentTarget.parentElement.nextSibling.classList['value'] === 'content-container display' ? 'content-container hidden' : 'content-container display'
        },
        // 全选按钮
        checkAll(){
            if(this.checked){
                this.checkModel = []
            }else{
                this.notifications.forEach((item)=>{
                    if(this.checkModel.indexOf(item.id) === -1){
                        this.checkModel.push(item.id)
                    }
                })
            }
        },
        getNotifications(page = 1){
            page = 1
            console.log(this.currentPage)
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
            })
        },
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
            console.log(this.checkModel)
        },
        currentPage(newVal, oldVal){
            console.log(newVal, oldVal)
        }
    },
    created() {
        // 把各个通知的id放到notificationIdList中
        let arr = []
        arr = this.notifications.map(function(item, index, arr){
            return item.id
        })
        // console.log(arr)
        this.notificationIdList = arr
        // console.log(this.cityOptions)
        this.getNotifications()
    }
}
</script>

<style lang="less" scoped>
  #notification{
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
      border-radius: 15px;
      overflow: hidden;
      .notification-item{
        /*禁止圈选*/
        -moz-user-select:none; /*火狐*/
        -webkit-user-select:none; /*webkit浏览器*/
        -ms-user-select:none; /*IE10*/
        -khtml-user-select:none; /*早期浏览器*/
        user-select:none;
        display: flex;
        align-items: center;
        height: 60px;
        position: relative;
        background: #f5f5f5;
        margin: 0;
        font-size: 20px;
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
          flex: 0.1;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
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
  }
  .hidden{
    display: none;
  }
  .display{
    display: block;
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
    cursor: default;
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
