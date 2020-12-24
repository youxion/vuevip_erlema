<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{ food.count }}
    </div>
    <div id="add" class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['food', 'freshFlag', 'test'],
    // 通过props传递过来的数据food，可以直接在本组件中当作变量使用、修改，
    // 注意：修改food时，改变的父级中的food数据
    data () {
      return {
        ok: true
      }
    },
    methods: {
      ...mapMutations([
        'vxaddCart',
        'vxdecreaseCart',
        'scChange'
      ]),
      addCart (event) {
//        console.log(event)
       /* Vue.set(this.test, 'wang', true)
        Vue.set(this.test, 'xiong', true) */
        // console.log(this.freshFlag)
        this.$emit('fresh')

        if (!event._constructed) {    // --------
          return
        }
        if (typeof this.food.count === 'undefined') {
          Vue.set(this.food, 'count', 0)
          Vue.set(this.food, 'active', true)
        }
        this.food.count++
        if (this.food.active) {
          this.vxaddCart(this.food)  // 将选择的商品加入vuex中的购物车数组
          this.food.active = false
        }
//        console.log('--------------addCart-----------------')
//        console.log(this.food)
//        console.log('--------------addCart-----------------')
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        this.food.count--
        if (this.food.count === 0) {  // 若某个商品的数量为0，就将该商品从购物车数组中删除
          this.vxdecreaseCart(this.food)
          this.food.active = true
        }
//        console.log('--------------decreaseCart-----------------')
//        console.log(this.food)
//        console.log('--------------decreaseCart-----------------')
      }
    },
    computed: {
      ...mapState([
        'vxselectFoods',
        'scrollRefresh'
      ])
    }
  }
</script>
<style>

</style>
