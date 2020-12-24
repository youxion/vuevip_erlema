<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left" @click="showa()">
        <div class="logo-wrapper">
          <div class="logo" :class="{'active':deliveryPrice>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="badge" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalPrice}">￥{{totalPrice}}</div>
        <div class="desc" v-show="totalPrice < 100">另需要配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>=minPrice}">
        <div class="pay">{{ payDesc }}</div>
      </div>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="totalPrice > 0 && this.cartShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty()">清空</span>
        </div>
        <div class="list-content" ref="foodlist">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapMutations, mapState} from 'vuex'
  import cartcontrol from './cartcontrol'
  import Scroll from 'better-scroll'
  export default {
    //      配送费        最少20元起送  有count 或 大于0的商品
    props: ['deliveryPrice', 'minPrice', 'selectFoods', 'freshFlag', 'cartHiden'],
    data () {
      return {
        show: false,
        scRefresh: false
      }
    },
    mounted () {
      // this.freshList()
    },
    computed: {
      ...mapState([
        'scrollRefresh',
        'cartShow'
      ]),

      cartHidenA () {
        this.isShow = this.cartHiden
        console.log('cartHiden')
      },

      // 总金额
      totalPrice () {
        // console.log(this.selectFoods)
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      // 选择商品的数量
      totalCount () {
        let count = 0
//        console.log('----------------------')
        this.selectFoods.forEach(food => {
//          console.log(food)
          count += food.count
        })
        return count
      },
      // 起送
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}起送`
        } else {
          return '去结算'
        }
      }
    },
    methods: {
      ...mapMutations([
        'controlCartShow'
      ]),
      freshList () {
        console.log(this.scRefresh)
        console.log(this.freshFlag)
        if (this.scRefresh === this.freshFlag) {
          this.$nextTick(() => {  // 等待Dom更新
            console.log(this.sc)
            this.sc.refresh()
          })
        } else {
          this.scRefresh = !this.scRefresh
        }
        return 210
      },
      ...mapMutations([
        'vxempty'
      ]),
      showa () {
        // this.show = !this.show
        this.controlCartShow()
        const foodlistObj = this.$refs.foodlist
        this.$nextTick(() => {
          if (!this.sc) {
            /* eslint-disable no-new */    /* ['foodlist'] */
            this.sc = new Scroll(foodlistObj, {
              click: true   // 监听点击事件时必须设置
            })
            this.sc.refresh()
          } else {
            this.sc.refresh()  // Dom更新后，若滚动区域存在，就刷新滚动区域的高度（增加商品会改变高度）
          }
        })
        this.$emit('cover', {totalPrice: this.totalPrice})
      },
      empty () {
        this.show = false
        this.selectFoods.forEach(val => {
          val.count = 0
          val.active = true
        })
        this.vxempty()  // 清空vuex中的购物车数组
      },
      listToggle () {
        this.show = !this.show
//        /* eslint-disable no-new */
//        new Scroll(this.$refs['foodlist'], {
//          click: true
//        })
      }
    },
    updated () {
      // this.freshList()
      // console.log('updated')
    },
    components: {
      cartcontrol
    }
  }
</script>
<style>

</style>
