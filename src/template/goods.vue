<template>
  <div class="goods">
    <!-- TODO:带联动滚动 -->
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="iconMap" :class="iconClassMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="(item, oindex) in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, tindex) in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" >
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                  <div class="price">
                    <span class="newPrice"><span class="unit">$</span>{{food.price}}</span>
                    <span v-show="food.oldPrice"><span class="unit">$</span>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice = "seller.minPrice" :selectFoods="selectFoods"></shopcart>
  </div>
</template>
<script>
  import axios from 'axios'
  import Scroll from 'better-scroll'
  import shopcart from './mods/shopcart.vue'
  import cartcontrol from './mods/cartcontrol.vue'
  export default {
    props: ['seller'],
    data () {
      return {
        goods: null,
        iconClassMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    mounted () {
      axios.get('/api/goods', {params: {id: '1'}}).then((res) => {
        this.goods = res.data
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.initScroll()
          })
        })
      })
    },
    methods: {
      initScroll () {
//        console.log(this.$refs)
//        console.log(`------------`)
        /* eslint-disable no-new */
        new Scroll(this.$refs['menu-wrapper'], {
          click: true
        })
        new Scroll(this.$refs['foods-wrapper'], {
          click: true
        })
      }
    },
    computed: {
      // 有count 或 大于0的商品
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  }
</script>
<style>

</style>
