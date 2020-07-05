var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Images = new Schema(
    { 
        imagesrc:{
            type:String
        },
        category:{
            type:String
        }
    });

mongoose.model('Images', Images);