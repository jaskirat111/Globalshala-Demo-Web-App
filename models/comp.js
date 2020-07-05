const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var passportLocalMongoose = require("passport-local-mongoose");

// User Schema
const CompSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    index: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  //  birthday:{
  //     type: String,
  //     required: true
  //   },
  //   gender:{
  //     type: String,
  //     required: true
  //   },
  password: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: true,
  },
  secretToken: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  verify: {
    type: String,
  },
  fullname: {
    type: String,
  },
  hrcontact: {
    type: String,
  },
  employeesno: {
    type: String,
  },
  startdate: {
    type: String,
  },
  field: {
    type: String,
  },
  other: {
    type: String,
  },
  compadd: {
    type: String,
  },
  state: {
    type: String,
  },
  isCompany: {
    type: String,
    default: false,
  },
  type: {
    type: String,
  },
  resetPasswordToken: { type: String },

  resetPasswordExpires: {
    type: Date,
  },
  city: {
    type: String,
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
CompSchema.plugin(passportLocalMongoose);
const Comp = (module.exports = mongoose.model("comp", CompSchema));

// obj = {
//   first: req.body.1: ? true :false,
//   second: req.body.2: ? true :false,
//   third: req.body.3: ? true :false,
// };
module.exports.createUser = function (newComp, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newComp.password, salt, function (err, hash) {
      newComp.password = hash;
      newComp.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (email, callback) {
  var query = { email: email };
  Comp.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  Comp.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
