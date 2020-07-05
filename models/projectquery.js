var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var query = new Schema(
//     {name : String, category: String,category:String,username:String,querycount:String}
   
//     );
var projectquery = new Schema(
    {
        projectname :{
        type:String
    },
      name :{
        type:String
    },
    username:{
        type:String
    },
    internnexusprojectid:{
        type:String
    },
    level:{
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
      
    }
    );

    
mongoose.model('Projectquery', projectquery);