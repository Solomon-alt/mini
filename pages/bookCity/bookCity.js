import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    man: '',
    woman: '',
    publish: '',
    gender1: '男生',
    gender2: '女生',
    gender3: '出版',
    male: '',
    female: '',
    major1:'',
    major2:'',
    major3:'',
  },
  send(e) {
    this.setData({
      flag: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getCats() {
    wx.showLoading({
      title: '加载中',
    })
    api.getCats().then(res => {
      // console.log(res);
      if (res.ok === true) {
        wx.hideLoading()
        this.setData({
          man: res.male,
          woman: res.female,
          publish: res.press
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getRankCategory() {
    wx.showLoading({
      title: '加载中',
    })
    api.rankCategory().then(res => {
      // console.log(res);
      if (res.ok === true) {
        this.setData({
          male:res.male,
          female:res.female
        })
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getMinor() {
    wx.showLoading({
      title: '加载中',
    })
    api.getMinor().then(res => {
      if (res.ok === true) {
        this.setData({
          major1:res.male,
          major2:res.female,
          major3:res.press
        })
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err);
    })
  },
  onLoad: function (options) {
    this.getCats()
    this.getRankCategory()
    this.getMinor()
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