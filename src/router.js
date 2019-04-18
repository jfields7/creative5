import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Research from './views/Research.vue'
import Login from './views/Login.vue'
import CV from './views/CV.vue'
import Admin from './views/Admin.vue'
import List from './views/List.vue'
import Contact from './views/Contact.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/research',
      name: 'research',
      component: Research
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cv',
      name: 'cv',
      component: CV
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/list/:id',
      name: 'list',
      component: List
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
