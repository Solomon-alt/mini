import api from "../../http/api"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array
    },
    gender: {
      type: String
    },
    major: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle(e) {
      wx.navigateTo({
        url: `/pages/details/details?item=${JSON.stringify(e.currentTarget.dataset.major)}&gender=${this.properties.gender}`,
      })
    },
  },
})
