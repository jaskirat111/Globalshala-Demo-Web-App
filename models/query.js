var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var query = new Schema(
//     {name : String, category: String,category:String,username:String,querycount:String}
   
//     );
var query = new Schema(
    {name :{
        type:String
    },
    category:{
        type:String
      },
    username:{
        type:String
    },
    querycount:{
        type:Number,
        default:0
      },
      reviewcount:{
        type:Number,
        default:0
      },
      answer:{
        type:String
      },
      queryleft:{
        type:String
      }
    }
    );
    
mongoose.model('Query', query);