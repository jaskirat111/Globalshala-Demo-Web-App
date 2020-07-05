var express = require("express");
var router = express.Router();
var passport = require("passport");
var bodyParser = require("body-parser");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
// Load configuration from .env file
// require('dotenv').config();
require("dotenv").config();
var Comp = require("../models/comp");
var Requestintern = require("../models/requestintern");
// var xoauth2 = require('xoauth2');
var bcrypt = require("bcrypt-nodejs");
var async = require("async");
var crypto = require("crypto");
const config = require("../config/database");
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
require("../models/events");
var mongoose = require("mongoose");
var Note = mongoose.model("Notes");
var Pdf = mongoose.model("Pdfs");
var Event = mongoose.model("Events");

// var messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);
// Register

// router.get('/compregister', function (req, res) {
// 	res.render('compregister', {comp:req.comp});
// });
// router.get('/profile', function (req, res) {
// 	res.render('profile');
// });

// router.get('/tables', function (req, res) {
// 	Event.find(function(err,Events)
// 	{
// 		res.render('tables',{title:'Events',Events:Events});
// 	});

// });
// router.get('/notes', function (req, res) {
// 	Note.find(function(err,Notes)
// 	{
// 		res.render('notes',{title:'Events',Notes:Notes});
// 	});

// });
// router.get('/typography', function (req, res) {
// 	res.render('typography');
// });
// router.get('/icons', function (req, res) {
// 	res.render('icons');
// });
// router.get('/notifications', function (req, res) {
// 	res.render('notifications');
// });

// // router.get('/compdashboard', function (req, res) {
// // 	res.render('compdashboard');
// // });

// router.get('/comp-profile', function (req, res) {
// 	res.render('comp-profile');
// });

// router.get('/comp-notes', function (req, res) {
// 	res.render('comp-notes');
// });

// router.get('/comp-video', function (req, res) {
// 	res.render('comp-video');
// });

// router.get('/comp-pdf', function (req, res) {
// 	res.render('comp-pdf');
// });

// router.get('/comp-notification', function (req, res) {
// 	res.render('comp-notification');
// });

// router.get('/requestintern', function (req, res) {
// 	res.render('requestintern');
// });
// router.get('/complogin', function (req, res) {
// 	res.render('complogin',{comp:req.comp});
// });

// router.post('/compregister', function (req, res) {
//     const name = req.body.name;
//     // const username = req.body.username;
//     const email = req.body.email;
//     // const gender = req.body.gender;
//     // const birthday = req.body.birthday;
//     const phone = req.body.phone;
//     //const subject = req.body.subject;
//     const password = req.body.password;
//       const password2 = req.body.password2;
//       // const Cybersecurity=req.body.{"not_checked":"false","checked":"true"};

//       // if(req.body.ArtificialIntelligence){
//       // 	var ArtificialIntelligence =req.body.ArtificialIntelligence;
//       // };
//       // if(req.body.ArtificialIntelligence0){
//       // 	var ArtificialIntelligence =req.body.ArtificialIntelligence0;
//       // };
//       // if(req.body.GraphicDesign){
//       // 	var GraphicDesign =req.body.GraphicDesign;
//       // };
//       // if(req.body.GraphicDesign0){
//       // 	var GraphicDesign =req.body.GraphicDesign0;
//       // };
//       // if(req.body.Marketing){
//       // 	var Marketing =req.body.Marketing;
//       // };
//       // if(req.body.Marketing){
//       // 	var Marketing =req.body.Marketing0;
//       // };

//       // if(req.body.Cybersecurity){
//       // 	var Cybersecurity =req.body.Cybersecurity;
//       // };
//       // if(req.body.Cybersecurity0){
//       // 	var Cybersecurity =req.body.Cybersecurity0;
//       // };
//       // if(req.body.WebDevelopmentJavascript){
//       // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript;
//       // };
//       // if(req.body.WebDevelopmentJavascript0){
//       // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript0;
//       // };
//       // if(req.body.WebDevelopmentPHP){
//       // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP;
//       // };
//       // if(req.body.WebDevelopmentPHP0){
//       // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP0;
//       // };
//       // if(req.body.WebDevelopmentPython){
//       // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
//       // };
//       // if(req.body.WebDevelopmentPython){
//       // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
//       // };
//       // var amenities = req.body.amenities;
//       // Validation
//     req.checkBody('name', 'Name is required').notEmpty();
//     req.checkBody('email', 'Email is required').notEmpty();
//     //req.checkBody('subject', 'Subject is required').notEmpty();
//     req.checkBody('phone', 'Phone Number is required').notEmpty();
//     // req.checkBody('username', 'Last Name is required').notEmpty();
//     // req.checkBody('gender', 'Gender is required').notEmpty();
//     // req.checkBody('birthday', 'Birtday is required').notEmpty();
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
//       // req.checkBody('category', 'Passwords do not match').notEmpty();

//       // console.log(phone);
//       var errors = req.validationErrors();

