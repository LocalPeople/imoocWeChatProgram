import {Base} from '../../utils/base.js'

class Category extends Base{
  constructor(){
    super();
  }

  getCategoryType(callback){
    var params={
      url: 'category/all',
      type: 'GET',
      sCallBack: function(res){
        callback&&callback(res);
      }
    }
    this.request(params);
  }

  getCategoryProducts(id, callback){
    var params={
      url: 'product/by_category?id='+id,
      type: 'GET',
      sCallBack: function(res){
        callback&&callback(res);
      }
    }
    this.request(params);
  }
}

export {Category};