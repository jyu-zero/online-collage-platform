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
            <div class="checkbox-container" @click="clickCheckbox">
            <input type="checkbox" v-model="checkModel" class="check_box tui-checkbox"  :value="notification.id">
            </div>
            <span class="notification-title" @click="clickPrevCheckbox">{{notification.title}}--</span>
            <span class="check" @click="checkDetail">查看</span>
          </div>
          <div class="content-container hidden">
              <p>
                {{notification.content}}
              </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Button, Input, Checkbox, CheckboxGroup } from 'element-ui'

// import { prefix, responseHandler, userApi, goodsApi } from '@/api'
export default {
    name: 'Notification',
    components: {
        [Button.name]: Button,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
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
            data_list: [
                {
                    id: 0,
                    title: '标题内容1',
                    content: 'bablablalba'
                },
                {
                    id: 1,
                    title: '标题内容2',
                    content: 'bablablalba'
                },
                {
                    id: 2,
                    title: '标题内容3',
                    content: 'bablablalba'
                }
            ],
            list: [
                {
                    id: 0,
                    title: '标题内容1',
                    content: 'bablablalba'
                },
                {
                    id: 1,
                    title: '标题内容2',
                    content: 'bablablalba'
                },
                {
                    id: 2,
                    title: '标题内容3',
                    content: 'bablablalba'
                }
            ],
            checked: false,
            checkModel: [],
            checkedNames: ''
        }
    },
    methods: {

        // 这两个方法都是绑定了checkbox的点击事件
        clickCheckbox(e){
            e.currentTarget.firstElementChild.checked = !e.currentTarget.firstElementChild.checked
        },
        clickPrevCheckbox(e){
            e.currentTarget.previousSibling.firstElementChild.checked = !e.currentTarget.previousSibling.firstElementChild.checked
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
        }
    },
    watch: {
        // 观察用户选择了哪个通知项，同步到checkmodel中
        checkModel(){
            console.log(this.checkModel)
            if(this.checkModel.length === this.list.length){
                this.checked = true
            }else{
                this.checked = false
            }
        }

    },
    created() {
        // 把各个通知的id放到notificationIdList中
        let arr = []
        arr = this.notifications.map(function(item, index, arr){
            return item.id
        })
        console.log(arr)
        this.notificationIdList = arr
        console.log(this.cityOptions)
    }
}
</script>

<style lang="less" scoped>
  #notification{
    height: 100%;
    width: 100%;
    padding: 25px;
    border: 1px solid black;
    .btn-container{
      #check-all-btn{
        display: block;
        padding: 5px;
      }
    }
    .notification-list{
        margin-top: 10px;
        max-width: 750px;
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
            font-size: 25px;
            width: 20px;
            height: 20px;
          }
        }

        .notification-title{
          display: flex;
          align-items: center;
          flex: 0.9;
          margin-right: 15px;
          height: 100%;
          line-height: 100%;
        }
        .check{
          height: 100%;
          flex: 0.1;
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
