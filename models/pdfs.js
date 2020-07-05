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

var Pdf = new Schema(
    {name : String, link : String, category: String,type:String}
   
    );

mongoose.model('Pdfs', Pdf);




