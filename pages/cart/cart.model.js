import { Base } from '../../utils/base.js'

class Cart extends Base {
  constructor() {
    super();
    this._storageKey = 'cart';
  }

  add(item, count) {
    var cartData = this.getCartData();

    var doCartHaveIdInfo = this.doCartHaveId(item.id, cartData);
    if (doCartHaveIdInfo.index == -1) {
      item.count = count;
      item.selectStatus = true;
      cartData.push(item);
    }
    else {
      cartData[doCartHaveIdInfo.index].count += count;
    }
    wx.setStorageSync(this._storageKey, cartData);
  }

  getTotalCount(ignoreSelected = true) {
    var cartData = this.getCartData();
    var count = 0;

    for (let i = 0; i < cartData.length; i++) {
      if (ignoreSelected) {
        count += cartData[i]['count'];
      }
      else {
        if (cartData[i]['selectStatus']) {
          count += cartData[i]['count'];
        }
      }
    }
    return count;
  }

  getTotalAccount(ignoreSelected = true) {
    var cartData = this.getCartData();
    var account = 0;

    let multiple = 100;
    for (let i = 0; i < cartData.length; i++) {
      if (!cartData[i]['selectStatus'] && !ignoreSelected) {
        continue;
      }
      account += cartData[i]['count'] * multiple * cartData[i]['price'] * multiple;
    }
    return account / (multiple * multiple);
  }

  getSelectedTypeCount() {
    var cartData = this.getCartData();
    var count = 0;

    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i]['selectStatus']) {
        count++;
      }
    }
    return count;
  }

  getCartData() {
    var cartData = wx.getStorageSync(this._storageKey);
    if (!cartData) {
      cartData = [];
    }
    return cartData;
  }

  doCartHaveId(id, cartData) {
    var item,
      result = { index: -1 };
    for (let i = 0; i < cartData.length; i++) {
      item = cartData[i];
      if (item.id == id) {
        result = {
          index: i
        };
        break;
      }
    }
    return result;
  }

  setSelectStatus(index, status) {
    var cartData = wx.getStorageSync(this._storageKey);
    cartData[index].selectStatus = status;
    wx.setStorageSync(this._storageKey, cartData);
  }

  setAllStatus(status) {
    var cartData = wx.getStorageSync(this._storageKey);
    for (let i = 0; i < cartData.length; i++) {
      cartData[i].selectStatus = status;
    }
    wx.setStorageSync(this._storageKey, cartData);
  }
}

export { Cart };