//       if (errors) {
//           res.render('compregister', {
//               errors: errors
//           });
//       }
//       else {
//           //checking for email and username are already taken
//       // 	User.findOne({ username: {
//       // 		"$regex": "^" + username + "\\b", "$options": "i"
//       // }}, function (err, user) {
//               Comp.findOne({ email: {
//                   "$regex": "^" + email + "\\b", "$options": "i"
//           }}, function (err, mail) {
//                   if (mail) {
//                       res.send(`<h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered mail id</h1>`);
//                   }
//                   else {

//                       var newComp = new Comp({
//               name:name,
//                     // birthday:birthday,
//                     // gender:gender,

//                   //   subject:subject,
//                           email:email,
//                           phone:phone,
//                         password:password,
//                     // username:username,
//                           password2:password2,
//                           // ArtificialIntelligence:ArtificialIntelligence,
//                           // GraphicDesign:GraphicDesign,
//                           // Marketing:Marketing,
//                           // Cybersecurity:Cybersecurity,
//                           // WebDevelopmentJavascript:WebDevelopmentJavascript,
//                           // WebDevelopmentPHP:WebDevelopmentPHP,
//                           // WebDevelopmentPython:WebDevelopmentPython
//                           // Cybersecurity1:Cybersecurity1
//                       });
//                       Comp.createUser(newComp, function (err, comp) {
//                           if (err) throw err;
//                           console.log(comp);
//                       });
//                        req.flash('success_msg', 'You are registered and can now login');
//                   // 	 messagebird.verify.create(phone, {
//                   // 		originator : 'Code',
//                   // 		template : 'Your verification code is %token.'
//                   // }, function (err, response) {
//                   // 		if (err) {
//                   // 				// Request has failed
//                   // 				console.log(err);
//                   // 				res.render('register', {
//                   // 						error : err.errors[0].description
//                   // 				});
//                   // 		} else {
//                   // 				// Request was successful
//                   // 				console.log(response);
//                   // 				res.render('login', {
//                   // 						id : response.id
//                   // 				});
//                   // 		}
//                   // })
//                       // res.redirect('/users/login');

//                       console.log(phone);
//     nexmo.verify.request({
//       number: phone,
//       brand: BRAND_NAME
//     }, (err, result) => {
//       if (err) {
//         //res.sendStatus(500);
//         res.render('compregister', {
//           message: 'Server Error'
//         });
//       } else {
//         console.log(result);
//         let requestId = result.request_id;
//         if (result.status == '0') {
//           res.render('verify1', {
//             requestId: requestId
//           });
//         } else {
//           //res.status(401).send(result.error_text);
//           res.render('compregister', {
//             message: result.error_text,
//             requestId: requestId
//           });
//         }
//       }
//     });
//           }
//         }
//       )
//       }
//   });

// router.post('/verify1', (req, res) => {
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
//         res.render('complogin', {
//           message: 'Account verified! 🎉'
//         });
//       } else {
//         //res.status(401).send(result.error_text);
//         res.render('verify1', {
//           message: result.error_text,
//           requestId: requestId
//         });
//       }
//     }
//   });
// });

//Mobile Application
// router.post('/compregisterr', function (req, res) {
// const name = req.body.name;
// // const username = req.body.username;
// const email = req.body.email;
// // const gender = req.body.gender;
// // const birthday = req.body.birthday;
// const phone = req.body.phone;
// //const subject = req.body.subject;
// const password = req.body.password;
// const password2 = req.body.password2;

//   // Validation
// req.checkBody('name', 'Name is required').notEmpty();
// var errorss = req.validationErrors();

//   if (errorss) {
// 	  res.json({
// 		  errorss: errorss
// 	  });
//   }
// req.checkBody('email', 'Email is required').notEmpty();
// var errorss = req.validationErrors();

//   if (errorss) {
// 	  res.json('Validation Error', {
// 		  errorss: errorss
// 	  });
//   }
// //req.checkBody('subject', 'Subject is required').notEmpty();
// req.checkBody('phone', 'Phone Number is required').notEmpty();
// var errorss = req.validationErrors();

//   if (errorss) {
// 	  res.json('Validation Error', {
// 		  errorss: errorss
// 	  });
//   }
// // req.checkBody('username', 'Last Name is required').notEmpty();
// // var errorss = req.validationErrors();

// //   if (errorss) {
// // 	  res.json('Validation Error', {
// // 		  errorss: errorss
// // 	  });
// //   }
// // req.checkBody('gender', 'Gender is required').notEmpty();
// // var errorss = req.validationErrors();

// //   if (errorss) {
// // 	  res.json('Validation Error', {
// // 		  errorss: errorss
// // 	  });
// //   }
// // req.checkBody('birthday', 'Birtday is required').notEmpty();
// // var errorss = req.validationErrors();

// //   if (errorss) {
// // 	  res.json('Validation Error', {
// // 		  errorss: errorss
// // 	  });
// //   }
// req.checkBody('password', 'Password is required').notEmpty();
// var errorss = req.validationErrors();

//   if (errorss) {
// 	  res.json('Validation Error', {
// 		  errorss: errorss
// 	  });
//   }
// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

//   var errorss = req.validationErrors();

