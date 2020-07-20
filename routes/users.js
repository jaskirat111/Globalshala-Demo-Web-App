// require('../models/user');
var express = require("express");
var router = express.Router();
var passport = require("passport");
var bodyParser = require("body-parser");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
// Load configuration from .env file
// require('dotenv').config();
require("dotenv").config();
const mailer = require("../misc/mailer");
// const mongoose = require('mongoose');
// var User = mongoose.model('user');

// var xoauth2 = require('xoauth2');
var bcrypt = require("bcrypt-nodejs");
var async = require("async");
var crypto = require("crypto");
const config = require("../config/database");
const randomstring = require("randomstring");
// var User = mongoose.model('user');
// Load and initialize MesageBird SDK
const Nexmo = require("nexmo");
const BRAND_NAME = process.env.NEXMO_BRAND_NAME;
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const nexmo = new Nexmo({
  apiKey: "ab5f0bbd",
  apiSecret: "uqAIb8k3CVDax4ze",
});
require("../models/notes");
require("../models/pdfs");
require("../models/query");
require("../models/project");
require("../models/forum");
require("../models/suggestion");
require("../models/report");
// require('../models/requestintern');
require("../models/reqintern");
require("../models/internnexusproject");
require("../models/projectquery");
var mongoose = require("mongoose");
var Note = mongoose.model("Notes");
var Pdf = mongoose.model("Pdfs");
var Query = mongoose.model("Query");
var Reqintern = mongoose.model("Reqintern");
var Project = mongoose.model("Project");
var Event = require("../models/events");
var Forum = mongoose.model("Forum");
var Suggestion = mongoose.model("Suggestion");
var Report = mongoose.model("Report");
var Internnexusproject = mongoose.model("Internnexusproject");
// var Requestintern = mongoose.model('Rintern');
var User = require("../models/user");
let Admin = require("../models/admin");
var Comp = require("../models/comp");
var Projectquery = mongoose.model("Projectquery");
// var Requestintern = require('../models/requestintern');
// var messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);
// Register

// Login
router.get("/login", function (req, res) {
  res.render("login", { message: req.flash("loginMessage"), user: req.user });
});
router.get("/profile", isUser, function (req, res) {
  res.render("profile");
});

router.get("/register", function (req, res) {
  res.render("register");
});
router.get("/adminregister", function (req, res) {
  res.render("adminregister");
});
router.get("/adminlogin", function (req, res) {
  res.render("adminlogin");
});

router.get("/compregister", function (req, res) {
  res.render("compregister");
});
router.get("/complogin", function (req, res) {
  res.render("complogin");
});
// router.get('/map', function (req, res) {
// 	res.render('map');
// });
// Authentication Dashboard

// router.get('/dashboard', isUser, function(req, res){
//   res.render('dashboard', {
//     title:'Add Article'
//   });
// });

// Register User
router.post("/register", function (req, res) {
  const username = req.body.username;
  // const username = req.body.username;
  const email = req.body.email;
  // const gender = req.body.gender;
  // const birthday = req.body.birthday;
  const phone = req.body.phone;
  //const subject = req.body.subject;
  const password = req.body.password;
  const password2 = req.body.password2;
  const isUser = req.body.isUser;
  const college = req.body.college;
  var type = req.body.type;
  // const Cybersecurity=req.body.{"not_checked":"false","checked":"true"};

  if (req.body.ArtificialIntelligence) {
    var ArtificialIntelligence = req.body.ArtificialIntelligence;
  }
  if (req.body.ArtificialIntelligence0) {
    var ArtificialIntelligence = req.body.ArtificialIntelligence0;
  }
  if (req.body.ContentWriting) {
    var ContentWriting = req.body.ContentWriting;
  }
  if (req.body.ContentWriting0) {
    var ContentWriting = req.body.ContentWriting0;
  }
  if (req.body.GraphicDesign) {
    var GraphicDesign = req.body.GraphicDesign;
  }
  if (req.body.GraphicDesign0) {
    var GraphicDesign = req.body.GraphicDesign0;
  }
  if (req.body.Marketing) {
    var Marketing = req.body.Marketing;
  }
  if (req.body.Marketing0) {
    var Marketing = req.body.Marketing0;
  }
  if (req.body.Blockchain) {
    var Blockchain = req.body.Blockchain;
  }
  if (req.body.Blockchain0) {
    var Blockchain = req.body.Blockchain0;
  }
  if (req.body.Android) {
    var Android = req.body.Android;
  }
  if (req.body.Android0) {
    var Android = req.body.Android0;
  }
  if (req.body.Ios) {
    var Ios = req.body.Ios;
  }
  if (req.body.Ios0) {
    var Ios = req.body.Ios0;
  }
  if (req.body.Linux) {
    var Linux = req.body.Linux;
  }
  if (req.body.Linux0) {
    var Linux = req.body.Linux0;
  }
  if (req.body.CloudComputing) {
    var CloudComputing = req.body.CloudComputing;
  }
  if (req.body.CloudComputing0) {
    var CloudComputing = req.body.CloudComputing0;
  }
  if (req.body.Cybersecurity) {
    var Cybersecurity = req.body.Cybersecurity;
  }
  if (req.body.Cybersecurity0) {
    var Cybersecurity = req.body.Cybersecurity0;
  }
  if (req.body.WebDevelopmentJavascript) {
    var WebDevelopmentJavascript = req.body.WebDevelopmentJavascript;
  }
  if (req.body.WebDevelopmentJavascript0) {
    var WebDevelopmentJavascript = req.body.WebDevelopmentJavascript0;
  }
  if (req.body.WebDevelopmentPHP) {
    var WebDevelopmentPHP = req.body.WebDevelopmentPHP;
  }
  if (req.body.WebDevelopmentPHP0) {
    var WebDevelopmentPHP = req.body.WebDevelopmentPHP0;
  }
  if (req.body.WebDevelopmentPython) {
    var WebDevelopmentPython = req.body.WebDevelopmentPython;
  }
  if (req.body.WebDevelopmentPython0) {
    var WebDevelopmentPython = req.body.WebDevelopmentPython0;
  }
  // var amenities = req.body.amenities;
  // Validation
  if (type == "user") {
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    //req.checkBody('subject', 'Subject is required').notEmpty();
    req.checkBody("phone", "Phone Number is required").notEmpty();
    // req.checkBody('username', 'Last Name is required').notEmpty();
    // req.checkBody('gender', 'Gender is required').notEmpty();
    // req.checkBody('birthday', 'Birtday is required').notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("college", "college is required").notEmpty();
    req
      .checkBody("password2", "Passwords do not match")
      .equals(req.body.password);
    // req.checkBody('category', 'Passwords do not match').notEmpty();

    // console.log(phone);
    var errors = req.validationErrors();

    if (errors) {
      res.render("register", {
        errors: errors,
      });
    } else {
      //checking for email and username are already taken
      User.findOne(
        {
          username: {
            $regex: "^" + username + "\\b",
            $options: "i",
          },
        },
        function (err, user) {
          User.findOne(
            {
              email: {
                $regex: "^" + email + "\\b",
                $options: "i",
              },
            },
            function (err, mail) {
              User.findOne(
                {
                  phone: {
                    $regex: "^" + phone + "\\b",
                    $options: "i",
                  },
                },
                function (err, phoneno) {
                  if (phoneno || mail || user) {
                    res.send(
                      `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered Mail id or Username or Phone No </h1></div></body>`
                    );
                    // res.send(`<h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered mail id or Username or Phone No </h1>`);
                  } else {
                    // generate secret token
                    const secretToken = randomstring.generate();
                    const active = false;
                    var newUser = new User({
                      username: username,
                      // birthday:birthday,
                      // gender:gender,

                      //   subject:subject,
                      email: email,
                      phone: phone,
                      college: college,
                      password: password,
                      // username:username,
                      password2: password2,
                      ArtificialIntelligence: ArtificialIntelligence,
                      GraphicDesign: GraphicDesign,
                      ContentWriting: ContentWriting,
                      Marketing: Marketing,
                      Cybersecurity: Cybersecurity,
                      Blockchain: Blockchain,
                      CloudComputing: CloudComputing,
                      Linux: Linux,
                      Ios: Ios,
                      Android: Android,
                      WebDevelopmentJavascript: WebDevelopmentJavascript,
                      WebDevelopmentPHP: WebDevelopmentPHP,
                      WebDevelopmentPython: WebDevelopmentPython,
                      isUser: isUser,
                      type: type,
                      secretToken: secretToken,
                      active: active,
                      // Cybersecurity1:Cybersecurity1
                    });
                    User.createUser(newUser, function (err, user) {
                      if (err) throw err;
                      console.log(user);
                    });
                    req.flash(
                      "success_msg",
                      "You are registered and can now login"
                    );
                    // 	 messagebird.verify.create(phone, {
                    // 		originator : 'Code',
                    // 		template : 'Your verification code is %token.'
                    // }, function (err, response) {
                    // 		if (err) {
                    // 				// Request has failed
                    // 				console.log(err);
                    // 				res.render('register', {
                    // 						error : err.errors[0].description
                    // 				});
                    // 		} else {
                    // 				// Request was successful
                    // 				console.log(response);
                    // 				res.render('login', {
                    // 						id : response.id
                    // 				});
                    // 		}
                    // })
                    // Compose email
                    const html = `Hi there,
				 <br/>
				 Thank you for registering!
				 <br/><br/>
				 Please verify your email by clicking the following link:
					<br/>
				 <a href="http://127.0.0.1:3000/users/verifyemail/${secretToken}">https://global-shala.herokuapp.com/users/verifyemail/${secretToken}</a>
				 <br/><br/>
				 Have a pleasant day.`;
                    mailer.sendEmail(
                      "globalshala@gmail.com",
                      email,
                      "Please verify your email!",
                      html
                    );
                    req.flash("success", "Please check your email.");
                    res.send(
                      `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Please check your email for verification </h1></div></body>`
                    );
                    //  res.send(`<h1>Please check your email for verification</h1>`);
                    //send the email
                    // 				console.log(phone);
                    // nexmo.verify.request({
                    //   number: phone,
                    //   brand: BRAND_NAME
                    // }, (err, result) => {
                    //   if (err) {
                    //     res.sendStatus(500);
                    //   //   res.render('register', {
                    //   //     message: req.flash('Server Error')
                    //   //   });
                    //   } else {
                    //     console.log(result);
                    //     let requestId = result.request_id;
                    //     if (result.status == '0') {
                    //       res.render('verify', {
                    //         requestId: requestId
                    //       });
                    //     } else {
                    //       //res.status(401).send(result.error_text);
                    //       res.render('register', {
                    //         message: result.error_text,
                    //         requestId: requestId
                    //       });
                    //     }
                    //   }
                    // });
                  }
                }
              );
            }
          );
        }
      );
    }
  }
});
// router.get('verifyemail',(req,res)=>{
// res.render('verifyemail');
// });
router.get("/verifyemail/:id", function (req, res) {
  var secretToken = req.params.id;

  // find the account that matches the secret token
  User.findOne({ secretToken: secretToken }, function (err, user) {
    if (!user) {
      req.flash("error ", "No User found.");
      // res.render('users/login');
      res.send(
        `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">please verify your email address</h1></div></body>`
      );
      // res.send(`<h1>please verify your email address</h1>`);
    } else {
      user.active = true;
      user.secretToken = "";
      user.save();
      req.flash("success", "Thank You! Now You can login");
      res.redirect("/users/login");
    }
  });
});
// router.post('/verifyemail',(req,res,next)=>{

