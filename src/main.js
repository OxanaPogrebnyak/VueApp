import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import Base from './components/Base.vue'
import Post from './components/Post.vue'
import Delete from './components/Delete.vue'
import Login from './components/Login.vue'
Vue.use(Router);
Vue.use(VueCookies);

const router = new Router({
  routes: [
    {
      path: '/',
      name:'base',
      component: Base
    },
    {
      path: '/post/:id',
      name:'post',
      component: Post,
      props: true,
    },
    {
      path: '/post/add/',
      name:'post_add',
      component: Post
    },
    {
      path: '/delete/:id',
      name:'delete',
      component: Delete,
      props: true,
    },
    {
      path: '/login/',
      name:'login',
      component: Login
    },
  ]
});

let isAuthenticated = VueCookies.get('authorize');
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' });
  else next()
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
