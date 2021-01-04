import api from "../../http/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
      id: 'hot',
      name: '热门'
    },
    {
      id: 'new',
      name: '新书'
    },
    {
      id: 'reputation',
      name: '好评'
    },
    {
      id: 'over',
      name: '完结'
    },
    {
      id: 'monthly',
      name: 'VIP'
    }
    ],
    name: 'hot',
    num: 0,
    num1: -1,
    title: '',
    arr: [],
    flag: true,
    gender: '',
    story: '',
    books: [],
  },
  handle(e) {
    this.setData({
      num: e.currentTarget.dataset.index,
      name: e.currentTarget.dataset.item.id,
    })
    this.getCatsBooks()
    console.log(this.data.name);
  },
  handle1() {
    this.data.flag = true
    this.setData({
      flag: this.data.flag,
      story: ''
    })
    this.getCatsBooks()
  },
  handle2(e) {
    // console.log(e.currentTarget.dataset.item);
    this.data.flag = false
    this.setData({
      flag: this.data.flag,
      num1: e.currentTarget.dataset.index,
      story: e.currentTarget.dataset.item,
    })
    console.log(this.data.story);
    this.getCatsBooks()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.gender === "男生") {
      this.data.gender = 'male'
      this.setData({
        title: JSON.parse(options.item).major,
        arr: JSON.parse(options.item).mins,
        gender: this.data.gender
      })
    } else if (options.gender === "女生") {
      this.data.gender = 'female'
      this.setData({
        title: JSON.parse(options.item).major,
        arr: JSON.parse(options.item).mins,
        gender: this.data.gender
      })
    } else {
      this.data.gender = 'press'
      this.setData({
        title: JSON.parse(options.item).major,
        arr: JSON.parse(options.item).mins,
        gender: this.data.gender
      })
    }
    this.hah()
    this.getCatsBooks()
  },
  hah() {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  getCatsBooks() {
    wx.showLoading({
      title: '加载中',
    })
    api.getCatsBooks(
      this.data.gender,
      this.data.name,
      this.data.title,
      this.data.story,
      0,
    ).then(res => {
      if (res.ok === true) {
        wx.hideLoading()
        this.setData({
          books: res.books
        })
      }
    })
  },
  goto(e) {
    wx.navigateTo({
      url: `/pages/evaluation/evaluation?item=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})