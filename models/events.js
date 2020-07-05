// const mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

// User Schema
// var Note = new Schema(
//     {name : String, link : String}
   
//     );
// const Note = module.exports = mongoose.model('Notes', Note);



// module.exports.createUser = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.password = hash;
// 	        newUser.save(callback);
// 	    });
// 	});
// }

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Event = new Schema(
    {name : String, 
        about : String, 
        location : String, 
        occ : String,
        occu : String,  
        date : String, 
        seats : Number, 
        occm : String, 
        link : String, 
        category: String,
        fees:String,
        lastdate:String,
        imagelink:String}
   
    );

const Events = module.exports=mongoose.model('Events', Event);




