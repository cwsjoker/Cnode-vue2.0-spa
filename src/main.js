var Vue = require('vue');
var VueRouter = require('vue-router');
// var axios = require('axios');
var store = require('./store');
var filters = require('./filters');
//引入css重置文件,基本的样式文件
require('./css/reset.css');
// 引入px与rem的换算
require('./js/equ.js');

//实例化vue模块 
Vue.use(VueRouter);
// Vue.use(axios);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

const home = resolve => {
    require.ensure(['./App.vue'], () => {
        resolve(require('./App.vue'));
    });
};
const articleList = resolve => {
    require.ensure(['./vue/articleList.vue'], () => {
        resolve(require('./vue/articleList.vue'));
    });
};
const about = resolve => {
    require.ensure(['./vue/about.vue'], () => {
        resolve(require('./vue/about.vue'));
    });
};
const login = resolve => {
    require.ensure(['./vue/login.vue'], () => {
        resolve(require('./vue/login.vue'));
    });
}
const article = resolve => {
    require.ensure(['./vue/article.vue'], () => {
        resolve(require('./vue/article.vue'));
    });
}
const userhome = resolve => {
    require.ensure(['./vue/userhome.vue'], () => {
        resolve(require('./vue/userhome.vue'));
    });
}
const usermessage = resolve => {
    require.ensure(['./vue/usermessage.vue'], () => {
        resolve(require('./vue/usermessage.vue'));
    });
}
const createtopic = resolve => {
    require.ensure(['./vue/createtopic.vue'], () => {
        resolve(require('./vue/createtopic.vue'));
    });
}
const edittopic = resolve => {
    require.ensure(['./vue/edittopic.vue'], () => {
        resolve(require('./vue/edittopic.vue'));
    });
}
const routes = [{
        path: '/',
        name: 'home',
        component: home
    },{
        path: '/articleList',
        name: 'articleList',
        component: articleList
    },{
        path: '/login',
        name: 'login',
        component: login
    },{
        path: '/about',
        name: 'about',
        component: about
    },{
        path: '/article/:id',
        name: 'article',
        component: article
    },{
        path: '/userhome/:username',
        name: 'userhome',
        component: userhome
    },{
        path: '/usermessage',
        name: 'usermessage',
        component: usermessage
    },{
        path: '/createtopic',
        name: 'createtopic',
        component: createtopic
    },{
        path: '/edittopic/:topicid',
        name: 'edittopic',
        component: edittopic
    },{
        path: '*',
        component: home
    }];
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});
new Vue({
    router,
    store
}).$mount('#app');