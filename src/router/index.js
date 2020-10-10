//引入vue
import Vue from 'vue';
//引入vue-router
import Router from 'vue-router';
//第三方库需要use一下才能用
Vue.use(Router)

import portal from "@/view/portal"
import control from "@/view/control"
import controlled from "@/view/controlled"



export default new Router({
  routes: [{
      path: '/',
      name: 'portal',
      component: portal,
      show: false
    }, {
      path: '/control',
      name: 'control',
      component: control,
      show: false
    },
    {
      path: '/controlled',
      name: 'controlled',
      component: controlled,
      show: false
    }
  ]
})