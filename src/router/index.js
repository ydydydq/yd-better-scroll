import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = resolve => {
  require.ensure([], () => {
    resolve(require('@/components/HelloWorld'))
  }, 'HelloWorld')
}
const Page1 = resolve => {
  require.ensure([], () => {
    resolve(require('@/components/page/page1'))
  }, 'Page1')
}
const Page2 = resolve => {
  require.ensure([], () => {
    resolve(require('@/components/page/page2'))
  }, 'Page2')
}
const Page3 = resolve => {
  require.ensure([], () => {
    resolve(require('@/components/page/page3'))
  }, 'Page3')
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/HelloWorld'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:'/HelloWorld/page1',
          component: Page1
        },
        {
          path:'/HelloWorld/page2',
          component: Page2
        },
        {
          path:'/HelloWorld/page3',
          component: Page3
        }
      ]
    }
  ]
})
