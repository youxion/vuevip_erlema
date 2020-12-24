<template>
  <div id="app">
    <v-header :seller="d.seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="d.seller" ref="router"></router-view><!--  路由切换时，给当前激活组件传递一条seller数据-->
    </keep-alive>
  </div>
</template>

<script>
  import header from './template/mods/header.vue'
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return {
        d: {
          seller: {},
          goods: [],
          ratings: []
        }
      }
    },
    mounted: function mounted () {
      axios.get('/static/data.json').then((res) => {
        this.d.seller = res.data.seller
        this.d.goods = res.data.goods
        this.d.ratings = res.data.ratings
//        this.$nextTick(() => {
//          this.$refs.router.scroll()
//        })
      })
      document.addEventListener('visibilitychange', this.changeTitle, false)
      // 监听切换浏览器标签页的行为，只要切换了标签页就触发一次（即本网页显示、隐藏时触发）
    },
    methods: {
      changeTitle () {
        if (document.hidden) {  // 判断浏览器是否在显示本页面（可能在显示其他标签页）
          document.title = 'Σ(ﾟдﾟ;)'
        } else {
          document.title = 'VueVip'
        }
      }
    },
    computed: {},
    components: {
      'v-header': header
    }
  }
</script>

<style scoped>
  .tab .tab-item a.router-link-active {
    color: #f01414;
  }
</style>
