// pages/category/category.js
import { Category } from 'category.model.js';

var category = new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenuIndex: 0,
    loadedData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function () {
    //加载所有类型目录
    category.getCategoryType((categoryData) => {
      this.setData({
        'categoryTypeArr': categoryData
      });
      //加载特定类型商品
      category.getCategoryProducts(categoryData[0].id, (res) => {
        var data = {
          products: res,
          topImgUrl: categoryData[0].img.url,
          title: categoryData[0].name
        };

        this.setData({
          'categoryProducts': data
        });

        this.data.loadedData[0] = data;
      });
    });
  },

  isLoadedData: function (index) {
    if (this.data.loadedData[index]) {
      return true;
    }
    return false;
  },

  onCategoryChanged: function (event) {
    var index = category.getDataset(event, 'index'),
      id = category.getDataset(event, 'id');

    this.setData({
      'currentMenuIndex': index
    });

    if (this.isLoadedData(index)) {
      this.setData({
        'categoryProducts': this.data.loadedData[index]
      });
    }
    else {
      category.getCategoryProducts(id, (res) => {
        var data = {
          products: res,
          topImgUrl: this.data.categoryTypeArr[index].img.url,
          title: this.data.categoryTypeArr[index].name
        };

        this.setData({
          'categoryProducts': data
        });

        this.data.loadedData[index] = data;
      });
    }
  },

  onProductsItemTap: function (event) {
    var id = category.getDataset(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  }
})