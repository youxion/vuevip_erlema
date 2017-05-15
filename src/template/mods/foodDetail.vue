<template>
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div class="back" @click="show()">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" height="425" width="100%">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div class="shopCart" v-if="food.count<=0 || food.count === undefined">
              <div class="text" @click="addCart()">加入购物车</div>
            </div>
          </transition>
          <cartcontrol ref="cartcontrol" :food="food"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">
            商品评价
          </div>
          <div class="classify">
            <!--<span v-for="(item,index) in classifyArr" class="item" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="filterEvel(item)">-->
              <!--{{item.name}}<span class="count">{{item.count}}</span>-->
            <!--</span>-->
          </div>
          <!--<div class="switch" @click="evelflag=!evelflag">-->
            <!--<span class="icon-check_circle" :class="{'on':evelflag}"></span>-->
            <!--<span class="text">只看有内容的评价</span>-->
          <!--</div>-->
          <!--<div class="evel-list">-->
            <!--<ul>-->
              <!--<li class="evel" v-for="evel in evelArr">-->
                <!--<div class="userInfo">-->
                  <!--<div class="time">{{evel.rateTime | time}}</div>-->
                  <!--<div class="user">-->
                    <!--<span>{{evel.username}}</span>-->
                    <!--<span class="avatar"><img :src="evel.avatar" width="12" height="12"></span>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="content">-->
                  <!--<span class="icon" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'"></span>-->
                  <!--<span class="text">{{evel.text}}</span>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
//  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from './cartcontrol.vue'
  import {mapMutations} from 'vuex'
  export default {
    props: ['food'],
    data () {
      return {
        showDetail: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (!this.a) {
          /* eslint-disable no-new */
          this.a = new BScroll(this.$refs.detailWrapper, {
            click: true
          })
        }
      })
//      if (typeof this.food.count === 'undefined') {
//        Vue.set(this.food, 'count', 0)
//        Vue.set(this.food, 'active', true)
//      }
//      console.log(this.food)
    },
    methods: {
      ...mapMutations([
        'vxaddCart'
      ]),
      show () {
        this.showDetail = !this.showDetail
      },
      addCart () {
//        alert(1)
        this.$refs.cartcontrol.addCart()
      }
    },
    components: {
      cartcontrol
    }
  }
</script>
