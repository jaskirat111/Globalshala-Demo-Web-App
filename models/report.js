var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Report = new Schema(
    { 
        report :{
            type:String
        },
        category:{
            type:String
          },
          username:{
            type:String
          },
    });

mongoose.model('Report', Report);