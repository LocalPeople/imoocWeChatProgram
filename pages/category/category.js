// pages/category/category.js
import {Category} from 'category.model.js';

var category=new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function(){
    //加载所有类型目录
    category.getCategoryType((categoryData)=>{
      this.setData({
        'categoryTypeArr': categoryData
      });
      //加载特定类型商品
      category.getCategoryProducts(categoryData[0].id, (res)=>{
        var data={
          products: res,
          topImgUrl: categoryData[0].img.url,
          title: categoryData[0].name
        };

        this.setData({
          'categoryProducts': data
        });
      });
    });
  }
})