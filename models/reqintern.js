var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// var query = new Schema(
//     {name : String, category: String,category:String,username:String,querycount:String}
   
//     );
var reqintern = new Schema({   
      number:{
      type: String,
      required: true
    },
    duration:{
      type: String,
      required: true
    },
    phone:{
      type: Number,
      required: true
    },
    hr:{
      type: String,
      required: true
    },
    interviewdate:{
      type: String,
      required: true
    },
    interviewer:{
      type: String,
      required: true
    },
    year:{
        type:String,
        required:true
    },
    AI:{
      type: String
    },
    gd:{
      type: String
    },
    market:{
      type: String
    },
    cybersec:{
      type: String
    },
    webdjs:{
      type: String
    },
    webdph:{
      type: String
    },
    webdpy:{
      type: String
    },
    id1:{
      type: String
    },
    id2:{
      type: String
    },
    id3:{
      type: String
    },
    id4:{
      type: String
    },
    id5:{
      type: String,
    
    },
    id6:{
      type: String,
     
    },
    id7:{
      type: String,
      
    },
    postedby:{
      type: String
    },
    emailaddress:{
      type: String
    },
    contactno:{
      type: String
    },
    companyname:{
      type: String
    },
    status:{
      type:String,
      default:'pending'      
    },
    statusreason:{
      type:String
    },
    closequery:{
      type:String,
      default:false      
    },
    closequerywhy:{
      type:String
    }
    });
    
const Reqintern = module.exports=mongoose.model('Reqintern', reqintern);