<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart()">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{ food.count }}
    </div>
    <div id="add" class="cart-add" @click.stop.prevent="addCart()">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['food'],
    data () {
      return {
        ok: true
      }
    },
    methods: {
      ...mapMutations([
        'vxaddCart',
        'vxdecreaseCart'
      ]),
      addCart () {
        if (typeof this.food.count === 'undefined') {
          Vue.set(this.food, 'count', 0)
          Vue.set(this.food, 'active', true)
        }
        this.food.count++
        // 存储当前点击的元素，在购物车中会用到
        if (this.food.active) {
          this.vxaddCart(this.food)
          this.food.active = false
        }
//        console.log('--------------addCart-----------------')
//        console.log(this.food)
//        console.log('--------------addCart-----------------')
      },
      decreaseCart () {
        this.food.count--
        if (this.food.count === 0) {
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
        'vxselectFoods'
      ])
    }
  }
</script>
<style>

</style>
