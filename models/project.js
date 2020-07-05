var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var query = new Schema(
//     {name : String, category: String,category:String,username:String,querycount:String}
   
//     );
var project = new Schema(
    {name :{
        type:String
    },
   
    technologyused:{
        type:String
      },
    level:{
        type:String
    },
    // basicusercounter:{
    //   type:Number,
    //   default:0
    // },
    duration:{
        type:String
      },
      fees:{
          type:String
      },
     
      projectbrief:{
        type:String
      },
    
      date:{
        type:String
      },
      
      pdflink:{
        type:String
      }
    }
    );
    
mongoose.model('Project', project);