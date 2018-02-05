import {Base} from '../../utils/base.js';

class Product extends Base{
  constructor(){
    super();
  }

  getProductDetail(id, callback){
    var params={
      url: 'product/'+id,
      type: 'GET',
      sCallBack: function(res){
        callback&&callback(res);
      }
    }
    this.request(params);
  }
}

export {Product};