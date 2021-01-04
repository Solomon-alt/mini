import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    newArr: [],
    arr1: []
  },
  handleOne(e){
    wx.navigateTo({
      url: `/pages/evaluation/evaluation?item=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  handle() {
    this.data.flag = !this.data.flag
    this.setData({
      flag: this.data.flag
    })
  },
  goto() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  getArr() {
    let arr = wx.getStorageSync('arr')
    function unique10(arr) {
      return Array.from(new Set(arr));
    }
    let newArr = unique10(arr)
    newArr.map(item => {
      wx.showLoading({
        title: '加载中',
      })
      api.bookInfo(
        item
      ).then(res => {
        if (res.advertRead) {
          wx.hideLoading()
        }
        this.data.arr1.push(res)
        this.setData({
          arr1: this.data.arr1
        })
      }).catch(err => {
        console.log(err);
      })
    })
  },
  del(e) {
    let arr= []
    this.data.arr1.splice(e.currentTarget.dataset.index,1)
    this.setData({
      arr1:this.data.arr1
    })
     this.data.arr1.map(item=>{
       arr.push(item._id)
     })
     wx.setStorageSync('arr', arr)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this.setData({
      arr1:[]
    })
    this.getArr()
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