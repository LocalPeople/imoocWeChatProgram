// pages/cart/cart.js
import { Cart } from 'cart.model.js';

var cart = new Cart();

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

  },

  onShow: function () {
    this._refreshUI();
  },

  toggleSelect: function (event) {
    var id = cart.getDataset(event, 'id');
    var status = cart.getDataset(event, 'status');
    var index = this._getProductIndex(id);
    if (index >= 0) {
      cart.setSelectStatus(index, !status);
      this._refreshUI();
    }
  },

  toggleSelectAll: function (event) {
    var status = cart.getDataset(event, 'status');
    cart.setAllStatus(!status);
    this._refreshUI();
  },

  _refreshUI: function () {
    this.setData({
      'selectedCount': cart.getTotalCount(false),//获取购物车勾选商品总数
      'selectedTypeCount': cart.getSelectedTypeCount(),//获取购物车勾选商品类型总数
      'account': cart.getTotalAccount(false),//获取购物车勾选商品总价
      'cartData': cart.getCartData()//获取购物车所有商品信息
    });
  },

  _getProductIndex: function (id) {
    var cartData = this.data.cartData;

    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].id == id) {
        return i;
      }
    }
    return -1;
  }
})