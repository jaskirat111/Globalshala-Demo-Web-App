var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var forum = new Schema(
    { question: String,answer:String}
   
    );

const Forum = module.exports=mongoose.model('Forum', forum);