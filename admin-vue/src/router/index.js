import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import Home from '@/components/Home/home'
import User from '@/components/User/user'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/user',
      name: 'user',
      component: User
    }]
  }]
})
