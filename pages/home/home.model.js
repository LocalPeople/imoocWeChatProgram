import { Base } from '../../utils/base.js'

class Home extends Base {
  constructor() {
    super();
  }

  getBannerData(id, callBack) {
    var params = {
      url: 'banner/' + id,
      type: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res.items);
      }
    }

    this.request(params);
    // wx.request({
    //   url: 'http://z.cn/api/v1/banner/' + id,
    //   method: 'GET',
    //   success: function (res) {
    //     callBack(res);
    //     return res;
    //   }
    // })
  }

  getThemeData(callback){
    var params={
      url: 'theme?ids=1,2,3',
      type: 'GET',
      sCallBack: function(res){
        callback&&callback(res);
      }
    }
    this.request(params);
  }

  getProductsData(callback){
    var params = {
      url: 'product/recent',
      type: 'GET',
      sCallBack: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export { Home };