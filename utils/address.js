import { Base } from 'base.js';

class Address extends Base {
  constructor() {
    super();
  }

  mergeAddress(res) {
    var province = res.provinceName || res.province;
    var city = res.cityName || res.city;
    var country = res.countyName || res.country;
    var detail = res.detailInfo || res.detail;

    var detailAddress = city + country + detail;

    if (!this._isCenterCity(city)) {
      detailAddress = province+detailAddress;
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

export {Address};