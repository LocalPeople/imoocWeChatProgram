import { Base } from 'base.js';

class Address extends Base {
  constructor() {
    super();
  }

  getAddress(callback) {
    var that = this;
    var params = {
      url: 'address',
      type: 'GET',
      sCallBack: function (res) {
        res.totalDetail = that.getAddressString(res);
        callback && callback(res);
      }
    }
    this.request(params);
  }

  submitAddress(res, sCallback, eCallback) {
    var params = {
      url: 'address',
      type: 'POST',
      data: this._prepareData(res),
      sCallBack: function (res) {
        sCallback && sCallback(res);
      },
      eCallback: function (res) {
        eCallback && eCallback(res);
      }
    }
    this.request(params);
  }

  _prepareData(res) {
    var addressInfo = {
      'name': res.userName,
      'mobile': res.telNumber,
      'province': res.provinceName,
      'city': res.cityName,
      'country': res.countyName,
      'detail': res.detailInfo
    };
    return addressInfo;
  }

  getAddressString(res) {
    var province = res.provinceName || res.province;
    var city = res.cityName || res.city;
    var country = res.countyName || res.country;
    var detail = res.detailInfo || res.detail;

    var detailAddress = city + country + detail;

    if (!this._isCenterCity(city)) {
      detailAddress = province + detailAddress;
    }

    return detailAddress;
  }

  _isCenterCity(city) {
    var centerCity = ['北京市', '天津市', '上海市', '重庆市'];
    if (centerCity.indexOf(city) >= 0) {
      return true;
    }
    return false;
  }
}

export { Address };