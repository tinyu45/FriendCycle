import Vue from 'vue'
import Router from 'vue-router'
import cycle from '@/components/Cycle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cycle',
      component: cycle
    }

  ]
})
