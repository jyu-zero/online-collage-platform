<template>
  <div id="notification">
    <main>
      <div id="btn-container">
      <el-button type="primary">发送通知</el-button>
      <el-button>标记为已读</el-button>
        <el-button @click="checkAll">
          <input type="checkbox"  id="check-all" v-model="checked" style="display:none">
          <span  @click.stop="checkAll">全选</span>
        </el-button>
      </div>
      <div class="notification-list" >
        <div v-for="notification of notifications" :key="notification.id" style="margin-top:20px;" class="notification-item" >
          <label>
            <input type="checkbox" v-model="checkModel" :value="notification.id">
            <span class="notification-title">{{notification.title}}--</span>
          </label>
          <span class="check">查看</span>
        </div>
      </div>
    </main>
    <div class="data_list" v-for="(item,index) in data_list" :key="index">
      <input type="checkbox" class="check_box tui-checkbox" :id="'id'+item.id" :value="item.id" v-model="checkedNames">
      <label :for="'id'+item.id" class="title">{{item.title}}</label >
    </div>
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
            checkedCities: [],
            cities: ['123123', '1233', '12122223'],
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
                    content: 'bablablalba'
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
        handleCheckAllChange(val){
            this.checkedCities = val ? this.cityOptions : []
            this.isIndeterminate = false
        },
        handleCheckedCitiesChange(value){
            let checkedCount = value.length
            this.checkAll = checkedCount === this.cities.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
        },
        checkout(){
            console.log('asdasdsa')
        },
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
        let arr = []
        arr = this.notifications.map(function(item, index, arr){
            return item.id
        })
        console.log(arr)
        this.cities = arr
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
        width: 70%;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
      .notification-item{
        /*禁止圈选*/
        -moz-user-select:none; /*火狐*/
        -webkit-user-select:none; /*webkit浏览器*/
        -ms-user-select:none; /*IE10*/
        -khtml-user-select:none; /*早期浏览器*/
        user-select:none;

        display: flex;
        position: relative;
        padding: 20px;
        margin: 0;
        border: 1px solid black;
        font-size: 20px;
        &:hover{
          color: #5e91fa;
        }
        input{
          font-size: 25px;
          width: 20px;
          height: 20px;
        }
        label{
          display: block;
          width: 80%;
          .notification-title{
            margin-right: 15px;
            select:none;
          }
        }
        .check{
          position: absolute;
          right: 20px;
        }
      }
    }
  }
  .tui-checkbox:checked {
    background: #1673ff;
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
    content: '';
    top: 0.1rem;
    left: 0.09rem;
    position: absolute;
    background: transparent;
    border: #fff solid 2px;
    border-top: none;
    border-right: none;
    height: 0.12rem;
    width: 0.25rem;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
