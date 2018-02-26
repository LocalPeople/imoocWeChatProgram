import { Base } from '../../utils/base.js';

class Order extends Base {
  constructor() {
    super();
    this._storageKeyName = 'newOrder';
  }

  doOrder(orderInfo, callback) {
    var that = this;
    var params = {
      url: 'order',
      type: 'POST',
      data: { products: orderInfo },
      sCallBack: function (res) {
        that.execSetStorageSync(true);
        callback && callback(res);
      }
    }
    this.request(params);
  }

  pay(orderId, callback) {
    // var params={
    //   url: 'pay/pre_order',
    //   type: 'POST',
    //   data: { id: orderId},
    //   sCallBack: function(res){
    //     var timeStamp=res.timeStamp;
    //     if(timeStamp){
    //       wx.requestPayment({
    //         timeStamp: timeStamp.toString(),
    //         nonceStr: res.nonceStr,
    //         package: res.package,
    //         signType: res.signType,
    //         paySign: res.paySign,
    //         success: function(){
    //           callback&&callback(2);//已付款
    //         },
    //         fail: function(){
    //           callback&&callback(1);//用户主动取消，未付款
    //         }
    //       })
    //     }
    //     else{
    //       callback&&callback(0);//本地服务器相关问题，未付款
    //     }
    //   }
    // }
    // this.request(params);

    callback && callback(1);//跳过微信付款
  }

  getOrderInfoById(id, callback) {
    var params = {
      url: 'order/' + id,
      type: 'GET',
      sCallBack: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  execSetStorageSync(data) {
    wx.setStorageSync(this._storageKeyName, data);
  }

  hasNewOrder() {
    return wx.getStorageSync(this._storageKeyName);
  }

  getOrders(pageIndex, callback) {
    var params = {
      url: 'order/by_user?page=' + pageIndex,
      type: 'GET',
      sCallBack: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export { Order };