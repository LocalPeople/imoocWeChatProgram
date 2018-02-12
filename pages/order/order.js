// pages/order/order.js
import { Cart } from '../cart/cart.model.js'
import { Address } from '../../utils/address.js'
import { Order } from 'order.model.js'

var cart = new Cart();
var address = new Address();
var order = new Order();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var account = options.account;

    var productsData = cart.getCartData(false);
    // console.log(productsData);

    this.setData({
      'productsArr': productsData,
      'account': account,
      'orderStatus': 0
    });

    address.getAddress((addressInfo) => {
      this.setData({
        'addressInfo': addressInfo
      })
    })
  },

  onShow: function () {
    if (this.data.id) {
      var id = this.data.id;
      order.getOrderInfoById(id, (res) => {
        // console.log(res);
        this.setData({
          'orderStatus': res.status,
          'productsArr': res.snap_items,
          'account': res.total_price,
          'basicInfo': {
            'orderTime': res.create_time,
            'orderNo': res.order_no
          }
        });

        var addressInfo=res.snap_address;
        addressInfo.totalDetail = address.getAddressString(addressInfo);
        this.setData({
          'addressInfo': addressInfo
        });
      });
    }
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

  pay: function (event) {
    if (this.data.orderStatus == 0) {
      this._firstTimePay();
    }
    else {
      this._oneMoreTimePay();
    }
  },

  _firstTimePay: function () {
    var orderInfo = [];
    var productsArr = this.data.productsArr;

    for (let i = 0; i < productsArr.length; i++) {
      orderInfo.push({
        'product_id': productsArr[i].id,
        'count': productsArr[i].count
      });
    }

    //1.提交订单到本地服务器，生成相应订单号，并返回订单ID和订单号
    //2.根据返回订单ID，请求本地服务器支付接口，返回从微信服务器获取的订单支付签名
    //3.使用返回的订单支付签名，发起微信支付请求，完成支付
    order.doOrder(orderInfo, (data) => {
      if (data.pass) {
        var id = data.order_id;
        this.data.id = id;

        this._execPay(id);
        this.deleteProducts();
      }
      else {
        this._orderFail(data);
      }
    })
  },

  _execPay: function (id) {
    order.pay(id, (status) => {
      if (status != 0) {
        var flag = (status == 2);
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order',
        });
      }
      else {
        //本地服务器出错，订单仍处于未付款状态
      }
    });
  },

  _orderFail: function (data) {
    var nameArr = [],
      name = '',
      str = '',
      pArr = data.pStatusArray,
      moreThanTwo = false;
    for (let i = 0; i < pArr.length; i++) {
      if (!pArr[i].haveStock) {
        name = pArr[i].name;
        if (name.length > 15) {
          name = name.substr(0, 12) + '...';
        }
        nameArr.push(name);
        if (nameArr.length >= 2) {
          moreThanTwo = true;
          break;
        }
      }
    }
    str += nameArr.join('、');
    if (moreThanTwo) {
      str += ' 等';
    }
    str += ' 缺货';
    wx.showModal({
      title: '下单失败',
      content: str,
      showCancel: false,
    })
  },

  deleteProducts: function () {
    var productsArr = this.data.productsArr;
    var ids = [];
    for (let i = 0; i < productsArr.length; i++) {
      ids.push(productsArr[i].id);
    }
    cart.deleteByID(ids);
  }
})