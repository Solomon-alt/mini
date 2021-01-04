import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: '',
    books1: '',
    books2: '',
    title: '',
    sex: '',
    id: '',
    num: 0,
    monthRank: '',
    totalRank: '',
    arr: [
      {
        name: " 周榜",
        id: "_id"
      },
      {
        name: "月榜",
        id: " monthRank"
      },
      {
        name: " 总榜",
        id: "totalRank"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: JSON.parse(options.title).title,
      sex: options.sex,
      id: JSON.parse(options.title)._id
    })
    this.getRankInfo()
    this.hah()
  },
  hah() {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  getRankInfo() {
    wx.showLoading({
      title: '加载中',
    })
    api.rankInfo(this.data.id).then(res => {
      if (res.ok === true) {
        wx.hideLoading()
        this.setData({
          books: res.ranking.books,
          monthRank: res.ranking.monthRank,
          totalRank: res.ranking.totalRank,
        })
        this.getMonthRank()
        this.getTitle()
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getMonthRank() {
    api.rankInfo(this.data.monthRank).then(res => {
      if (res.ok === true) {
        this.setData({
          books1: res.ranking.books
        })
      }
    })
  },
  getTitle() {
    api.rankInfo(this.data.totalRank).then(res => {
      if (res.ok === true) {
        this.setData({
          books2: res.ranking.books
        })
      }
    })
  },
  handle(e) {
    this.setData({
      num: e.currentTarget.dataset.index
    })
  },
  goto(e){
    console.log(e.currentTarget.dataset.item);
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