// var secretToken=req.body.secretToken;
// //find the account that matches the secret token
// const user= User.findOne({'secretToken':secretToken.trim()});
// 	if (!user)
// 	{
// 		req.flash('error ','No User found.')
// 		res.render('users/verifyemail');
// 	}

// 	user.active=true;
// 	user.secretToken='';
// 	user.save();
// 	req.flash('success','Thank You! Now You can login');
// 	res.redirect('/users/login');

// });

// router.post('/verify', (req, res) => {
//   // Checking to see if the code matches
//   let pin = req.body.pin;
//   let requestId = req.body.requestId;

//   nexmo.verify.check({
//     request_id: requestId,
//     code: pin
//   }, (err, result) => {
//     if (err) {
//       //res.status(500).send(err);
//       res.render('status', {
//         message: 'Server Error'
//       });
//     } else {
//       console.log(result);
//       // Error status code: https://developer.nexmo.com/api/verify#verify-check
//       if (result && result.status == '0') {
//         //res.status(200).send('Account verified!');
//         res.render('login', {
//           message: 'Account verified! 🎉'
//         });
//       } else {
//         //res.status(401).send(result.error_text);
//         res.render('verify', {
//           message: result.error_text,
//           requestId: requestId
//         });
//       }
//     }
//   });
// });
//Mobile Application

router.post("/registerr", function (req, res) {
  const name = req.body.name;
  // const username = req.body.username;
  const email = req.body.email;
  // const gender = req.body.gender;
  // const birthday = req.body.birthday;
  const phone = req.body.phone;
  //const subject = req.body.subject;
  const password = req.body.password;
  const password2 = req.body.password2;

  // Validation
  req.checkBody("name", "Name is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json({
      errorss: errorss,
    });
  }
  req.checkBody("email", "Email is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  }
  //req.checkBody('subject', 'Subject is required').notEmpty();
  req.checkBody("phone", "Phone Number is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  }
  // req.checkBody('username', 'Last Name is required').notEmpty();
  // var errorss = req.validationErrors();

  //   if (errorss) {
  // 	  res.json('Validation Error', {
  // 		  errorss: errorss
  // 	  });
  //   }
  // req.checkBody('gender', 'Gender is required').notEmpty();
  // var errorss = req.validationErrors();

  //   if (errorss) {
  // 	  res.json('Validation Error', {
  // 		  errorss: errorss
  // 	  });
  //   }
  // req.checkBody('birthday', 'Birtday is required').notEmpty();
  // var errorss = req.validationErrors();

  //   if (errorss) {
  // 	  res.json('Validation Error', {
  // 		  errorss: errorss
  // 	  });
  //   }
  req.checkBody("password", "Password is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  }
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  } else {
    //checking for email and username are already taken
    //   User.findOne({ username: {
    // 	  "$regex": "^" + username + "\\b", "$options": "i"
    // }}, function (err, user) {
    User.findOne(
      {
        email: {
          $regex: "^" + email + "\\b",
          $options: "i",
        },
      },
      function (err, mail) {
        if (mail) {
          //   res.send(`<h1 style="text-align:center; margin-top: 400px; background-color:black; color:red;">Already Registered mail id or Username</h1>`);
          res.json("Already Registered mail id");
        } else {
          var newUser = new User({
            name: name,
            // birthday:birthday,
            // gender:gender,
            phone: phone,
            // subject:subject,
            email: email,
            password: password,
            // username:username,
            password2: password2,
          });
          User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
          });
          req.flash("success_msg", "You are registered and can now login");
          res.json("Register Successfully");
        }
      }
    );
  }
});
//End Mobile Application
router.post("/adminregister", function (req, res) {
  const name = req.body.name;
  // const username = req.body.username;
  const email = req.body.email;
  // const gender = req.body.gender;
  // const birthday = req.body.birthday;
  const phone = req.body.phone;
  //const subject = req.body.subject;
  const password = req.body.password;
  const password2 = req.body.password2;
  const isAdmin = req.body.isAdmin;
  var type = req.body.type;
  // const Cybersecurity=req.body.{"not_checked":"false","checked":"true"};

  // if(req.body.ArtificialIntelligence){
  // 	var ArtificialIntelligence =req.body.ArtificialIntelligence;
  // };
  // if(req.body.ArtificialIntelligence0){
  // 	var ArtificialIntelligence =req.body.ArtificialIntelligence0;
  // };
  // if(req.body.GraphicDesign){
  // 	var GraphicDesign =req.body.GraphicDesign;
  // };
  // if(req.body.GraphicDesign0){
  // 	var GraphicDesign =req.body.GraphicDesign0;
  // };
  // if(req.body.Marketing){
  // 	var Marketing =req.body.Marketing;
  // };
  // if(req.body.Marketing){
  // 	var Marketing =req.body.Marketing0;
  // };

  // if(req.body.Cybersecurity){
  // 	var Cybersecurity =req.body.Cybersecurity;
  // };
  // if(req.body.Cybersecurity0){
  // 	var Cybersecurity =req.body.Cybersecurity0;
  // };
  // if(req.body.WebDevelopmentJavascript){
  // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript;
  // };
  // if(req.body.WebDevelopmentJavascript0){
  // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript0;
  // };
  // if(req.body.WebDevelopmentPHP){
  // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP;
  // };
  // if(req.body.WebDevelopmentPHP0){
  // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP0;
  // };
  // if(req.body.WebDevelopmentPython){
  // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
  // };
  // if(req.body.WebDevelopmentPython){
  // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
  // };
  // var amenities = req.body.amenities;
  // Validation
  if (type == "admin") {
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    //req.checkBody('subject', 'Subject is required').notEmpty();
    req.checkBody("phone", "Phone Number is required").notEmpty();
    // req.checkBody('username', 'Last Name is required').notEmpty();
    // req.checkBody('gender', 'Gender is required').notEmpty();
    // req.checkBody('birthday', 'Birtday is required').notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password2", "Passwords do not match")
      .equals(req.body.password);
    // req.checkBody('category', 'Passwords do not match').notEmpty();

    // console.log(phone);
    var errors = req.validationErrors();

    if (errors) {
      res.render("adminregister", {
        errors: errors,
      });
    } else {
      //checking for email and username are already taken
      // 	User.findOne({ username: {
      // 		"$regex": "^" + username + "\\b", "$options": "i"
      // }}, function (err, user) {
      Admin.findOne(
        {
          email: {
            $regex: "^" + email + "\\b",
            $options: "i",
          },
        },
        function (err, mail) {
          if (mail) {
            res.send(
              `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered Mail id </h1></div></body>`
            );
            // res.send(`<h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered mail id</h1>`);
          } else {
            var newAdmin = new Admin({
              name: name,
              // birthday:birthday,
              // gender:gender,

              //   subject:subject,
              email: email,
              phone: phone,
              password: password,
              // username:username,
              password2: password2,
              isAdmin: isAdmin,
              type: type,
              // ArtificialIntelligence:ArtificialIntelligence,
              // GraphicDesign:GraphicDesign,
              // Marketing:Marketing,
              // Cybersecurity:Cybersecurity,
              // WebDevelopmentJavascript:WebDevelopmentJavascript,
              // WebDevelopmentPHP:WebDevelopmentPHP,
              // WebDevelopmentPython:WebDevelopmentPython
              // Cybersecurity1:Cybersecurity1
            });
            Admin.createUser(newAdmin, function (err, admin) {
              if (err) throw err;
              console.log(admin);
            });
            req.flash("success_msg", "You are registered and can now login");
            // 	 messagebird.verify.create(phone, {
            // 		originator : 'Code',
            // 		template : 'Your verification code is %token.'
            // }, function (err, response) {
            // 		if (err) {
            // 				// Request has failed
            // 				console.log(err);
            // 				res.render('register', {
            // 						error : err.errors[0].description
            // 				});
            // 		} else {
            // 				// Request was successful
            // 				console.log(response);
            // 				res.render('login', {
            // 						id : response.id
            // 				});
            // 		}
            // })
            // res.redirect('/users/login');

            console.log(phone);
            nexmo.verify.request(
              {
                number: phone,
                brand: BRAND_NAME,
              },
              (err, result) => {
                if (err) {
                  //res.sendStatus(500);
                  res.render("adminregister", {
                    message: "Server Error",
                  });
                } else {
                  console.log(result);
                  let requestId = result.request_id;
                  if (result.status == "0") {
                    res.render("verify2", {
                      requestId: requestId,
                    });
                  } else {
                    //res.status(401).send(result.error_text);
                    res.render("adminregister", {
                      message: result.error_text,
                      requestId: requestId,
                    });
                  }
                }
              }
            );
          }
        }
      );
    }
  }
});
router.post("/verify2", (req, res) => {
  // Checking to see if the code matches
  let pin = req.body.pin;
  let requestId = req.body.requestId;

  nexmo.verify.check(
    {
      request_id: requestId,
      code: pin,
    },
    (err, result) => {
      if (err) {
        //res.status(500).send(err);
        res.render("status", {
          message: "Server Error",
        });
      } else {
        console.log(result);
        // Error status code: https://developer.nexmo.com/api/verify#verify-check
        if (result && result.status == "0") {
          //res.status(200).send('Account verified!');
          res.render("adminlogin", {
            message: "Account verified! 🎉",
          });
        } else {
          //res.status(401).send(result.error_text);
          res.render("verify2", {
            message: result.error_text,
            requestId: requestId,
          });
        }
      }
    }
  );
});
router.post("/compregister", function (req, res) {
  const name = req.body.name;
  // const username = req.body.username;
  const email = req.body.email;
  // const gender = req.body.gender;
  // const birthday = req.body.birthday;
  const phone = req.body.phone;
  //const subject = req.body.subject;
  const password = req.body.password;
  const password2 = req.body.password2;
  const isCompany = req.body.isCompany;
  var type = req.body.type;
  // const Cybersecurity=req.body.{"not_checked":"false","checked":"true"};

  // if(req.body.ArtificialIntelligence){
  // 	var ArtificialIntelligence =req.body.ArtificialIntelligence;
  // };
  // if(req.body.ArtificialIntelligence0){
  // 	var ArtificialIntelligence =req.body.ArtificialIntelligence0;
  // };
  // if(req.body.GraphicDesign){
  // 	var GraphicDesign =req.body.GraphicDesign;
  // };
  // if(req.body.GraphicDesign0){
  // 	var GraphicDesign =req.body.GraphicDesign0;
  // };
  // if(req.body.Marketing){
  // 	var Marketing =req.body.Marketing;
  // };
  // if(req.body.Marketing){
  // 	var Marketing =req.body.Marketing0;
  // };

  // if(req.body.Cybersecurity){
  // 	var Cybersecurity =req.body.Cybersecurity;
  // };
  // if(req.body.Cybersecurity0){
  // 	var Cybersecurity =req.body.Cybersecurity0;
  // };
  // if(req.body.WebDevelopmentJavascript){
  // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript;
  // };
  // if(req.body.WebDevelopmentJavascript0){
  // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript0;
  // };
  // if(req.body.WebDevelopmentPHP){
  // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP;
  // };
  // if(req.body.WebDevelopmentPHP0){
  // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP0;
  // };
  // if(req.body.WebDevelopmentPython){
  // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
  // };
  // if(req.body.WebDevelopmentPython){
  // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
  // };
  // var amenities = req.body.amenities;
  // Validation
  if (type == "company") {
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    //req.checkBody('subject', 'Subject is required').notEmpty();
    req.checkBody("phone", "Phone Number is required").notEmpty();
    // req.checkBody('username', 'Last Name is required').notEmpty();
    // req.checkBody('gender', 'Gender is required').notEmpty();
    // req.checkBody('birthday', 'Birtday is required').notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password2", "Passwords do not match")
      .equals(req.body.password);
    // req.checkBody('category', 'Passwords do not match').notEmpty();

    // console.log(phone);
    var errors = req.validationErrors();

    if (errors) {
      res.render("compregister", {
        errors: errors,
      });
    } else {
      //checking for email and username are already taken
      // 	User.findOne({ username: {
      // 		"$regex": "^" + username + "\\b", "$options": "i"
      // }}, function (err, user) {
      Comp.findOne(
        {
          email: {
            $regex: "^" + email + "\\b",
            $options: "i",
          },
        },
        function (err, mail) {
          if (mail) {
            res.send(
              `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered Mail id</h1></div></body>`
            );
            // res.send(`<h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered mail id</h1>`);
          } else {
            const secretToken = randomstring.generate();
            const active = false;

            var newComp = new Comp({
              name: name,
              // birthday:birthday,
              // gender:gender,

              //   subject:subject,
              email: email,
              phone: phone,
              password: password,
              // username:username,
              password2: password2,
              isCompany: isCompany,
              type: type,
              secretToken: secretToken,
              active: active,
              // ArtificialIntelligence:ArtificialIntelligence,
              // GraphicDesign:GraphicDesign,
              // Marketing:Marketing,
              // Cybersecurity:Cybersecurity,
              // WebDevelopmentJavascript:WebDevelopmentJavascript,
              // WebDevelopmentPHP:WebDevelopmentPHP,
              // WebDevelopmentPython:WebDevelopmentPython
              // Cybersecurity1:Cybersecurity1
            });
            Comp.createUser(newComp, function (err, comp) {
              if (err) throw err;
              console.log(comp);
            });
            req.flash("success_msg", "You are registered and can now login");
            const html = `Hi there,
										 <br/>
										 Thank you for registering!
										 <br/><br/>
										 Please verify your email by clicking the following link:
										 
									
										 <a href="http://127.0.0.1:3000/users/verifyemail1/${secretToken}">http://127.0.0.1:3000/users/verifyemail1/${secretToken}</a>
										 <br/><br/>
										 Have a pleasant day.`;
            mailer.sendEmail(
              "globalshala@gmail.com",
              email,
              "Please verify your email!",
              html
            );
            req.flash("success", "Please check your email.");
            res.send(
              `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Please check your email for verification</h1></div></body>`
            );
            //  res.send(`<h1>Please check your email for verification</h1>`);
            // 	 messagebird.verify.create(phone, {
            // 		originator : 'Code',
            // 		template : 'Your verification code is %token.'
            // }, function (err, response) {
            // 		if (err) {
            // 				// Request has failed
            // 				console.log(err);
            // 				res.render('register', {
            // 						error : err.errors[0].description
            // 				});
            // 		} else {
            // 				// Request was successful
            // 				console.log(response);
            // 				res.render('login', {
            // 						id : response.id
            // 				});
            // 		}
            // })
            // res.redirect('/users/login');

            // console.log(phone);
            // nexmo.verify.request({
            // 	number: phone,
            // 	brand: BRAND_NAME
            // }, (err, result) => {
            // 	if (err) {
            // 		//res.sendStatus(500);
            // 		res.render('compregister', {
            // 			message: 'Server Error'
            // 		});
            // 	} else {
            // 		console.log(result);
            // 		let requestId = result.request_id;
            // 		if (result.status == '0') {
            // 			res.render('verify1', {
            // 				requestId: requestId
            // 			});
            // 		} else {
            // 			//res.status(401).send(result.error_text);
            // 			res.render('compregister', {
            // 				message: result.error_text,
            // 				requestId: requestId
            // 			});
            // 		}
            // 	}
            // });
          }
        }
      );
    }
  }
});
router.get("/verifyemail1/:id", function (req, res) {
  var secretToken = req.params.id;

  // find the account that matches the secret token
  Comp.findOne({ secretToken: secretToken }, function (err, comp) {
    if (!comp) {
      req.flash("error ", "No User found.");
      // res.render('users/login');
      res.send(
        `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Please verify your email address.</h1></div></body>`
      );
      // res.send(`<h1>please verify your email address</h1>`);
    } else {
      comp.active = true;
      comp.secretToken = "";
      comp.save();
      req.flash("success", "Thank You! Now You can login");
      res.redirect("/users/complogin");
    }
  });
});
// router.post('/verify1', (req, res) => {
// 	// Checking to see if the code matches
// 	let pin = req.body.pin;
// 	let requestId = req.body.requestId;

