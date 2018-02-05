// pages/product/product.js
import {Product} from 'product.model.js';

var product=new Product();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countsArray: [1,2,3,4,5,6,7,8,9,10],
    productCount: 1,
    currentTabsIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id=options.id;
    // console.log(id);
    this._loadData();
  },

  _loadData: function(){
    product.getProductDetail(this.data.id, (res) => {
      // console.log(res);
      this.setData({
        'product': res
      })
    })
  },

  onPickerValueChange: function(event){
    var index=event.detail.value;
    this.setData({
      'productCount': this.data.countsArray[index]
    })
  },

  onTabsItemTap: function(event){
    var index=product.getDataset(event, 'index');
    this.setData({
      'currentTabsIndex': index
    })
  }
})