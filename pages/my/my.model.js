import { Base } from '../../utils/base.js'

class My extends Base {
  constructor() {
    super();
  }

  getUserInfo(callback) {
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            typeof callback == 'function' && callback(res.userInfo);
          },
          fail: function () {
            typeof callback == 'function' && callback({
              avatarUrl: '../../imgs/icon/user@default.png',
              nickName: '零食小贩'
            });
          }
        });
      }
    });
  }
}

export {My};