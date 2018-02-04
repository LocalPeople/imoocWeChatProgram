// pages/home/home.js
import { Home } from 'home.model.js';

var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function () {
    this._loadData();
  },

  _loadData: function () {
    var id = 1;
    // var data = home.getBannerData(id, this._callBack);
    //箭头函数（匿名函数）
    home.getBannerData(id, (res) => {
      // console.log(res);
      this.setData({//数据绑定
        'bannerArr': res
      })
    })

    home.getThemeData((res) => {//精选主题
      // console.log(res);
      this.setData({
        'ThemeArr': res
      })
    })

    home.getProductsData((res) => {//最近新品
      // console.log(res);
      this.setData({
        'ProductsArr': res
      })
    })
  },

  onProductItemTap: function (event) {
    var id = home.getDataset(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },

  onThemeItemTap: function(event){
    var id = home.getDataset(event, 'id');
    var name = home.getDataset(event, 'name');
    wx.navigateTo({
      url: '../theme/theme?id='+id+'&name='+name,
    })
  }

  // _callBack: function(res){
  //   console.log(res.data);
  // }
})