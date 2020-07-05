const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
const AdminSchema = mongoose.Schema({
    name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
//  birthday:{
//     type: String,
//     required: true
//   },
//   gender:{
//     type: String,
//     required: true
//   },
  password:{
    type: String,
    required: true
  },
  password2:{
    type: String,
    required: true
  },
  isAdmin:{
    type:String,
    default:false
  },
  type:{
    type:String
  },
//   ArtificialIntelligence:{
//     type:String
//   },
//   GraphicDesign:{
//     type:String
//   },
//   Marketing:{
//     type:String
//   },
//   Cybersecurity:{
//     type:String
//   },
//   WebDevelopmentJavascript:{
//     type:String
//   },
//   WebDevelopmentPHP:{
//     type:String
//   },
//   WebDevelopmentPython:{
//     type:String
//   }
  // obj = {
  //   first: req.body.1: ? true :false,
  //   second: req.body.2: ? true :false,
  //   third: req.body.3: ? true :false,
  // }
//   username:{
//     type: String,
//     required: true
//   },
  // subject:{
  //   type: String,
  //   required: true
  // }
});

// const Schema = mongoose.Schema;
// const UserDetail = new Schema({
//       username: String,
//       password: String
//     });

// const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

const Admin = module.exports = mongoose.model('admin', AdminSchema);

// obj = {
//   first: req.body.1: ? true :false,
//   second: req.body.2: ? true :false,
//   third: req.body.3: ? true :false,
// };
module.exports.createUser = function(newAdmin, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newAdmin.password, salt, function(err, hash) {
	        newAdmin.password = hash;
	        newAdmin.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(email, callback){
	var query = {email: email};
	Admin.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	Admin.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
