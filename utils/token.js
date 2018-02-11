import { Config } from 'config.js';

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token/user';
  }

  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this._verifyToken(token);
    }
  }

  getTokenFromServer(callback) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            'code': res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            callback && callback(res.data.token);
          }
        })
      }
    })
  }

  _verifyToken(token, callback) {
    var that = this;
    wx.request({
      url: this.verifyUrl,
      method: 'POST',
      data: {
        'token': token
      },
      success: function (res) {
        if (!res.data.isValid) {
          that.getTokenFromServer(callback);
        }
      }
    })
  }
}

export { Token };