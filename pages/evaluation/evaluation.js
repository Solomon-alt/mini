import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: '',
    arr: [],
    total: null,
    id: '',
    num: null,
    score: null,
    score1: null,
    arr1: [1, 1, 1, 1, 1],
    flag: true,
    msg: '加入书架',
    msg1: '已加入书架',
    flag: true,
    num1: 0,
    cover: '',
  },
  expand() {
    this.setData({
      num1: 1
    })
  },
  reduction() {
    this.setData({
      num1: 0
    })
  },
  //图片保存到本地
  save() {
    wx.getImageInfo({
      src: this.data.cover,
      success: (res) => {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: (res) => {
            console.log(res);
          }
        })
      }
    })
  },

  shortReviews() {
    wx.showLoading({
      title: '加载中',
    })
    api.shortReviews(
      this.data.obj._id
    ).then(res => {
      if (res.ok === true) {
        this.setData({
          arr: res.docs,
          total: res.total,
        })
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err);
    })
  },
  handleBookcase() {
    this.choose()
    let arr = wx.getStorageSync('arr')
    if (!arr) {
      let arr = []
      arr.push(this.data.id)
      console.log(arr);
      wx.setStorageSync('arr', arr)
    } else {
      arr.push(this.data.id)
      wx.setStorageSync('arr', arr)
    }
  },
  choose() {
    this.setData({
      flag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      obj: JSON.parse(options.item),
      id: JSON.parse(options.item)._id,
      cover: `https://statics.zhuishushenqi.com${JSON.parse(options.item).cover}`
    })
    this.shortReviews()
    this.bookInfo()
  },
  bookInfo() {
    wx.showLoading({
      title: '加载中',
    })
    api.bookInfo(
      this.data.id
    ).then(res => {
      this.setData({
        num: res.chaptersCount,
        score: Math.floor(res.rating.score / 2),
        score1: 5 - Math.floor(res.rating.score / 2),
      })
    }).catch(err => {
      console.log(err);
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
    let arr = wx.getStorageSync('arr')
    let a = arr.indexOf(this.data.id)
    if (a === -1) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
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