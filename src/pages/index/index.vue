<template>
    <div class="page_border">
        <mt-header title="教职工信息管理"></mt-header>
        <div class="tab" v-for="item in result" @click="goLink(item)">{{item.name}}<i class="mint-cell-allow-right"></i></div>

    </div>
</template>
<style scoped>
  .mint-cell-allow-right::after{
    border: solid 2px #B5B5B5;
    width:14px;
    height:14px;
    border-bottom-width: 0;
    border-left-width: 0;
  }
    .index {
        background: #ffffff;
    }

    .right_icon {
        float: right;
        height: 50px;
        padding-right: 8px;
    }
    .tab{
        height:40px;
        line-height:40px;
        font-size:16px;
        padding-left:10px;
        background:#ffffff;
        border-bottom:1px solid #ededed;
        color:#333333;
        position:relative;
    }

    .page_border {
        background:#f9f9f9;
    }

    .select-container-parent {
        overflow: hidden;
        height: 40px;
        background-color: #fff;
        font-size: 16px;
        color:#00c1ae;
    }

    .select-containers {
        height: 60px;
        overflow-y: hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        color:#00c1ae;
    }

    .item {
        display: inline-block;
        padding: 8px 10px;
    }

    .selected {
        border-bottom: 2px solid rgb(0, 193, 174);
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
</style>
<script type="text/javascript">
    import basicList from '../../components/basicList.vue';
    import extendList from '../../components/extendList.vue';
    import { Get,Post } from '../../utils';
    import api from '../../api';
    export default {
        data(){
            return {
                selected: '0',
                result: [
                    {name: '基本信息',forms:'jwjbxx',type:'basicList'},
                    {name: '语言能力',forms:'yynl',type:'extendList',title:'语言'},
                    {name: '工作经历',forms:'gzjl',type:'extendList',title:'工作经历'},
                    {name: '学历学位信息',forms:'xlxw',type:'extendList',title:'学历学位信息'},
                    {name: '工人等级',forms:'grjsdj',type:'extendList',title:'等级'},
                    {name: '考核信息',forms:'kh',type:'extendList',title:'考核信息'},
                    {name: '政治面貌',forms:'zzmm',type:'extendList',title:'政治面貌'},
                    {name: '行政与党派任职（聘任）经历',forms:'xzydprzjl',type:'extendList',title:'任职经历'},
                    {name: '技术工人聘任经历',forms:'jsgrpyjl',type:'extendList',title:'聘任经历'},
                    {name: '兼任其他单位职务经历',forms:'jrqtdwzwjl',type:'extendList',title:'其他单位职务经历'},
                    {name: '专业技术资格信息',forms:'zyjszgxx',type:'extendList',title:'技术资格'},
                    {name: '职业资格信息',forms:'zyzgxx',type:'extendList',title:'职业资格'},
                    {name: '博士后研究人员信息',forms:'bshyjryxx',type:'extendList',title:'博士后研究人员'},
                    {name: '教育培训经历',forms:'jypxjl',type:'extendList',title:'培训经历'},
                    {name: '经费形式变动记录',forms:'sydwjfbdjl',type:'extendList',title:'形式变动'},
                    {name: '来华工作信息',forms:'lhgzxx',type:'extendList',title:'工作信息'},
                    {name: '人事档案调动记录',forms:'rsdaddjl',type:'extendList',title:'培训调动记录经历'},
                    {name: '奖励信息',forms:'jlxx',type:'extendList',title:'奖励信息'},
                    {name: '惩处信息',forms:'ccxx',type:'extendList',title:'惩处信息'},
                    {name: '政治运动表现',forms:'zzydbx',type:'extendList',title:'运动表现'},
                    {name: '休假信息',forms:'xjxx',type:'extendList',title:'休假信息'},
                    {name: '工伤信息',forms:'gsxx',type:'extendList',title:'工伤信息'},
                    {name: '考勤信息',forms:'kqxx',type:'extendList',title:'考勤信息'},
                    {name: '专业技术职务聘用经历',forms:'zjzwprjl',type:'extendList',title:'聘用经历'}
                ],
                compile: false,
                location: 0,
                title:'基本信息'
            }
        },
        methods: {
                goLink(params){
                this.$router.push({
                    name: params.type,
                    params: { item: JSON.stringify(params) }
                })
            },
        },
        components:{
            extendList:extendList,
            basicList:basicList
        }
    }
</script>
