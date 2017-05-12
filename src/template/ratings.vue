<template>
  <div class="ratingsWrapper">
    <!-- TODO:待添加数据 -->
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">4.2</div>
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
      <div class="evaluation"></div>
    </div>
  </div>
</template>

<script>
  import star from './mods/star.vue'
  export default {
    props: ['seller'],
    components: {
      star
    }
  }
</script>
<style>

</style>