// 	nexmo.verify.check({
// 		request_id: requestId,
// 		code: pin
// 	}, (err, result) => {
// 		if (err) {
// 			//res.status(500).send(err);
// 			res.render('status', {
// 				message: 'Server Error'
// 			});
// 		} else {
// 			console.log(result);
// 			// Error status code: https://developer.nexmo.com/api/verify#verify-check
// 			if (result && result.status == '0') {
// 				//res.status(200).send('Account verified!');
// 				res.render('complogin', {
// 					message: 'Account verified! 🎉'
// 				});
// 			} else {
// 				//res.status(401).send(result.error_text);
// 				res.render('verify1', {
// 					message: result.error_text,
// 					requestId: requestId
// 				});
// 			}
// 		}
// 	});
// });
//Mobile Application
router.post("/compregisterr", function (req, res) {
  const name = req.body.name;
  // const username = req.body.username;
  const email = req.body.email;
  // const gender = req.body.gender;
  // const birthday = req.body.birthday;
  const phone = req.body.phone;
  //const subject = req.body.subject;
  const password = req.body.password;
  const password2 = req.body.password2;

  // Validation
  req.checkBody("name", "Name is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json({
      errorss: errorss,
    });
  }
  req.checkBody("email", "Email is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  }
  //req.checkBody('subject', 'Subject is required').notEmpty();
  req.checkBody("phone", "Phone Number is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  }
  // req.checkBody('username', 'Last Name is required').notEmpty();
  // var errorss = req.validationErrors();

  //   if (errorss) {
  // 	  res.json('Validation Error', {
  // 		  errorss: errorss
  // 	  });
  //   }
  // req.checkBody('gender', 'Gender is required').notEmpty();
  // var errorss = req.validationErrors();

  //   if (errorss) {
  // 	  res.json('Validation Error', {
  // 		  errorss: errorss
  // 	  });
  //   }
  // req.checkBody('birthday', 'Birtday is required').notEmpty();
  // var errorss = req.validationErrors();

  //   if (errorss) {
  // 	  res.json('Validation Error', {
  // 		  errorss: errorss
  // 	  });
  //   }
  req.checkBody("password", "Password is required").notEmpty();
  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  }
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  var errorss = req.validationErrors();

  if (errorss) {
    res.json("Validation Error", {
      errorss: errorss,
    });
  } else {
    //checking for email and username are already taken
    //   User.findOne({ username: {
    // 	  "$regex": "^" + username + "\\b", "$options": "i"
    // }}, function (err, user) {
    User.findOne(
      {
        email: {
          $regex: "^" + email + "\\b",
          $options: "i",
        },
      },
      function (err, mail) {
        if (mail) {
          //   res.send(`<h1 style="text-align:center; margin-top: 400px; background-color:black; color:red;">Already Registered mail id or Username</h1>`);
          res.json("Already Registered mail id");
        } else {
          var newUser = new User({
            name: name,
            // birthday:birthday,
            // gender:gender,
            phone: phone,
            // subject:subject,
            email: email,
            password: password,
            // username:username,
            password2: password2,
          });
          User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
          });
          req.flash("success_msg", "You are registered and can now login");
          res.json("Register Successfully");
        }
      }
    );
  }
});
passport.use(
  "user",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email

      passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, email, password, done) {
      User.getUserByUsername(email, function (err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, req.flash("loginMessage", "No user found."));
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (!isMatch) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Password Does not Match.")
            );
          }
          if (!user.active) {
            return done(null, false, {
              message: "You need to verify email first",
            });
          }
          return done(null, user);
        });
      });
    }
  )
);
passport.use(
  "admin",
  new LocalStrategy(function (email, password, done) {
    Admin.getUserByUsername(email, function (err, admin) {
      if (err) throw err;
      if (!admin) {
        return done(null, false, { message: "Unknown User" });
      }

      Admin.comparePassword(password, admin.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, admin);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);
passport.use(
  "company",
  new LocalStrategy(function (email, password, done) {
    Comp.getUserByUsername(email, function (err, comp) {
      if (err) throw err;
      if (!comp) {
        return done(null, false, { message: "Unknown User" });
      }

      Comp.comparePassword(password, comp.password, function (err, isMatch) {
        if (err) throw err;
        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }
        if (!comp.active) {
          return done(null, false, {
            message: "You need to verify email first",
          });
        }
        return done(null, comp);
      });
    });
  })
);
// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });
// passport.serializeUser(function(user, done) {

// 	if (isUser(user)) {
// 		// serialize user
// 		console.log(' user id is: ' + user._id);
// 	done(null, user._id);
//   } else if (isAdmin(user)) {
// 		// serialize admin
// 		console.log('admin id is: ' + user._id);
// 		done(null, user._id);
//   }
// });
passport.serializeUser(function (entity, done) {
  console.log(" user id is: " + entity._id);
  console.log(" user type is: " + entity.type);
  done(null, { id: entity.id, type: entity.type });
});
passport.deserializeUser(function (obj, done) {
  switch (obj.type) {
    case "user":
      User.findById(obj.id).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(new Error("user id not found:" + obj.id, null));
        }
      });
      break;
    case "admin":
      Admin.findById(obj.id).then((admin) => {
        if (admin) {
          done(null, admin);
        } else {
          done(new Error("device id not found:" + obj.id, null));
        }
      });
      break;
    case "company":
      Comp.findById(obj.id).then((comp) => {
        if (comp) {
          done(null, comp);
        } else {
          done(new Error("company id not found:" + obj.id, null));
        }
      });
      break;
    default:
      done(new Error("no entity type:", obj.type), null);
      break;
  }
});
// passport.deserializeUser(function (id, done) {
// 	User.getUserById(id, function (err, user) {
// 		done(err, user);
// 	});
// });
// passport.deserializeUser(function(id, done) {

