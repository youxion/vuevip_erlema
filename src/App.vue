<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
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
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from './template/mods/header.vue'
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    mounted () {
      axios.get('/api/seller', {params: {id: '1'}}).then((res) => {
        //  console.log(typeof res.data)
        this.seller = res.data
      })
    },
    methods: {},
    computed: {},
    components: {
      'v-header': header
    }
  }
</script>

<style scoped>
  .tab .tab-item a.router-link-active{
    color:#f01414;
  }
</style>
