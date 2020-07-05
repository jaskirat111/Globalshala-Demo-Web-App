var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Suggestion = new Schema(
    { 
        review :{
            type:String
        },
        rating:{
            type:String
          },
          username:{
            type:String
          },
    });

mongoose.model('Suggestion', Suggestion);