// 	User.findById(id, function (err, user) {
// 			if(err)
// 					done(err);
// 			if(user) {
// 					done(null, user);
// 			}
// 			else {
// 					Admin.findById(id, function (err, admin) {
// 							if(err)
// 									done(err);
// 							done(null, admin);
// 					});
// 			}
// 	});
// });
// function isUser(req, res, next) {
//   if (req.user) { return next(); }
//   else {

//           req.flash('error_msg', 'Please log in to view that resource');
//           // res.redirect('/');
//         }
// }
// var isUser = function (req, res, next) {
// 	if (req.user.isUser == 'true') {
// 	return next();
// 	}
// 	res.redirect('/users/login');
// 	};

// var isAdmin = function (req, res, next) {

// if(req.user.isAdmin == 'true') {
// return next();
// }
// res.redirect('/users/adminlogin');
// };
exports.loginUser = function (req, res, next) {
  passport.authenticate("user", function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);

    req.logIn(user, function (err) {
      if (err) return res.send(err);
      res.json(req.user.userInfo);
    });
  })(req, res, next);
};
exports.loginAdmin = function (req, res, next) {
  passport.authenticate("admin", function (err, admin, info) {
    var error = err || info;
    if (error) return res.json(401, error);

    req.logIn(admin, function (err) {
      if (err) return res.send(err);
      res.json(req.admin.profile);
    });
  })(req, res, next);
};
function isUser(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.user) {
    // if user is admin, go next
    if (req.user.isUser == "true") {
      return next();
    }
  }
  res.redirect("/users/login");
}
function isAdmin(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.user) {
    // if user is admin, go next
    if (req.user.isAdmin == "true") {
      return next();
    }
  }
  res.redirect("/users/adminlogin");
}
function isCompany(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.user) {
    // if user is admin, go next
    if (req.user.isCompany == "true") {
      return next();
    }
  }
  res.redirect("/users/complogin");
}
// function isUser(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/users/login');
//   }
// }
// Verify whether the token is correct
router.post(
  "/loginn",
  passport.authenticate("local", {
    successRedirect: "/users/coursefees",
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect("/users/coursefees", { email: req.user.email });
  }
);

router.get("/coursefees", function (req, res) {
  User.find(function (err, user) {
    res.render("coursefees", {
      title: "Course Subscription",
      User: user,
      email: req.user.email,
    });
  });
});
router.get("/dashboard", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  User.find(function (err, user) {
    res.render("dashboard", {
      title: "dashboard",
      User: user,
      email: req.user.email,
    });
  });
});
router.post("/dashboard/:id", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  var query = { _id: req.params.id };

  var verifyfree = req.body.verifyfree;

  var update = { verifyfree: verifyfree };
  var options = { new: true };
  User.findOneAndUpdate(query, update, options, function (err, user) {
    console.log(user);
    res.render("dashboardsuccess", {
      title: "Free Lifetime Subsciption",
      User: user,
      email: req.user.email,
    });
  });
  // User.find(function(err, user){

  //   res.render('dashboard',{title : 'dashboard', User : user,email:req.user.email});
  // });
});
router.get("/dashboardAI", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardAI", {
    title: "Artificial Intelligence/ Machine Learning",
  });
});
router.get("/dashboardBlockchain", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardBlockchain", { title: "Block Chain" });
});
router.get("/dashboardCloudComputing", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardCloudComputing", { title: "Cloud Computing" });
});
router.get("/dashboardLinux", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardLinux", { title: "Linux Development" });
});
router.get("/dashboardAndroid", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardAndroid", { title: "ANdroid Application Development " });
});
router.get("/dashboardIos", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardIos", { title: "Ios Application Development" });
});

