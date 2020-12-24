<template>
  <div class="goods">
    <!-- TODO:待联动滚动 -->
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods"
            class="menu-item"
            @click=toGoodsTitle(index)
            :class="{'activeColor': index === activeIndex}"
            ref="menuItem">
          <!-- <span class="wang" ref="wang"> </span>-->
          <span class="text">
            <span v-show="item.type>0" class="iconMap" :class="iconClassMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
        <!--div class="wang" ref="xiong2"> come here</div>
        <div class="wang" ref="xiong3"> come here</div>
        <div class="wang" ref="xiong4"> come here</div>
        <div class="wang" ref="xiong5"> come here</div>
        <div class="wang" ref="xiong6"> come here</div>
        <div class="wang" ref="xiong7"> come here</div>
        <div class="wang" ref="xiong8"> come here</div>-->
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul class="boxGoods">
        <li v-for="item in goods" class="food-list food-list-hook" ref="goodsItem">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" @click="goDetail(food)" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="description">{{ food.description }}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{ food.sellCount }}份</span>
                  <span class="rating">好评率{{ food.rating }}%</span>
                  <div class="price">
                    <span class="newPrice"><span class="unit">$</span>{{ food.price }}</span>
                    <span v-show="food.oldPrice"><span class="unit">$</span>{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" :freshFlag="freshFlag" :test="test" @fresh="fresh()"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>                                                              <!--  :selectFoods="selectFoods"-->
    <!-- 注意：在shopcart组件和foods-wrapper中点击加减按钮改变的商品数量时，操作的数组都是父组件中的同个数组 -->
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"
              :freshFlag="freshFlag" @cover="cover"></shopcart>

    <transition name="cover">
      <div class="cover" v-show="this.vxselectFoods.length>0 && this.cartShow" @click="coverHiden"></div>
    </transition>

    <foodDetail :food="selectedFood" ref="myFood"></foodDetail>
  </div>
</template>
<script>
import axios from 'axios'
import Scroll from 'better-scroll'
import shopcart from './mods/shopcart.vue'
import cartcontrol from './mods/cartcontrol.vue'
import foodDetail from './mods/foodDetail.vue'
import {mapState, mapMutations} from 'vuex'

export default {
  props: ['seller'],
  data () {
    return {
      ListLiTop: 0,
      totalPrice: 0,
      boxGoods: null,
      goodsList: null,
      // isShow: false,
      goods: [],
      iconClassMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      selectedFood: '',
      freshFlag: true,
      test: {'wang': false},
      menuBS: null,
      foodsBS: null,
      activeIndex: 0,
      foods: []
    }
  },
  mounted () {
    axios.get('/api/goods').then((res) => {    // 从本地node服务器 build/dev-server.js 获取数据
      console.log(res)
      this.goods = res.data

      // 创建scroll对象必须要在获取数据之后，因为得到数据后会渲染页面，改变dom高度
      // 在页面渲染之后创建scroll对象，可以让scroll对象获取到最新的Dom高度，便于滚动
      this.$nextTick(() => {
        this.scroll()
        this.foodListScroll()  // 创建scroll对象后，再监听scroll对象滚动

        this.boxGoods = document.getElementsByClassName('boxGoods')[0]
        this.goodsList = this.boxGoods.getElementsByClassName('food-list')  // li对象组成的伪数组
        // console.log(this.goodsList)
        console.log([].slice.call(this.goodsList))

        let heightLi = 0
        let topLi = []
        console.log(typeof this.goodsList)

        // Array.prototype.slice.call(this.goodsList) ,将伪数组goodsList转换为真数组
        // 遍历每个li，每遍历一次将当前li高度与前面li高度进行累加，得到当前li到顶部的距离
        Array.prototype.slice.call(this.goodsList).forEach((item) => {
          heightLi += item.clientHeight
          topLi.push(heightLi)
        })
        this.ListLiTop = topLi
        console.log(topLi)
      })
    })

    // this.foodListScroll()

    /* const bgImg = document.querySelectorAll('.iconMap')
    // const bgImg = document.querySelector('.iconMap')
    console.log(bgImg) */
  },
  methods: {
    ...mapMutations([
      'scChange',
      'controlCartShow'
    ]),

    // 监听商品列表滚动
    foodListScroll () {
      this.foodsBS.on('scroll', (position) => {
        // console.log(position)
        let positionNow = Math.ceil(Math.abs(position.y))  // 将负位置变成正数，再向上取整
        // console.log(positionNow)
        let getIndex = 0

        // 检测到滚动，就查找滚动值在哪个范围区间
        getIndex = this.ListLiTop.findIndex((item, index, arr) => {
          if (positionNow >= item && positionNow < arr[index + 1]) {
            console.log(position)
            this.menuBS.scrollToElement(this.$refs.menuItem[index], 300, true, 0, 'easing')
            console.log(positionNow)
          }

          // 只要一滚动，就寻找positionNow所处的item区间，
          // 若找到了这个区间，就返回该区间内后一个item的index
          return positionNow >= item && positionNow < arr[index + 1]
        })
        this.activeIndex = getIndex + 1
        // console.log('activeIndex: ' + this.activeIndex)
      })
    },

    // 跳转到对应的商品标题
    toGoodsTitle (index) {
      console.log('goods')
      this.activeIndex = index
      // this.menuBS.scrollToElement(this.$refs.xiong2, 300, 0, 0, 'easing')
      this.menuBS.scrollToElement(this.$refs.menuItem[index], 300, true, 0, 'easing')
      this.foodsBS.scrollToElement(this.$refs.goodsItem[index], 300, true, 0, 'easing')
    },

    cover (flag) {
      // let {isShow, totalPrice} = flag
      // this.isShow = flag.show
      // this.totalPrice = flag.totalPrice
      // console.log(this.isShow)
    },
    coverHiden () {
      this.controlCartShow()
    },

    fresh () {
      this.freshFlag = !this.freshFlag
      // console.log('goods: ' + this.freshFlag)
      this.scChange(this.freshFlag)
      // console.log(this.scrollRefresh)
    },
    scroll () {
      /* eslint-disable no-new */
      // 注意： 此处的滚动对象一定要是全局变量，否则在其它地方获取该滚动对象
      this.menuBS = new Scroll(this.$refs['menu-wrapper'], {
        click: true
      })
      console.log(this.menuBS)
      this.foodsBS = new Scroll(this.$refs['foods-wrapper'], {
        probeType: 3,
        click: true
      })
      console.log(this.foodsBS)
    },
    goDetail (food) {
      this.selectedFood = food
//        this.$nextTick(() => {
//          console.log(this.$refs.myFood)
      this.$refs.myFood.show()
//        })
    }
  },
  updated () {
    /* eslint-disable no-new */
//      new Scroll(this.$refs['menu-wrapper'], {
//        click: true
//      })
//      new Scroll(this.$refs['foods-wrapper'], {
//        click: true
//      })
  },
  computed: {
    ...mapState([
      'vxselectFoods',
      'scrollRefresh',
      'cartShow'
    ]),

    /* cover (flag) {
      this.isShow = flag
      console.log(this.isShow)
    }, */

    // 有count 或 大于0的商品
    selectFoods () {
      this.foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            this.foods.push(food)
            // console.log(food)
          }
        })
      })
      // this.vxselectFoods = this.foods  // 将选择的商品加入vuex中的购物车数组
      return this.foods
    }
  },
  components: {
    shopcart,
    cartcontrol,
    foodDetail
  }
}
</script>
<style>
.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  /*transition: all 5.4s;*/
  transition: all 1s ease;


}

.cover-enter, .cover-leave-to {
  opacity: 0;

}

.cover-enter-active, .cover-leave-active {
  /*transition: all 2s ease;*/

}

.wang {
  border: 1px solid red;
}

.activeColor {
  color: red;
}

</style>
