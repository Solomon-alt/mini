import api from "../../http/api"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    abstract: {
      type: Object
    },
    arr: {
      type: Array
    },
    total: {
      type: Number
    },
    num: {
      type: Number
    },
    data: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    books: [],
    shu: '',
    a: null,
    b: null,
    c: null,
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
    },
    handle1() {
      this.data.flag = false
      this.setData({
        flag: this.data.flag
      })
    },
    handle2() {
      this.getRandom()
    },
    getData() {
      wx.showLoading({
        title: '加载中',
      })
      api.relatedRecommendedBooks(
        this.properties.data
      ).then(res => {
        if (res.ok === true) {
          this.setData({
            books: res.books,
            shu: res.books.length - 1
          })
          wx.hideLoading()
        }
        this.handle2()
      }).catch(err => {
        console.log(err);
      })
    },
    getRandom() {
      this.setData({
        a: Math.floor(Math.random() * (this.data.shu + 1)),
        b: Math.floor(Math.random() * (this.data.shu + 1)),
        c: Math.floor(Math.random() * (this.data.shu + 1))
      })
      if (this.data.a === this.data.b) {
        this.data.b = null
      } else if (this.data.a === this.data.c) {
        this.data.c = null
      } else if (this.data.b === this.data.c) {
        this.data.c = null
      } else if (this.data.a === this.data.b === this.data.c) {
        this.data.b = null
        this.data.c = null
      }
    },
    handleItem(e){
      console.log(e.currentTarget.dataset.item);
     wx.navigateTo({
      url: `/pages/evaluation/evaluation?item=${JSON.stringify(e.currentTarget.dataset.item)}`,
     })
    }
  },
  lifetimes: {
    ready() {
      this.getData()
    }
  }
})
