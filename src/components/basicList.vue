<template>
    <div class="box">
        <mt-header :title="item.name">
            <mt-button @click="back" slot="left" icon="back"></mt-button>
            <div slot="right">
            <slot name="right"></slot>
            </div>
        </mt-header>
        <component :is="view" v-model="formValue" :readonly="compile? false:'readonly'"></component>
        <div class="buttonBox" v-show="compile">
            <div class="button cancel" @click="cancel">取消</div>
            <div class="button confirm" @click="confirm">确定</div>
        </div>
        <div class='noData' v-if="noData">获取数据失败</div>
         <div class="iconfont" v-show="!compile">
            <div class="edit-button" @click="edit"><i class="icon-edit"></i></div>
        </div>
    </div>
</template>

<script>
    import { Swipe, SwipeItem, Toast,Indicator } from 'bh-mint-ui2';
    import { Get, Post } from '../utils';
    import api from '../api';
    export default {
        data() {
            return {
                item: this.$route.params.item?JSON.parse(this.$route.params.item):{},
                formValue: {},
                noData:false,
                view:'jwjbxx',
                compile:false
            }
        },
         mounted() {
          this.getdata ();  
        },
        methods:{
             edit () {
                this.compile = true;
            },
            back () {
                 this.$router.go(-1);
            },
            getdata (){
                let self = this;
                Get(host + api.jbxxQuery, {
                    'JZGBH': window.jzgbh
                }).then(function (res) {
                    Indicator.close();
                    self.noData = false;
                    self.formValue = res.data.datas.T_JZG_JBXX_QUERY.rows[0];
                }).catch(function(res){
                    Indicator.close();
                    self.noData = true;
                    console.log(res);
                })
            },
            cancel () {
                this.compile = false;
            },
            confirm () {
                let self=this;
                let data = this.formValue;
                Post(host + api.jbxxSave,data)
                        .then(function (res) {
                             Indicator.close();
                            if(res.data.code ==='0'){
                                Toast('保存成功');
                               
                            }else{
                                Toast('保存失败');
                            }
                             self.compile = false;
                }).catch(function(res){
                    Toast('保存失败');
                     Indicator.close();
                     self.compile = false;
                })
            }
        }
    }
</script>
<style scoped>
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
.box{
    background:#ffffff;
}
    .buttonBox{
        height:40px;
        width:100%;
        display:flex;
        color:#ffffff;
        margin-top:30px;
    }
    .button{
        flex:1;
        text-align:center;
        border:none;
        border-radius: 0;
        height:40px;
        line-height:40px;
        font-size:16px;
    }
    .cancel{
        background:#ef4f4f;
    }
    .confirm{
        background:#00c1ae;
    }
</style>