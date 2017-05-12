export default {
  // 添加商品
  vxaddCart (state, value) {
    state.slectFoods.push(value)
  },
  // 删除商品
  vxdecreaseCart (state, value) {
    state.slectFoods.forEach((val, index) => {
      if (val.name === value.name) {
        state.slectFoods.splice(index, 1)
      }
    })
  },
  vxempty (state, value) {
    // value.forEach(val => {
    //   val.count = 0
    //   val.active = true
    // })
    state.slectFoods.splice(0, state.slectFoods.length)
  }
}
