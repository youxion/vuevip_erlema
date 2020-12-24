import Vue from 'vue'
import Router from 'vue-router'
import goods from '../template/goods.vue'
import ratings from '../template/ratings.vue'
import seller from '../template/seller.vue'
import foodDetail from '../template/mods/foodDetail.vue'

Vue.use(Router)
export default new Router({
  routes: [
    /*
    * components: {
    *   default: index
    *   router-view的name: 模板
    *   ,
     beforeEnter (to, from, next) {
     next()
     }
    * }
    *
    * /* ,
     {
     path: '/dp/:id.html',
     name: 'dp',
     component: dp,
     children: [
     {path: ':id', component: wulv}
     ]
     }
    * */
    {path: '/', redirect: '/goods'},
    {
      path: '/goods',
      component: goods,
      meta: {
        name: '商品类比'
      },
      children: [
        {
          path: '/detail',
          component: foodDetail,
          meta: {
            name: '商品详情'
          }
        }
      ]
    },
    {
      path: '/ratings',
      component: ratings,
      meta: {
        name: '用户评论'
      }
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller,
      meta: {
        name: '商家信息'
      }

    },
    {
      path: '/*',   //  '/*'表示任何路径，即输入任何路径都跳转到 '/' 根目录，最后都被被重定向到 '/goods'
      redirect: '/'
    }
  ],
  mode: 'history'  // 让浏览器里面的url使用斜杆路径形式： /wang/youx/ ，默认显示hash模式：#/wang/
})