router.get("/dashboardGD", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardGD", { title: "Graphical Design" });
});
router.get("/dashboardCW", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardCW", { title: "Content Writing" });
});
// router.get('/resume', isUser, function(req, res, next) {
// 	res.render('resume');
// 	});
router.get("/resumesoon", isUser, function (req, res, next) {
  User.find(function (err, user) {
    if (
      (req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true") &&
      (req.user.verifyfree == "false" || req.user.verifyfree == "true")
    ) {
      res.render("resumesoon", {
        title: "Resume",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false" &&
      req.user.verifyfree == "true"
    ) {
      res.render("coursefees", {
        title: "Coursefees",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardGDBasic", isUser, function (req, res) {
  res.render("dashboardGDBasic", { title: "Graphical Design Basic" });
});
router.get("/dashboardGDIntermediate", isUser, function (req, res) {
  res.render("dashboardGDIntermediate", {
    title: "Graphical Design Intermediate",
  });
});
router.get("/dashboardCWBasic", isUser, function (req, res) {
  res.render("dashboardCWBasic", { title: "Content Writing Basic" });
});
router.get("/dashboardCWIntermediate", isUser, function (req, res) {
  res.render("dashboardCWIntermediate", {
    title: "Content Writing Intermediate",
  });
});
router.get("/dashboardCWAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCWAdvanced", {
        title: "Content Writing Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardGDHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardGDHot", {
        title: "Graphical Design Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardCWHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCWHot", {
        title: "Content Writing Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardMarketing", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardMarketing", { title: "Marketing" });
});
router.get("/dashboardDMBasic", isUser, function (req, res) {
  res.render("dashboardDMBasic", { title: "Digital Marketing Basic" });
});
router.get("/dashboardDMIntermediate", isUser, function (req, res) {
  res.render("dashboardDMIntermediate", {
    title: "Digital Marketing Intermediate",
  });
});
router.get("/dashboardDMAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardDMAdvanced", {
        title: "Digital Marketing Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardDMHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyfree == "true" ||
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardDMHot", {
        title: "Digital Marketing Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyfree == "false" &&
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardDMHot", {
        title: "Digital Marketing Hot Course",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardDMHot',{title:'Digital Marketing Hot'});
});
router.get("/dashboardCybersecurity", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardCybersecurity", { title: "Cybersecurity" });
});
router.get("/dashboardCyberBasic", isUser, function (req, res) {
  res.render("dashboardCyberBasic", { title: "Cybersecurity Basic Course" });
});

router.get("/dashboardCyberIntermediate", isUser, function (req, res) {
  res.render("dashboardCyberIntermediate", {
    title: "Cybersecurity Intermediate Course",
  });
});
router.get("/dashboardCyberAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCyberAdvanced", {
        title: "Cybersecurity Advanced Course",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardCyberHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyfree == "true" ||
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCyberHot", {
        title: "Cybersecurity Hot Course",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyfree == "false" &&
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCyberHot", {
        title: "Cybersecurity Hot Course",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardCyberHot',{title:'Cybersecurity Hot Course'});
});
router.get("/dashboardWDJ", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardWDJ", { title: "Web Development with JavaScript" });
});
router.get("/dashboardWDJBasic", isUser, function (req, res) {
  res.render("dashboardWDJBasic", {
    title: "Web Development with JavaScript -Basic",
  });
});
router.get("/dashboardWDJIntermediate", isUser, function (req, res) {
  res.render("dashboardWDJIntermediate", {
    title: "Web Development with JavaScript -Intermediate",
  });
});
router.get("/dashboardWDJAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardWDJAdvanced", {
        title: "Web Development with JavaScript -Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardWDJHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyfree == "true" ||
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardWDJHot", {
        title: "Web Development with JavaScript -Hots",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyfree == "false" &&
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardWDJHot", {
        title: "Web Development with Javascript -Hots",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardWDJHot',{title:'Web Development with JavaScript -Hots'});
});

router.get("/dashboardPHP", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardPHP", { title: "Web Development with PHP" });
});
router.get("/dashboardPHPBasic", isUser, function (req, res) {
  res.render("dashboardPHPBasic", { title: "Web Development with PHP-Basic" });
});
router.get("/dashboardPHPIntermediate", isUser, function (req, res) {
  res.render("dashboardPHPIntermediate", {
    title: "Web Development with PHP-Intermediate",
  });
});
router.get("/dashboardPHPAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardPHPAdvanced", {
        title: "Web Development with PHP -Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardPHPHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardPHPHot", {
        title: "Web Development with PHP-Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardPHPHot',{title:'Web Development with PHP-Hots'});
});
router.get("/dashboardPython", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardPython", { title: "Web Development with Python" });
});
router.get("/dashboardPythonBasic", isUser, function (req, res) {
  res.render("dashboardPythonBasic", {
    title: "Web Development with Python-Basic",
  });
});
router.get("/dashboardPythonIntermediate", isUser, function (req, res) {
  res.render("dashboardPythonIntermediate", {
    title: "Web Development with Python-Intermediate",
  });
});
router.get("/dashboardPythonAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardPythonAdvanced", {
        title: "Web Development with Python -Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardPythonHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardPythonHot", {
        title: "Web Development with Python-Hots",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardPythonHot',{title:'Web Development with Python-Hots'});
});

router.get("/dashboardAIBasic", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardAIBasic", { title: "AI/ML BASIC" });
});
router.get("/dashboardBlockchainBasic", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardBlockchainBasic", { title: "Blockchain BASIC" });
});
router.get("/dashboardCloudComputingBasic", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardCloudComputingBasic", {
    title: "Cloud Computing BASIC",
  });
});
router.get("/dashboardLinuxBasic", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardLinuxBasic", { title: "Linux BASIC" });
});
router.get("/dashboardIosBasic", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardIosBasic", {
    title: "Ios Application Development BASIC",
  });
});
router.get("/dashboardAndroidBasic", isUser, function (req, res) {
  // User.find({},function(err, allcampgrounds){
  // 	if(err){
  // 		console.log(err);
  // 	} else{
  // 		res.render('dashboard1',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
  // 	}
  // });
  // res.render('dashboard', { title: 'Dashboard'});
  res.render("dashboardAndroidBasic", {
    title: "Android Apllication Development BASIC",
  });
});
router.get("/dashboardAIIntermediate", isUser, function (req, res) {
  res.render("dashboardAIIntermediate", { title: "AI/ML INTERMEDIATE" });
});
router.get("/dashboardBlockchainIntermediate", isUser, function (req, res) {
  res.render("dashboardBlockchainIntermediate", {
    title: "BLOCKCHAIN INTERMEDIATE",
  });
});
router.get("/dashboardCloudComputingIntermediate", isUser, function (req, res) {
  res.render("dashboardCloudComputingIntermediate", {
    title: "CLOUD COMPUTING INTERMEDIATE",
  });
});
router.get("/dashboardLinuxIntermediate", isUser, function (req, res) {
  res.render("dashboardLinuxIntermediate", { title: "LINUX INTERMEDIATE" });
});
router.get("/dashboardAndroidIntermediate", isUser, function (req, res) {
  res.render("dashboardAndroidIntermediate", {
    title: "ANDROID APPLICATION DEVELOPMENT INTERMEDIATE",
  });
});
router.get("/dashboardIosIntermediate", isUser, function (req, res) {
  res.render("dashboardIosIntermediate", {
    title: "IOS APPLICATION DEVELOPMENT INTERMEDIATE",
  });
});
router.get("/dashboardAIAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardAIAdvanced", {
        title: "AI /ML Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardGDAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardGDAdvanced", {
        title: "GD Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardBlockchainAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardBlockchainAdvanced", {
        title: "Blockchain Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardCloudComputingAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCloudComputingAdvanced", {
        title: "Cloud Computing Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardIosAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardIosAdvanced", {
        title: "Ios Application Development Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardLinuxAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardLinuxAdvanced", {
        title: "Linux Application Development Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardAndroidAdvanced", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardAndroidAdvanced", {
        title: "Android Apllication Development Advanced",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/dashboardAIHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardAIHot", {
        title: "AI/ML Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardAIHot',{title:'AI/ML HOT'});
});
router.get("/dashboardCloudComputingHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardCloudComputingHot", {
        title: "Cloud Computing Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardAIHot',{title:'AI/ML HOT'});
});
router.get("/dashboardBlockchainHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardBlockchainHot", {
        title: "Blockchain Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardAIHot',{title:'AI/ML HOT'});
});
router.get("/dashboardIosHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardIosHot", {
        title: "Ios Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardAIHot',{title:'AI/ML HOT'});
});
router.get("/dashboardAndroidHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardAndroidHot", {
        title: "Android Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardAIHot',{title:'AI/ML HOT'});
});
router.get("/dashboardLinuxHot", isUser, function (req, res) {
  User.find(function (err, user) {
    if (
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboardLinuxHot", {
        title: "Linux Hot",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefees", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });

  // res.render('dashboardAIHot',{title:'AI/ML HOT'});
});
router.get("/user/:id", isUser, function (req, res) {
  // var query = {"_id": req.params.id};
  User.find(function (err, user) {
    console.log(user);
    res.render("user", {
      title: "Profile",
      User: user,
      username: req.user.email,
    });
  });
});
router.post("/user/:id", isUser, function (req, res) {
  // new Event({firstname : req.body.firstname, lastname : req.body.lastname, birthday : req.body.birthday,university : req.body.university, college : req.body.college,course:req.body.course,backlogs:req.body.backlogs,yeargap: req.body.yeargap,state:req.body.state,city:req.body.city}

  // 	)
  // 			.save(function(err, Event) {
  // 				console.log(Event)
  // 				res.redirect('/user');
  // 			});
  var query = { _id: req.params.id };

  var flag = "true";

  var update = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    university: req.body.university,
    college: req.body.college,
    stream: req.body.stream,
    course: req.body.course,
    backlogs: req.body.backlogs,
    yeargap: req.body.yeargap,
    state: req.body.state,
    city: req.body.city,
    field: req.body.field,
    loc1: req.body.loc1,
    loc2: req.body.loc2,
    loc3: req.body.loc3,
    flag: flag,
  };
  var options = { new: true };
  User.findOneAndUpdate(query, update, options, function (err, user) {
    console.log(user);
    res.render("user", {
      title: "Profile",
      User: user,
      username: req.user.email,
    });
  });
});
router.get("/notesAI", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesAI", { title: "AI/ML Notes", Notes: Notes });
  });
});
router.get("/notesCW", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCW", { title: "CW Notes", Notes: Notes });
  });
});
router.get("/notesGD", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesGD", { title: "Graphic Design Notes", Notes: Notes });
  });
});
router.get("/notesGDBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesGDBasic", {
      title: "Graphic Design Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCWBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCWBasic", {
      title: "Content Writing Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesGDIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesGDIntermediate", {
      title: "Graphic Design Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCWIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCWIntermediate", {
      title: "Content Writing Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesGDAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesGDAdvanced", {
          title: "Graphic Design Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesCWAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesCWAdvanced", {
          title: "Content Writing Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesGDHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesGDHot", {
          title: "Graphic Design Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesGDHot',{title:'Graphic Design Hot Notes',Notes:Notes});
  // });
});
router.get("/notesCWHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesCWHot", {
          title: "Content Writing Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesGDHot',{title:'Graphic Design Hot Notes',Notes:Notes});
  // });
});
router.get("/notesMarketing", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesMarketing", { title: "Marketing Notes", Notes: Notes });
  });
});
router.get("/notesDMBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesDMBasic", {
      title: "Digital Marketing Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesDMIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesDMIntermediate", {
      title: "Digial Marketing Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesDMAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesDMAdvanced", {
          title: "Digial Marketing Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesDMHot", isUser, function (req, res) {
  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesDMHot',{title:'Digial Marketing Hot Notes',Notes:Notes});
  // });

  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesDMHot", {
          title: "Digital Marketing Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});

router.get("/notesCybersecurity", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCybersecurity", {
      title: "Cybersecurity Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCyberBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCyberBasic", {
      title: "Cybersecurity Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCyberIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCyberIntermediate", {
      title: "Cybersecurity Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCyberAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesCyberAdvanced", {
          title: "Cybersecurity Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesCyberHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesCyberHot", {
          title: "Cybersecurity Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesCyberHot',{title:'Cybersecurity Hot Notes',Notes:Notes});
  // });
});
router.get("/notesWDJ", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesWDJ", {
      title: "Web Development With Javascript Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesWDJBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesWDJBasic", {
      title: "Web Development With Javascript Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesWDJIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesWDJIntermediate", {
      title: "Web Development With Javascript Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesWDJAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesWDJAdvanced", {
          title: "Web Development With Javascript Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesWDJHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesWDJHot", {
          title: "Web Development With Javascript Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesWDJHot',{title:'Web Development With Javascript Hot Notes',Notes:Notes});
  // });
});
router.get("/notesPHP", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesPHP", {
      title: "Web Development With PHP Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesPHPBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesPHPBasic", {
      title: "Web Development With PHP Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesPHPIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesPHPIntermediate", {
      title: "Web Development With PHP Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesPHPAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesPHPAdvanced", {
          title: "Web Development With PHP Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesPHPHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesPHPHot", {
          title: "Web Development With PHP Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesPHPHot',{title:'Web Development With PHP Hot Notes',Notes:Notes});
  // });
});
router.get("/notesPython", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesPython", {
      title: "Web Development With Python Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesPythonBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesPythonBasic", {
      title: "Web Development With Python Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesPythonIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesPythonIntermediate", {
      title: "Web Development With Python Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesPythonAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesPythonAdvanced", {
          title: "Web Development With Python Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesPythonHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesPythonHot", {
          title: "Web Development With Python Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesPythonHot',{title:'Web Development With Python Hot Notes',Notes:Notes});
  // });
});
router.get("/notesAIBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesAIBasic", { title: "AI/ML Basic Notes", Notes: Notes });
  });
});
router.get("/notesBlockchainBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesBlockchainBasic", {
      title: "Blockchain Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCloudComputingBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCloudComputingBasic", {
      title: "Cloud Computing Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesAndroidBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesAndroidBasic", {
      title: "Android Basic Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesIosBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesIosBasic", { title: "Ios Basic Notes", Notes: Notes });
  });
});
router.get("/notesLinuxBasic", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesLinuxBasic", { title: "Linux Basic Notes", Notes: Notes });
  });
});
router.get("/notesAIIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesAIIntermediate", {
      title: "AI/ML Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesBlockchainIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesBlockchainIntermediate", {
      title: "Blockchain Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesCloudComputingIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesCloudComputingIntermediate", {
      title: "Cloud Computing Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesAndroidIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesAndroidIntermediate", {
      title: "Android Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesIosIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesIosIntermediate", {
      title: "Ios Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesLinuxIntermediate", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    res.render("notesLinuxIntermediate", {
      title: "Linux Intermediate Notes",
      Notes: Notes,
    });
  });
});
router.get("/notesAIAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesAIAdvanced", {
          title: "AI/ML Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesBlockchainAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesBlockchainAdvanced", {
          title: "Blockchain Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesIosAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesIosAdvanced", {
          title: "Ios Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesAndroidAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesAndroidAdvanced", {
          title: "Android Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesLinuxAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesLinuxAdvanced", {
          title: "Linux Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesAIAdvanced", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesAIAdvanced", {
          title: "AI/ML Advanced Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesAIHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesGDHot", {
          title: "Graphic Design Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Note.find(function(err,Notes)
  // {
  // 	res.render('notesAIHot',{title:'AI/ML Hot Notes',Notes:Notes});
  // });
});
router.get("/notesBlockchainHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesBlockchainHot", {
          title: "Block Chain Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesCloudComputingHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesCloudComputingHot", {
          title: "Cloud Computing Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesAndroidHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesAndroidHot", {
          title: "Android Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesIosHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesIosHot", {
          title: "Ios Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/notesLinuxHot", isUser, function (req, res) {
  Note.find(function (err, Notes) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("notesLinuxHot", {
          title: "Linux Hot Notes",
          User: user,
          email: req.user.email,
          Notes: Notes,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/pdfAI", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfAI", { title: "AI/ML PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfCW", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCW", { title: "CW PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfAIBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfAIBasic", { title: "AI/ML Baisc PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfBlockchainBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfBlockchainBasic", {
      title: "Blockchain Baisc PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfCloudComputingBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCloudComputingBasic", {
      title: "Cloud Computing Baisc PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfAndroidBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfAndroidBasic", { title: "Android Baisc PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfIosBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfIosBasic", { title: "Ios Baisc PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfLinuxBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfLinuxBasic", { title: "Linux Baisc PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfCWBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCWBasic", { title: "CW Baisc PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfAIIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfAIIntermediate", {
      title: "AI/ML Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfBlockchainIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfBlockchainIntermediate", {
      title: "Blockchain Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfCloudComputingIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCloudComputingIntermediate", {
      title: "Cloud Computing Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfAndroidIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfAndroidIntermediate", {
      title: "Android Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfLinuxIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfLinuxIntermediate", {
      title: "Linux Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfiosIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfIosIntermediate", {
      title: "Ios Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});

router.get("/pdfCWIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCWIntermediate", {
      title: "CW Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfAIAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfAIAdvanced", {
          title: "AI/ML Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIAdvanced',{title:'AI/ML Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfBlockchainAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfBlockchainAdvanced", {
          title: "Blockchain Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIAdvanced',{title:'AI/ML Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfCloudComputingAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfCloudComputingAdvanced", {
          title: "Cloud Computing Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
});
router.get("/pdfAndroidAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfAndroidAdvanced", {
          title: "Android Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIAdvanced',{title:'AI/ML Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfIosAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfIosAdvanced", {
          title: "Ios Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIAdvanced',{title:'AI/ML Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdflinuxAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfLinuxAdvanced", {
          title: "linux Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIAdvanced',{title:'AI/ML Advanced PDFs',Pdf:Pdfs});
  // });
});

router.get("/pdfCWAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfCWAdvanced", {
          title: "CW Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIAdvanced',{title:'AI/ML Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfAIHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfAIHot", {
          title: "AI/ML Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfBlockchainHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfBlockchainHot", {
          title: "Blockchain Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfCloudComputingHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfCloudComputingHot", {
          title: "Cloud Computing Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfAndroidHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfAndroidHot", {
          title: "Android Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfIosHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfIosHot", {
          title: "Ios Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfLinuxHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfLinuxHot", {
          title: "Linux Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfCWHot", isUser, function (req, res) {
  Pdf.find(function (err, pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfCWHot", {
          title: "CW Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });
  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfAIHot',{title:'AI/ML Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfGD", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfGD", { title: "Graphic Design PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfGDBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfGDBasic", { title: "Graphic Design Basic PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfGDIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfGDIntermediate", {
      title: "Graphic Design Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfGDAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfGDAdvanced", {
          title: "Graphic Design Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfGDAdvanced',{title:'Graphic Design Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfGDHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfGDHot", {
          title: "Graphic Design Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfGDHot',{title:'Graphic Design Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfMarketing", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfMarketing", { title: "Marketing PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfDMBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfDMBasic", {
      title: "Digital Marketing Basic PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfDMIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfDMIntermediate", {
      title: "Digital Marketing Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfDMAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfDMAdvanced", {
          title: "Digital Marketing Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfDMAdvanced',{title:'Digital Marketing Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfDMHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfDMHot", {
          title: "Digital Marketing Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfDMHot',{title:'Digital Marketing Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfCybersecurity", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCybersecurity", { title: "Cybersecurity PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfCyberBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCyberBasic", {
      title: "Cybersecurity Basic PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfCyberIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfCyberIntermediate", {
      title: "Cybersecurity Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfCyberAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfCyberAdvanced", {
          title: "Cybersecurity Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfCyberAdvanced',{title:'Cybersecurity Advanced PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfCyberHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfCyberHot", {
          title: "Cybersecurity Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfCyberHot',{title:'Cybersecurity Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfWDJ", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfWDJ", {
      title: "Web Development With Javascript PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfWDJBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfWDJBasic", {
      title: "Web Development With Javascript Basic PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfWDJIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfWDJIntermediate", {
      title: "Web Development With Javascript Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfWDJAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfWDJAdvanced", {
          title: "Web Development With Javascript Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfWDJAdvanced',{title:'Web Development With Javascript Advance PDFs',Pdf:Pdfs});
  // });
});

router.get("/pdfWDJHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfWDJHot", {
          title: "Web Development With Javascript Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfWDJHot',{title:'Web Development With Javascript Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfPHP", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfPHP", { title: "Web Development With PHP PDFs", Pdf: Pdfs });
  });
});
router.get("/pdfPHPBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfPHPBasic", {
      title: "Web Development With PHP Basic PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfPHPIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfPHPIntermediate", {
      title: "Web Development With PHP Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfPHPAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfPHPAdvanced", {
          title: "Web Development With PHP Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfPHPAdvanced',{title:'Web Development With PHP Advanced PDFs',Pdf:Pdfs});
  // });
});

router.get("/pdfPHPHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfPHPHot", {
          title: "Web Development With PHP Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfPHPHot',{title:'Web Development With PHP Hot PDFs',Pdf:Pdfs});
  // });
});
router.get("/pdfPython", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfPython", {
      title: "Web Development With Python PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfPythonBasic", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfPythonBasic", {
      title: "Web Development With Python Basic PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfPythonIntermediate", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    res.render("pdfPythonIntermediate", {
      title: "Web Development With Python Intermediate PDFs",
      Pdf: Pdfs,
    });
  });
});
router.get("/pdfPythonAdvanced", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfPythonAdvanced", {
          title: "Web Development With Python Advanced PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfPythonAdvanced',{title:'Web Development With Python Advanced PDFs',Pdf:Pdfs});
  // });
});

router.get("/pdfPythonHot", isUser, function (req, res) {
  Pdf.find(function (err, Pdfs) {
    User.find(function (err, user) {
      if (
        req.user.verifyyearly == "true" ||
        req.user.verifyhalfyearly == "true"
      ) {
        res.render("pdfPythonHot", {
          title: "Web Development With Python Hot PDFs",
          User: user,
          email: req.user.email,
          Pdf: Pdfs,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false"
      ) {
        res.render("coursefees", {
          title: "Course Subscription",
          User: user,
          email: req.user.email,
        });
      }
    });
  });

  // Pdf.find(function(err,Pdfs)
  // {
  // 	res.render('pdfPythonHot',{title:'Web Development With Python Hot PDFs',Pdf:Pdfs});
  // });
});

router.get("/blog", isUser, function (req, res) {
  User.find(function (err, user) {
    res.render("blog", { User: user, username: req.user.email });
  });
});
router.get("/certificates", isUser, function (req, res) {
  User.find(function (err, user) {
    res.render("certificates", { User: user, username: req.user.email });
  });
});
router.get("/notifications", isUser, function (req, res) {
  User.find(function (err, user) {
    res.render("notifications", { User: user, username: req.user.email });
  });
});
// router.get('/eventsAI', function (req, res) {
// 	res.render('eventsAI');
// });
router.get("/Events", isUser, function (req, res) {
  Event.find(function (err, events) {
    User.find(function (err, user) {
      res.render("Events", {
        title: "Events",
        Events: events,
        User: user,
        email: req.user.email,
      });
    });
  });
});
router.get("/eventseats", isUser, function (req, res) {
  User.find(function (err, user) {
    res.render("eventseats", {
      title: "No seats Left",
      User: user,
      email: req.user.email,
    });
  });
});
router.get("/query", isUser, function (req, res) {
  User.find(function (err, user) {
    Query.find(function (err, query) {
      if (
        (req.user.verifyyearly == "true" ||
          req.user.verifyhalfyearly == "true") &&
        (req.user.verifyfree == "false" || req.user.verifyfree == "true")
      ) {
        res.render("query", {
          title: "Query",
          User: user,
          email: req.user.email,
          Query: query,
        });
      }
      if (
        req.user.verifyyearly == "false" &&
        req.user.verifyhalfyearly == "false" &&
        req.user.verifyfree == "true"
      ) {
        // if(req.user.freequeryleft>=0){
        // 	res.render('query',{title:'Query',User : user,email:req.user.email,Query:query});
        // }
        // if(req.user.freequeryleft < 0){
        // res.render('coursefees',{title : 'Coursefees', User : user,email:req.user.email});
        // }
        res.render("query", {
          title: "Query",
          User: user,
          email: req.user.email,
          username: req.user.username,
          Query: query,
        });
      }
    });
  });
});

router.get("/projectquerylist/:id", isUser, function (req, res) {
  query = { _id: req.params.id };
  User.find(function (err, user) {
    Projectquery.find(function (err, projectquery) {
      Internnexusproject.findOne(query, function (err, internnexusproject) {
        // if(req.user.freequeryleft>=0){
        // 	res.render('query',{title:'Query',User : user,email:req.user.email,Query:query});
        // }
        // if(req.user.freequeryleft < 0){
        // res.render('coursefees',{title : 'Coursefees', User : user,email:req.user.email});
        // }
        res.render("projectquerylist", {
          title: "Project Query List",
          User: user,
          email: req.user.email,
          username: req.user.username,
          internnexusproject: internnexusproject,
          Projectquery: projectquery,
          internnexusprojectid: req.params.id,
        });
      });
    });
  });
});
router.get("/projectquery/:id", isUser, function (req, res) {
  query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      // if(req.user.freequeryleft>=0){
      // 	res.render('query',{title:'Query',User : user,email:req.user.email,Query:query});
      // }
      // if(req.user.freequeryleft < 0){
      // res.render('coursefees',{title : 'Coursefees', User : user,email:req.user.email});
      // }
      res.render("projectquery", {
        title: "Project Query",
        User: user,
        email: req.user.email,
        username: req.user.username,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.post("/projectquery", isUser, function (req, res) {
  var querycount = 1;
  new Projectquery({
    name: req.body.name,
    username: req.body.username,
    querycount: querycount,
    internnexusprojectid: req.body.internnexusprojectid,
    projectname: req.body.projectname,
    level: req.body.level,
  }).save(function (err, Projectquery) {
    console.log(Projectquery);
    res.redirect("/users/projectselected");
  });
});
router.get("/projectlist", isUser, function (req, res) {
  User.find(function (err, user) {
    Project.find(function (err, project) {
      res.render("projectlist", {
        title: "Project List",
        User: user,
        email: req.user.email,
        Project: project,
      });
    });
  });
});
router.get("/projectselected", isUser, function (req, res) {
  User.find(function (err, user) {
    Internnexusproject.find(function (err, internnexusproject) {
      res.render("projectselected", {
        title: "Project Selected",
        User: user,
        email: req.user.email,
        Internnexusproject: internnexusproject,
      });
    });
  });
});
router.get("/projectstatusnotverified/:id", isUser, function (req, res) {
  User.find(function (err, user) {
    Internnexusproject.findOne({ _id: req.params.id }, function (
      err,
      internnexusproject
    ) {
      res.render("projectstatusnotverified", {
        title: "Project Status Not Verified",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});

router.get("/projectstatusverified/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("projectstatusverified", {
        title: "Project Guide Assigned",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.get("/submitproject/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("submitproject", {
        title: "Project Submit",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.get("/submitprojectdone/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("submitprojectdone", {
        title: "Project Submit",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.post("/submitproject/:id", isUser, function (req, res) {
  var submitproject = "true";
  // var id =req.params.id;
  var query = { _id: req.params.id };
  // var id= req.params.id;

  var update = {
    githublink: req.body.githublink,
    livedomainlink: req.body.livedomainlink,
    submitproject: submitproject,
  };
  var options = { new: true };
  Internnexusproject.findOneAndUpdate(query, update, options, function (
    err,
    internnexusproject
  ) {
    console.log(internnexusproject);
    res.render("projectsubmittedsuccessfully", {
      title: "Project Submitted ",
      internnexusproject: internnexusproject,
    });
  });
});

router.get("/submitprojectverified/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("submitprojectverified", {
        title: "Project Id Assigned",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.get("/submitprojectnotverified/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("submitprojectnotverified", {
        title: "Project Id Not Assigned",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.get("/finalproject/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("finalproject", {
        title: "Final Project Submit With Project Id",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});
router.post("/finalproject/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  Internnexusproject.findOne(query, function (err, internnexusproject1) {
    if (internnexusproject1.projectid1 == req.body.projectid2) {
      var finalproject = "true";
      // var id =req.params.id;

      // var id= req.params.id;

      var update = {
        finalproject: finalproject,
        projectid2: req.body.projectid2,
      };
      var options = { new: true };
      Internnexusproject.findOneAndUpdate(query, update, options, function (
        err,
        internnexusproject
      ) {
        console.log(internnexusproject);
        res.render("finalprojectsubmittedsuccess", {
          title: "Final Project Submitted With Project Id  ",
          internnexusproject: internnexusproject,
        });
      });
    }
    if (internnexusproject1.projectid1 != req.body.projectid2) {
      res.send(
        `<h1>Invalid Project Id .Please Enter The Assigned Project Id.</h1>`
      );
    }
  });
});
router.get("/finalprojectsubmitted/:id", isUser, function (req, res) {
  var query = { _id: req.params.id };
  User.find(function (err, user) {
    Internnexusproject.findOne(query, function (err, internnexusproject) {
      res.render("finalprojectsubmitted", {
        title: "Project Review",
        User: user,
        email: req.user.email,
        internnexusproject: internnexusproject,
      });
    });
  });
});

router.post("/basicproject/:id", isUser, (req, res) => {
  // if(req.body.seats!=='0'){
  var username = req.user.username;
  var projectid = req.body.id;
  Internnexusproject.findOne(
    { username: req.user.username, projectid: req.body.id },
    function (err, internnexusproject) {
      if (internnexusproject) {
        // console.log(userenrolledforevent);
        res.send(
          `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">You have already registered  for this Project.</h1></div></body>`
        );
      }
      if (!internnexusproject) {
        var query = { _id: req.user.id };
        var projectid = req.body.id;
        var update = { projectid: projectid };
        var options = { new: true };
        User.findOneAndUpdate(query, update, options, function (err, user1) {
          console.log(user1);
        });
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $inc: { basicusercounter: +1 } },
          { new: true }
        ).catch((errors) => res.json(errors));

        User.findOne({ _id: req.user.id }, function (err, user) {
          var projectid = user.projectid;

          Project.findOne({ _id: user.projectid }, function (err, project) {
            var applydate = Date.now();
            var expirydate = applydate + 3600000 * 24 * 7 * project.duration; //for  1 year
            var applydate1 = new Date(applydate).toISOString();
            var expirydate1 = new Date(expirydate).toISOString();
            new Internnexusproject({
              userid: req.user.id,
              username: user.username,
              email: user.email,
              phone: user.phone,
              projectid: projectid,
              projectname: project.name,
              technologyused: project.technologyused,
              level: project.level,
              duration: project.duration,
              fees: project.fees,
              fees: project.fees,
              projectbrief: project.projectbrief,
              pdflink: project.pdflink,
              applydate: applydate,
              expirydate: expirydate,
              applydate1: applydate1,
              expirydate1: expirydate1,
            }).save(function (err, Internnexusproject) {
              console.log(Internnexusproject);
            });
          }).catch((errors) => res.json(errors));
        }).catch((errors) => res.json(errors));
        res.redirect("../../users/dashboards");
      }
    }
  );
});

// router.get('/projectcomingsoon',isUser, function (req, res) {

// 	User.find(function(err,user)
// {

// 	res.render('projectcomingsoon',{title:'Project',User : user,email:req.user.email});

// });

// });
router.get("/progress/:id", isUser, function (req, res) {
  User.find(function (err, user) {
    Query.find(function (err, query) {
      res.render("progress", {
        title: "Query Is In Progress",
        User: user,
        email: req.user.email,
        Query: query,
      });
    });
  });
});
router.get("/projectprogress/:id", isUser, function (req, res) {
  query = { _id: req.params.id };
  User.find(function (err, user) {
    Projectquery.findOne(query, function (err, projectquery) {
      res.render("projectprogress", {
        title: "Project Query Is In Progress",
        User: user,
        email: req.user.email,
        projectquery: projectquery,
      });
    });
  });
});
router.get("/answer/:id", isUser, function (req, res) {
  var id = req.params.id;
  console.log(id);
  User.find(function (err, user) {
    Query.find(function (err, query) {
      res.render("answer", {
        title: "Query Solution",
        User: user,
        email: req.user.email,
        Query: query,
        id: id,
      });
    });
  });
});
router.get("/projectanswer/:id", isUser, function (req, res) {
  var id = req.params.id;
  console.log(id);
  User.find(function (err, user) {
    Projectquery.find(function (err, projectquery) {
      res.render("projectanswer", {
        title: "Project Query Solution",
        User: user,
        email: req.user.email,
        Projectquery: projectquery,
        id: id,
      });
    });
  });
});
router.post("/query", isUser, function (req, res) {
  var querycount = 1;
  User.findOne({ username: req.body.username }, function (err, user1) {
    if (user1.verifyyearly == "true" || user1.verifyhalfyearly == "true") {
      new Query({
        name: req.body.name,
        category: req.body.category,
        username: req.body.username,
        querycount: querycount,
      }).save(function (err, Query) {
        console.log(Query);
        res.redirect("/users/query");
      });
    }
    if (user1.verifyyearly == "false" && user1.verifyhalfyearly == "false") {
      User.findOneAndUpdate(
        { username: req.body.username },
        { $inc: { freequeryleft: -1 } },
        { new: true }
      ).catch((errors) => res.json(errors));

      User.findOne({ username: req.body.username }, function (err, user) {
        if (user.freequeryleft >= 0) {
          new Query({
            name: req.body.name,
            category: req.body.category,
            username: req.body.username,
            querycount: querycount,
          }).save(function (err, Query) {
            console.log(Query);
            res.redirect("/users/query");
          });
        }
        if (user.freequeryleft < 0) {
          res.send(`<h1>No Free Queries Left </h1>`);
        }
      });
    }
  });
});
router.get("/forum", isUser, function (req, res) {
  User.find(function (err, user) {
    Forum.find(function (err, forum) {
      // if ((req.user.verifyyearly=='true' || req.user.verifyhalfyearly=='true') && (req.user.verifyfree=='false'|| req.user.verifyfree=='true')){
      // 	res.render('forum',{title:'Form',User : user,email:req.user.email,Forum:forum});
      // 		}
      // 		if(req.user.verifyyearly=='false' && req.user.verifyhalfyearly=='false' && req.user.verifyfree=='true'){
      // 			res.render('coursefees',{title : 'Coursefees', User : user,email:req.user.email});
      // 		}
      res.render("forum", {
        title: "Form",
        User: user,
        email: req.user.email,
        Forum: forum,
      });
    });
  });
});
//Mobile Application
//router.post('/loginn',
// passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/login', failureFlash: true }),
// function(req, res) {
// 	res.json('success');

// 	passport.authenticate('local', { session: false }),
//   function(req, res) {
//     res.json('Success');

//   });

router.post(
  "/login",
  passport.authenticate("user", {
    successRedirect: "/users/dashboards", // redirect to the secure profile section
    failureRedirect: "/users/login", // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages;
  })
);
router.post(
  "/adminlogin",
  passport.authenticate("admin", {
    successRedirect: "/users/admin-dashboards", // redirect to the secure profile section
    failureRedirect: "/users/adminlogin", // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages;
  })
);
router.post(
  "/complogin",
  passport.authenticate("company", {
    successRedirect: "/users/compdashboards", // redirect to the secure profile section
    failureRedirect: "/users/complogin", // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages;
  })
);
router.get("/dashboards", isUser, function (req, res) {
  // res.json({message:'success' , name: req.user.name});
  User.find(function (err, user) {
    if (
      req.user.verifyfree == "true" ||
      req.user.verifyyearly == "true" ||
      req.user.verifyhalfyearly == "true"
    ) {
      res.render("dashboard", {
        title: "dashboard",
        User: user,
        email: req.user.email,
      });
    }
    if (
      req.user.verifyfree == "false" &&
      req.user.verifyyearly == "false" &&
      req.user.verifyhalfyearly == "false"
    ) {
      res.render("coursefeesall", {
        title: "Course Subscription",
        User: user,
        email: req.user.email,
      });
    }
  });
});
router.get("/suggestion", isUser, function (req, res) {
  User.find(function (err, user) {
    res.render("suggestion", {
      title: "Suggestion Form ",
      User: user,
      email: req.user.email,
    });
  });
});
router.post("/suggestion", isUser, function (req, res) {
  new Suggestion({
    review: req.body.review,
    rating: req.body.rating,
    username: req.body.username,
  }).save(function (err, Suggestion) {
    console.log(Suggestion);
    User.find(function (err, user) {
      res.render("suggestion-success", {
        title: "Suggestion Submitted Successfully",
        User: user,
        email: req.user.email,
        Suggestion: Suggestion,
      });
    });
  });
});
router.get("/report", isUser, function (req, res) {
  User.find(function (err, user) {
    res.render("report", {
      title: "Report Form ",
      User: user,
      email: req.user.email,
    });
  });
});
router.post("/report", isUser, function (req, res) {
  new Report({
    report: req.body.report,
    category: req.body.category,
    username: req.body.username,
  }).save(function (err, Report) {
    console.log(Report);
    User.find(function (err, user) {
      res.render("report-success", {
        title: "Report Submitted Successfully",
        User: user,
        email: req.user.email,
        Report: Report,
      });
    });
  });
});
router.get("/admin-dashboards", isAdmin, function (req, res) {
  Admin.find(function (err, admin) {
    res.render("admin-dashboard", {
      title: "dashboard",
      Admin: admin,
      email: req.user.email,
    });
  });
});
router.get("/compdashboards", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("compdashboard", {
      title: "dashboard",
      User: user,
      email: req.user.email,
    });
  });
});
// router.get('/comp-profile',isCompany, function (req, res) {
// 	res.render('comp-profile');
// });
router.get("/comp-profile/:id", isCompany, function (req, res) {
  // var query = {"_id": req.params.id};
  Comp.find(function (err, user) {
    console.log(user);
    res.render("comp-profile", {
      title: "University Profile",
      User: user,
      username: req.user.email,
    });
  });
});
router.post("/comp-profile/:id", isCompany, function (req, res) {
  // new Event({firstname : req.body.firstname, lastname : req.body.lastname, birthday : req.body.birthday,university : req.body.university, college : req.body.college,course:req.body.course,backlogs:req.body.backlogs,yeargap: req.body.yeargap,state:req.body.state,city:req.body.city}

  // 	)
  // 			.save(function(err, Event) {
  // 				console.log(Event)
  // 				res.redirect('/user');
  // 			});
  var query = { _id: req.params.id };

  // var flag='true';

  var update = {
    name: req.body.name,
    fullname: req.body.fullname,
    startdate: req.body.startdate,
    phone: req.body.phone,
    hrcontact: req.body.hrcontact,
    employeesno: req.body.employeesno,
    startdate: req.body.startdate,
    field: req.body.field,
    other: req.body.other,
    compadd: req.body.compadd,
    city: req.body.city,
  };
  var options = { new: true };
  Comp.findOneAndUpdate(query, update, options, function (err, user) {
    console.log(user);
    res.render("comp-profile", {
      title: "University Profile",
      User: user,
      username: req.user.email,
    });
  });
});
router.get("/comp-notes", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("comp-notes", {
      title: "University notes",
      User: user,
      email: req.user.email,
    });
  });
});

router.get("/comp-video", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("comp-video", {
      title: "University Videos",
      User: user,
      email: req.user.email,
    });
  });
});

router.get("/comp-pdf", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("comp-pdf", {
      title: "University Videos",
      User: user,
      email: req.user.email,
    });
  });
});

router.get("/comp-notification", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("comp-notification", {
      title: "University notifications",
      User: user,
      email: req.user.email,
    });
  });
});
router.get("/pending", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("pending", {
      title: "Status for your Student request is Pending  ",
      User: user,
      username: req.user.email,
    });
  });
});
router.get("/confirm", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("confirm", {
      title: "Status for your Student request is Confirmed ",
      User: user,
      username: req.user.email,
    });
  });
});
router.get("/denied", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("denied", {
      title: "Status for your Student request is Denied ",
      User: user,
      username: req.user.email,
    });
  });
});
router.get("/requestintern", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    Reqintern.find(function (err, reqintern) {
      res.render("requestintern", {
        title: "Request Student",
        User: user,
        username: req.user.email,
        Reqintern: reqintern,
        name: req.user.name,
      });
    });
  });
});
router.get("/companyinternupdate", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    Reqintern.find(function (err, reqintern) {
      res.render("companyinternupdate", {
        title: "Request Student",
        User: user,
        username: req.user.email,
        Reqintern: reqintern,
      });
    });
  });
});
router.get("/studel", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("studel", {
      title: "Student",
      User: user,
      email: req.user.email,
    });
  });
});
router.post("/requestintern", isCompany, function (req, res) {
  new Reqintern({
    number: req.body.number,
    duration: req.body.duration,
    phone: req.body.phone,
    hr: req.body.hr,
    interviewdate: req.body.interviewdate,
    interviewer: req.body.interviewer,
    year: req.body.year,
    AI: req.body.AI,
    gd: req.body.gd,
    market: req.body.market,
    cybersec: req.body.cybersec,
    webdjs: req.body.webdjs,
    webdph: req.body.webdph,
    webdpy: req.body.webdpy,
    id1: req.body.id1,
    id2: req.body.id2,
    id3: req.body.id3,
    id4: req.body.id4,
    id5: req.body.id5,
    id6: req.body.id6,
    id7: req.body.id7,
    postedby: req.body.postedby,
    emailaddress: req.body.emailaddress,
    contactno: req.body.contactno,
    companyname: req.body.companyname,
  }).save(function (err, Reqintern) {
    console.log(Reqintern);
    res.redirect("../users/requestintern");
  });
});
router.post("/companyinternupdate", isCompany, function (req, res) {
  new Reqintern({
    number: req.body.number,
    duration: req.body.duration,
    phone: req.body.phone,
    hr: req.body.hr,
    interviewdate: req.body.interviewdate,
    interviewer: req.body.interviewer,
    year: req.body.year,
    AI: req.body.AI,
    gd: req.body.gd,
    market: req.body.market,
    cybersec: req.body.cybersec,
    webdjs: req.body.webdjs,
    webdph: req.body.webdph,
    webdpy: req.body.webdpy,
    id1: req.body.id1,
    id2: req.body.id2,
    id3: req.body.id3,
    id4: req.body.id4,
    id5: req.body.id5,
    id6: req.body.id6,
    id7: req.body.id7,
    postedby: req.body.postedby,
    emailaddress: req.body.emailaddress,
    contactno: req.body.contactno,
    companyname: req.body.companyname,
  }).save(function (err, Reqintern) {
    console.log(Reqintern);
    res.redirect("../users/requestintern");
  });
});
router.get("/company-update-intern/:id", isCompany, function (req, res) {
  var id = req.params.id;
  Comp.find(function (err, user) {
    Reqintern.find(function (err, reqintern) {
      res.render("company-update-intern", {
        title: "Student Request Update ",
        Reqintern: reqintern,
        id: id,
        User: user,
        username: req.user.email,
      });
    });
  });
});
router.put("/company-update-intern/:id", isCompany, function (req, res) {
  var query = { _id: req.params.id };
  var update = {
    number: req.body.number,
    duration: req.body.duration,
    phone: req.body.phone,
    hr: req.body.hr,
    interviewdate: req.body.interviewdate,
    interviewer: req.body.interviewer,
    year: req.body.year,
    AI: req.body.AI,
    gd: req.body.gd,
    market: req.body.market,
    cybersec: req.body.cybersec,
    webdjs: req.body.webdjs,
    webdph: req.body.webdph,
    webdpy: req.body.webdpy,
    id1: req.body.id1,
    id2: req.body.id2,
    id3: req.body.id3,
    id4: req.body.id4,
    id5: req.body.id5,
    id6: req.body.id6,
    id7: req.body.id7,
    postedby: req.body.postedby,
    emailaddress: req.body.emailaddress,
    contactno: req.body.contactno,
    companyname: req.body.companyname,
  };
  var options = { new: true };
  Reqintern.findOneAndUpdate(query, update, options, function (err, reqintern) {
    console.log(reqintern);
    Comp.find(function (err, user) {
      res.render("company-update-intern-success", {
        title: "Student Request Update",
        User: user,
        username: req.user.email,
      });
    });
    // res.redirect('../users/requestintern');
  });
});
// router.put('/company-update-intern/:id', function (req, res) {

//   // var id =req.params.id;
//   var query = {"_id": req.params.id};
//   // var id= req.params.id;
//   var id = req.params.id;
//     var update = {number : req.body.number, duration : req.body.duration, phone : req.body.phone, hr : req.body.hr, interviewdate : req.body.interviewdate, interviewer : req.body.interviewer,
// 			year:req.body.year,AI : req.body.AI, gd : req.body.gd, market : req.body.market, cybersec : req.body.cybersec, webdjs : req.body.webdjs,
// 			webdph : req.body.webdph, webdpy : req.body.webdpy, id1 : req.body.id1, id2 : req.body.id2, id3 : req.body.id3, id4 : req.body.id4,
// 			id5 : req.body.id5, id6 : req.body.id6, id7 : req.body.id7, postedby : req.body.postedby, emailaddress : req.body.emailaddress, contactno : req.body.contactno};
//     var options = {new: true};
//     Reqintern.findOneAndUpdate(query, update, options, function(err, reqintern){
// 			console.log(reqintern);
// 			Comp.find(function(err,user){
//       res.render('company-update-intern-success',{title : 'Intern Request Update',User:user,username:req.user.email});
// 		});
// 	});
// });

router.get("/closeyourquery/:id", isCompany,function (req, res) {
  var id = req.params.id;
  Comp.find(function (err, user) {
    Reqintern.find(function (err, reqintern) {
      res.render("closeyourquery", {
        title: "Request For Closing Student Request ",
        Reqintern: reqintern,
        id: id,
        User: user,
        username: req.user.email,
      });
    });
  });
});
router.put("/closeyourquery/:id", isCompany, function (req, res) {
  // var id =req.params.id;
  var query = { _id: req.params.id };
  // var id= req.params.id;
  var id = req.params.id;
  var closequery = "true";
  var update = {
    closequerywhy: req.body.closequerywhy,
    closequery: closequery,
  };
  var options = { new: true };
  Reqintern.findOneAndUpdate(query, update, options, function (err, reqintern) {
    console.log(reqintern);
    Comp.find(function (err, user) {
      res.render("close-query-in-progress", {
        title: "Student Request Update",
        User: user,
        username: req.user.email,
      });
    });
  });
});
router.get("/close-query-in-progress", isCompany, function (req, res) {
  Comp.find(function (err, user) {
    res.render("close-query-in-progress", {
      title: "Close Query In Progress . ",
      User: user,
      username: req.user.email,
    });
  });
});
router.delete("/company-delete-intern/:id",isCompany, function (req, res) {
  // var id= req.params.id;
  var query = { _id: req.params.id };
  Reqintern.findOneAndRemove(query, function (err, reqintern) {
    console.log(reqintern);
    Comp.find(function (err, user) {
      res.render("company-delete-intern-success", {
        title: "Student Request Delete ",
        User: user,
        username: req.user.email,
      });
    });
  });
});
router.get("/moreintern/:id", isCompany,function (req, res) {
  var id = req.params.id;
  Comp.find(function (err, user) {
    Reqintern.find(function (err, reqintern) {
      res.render("moreintern", {
        title: "Student Request Record ",
        Reqintern: reqintern,
        id: id,
        User: user,
        username: req.user.email,
      });
    });
  });
});
router.get("/failurejson", function (req, res) {
  res.json({ message: "failure" });
});

router.post(
  "/log",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect("/");
  }
);

//   router.post('/logt',
//   passport.authenticate('local'),
//   function (req, res) {
// 	  res.json('Log Out Successfully');
// });

// router.get('/logout', function (req, res) {
// 	req.logout();

// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('/users/login');
// });

// router.get('/logout', function (req, res){
// 	req.logout();
// 	// req.session.destroy(function (err) {
// 	// 	res.clearCookie('connect.sid');
// 	  res.redirect('/users/login'); //Inside a callback… bulletproof!
// 	// });
//   });

router.get("/logout", isUser, function (req, res) {
  if (req.isAuthenticated()) {
    req.logOut();
    return res.redirect("/users/login"); // Handle valid logout
  }

  return res.status(401); // Handle unauthenticated response
});
router.get("/logoutadmin", isAdmin, function (req, res) {
  if (req.isAuthenticated()) {
    req.logOut();
    return res.redirect("/users/adminlogin"); // Handle valid logout
  }

  return res.status(401); // Handle unauthenticated response
});
router.get("/logoutcomp", isCompany, function (req, res) {
  if (req.isAuthenticated()) {
    req.logOut();
    return res.redirect("/users/complogin"); // Handle valid logout
  }

  return res.status(401); // Handle unauthenticated response
});

router.get("/logt", function (req, res) {
  req.logOut();

  //req.flash('success_msg', 'You are logged out');

  res.json("Log Out Successfully");
});

module.exports = router;
