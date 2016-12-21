var Vue = require('vue');
var VueRouter = require('vue-router');
// var axios = require('axios');
var store = require('./store');
console.log(store);
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
const routes = [{
        path: '/',
        // name: 'home',
        component: home
    },{
        path: '/login',
        // name: 'login',
        component: login
    },{
        path: '/about',
        // name: 'about',
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
        path: '*',
        component: home
    }];
const router = new VueRouter({
    mode: 'history',
    routes
});
new Vue({
    router,
    store
}).$mount('#app');