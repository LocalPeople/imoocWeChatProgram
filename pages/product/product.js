// pages/product/product.js
import {Product} from 'product.model.js';
import {Cart} from '../cart/cart.model.js'

var product=new Product();
var cart=new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countsArray: [1,2,3,4,5,6,7,8,9,10],
    productCount: 1,
    currentTabsIndex: 0,
    cartTotalCount: 0
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
      var totalCount = cart.getTotalCount();
      this.setData({
        'product': res,
        'cartTotalCount': totalCount
      });
    });
  },

  onPickerValueChange: function(event){
    var index=event.detail.value;
    this.setData({
      'productCount': this.data.countsArray[index]
    });
  },

  onTabsItemTap: function(event){
    var index=product.getDataset(event, 'index');
    this.setData({
      'currentTabsIndex': index
    }); 
  },

  onAddCartBtnTap: function(event){
    var product={};
    var keys=['id', 'name', 'main_img_url', 'price'];

    for (var key in this.data.product){
      if(keys.indexOf(key)>=0){
        product[key]=this.data.product[key];
      }
    }
    cart.add(product, this.data.productCount);
    this.setData({
      'cartTotalCount': this.data.cartTotalCount+this.data.productCount
    });
  },

  onCartTap: function(event){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})