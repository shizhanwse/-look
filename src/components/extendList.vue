<template>
    <div>
          <mt-header :title="items.name">
            <mt-button @click="back" slot="left" icon="back"></mt-button>
            <div slot="right">
            <slot name="right"></slot>
            </div>
        </mt-header>
        <div class="personBox" v-for="(item,index) in formValue">
            <div class="titleBox">
                <div class="title" v-show="!compile">{{items.title}}（{{index+1}}）</div>
                <div class="buttonBox" v-show="compile">
                    <div class="button edit" @click="edites(index)">编辑</div>
                    <div class="button delete" @click="deletes(index)">删除</div>
                </div>
            </div>
           <component :is="view" v-model="item" readonly="readonly"></component>
        </div>
        <div class="add" v-show="compile" @click="addPerson">添加新的{{items.name}}</div>
        <div class="submit" v-show="compile" @click="conserve">确定</div>
        <transition name="shows">
            <div class="sonEdit" v-show="showSonEdit">
               <component :is="view" v-model="sonValue"></component>
                <div class="buttonBox">
                    <div class="button cancel" @click="cancel">取消</div>
                    <div class="button confirm" @click="confirm">确定</div>
                </div>
            </div>
        </transition>
        <div class='noData' v-if="noData">获取数据失败</div>
        <div class='noData' v-if="dataNone">暂无数据</div>
        <div class="iconfont" v-show="!compile">
            <div class="edit-button" @click="edit"><i class="icon-edit"></i></div>
        </div>
    </div>
</template>
<style>
  .shows-enter-active,.shows-leave-active{
     transition: all 0.3s ease
  }
  .shows-enter,.shows-leave-active{
     transform:translate3d(100%,0,0);
  }
.edit-button {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background-color: rgb(0, 193, 174);
        color: #fff;
    }
.personBox{
    margin:10px 0;
}
.titleBox{
    height:40px;
    line-height:40px;
    font-size:16px;
    padding-left:10px;
    background:#ffffff;
}
.titleBox .buttonBox{
    width:100%;
    text-align: right;
}
.titleBox .buttonBox .button{
    width:56px;
    height:24px;
    line-height:24px;
    text-align:center;
    border-radius: 5px;
    margin:8px 5px;
    font-size:14px;
    background:#00c1ae;
}
.titleBox .buttonBox .delete{
    background:#ef4f4f;
}
    .add{
        height:40px;
        line-height:40px;
        text-align:center;
        color:#00c1ae;
        background:#ffffff;
        margin:20px 0;
        border-top:1px solid #ededed;
        border-bottom:1px solid #ededed;
    }
    .submit{
        height:40px;
        line-height:40px;
        text-align:center;
        background:#00c1ae;
        color:#ffffff;
    }
    .sonEdit{
        width:100%;
        height:100%;
        position: fixed;
        z-index: 1000;
        left:0;
        top:0;
        overflow:scroll;
        background:#ffffff;
    }
.sonEdit .buttonBox{
    height:30px;
    width:100%;
    display:flex;
    color:#ffffff;
    margin-top:40px;
}
.sonEdit .button{
    flex:1;
    text-align:center;
    border:none;
    border-radius: 0;
    height:40px;
    line-height:40px;
    font-size:16px;
    background:#00c1ae;
}
.sonEdit .cancel{
    background:#ef4f4f;
}
</style>
<script>
    import { Swipe, SwipeItem,MessageBox,Indicator,Toast } from 'bh-mint-ui2';
    import { Get, Post } from '../utils';
    import api from '../api';
    export default {
        data() {
            return {
                items: this.$route.params.item?JSON.parse(this.$route.params.item):{},
                formValue: [],
                showSonEdit:false,
                sonValue:{},
                editIndex:'',
                noData:false,
                dataNone:false,
                compile:false,
                view:''
            }
        },
        mounted() {
            this.view = this.items.forms;
          this.getdata ();  
        },
        methods:{
             back () {
                 this.$router.go(-1);
            },
             edit () {
                this.compile = true;
            },
            //获取数据
            getdata (){
                let self = this;
                let url = this.view+'Query';
                Get(host + api[url], {
                    'JZGBH': window.jzgbh
                }).then(function (res) {
                    self.noData = false;
                    Indicator.close();
                    let data = "T_JZG_"+self.view.toUpperCase()+"_QUERY";
                    self.formValue = res.data.datas[data].rows;
                    if(self.formValue.length === 0){
                        self.dataNone = true;
                    }
                }).catch(function(res){
                    Indicator.close();
                    console.log(res);
                    self.noData = true;
                })
            },
            //新增家庭成员
            addPerson () {
                this.sonValue = {};
                this.showSonEdit = true;
            },
            //编辑
            edites (index) {
                this.compile = true;
                this.editIndex = index;
                this.sonValue = {...this.formValue[index]};
                this.showSonEdit = true;
            },
            //删除
            deletes (index) {
                let self = this;
                this.editIndex = index;
                MessageBox.confirm('确定删除吗?').then(action => {
                    let data = self.formValue[self.editIndex].WID;
                      let url = self.view+'Delete';
                    Get(host + api[url], {
                        WID: data
                    }).then(function (res) {
                        Indicator.close();
                        if(res.data.code ==='0'){
                            Toast('删除成功');
                            self.getdata();
                        }else{
                            Toast('删除失败');
                        }
                    }).catch(function(res){
                        Indicator.close();
                        Toast('删除失败');
                        console.log(res);
                    })
                }); 
            },
            //取消
            cancel () {
                this.showSonEdit = false;
                this.sonValue = {};
            },
            //确认编辑
            confirm () {
                let self = this;
                if(this.sonValue.WID === undefined){
                    this.sonValue.WID = '';
                }
                this.showSonEdit = false;
                 let url = self.view+'Save';
                 Get(host + api[url],self.sonValue)
                 .then(function (res) {
                     Indicator.close();
                    if(res.data.code ==='0'){
                        Toast('修改成功');
                        self.showSonEdit = false;
                        self.sonValue = {};
                        self.getdata();
                    }else{
                        Toast('修改失败');
                    }
                 }).catch(function(res){
                        Indicator.close();
                        Toast('修改失败');
                        console.log(res);
                 })
            },
            //保存
            conserve () {
               this.compile = false;
            }
        }
    }
</script>