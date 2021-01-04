// components/bookCityTab/bookCityTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle() {
      this.data.flag = true
      this.setData({
        flag: this.data.flag
      })
      this.delivery()
    },
    handle1() {
      this.data.flag = false
      this.setData({
        flag: this.data.flag
      })
      this.delivery()
    },
    delivery(){
      this.triggerEvent('send',this.data.flag)
    }
  },
  lifetimes:{
    ready(){
      this.delivery()
    }
  }
})
