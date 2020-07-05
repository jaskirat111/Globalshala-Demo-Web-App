const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passportLocalMongoose= require('passport-local-mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  package:{
    type:String
  },
  bidCountInPack:{
    type:String
  },
    username:{
    type: String,
    required: true
  },
  eventid:{
    type:String
  },
  projectid:{
    type:String
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
    basicusercounter:{
      type:Number,
      default:0
    },
    intermediateusercounter:{
      type:Number,
      default:0
    },
    advanceusercounter:{
      type:Number,
      default:0
    },
    hotsusercounter:{
      type:Number,
      default:0
    },
 birthday:{
    type: String
  },
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
  secretToken:{
    type: String
  },
  active:{
    type: Boolean
  },
  ArtificialIntelligence:{
    type:String
  },
  GraphicDesign:{
    type:String
  },
  Marketing:{
    type:String
  },
  Cybersecurity:{
    type:String
  },
  WebDevelopmentJavascript:{
    type:String
  },
  WebDevelopmentPHP:{
    type:String
  },
  WebDevelopmentPython:{
    type:String
  },
  ContentWriting:{
    type:String
  },
  Blockchain:{
    type:String
  },
  Android:{
    type:String
  },
  Ios:{
    type:String
  },
  Linux:{
    type:String
  },
  CloudComputing:{
    type:String
  },
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  university:{
    type:String
  },
  college:{
    type:String
  },
  stream:{
    type:String
  },
  course:{
    type:String
  },
  backlogs:{
    type:String
  },
  yeargap:{
    type:String
  },
  state:{
    type:String
  },
  city:{
    type:String
  },
  verifyfree:{
    type:String,
    default:false
  },
  verifyyearly:{
    type:String,
    default:false
  },
  verifyhalfyearly:{
    type:String,
    default:false
  },
  isUser:{
    type:String,
    default:false
  },
  type:{
    type:String
  },
  eventname:{
    type:String
  },
eventdate:{
  type:String
},
field:{
  type:String
},
eventname:{
  type:String
},
loc1:{
  type:String
},
loc2:{
  type:String
},
loc3:{
  type:String
},
flag:{
  type:String,
  default:false
},

resetPasswordToken: { type: String
},

resetPasswordExpires: {
  type: Date
},
applydate:{
  type:Date
},
expirydate:{
  type:Date
},
applydate1:{
  type:String
},
expirydate1:{
  type:String
},
freequeryleft:{
  type:Number,
  default:10
}

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
UserSchema.plugin(passportLocalMongoose)

const User = module.exports = mongoose.model('user', UserSchema);

// obj = {
//   first: req.body.1: ? true :false,
//   second: req.body.2: ? true :false,
//   third: req.body.3: ? true :false,
// };
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) return next(err);
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
