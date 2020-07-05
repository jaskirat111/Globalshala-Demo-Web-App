var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var query = new Schema(
//     {name : String, category: String,category:String,username:String,querycount:String}
   
//     );
var program = new Schema(
    {name :{
        type:String
    },
    category:{
        type:String
      },
    date:{
        type:String
    },
    location:{
        type:String
      },
      about:{
        type:String
      },
      imagelink:{
        type:String
      },
      link:{
          type:String
      }
    }
    );
    
mongoose.model('Program', program);