//   if (errorss) {
// 	  res.json('Validation Error', {
// 		  errorss: errorss
// 	  });
//   }
//   else {
// 	  //checking for email and username are already taken
// 	//   User.findOne({ username: {
// 	// 	  "$regex": "^" + username + "\\b", "$options": "i"
//   // }}, function (err, user) {
// 		  User.findOne({ email: {
// 			  "$regex": "^" + email + "\\b", "$options": "i"
// 	  }}, function (err, mail) {
// 			  if (mail) {
// 				//   res.send(`<h1 style="text-align:center; margin-top: 400px; background-color:black; color:red;">Already Registered mail id or Username</h1>`);
// 				  res.json('Already Registered mail id');
// 			  }
// 			  else {
// 				  var newUser = new User({
// 		  name:name,
// 				// birthday:birthday,
// 				// gender:gender,
// 				phone:phone,
// 				// subject:subject,
// 				email:email,
// 				password:password,
// 				// username:username,
// 				password2:password2
// 				  });
// 				  User.createUser(newUser, function (err, user) {
// 					  if (err) throw err;
// 					  console.log(user);
// 				  });
// 		   req.flash('success_msg', 'You are registered and can now login');
// 				  res.json('Register Successfully');
//         }
//       }
//       )
//   }
// });

//End Mobile Application
// passport.use('company',new LocalStrategy(
// 	function (email, password, done) {
// 		Comp.getUserByUsername(email, function (err, comp) {
// 			if (err) throw err;
// 			if (!comp) {
// 				return done(null, false, { message: 'Unknown User' });
// 			}

// 			Comp.comparePassword(password, comp.password, function (err, isMatch) {
// 				if (err) throw err;
// 				if (isMatch) {
// 					return done(null, comp);
// 				} else {
// 					return done(null, false, { message: 'Invalid password' });
// 				}
// 			});
// 		});
// 	}));

// passport.serializeUser(function (comp, done) {
// 	done(null, comp.id);
// });

// passport.deserializeUser(function (id, done) {
// 	Comp.getUserById(id, function (err, comp) {
// 		done(err, comp);
// 	});
// });
// function ensureAuthenticated(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/company/complogin');
//   }
// }
// Verify whether the token is correct
// router.post('/comploginn',passport.authenticate('local', { successRedirect: '/company/compdashboard', failureRedirect: '/company/complogin', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/company/compdashboard',{name:req.comp.email});
// });
// router.get('/compdashboard',ensureAuthenticated, function (req, res) {

// 	// User.find({},function(err, allcampgrounds){
// 	// 	if(err){
// 	// 		console.log(err);
// 	// 	} else{
// 	// 		res.render('dashboard',{title : 'Dashboard', user : allcampgrounds,currentUser: req.user});
// 	// 	}
// 	// });
// 	// res.render('dashboard', { title: 'Dashboard'});
// 	Comp.find(function(err, comp){

//     res.render('compdashboard',{title : 'dashboard', Comp : comp,name:req.comp.email});
//   });

// });

//Mobile Application
// router.post('/loginn',
// passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/login', failureFlash: true }),
// function(req, res) {
// 	res.json('success');

// 	passport.authenticate('local', { session: false }),
//   function(req, res) {
//     res.json('Success');

//   });
// function ensureOnlyUser(req, res, next) {
//   if (req.comp) { return next(); }
//   else {
//           req.flash('error_msg', 'Please log in to view that resource');
//           res.redirect('/company/complogin');
//         }
// }
// router.post('/complogin', passport.authenticate('company', {
//     successRedirect : '/company/compdashboards', // redirect to the secure profile section
//     failureRedirect : '/company/complogin', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages;
// }));

// router.get('/compdashboards', function(req, res) {
//     res.render('compdashboard');
// });

// router.get('/failurejson', function(req, res) {
//     res.json({message:'failure'});
// });

//   router.post('/log',
// 	passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/login', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/');
//   });

//   router.post('/logt',
//   passport.authenticate('local'),
//   function (req, res) {
// 	  res.json('Log Out Successfully');
// });

// router.get('/logout', function (req, res) {
// 	req.logout();

// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('/company/login');
// });

// router.get('/logt', function (req, res) {
// 	req.logout();

// 	//req.flash('success_msg', 'You are logged out');

// 	res.json('Log Out Successfully');
// });

// router.post('/requestintern', function(req, res) {
// 	new Requestintern({number : req.body.number, duration : req.body.duration, phone : req.body.phone, hr : req.body.hr, interviewdate : req.body.interviewdate, interviewer : req.body.interviewer,
// 		 AI : req.body.AI, gd : req.body.gd, market : req.body.market, cybersec : req.body.cybersec, webdjs : req.body.webdjs,
// 		 webdph : req.body.webdph, webdpy : req.body.webdpy, id1 : req.body.id1, id2 : req.body.id2, id3 : req.body.id3, id4 : req.body.id4,
// 		 id5 : req.body.id5, id6 : req.body.id6, id7 : req.body.id7, add : req.body.add, state : req.body.state, city : req.body.city,}

// )
// 	.save(function(err, Requestintern) {
// 		console.log(Requestintern)
// 		res.redirect('/company/requestintern');
// 	});
// });

module.exports = router;
