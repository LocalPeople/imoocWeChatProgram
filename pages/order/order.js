// pages/order/order.js
import {Cart} from '../cart/cart.model.js'
import {Address} from '../../utils/address.js'

var cart=new Cart();
var address=new Address();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var account=options.account;

    var productsData = cart.getCartData(false);
    // console.log(productsData);

    this.setData({
      'productsArr': productsData,
      'account': account,
      'orderStatus': 0
    });

    address.getAddress((addressInfo)=>{
      this.setData({
        'addressInfo': addressInfo
      })
    })
  },

  editAddress: function(event){
    var that=this;
    wx.chooseAddress({
      success: function(res){
        var addressInfo={
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: address.getAddressString(res)
        };

        that.setData({
          'addressInfo': addressInfo
        });

        address.submitAddress(res);
      }
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