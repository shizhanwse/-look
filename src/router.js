import basicList from './components/basicList.vue';
import extendList from './components/extendList.vue';
import index from './pages/index/index.vue';
export default {
    routes: [
        {
            path: '/',
            component: index,
            name:'index',
            meta:{
                require:['jwjbxx']
            }
        },
         {
            path: '/basicList/:item',
             name:'basicList',
            component: basicList,
            meta:{
                require:['jwjbxx']
            }
        },
         {
            path: '/extendList/:item',
             name:'extendList',
            component: extendList,
            meta:{
                require:['yynl','gzjl','xlxw',
                'grjsdj','kh','zzmm','xzydprzjl','jsgrpyjl','jrqtdwzwjl',
                'zyjszgxx','zyzgxx','bshyjryxx','jypxjl','sydwjfbdjl','lhgzxx',
                'rsdaddjl','jlxx','ccxx','zzydbx','xjxx','gsxx',
                'kqxx','zjzwprjl']
               
            }
        },
        
        

    ]
};