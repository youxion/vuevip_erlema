// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 这里是主文件
import Vue from 'vue'
// 引入的路径 没有 ./ /  直接些名字是找的node_modules目录下的文件
import Router from 'vue-router'
// <script src='vue-router'></script>
// 传值的方式
// 1.通过网址传递 在路由里获取
// 2.同上  直接:to="{ path:'/b/bb',query:{ id:123 } }"  传递的方式是明文的 在网址后面会加上 ?xxx=xxx
// 3.params传值方式 必须是通过name去寻找对应的路由 才可以获取到数据
const App = {
  template: `<div id="app">
    默认显示的内容
    <button @click="$router.go(-1)">返回</button>
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li>
        <router-link to="/a">a</router-link>
        <ul>
          <li><router-link to="/a/aa">/a/aa</router-link></li>
          <li><router-link to="/a/aaa">/a/aaa</router-link></li>
        </ul>
      </li>

      <!-- { path:'/b',query:{ wang:123 } }会转换为浏览器路径 "/b?wang=123"  -->
      <!-- query时会以path值去寻找配置的路径，然后显示对应组件 -->
      <!-- 注意：大坑！此处的path:'/b'中b前面的 / 不能少，否则系统默认"b"为主路由"/b" 下的子路由，即"b"会被解析为"/b/b"
             若写{ path:'b',query:{ wang:123 } }会转换为浏览器路径 "/b/b?wang=123"  会出现主路由和子路由的拼接叠加 -->
      <li><router-link :to="{ path:'/b',query:{ wang:123 } }">/b/?wang=123</router-link></li>

      <!-- params时会以name值去寻找配置的路径，然后显示对应组件 -->
      <li><router-link :to="{name:'/b/bb', params:{ id:123 } }">name /b/bb</router-link></li>
      <!-- 激活后，系统会自动去寻找有name标记的路由配置，获取其path值显示在浏览器中，
           同时将params参数传递给该路由对应的组件 -->
      <!-- 在组件/模板中若使用name--params后，就不要再写path了，去router路由对象中配置path
           系统会自动找到本条name值，再装载该name上配置的path值  -->
      <!-- 此时的to要用v-bind进行绑定 -->

      <li><router-link :to="{ name:'con',params:{ id:'cccccccc' } }">/c</router-link></li>
    </ul>
    <router-view></router-view>
  </div>`
}
const index = {
  template: `<div>这里是index</div>`
}
const a = {
  template: `<div>
    <p>这里是a</p>
    <router-view></router-view>  <!-- 用来显示子路由aa的内容 -->
  </div>`
}
const aa = {
  template: `<div>这里是a的子路由对应的组件aa，传递的路由参数：{{$route.params }}</div>`,
  mounted () {
    console.log(this.$route)
    console.log(111)
  }
}
const bong = Vue.component('b', {
  template: `<div>这里是b</div>`,
  mounted () {
    console.log(this.$route)
  }
})
const c = {
  template: `<div>{{ $route.params }}</div>`
}
// 跟路由显示的地方是第一个 router-view 标签里
const router = new Router({
  routes: [
    // 在 routes 里面的称之为跟路由
    // 跟路由是可以写 /
    { path: '/',
      component: index
    },
    {
      path: '/a',
      component: a,
      children: [
        /*
        *  1.要使子路由对应的组件显示，必要在父路由对应的组件内部加一个router-view标签
        *  2.子路由配置时，不可以写 /  因为父级路由已经定义了 /a/子路有的path
        *  3.子路由显示的地方： 父级路由模板里的第一个 router-view 标签里
        *  4.:id中的id是随便起的名字  绑定了一个值是可以接收数据
        *
        * */
        // {path: ':id', component: aa},
        {path: 'aaa', component: aa},
        // 此处相当于配置了一条"/a/aaa"的路由，而不是配置"/aaa"路由,在页面调用路由时要写"/a/aaa"

        {path: 'wang', component: aa},

        {path: ':id', component: aa}
        /* 1.此处相当于配置了一条"/a/:id"的路由，而不是配置"/:id"路由，在页面调用路由时要写"/a/:id"
        *  2.当浏览器切换到 "a/xiong" 样式的路由时，会将xiong作为参数传递给"/a/:id" 中的id，组成一个对象{"id": "xiong"}
             通过$router.patams可以获取到对象{id: "xiong"}
        *  3. "/a/:id"路由匹配的规则：输入"/a/xiong"，若发现配置了子路由"xiong"，
        *      就将"xiong"作为路由路径处理（此时$router.params无值），
        *      否则将"xiong"作为"/a/:id"中的id参数处理（此时$router.params有值）
        *  4.在浏览器输入"a/xiong"路由时，系统会自动遍历配置好的路由数组，
        *    找到一样的路由后就跳出遍历，不再向下寻找（在此过程中，会触发"/a/:id"类似的路由）。
        *    若遍历到数组末尾还是找不到"a/xiong"路由，就报错
        * */
      ]
    },
    //      /b/ bb
    {path: '/b', component: bong},
    // {path: '/b/:id', component: bong},  // 可以匹配到路由 "/b/?wang=123" ,得到query: {wang: 123}，但是params无值
    // {path: '/b/:id', name: '/b/bb', component: bong},
    {path: '/b/rrrr', name: '/b/bb', component: bong},
    /*
    *  1.注意：此时path属性一定要写，否则报错, name属性值要写且与调用路由的地方一样，否则params无法传递
    *                可以匹配到路由 "/b/bb" ,得到params: {id: 123}，但是query无值
    * */

    {path: '/c', name: 'con', component: c}

  ],
  mode: 'history'
})
// 使用路由插件
Vue.use(Router)
Vue.config.productionTip = false  // 处于开发模式时，禁止出现生成模式的提示信息
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 传递一个参数: 让页面默认显示的模板 return
  render: h => h(App),
  components: {
    bong
  },
  methods: {
    about_click () {
      this.$router.push('/about')  // 相当于路由解析，
      // 注意：在VueJs中，所有的component都有 $router 这个属性

      // this.$router.replace('/about') // 使用此法时，浏览器不能点击返回、前进
      console.log('about_click')
    },

    home_click () {
      this.$router.push('/home')
      console.log('home_click')
    }
  }
})
// template: '<App/>',components: { App }

/*

<button @click='home_click'></button>

<button @click='about_click'></button>
*/

