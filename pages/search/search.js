import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newHotWords: '',
    num: '',
    num1: '',
    value: '',
    books: '',
    searchHistory: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goto(e) {
    console.log(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: `/pages/evaluation/evaluation?item=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  empty() {
    this.setData({
      searchHistory: ''
    })
    wx.removeStorageSync('searchHistory')
  },
  click(e) {
    this.setData({
      value: e.currentTarget.dataset.item.word
    })
    let a = wx.getStorageSync('searchHistory')
    if (!a) {
      let a = []
      a.push(e.currentTarget.dataset.item.word)
      wx.setStorageSync('searchHistory', a)
    } else {
      a.push(e.currentTarget.dataset.item.word)
      wx.setStorageSync('searchHistory', a)
    }
    this.getSearchHisory()
  },
  handle() {
    let a = Math.floor(Math.random() * (this.data.newHotWords.length) + 1)
    let b = Math.floor(Math.random() * (this.data.newHotWords.length) + 1)
    if (a < b) {
      this.setData({
        num: a,
        num1: b
      })
    } else if (b < a) {
      this.setData({
        num: b,
        num1: a
      })
    } else {
      if (a === 0 && b === 0) {
        this.setData({
          num: 0,
          num1: 1
        })
      } else if (a === b === 6) {
        this.setData({
          num: 5,
          num1: 6
        })
      } else {
        this.setData({
          num: b - 1,
          num1: b
        })
      }
    }
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
    })
    api.hotword().then(res => {
      if (res.ok === true) {
        wx.hideLoading()
        this.setData({
          newHotWords: res.newHotWords
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  handleInput() {
    api.bookSearch(
      this.data.value
    ).then(res => {
      this.setData({
        books: res.books
      })
    }).catch(err => {
      console.log(err);
    })
  },
  delete() {
    this.setData({
      value: ''
    })
  },
  getSearchHisory() {
    let a = wx.getStorageSync('searchHistory')
    function unique10(a) {
      return Array.from(new Set(a));
    }
    let newArr = unique10(a)
    this.setData({
      searchHistory: newArr
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
    this.handle()
    this.getdata()
    this.getSearchHisory()
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