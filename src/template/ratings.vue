<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <!-- TODO:待添加数据 -->
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家69.2%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">38分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span v-for="(item,index) in classifyArr" class="item" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="filterEvel(index)">
            {{item.name}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="evelflag=!evelflag">
          <span class="icon-check_circle" :class="{'on':evelflag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="evel in comment">
              <div class="avatar">
                <img :src="evel.avatar" width="28" height="28">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.username}}</span>
                  <span class="rateTime">{{evel.rateTime}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size="24" :score="evel.score"></star>
                  <span class="deliveryTime">{{evel.deliveryTime | time}}分钟送达</span>
                </div>
                <div class="text">
                  {{evel.text}}
                </div>
                <div class="recommend">
                  <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                  <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import star from './mods/star.vue'
  export default {
    props: ['seller'],
    data () {
      return {
        ratings: '',
        classifyArr: [
          {
            name: '全部',
            count: 0,
            active: true,
            comment: []
          },
          {
            name: '推荐',
            count: 0,
            active: false,
            comment: []
          },
          {
            name: '吐槽',
            count: 0,
            active: false,
            comment: []
          }],
        evelflag: true,
        comment: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        axios.get('/api/ratings').then(res => {
          this.ratings = res.data
          this.a()
          this.comment = res.data
        })
      })
    },
    computed: {
    },
    methods: {
      a () {
        this.ratings.forEach((val, i) => {
          this.classifyArr[0].count++
          this.classifyArr[0].comment.push(val)
          if (val.score > 3 && val.score < 5) {
            this.classifyArr[1].count++
            this.classifyArr[1].comment.push(val)
          }
          if (val.score < 3) {
            this.classifyArr[2].count++
            this.classifyArr[2].comment.push(val)
          }
        })
      },
      filterEvel (i = 0) {
//        console.log(i)
//        console.log(this.classifyArr[i].comment)
        this.classifyArr.forEach((val) => {
          val.active = false
        })
        this.classifyArr[i].active = true
        this.comment = this.classifyArr[i].comment
      }
    },
    components: {
      star
    },
    filters: {
      time (value) {
        return value || 0
      }
    }
  }
</script>
<style>

</style>
