const { default: api } = require("../../http/api")

// components/rank/rank.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gender: {
      type: String
    },
    data: {
      type: {
        type: Array
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sex: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle(e) {
      console.log(e.currentTarget.dataset.item);
       wx.navigateTo({
         url: `/pages/list/list?title=${JSON.stringify(e.currentTarget.dataset.item)}&sex=${this.data.sex}`,
       })
       console.log(this.data.sex);
    },
    getGender() {
      if (this.properties.gender === "男生") {   
        this.setData({
          sex: "male"
        })
      } else {  
        this.setData({
          sex: "female"
        })
      }
    }
  },
  lifetimes: {
    ready() {
      this.getGender()
    }
  }
})
