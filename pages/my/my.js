// pages/my/my.js
import { My } from 'my.model.js';
import { Address } from '../../utils/address.js';
import { Order } from '../order/order.model.js';

var my = new My();
var address = new Address();
var order = new Order();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    orderArr: [],
    isLoadedAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  onShow: function () {
    if (order.hasNewOrder()) {
      this.refresh();
      order.execSetStorageSync(false);
    }
  },

  refresh: function () {
    this.data.orderArr = [];
    this.data.pageIndex = 1;
    this._getOrders(() => {
      this.data.isLoadedAll = false;
    });
  },

  _loadData: function () {
    my.getUserInfo((userInfo) => {
      this.setData({
        'userInfo': userInfo
      });
    });

    address.getAddress((addressInfo) => {
      this.setData({
        'addressInfo': addressInfo
      });
    });

    this._getOrders();
  },

  _getOrders: function (callback) {
    order.getOrders(this.data.pageIndex, (res) => {
      var data = res.data;

      if (data.length > 0) {
        this.data.orderArr.push.apply(this.data.orderArr, data);
        this.setData({
          'orderArr': this.data.orderArr
        });
      }
      else {
        this.data.isLoadedAll = true;
      }
      callback && callback();
    })
  },

  onReachBottom: function () {
    // console.log('onReachBottom');
    if (!this.data.isLoadedAll) {
      this.data.pageIndex++;
      this._getOrders();
    }
  },

  showOrderDetailInfo: function (event) {
    var id = order.getDataset(event, 'id');
    wx.navigateTo({
      url: '../order/order?id=' + id + '&from=my',
    });
  },

  rePay: function (event) {
    var id = order.getDataset(event, 'id');
    var index = order.getDataset(event, 'index');

    order.pay(id, (statusCode) => {
      if (statusCode > 0) {
        var flag = statusCode == 2;

        if (flag) {
          this.data.orderArr[index].status = 2;
          this.setData({
            'orderArr': this.data.orderArr
          });
        }

        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=my'
        });
      }
      else {
        this.showTips('支付失败', '商品已下架或库存不足');
      }
    });
  },

  editAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
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

  showTips: function (title, content) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false
    });
  }
})