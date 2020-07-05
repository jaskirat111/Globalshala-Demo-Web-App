var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// require('../config/passport')(passport)
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override')
var mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
var async = require('async');
var crypto = require('crypto');
const config = require('../config/database');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Nexmo = require('nexmo');
const BRAND_NAME = process.env.NEXMO_BRAND_NAME;
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const nexmo = new Nexmo({
  apiKey: '08bc89c4',
  apiSecret: 'D7nhE3URsHSGUf5E'
});
// let User = require('../models/user');
// let User1 = require('../models/user1');
let Admin = require('../models/admin');
/* GET home page. */
require('../models/events');
require('../models/query');
require('../models/project');

var mongoose = require('mongoose');
var Event = mongoose.model('Events');
var Query = mongoose.model('Query');
var Project = mongoose.model('Project');




router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(methodOverride('_method'));

router.get('/', function(req, res, next) {
  Event.find(function(err,Events){
  res.render('index', { title: 'Internship',Events:Events });
  });
});
router.get('/tnc', function(req, res, next) {
  res.render('tnc', { title: 'Internship' });
});
router.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'Internship' });
});

router.get('/resume', function(req, res, next) {
	res.render('resume');
  });

  router.get('/eventshome',  function(req, res) {
    Event.find(function(err, Events){
      console.log(Events)
      res.render(
        'eventshome',
        {title : 'Internexus', Events : Events}
      );
    });
  });


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'Register' });
// });
// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// router.get('/auth/google/callback',passport.authenticate('google', { successRedirect: '/',failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Login' });
// });
// router.get('/admin-dashboard',ensureAuthenticated, function (req, res) {
//   res.render('admin-dashboard');
// });

router.get('/admin-notes', function (req, res) {
  res.render('admin-notes');
});
router.get('/admin-notes-test', function (req, res) {
  res.render('admin-notes-test');
});

router.get('/admin-pdf', function (req, res) {
  res.render('admin-pdf');
});

router.get('/admin-pdf-test', function (req, res) {
  res.render('admin-pdf-test');
});

router.get('/admin-events', function (req, res) {
  res.render('admin-events');
});

router.get('/admin-events-test', function (req, res) {
  res.render('admin-events-test');
});

router.get('/admin-certificate', function (req, res) {
  res.render('admin-certificate');
});

router.get('/admin-resume', function (req, res) {
  res.render('admin-resume');
});

router.get('/admin-blog', function (req, res) {
  res.render('admin-blog');
});
router.get('/admin-forum', function (req, res) {
  res.render('admin-forum');
});
router.get('/admin-query', function (req, res) {
  Query.find(function(err,query)
	{
		res.render('admin-query',{title:'User Queries',Query:query});
	});
  
});
router.get('/admin-project', function (req, res) {
  
	
		res.render('admin-project',{title:'Admin Project'});

  
});
router.get('/admin-query-answer/:id', function (req, res) {
  var id= req.params.id;
  Query.find(function(err,query)
	{
		res.render('admin-query-answer',{title:'Query Answer',Query:query,id:id});
	});
  
});
router.post('/admin-query-answer/:id', function (req, res) {
  var reviewcount=1;
  // var id =req.params.id;
  var query = {"_id": req.params.id};
  // var id= req.params.id;

    var update = {answer : req.body.answer,reviewcount:reviewcount};
    var options = {new: true};
    Query.findOneAndUpdate(query, update, options, function(err, queries){
      console.log(queries);
      res.render('admin-query-answer',{title : 'User Queries',Query:queries});
    });  
});
// router.get('/adminregister', function (req, res) {
// 	res.render('adminregister',{admin:req.admin});
// });
// router.get('/adminlogin', function (req, res) {
// 	res.render('adminlogin',{admin:req.admin});
// });
// router.post('/adminregister', function (req, res) {
//   const name = req.body.name;
//   // const username = req.body.username;
//   const email = req.body.email;
//   // const gender = req.body.gender;
//   // const birthday = req.body.birthday;
//   const phone = req.body.phone;
//   //const subject = req.body.subject;
//   const password = req.body.password;
//     const password2 = req.body.password2;
//     // const Cybersecurity=req.body.{"not_checked":"false","checked":"true"};
    
//     // if(req.body.ArtificialIntelligence){
//     // 	var ArtificialIntelligence =req.body.ArtificialIntelligence;
//     // };
//     // if(req.body.ArtificialIntelligence0){
//     // 	var ArtificialIntelligence =req.body.ArtificialIntelligence0;
//     // };
//     // if(req.body.GraphicDesign){
//     // 	var GraphicDesign =req.body.GraphicDesign;
//     // };
//     // if(req.body.GraphicDesign0){
//     // 	var GraphicDesign =req.body.GraphicDesign0;
//     // };
//     // if(req.body.Marketing){
//     // 	var Marketing =req.body.Marketing;
//     // };
//     // if(req.body.Marketing){
//     // 	var Marketing =req.body.Marketing0;
//     // };
    
//     // if(req.body.Cybersecurity){
//     // 	var Cybersecurity =req.body.Cybersecurity;
//     // };
//     // if(req.body.Cybersecurity0){
//     // 	var Cybersecurity =req.body.Cybersecurity0;
//     // };
//     // if(req.body.WebDevelopmentJavascript){
//     // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript;
//     // };
//     // if(req.body.WebDevelopmentJavascript0){
//     // 	var WebDevelopmentJavascript =req.body.WebDevelopmentJavascript0;
//     // };
//     // if(req.body.WebDevelopmentPHP){
//     // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP;
//     // };
//     // if(req.body.WebDevelopmentPHP0){
//     // 	var WebDevelopmentPHP =req.body.WebDevelopmentPHP0;
//     // };
//     // if(req.body.WebDevelopmentPython){
//     // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
//     // };
//     // if(req.body.WebDevelopmentPython){
//     // 	var WebDevelopmentPython =req.body.WebDevelopmentPython;
//     // };
//     // var amenities = req.body.amenities;
//     // Validation
//   req.checkBody('name', 'Name is required').notEmpty();
//   req.checkBody('email', 'Email is required').notEmpty();
//   //req.checkBody('subject', 'Subject is required').notEmpty();
//   req.checkBody('phone', 'Phone Number is required').notEmpty();
//   // req.checkBody('username', 'Last Name is required').notEmpty();
//   // req.checkBody('gender', 'Gender is required').notEmpty();
//   // req.checkBody('birthday', 'Birtday is required').notEmpty();
//   req.checkBody('password', 'Password is required').notEmpty();
//   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
//     // req.checkBody('category', 'Passwords do not match').notEmpty();

//     // console.log(phone);
//     var errors = req.validationErrors();

//     if (errors) {
//         res.render('adminregister', {
//             errors: errors
//         });
//     }
//     else {
//         //checking for email and username are already taken
//     // 	User.findOne({ username: { 
//     // 		"$regex": "^" + username + "\\b", "$options": "i"
//     // }}, function (err, user) {
//             Admin.findOne({ email: { 
//                 "$regex": "^" + email + "\\b", "$options": "i"
//         }}, function (err, mail) {
//                 if (mail) {
//                     res.send(`<h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Already Registered mail id</h1>`);
//                 }
//                 else {
                    
//                     var newAdmin = new Admin({
//             name:name,
//                   // birthday:birthday,
//                   // gender:gender,
                  
//                 //   subject:subject,
//                         email:email,
//                         phone:phone,
//                       password:password,
//                   // username:username,
//                         password2:password2,
//                         // ArtificialIntelligence:ArtificialIntelligence,
//                         // GraphicDesign:GraphicDesign,
//                         // Marketing:Marketing,
//                         // Cybersecurity:Cybersecurity,
//                         // WebDevelopmentJavascript:WebDevelopmentJavascript,
//                         // WebDevelopmentPHP:WebDevelopmentPHP,
//                         // WebDevelopmentPython:WebDevelopmentPython
//                         // Cybersecurity1:Cybersecurity1
//                     });
//                     Admin.createUser(newAdmin, function (err, admin) {
//                         if (err) throw err;
//                         console.log(admin);
//                     });
//                      req.flash('success_msg', 'You are registered and can now login');
//                 // 	 messagebird.verify.create(phone, {
//                 // 		originator : 'Code',
//                 // 		template : 'Your verification code is %token.'
//                 // }, function (err, response) {
//                 // 		if (err) {
//                 // 				// Request has failed
//                 // 				console.log(err);
//                 // 				res.render('register', {
//                 // 						error : err.errors[0].description
//                 // 				});
//                 // 		} else {
//                 // 				// Request was successful
//                 // 				console.log(response);
//                 // 				res.render('login', {
//                 // 						id : response.id
//                 // 				});
//                 // 		}
//                 // })    
//                     // res.redirect('/users/login');
                    
//                     console.log(phone);
//   nexmo.verify.request({
//     number: phone,
//     brand: BRAND_NAME
//   }, (err, result) => {
//     if (err) {
//       //res.sendStatus(500);
//       res.render('adminregister', {
//         message: 'Server Error'
//       });
//     } else {
//       console.log(result);
//       let requestId = result.request_id;
//       if (result.status == '0') {
//         res.render('verify2', {
//           requestId: requestId
//         });
//       } else {
//         //res.status(401).send(result.error_text);
//         res.render('adminregister', {
//           message: result.error_text,
//           requestId: requestId
//         });
//       }
//     }
//   });
//         }
//       }
//     )
//     }
// });
// router.post('/verify2', (req, res) => {
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
//         res.render('adminlogin', {
//           message: 'Account verified! 🎉'
//         });
//       } else {
//         //res.status(401).send(result.error_text);
//         res.render('verify2', {
//           message: result.error_text,
//           requestId: requestId
//         });
//       }
//     }
//   });
// });
// passport.use('admin',new LocalStrategy(
// 	function (email, password, done) {
// 		Admin.getUserByUsername(email, function (err, admin) {
// 			if (err) throw err;
// 			if (!admin) {
// 				return done(null, false, { message: 'Unknown User' });
// 			}

// 			Admin.comparePassword(password, admin.password, function (err, isMatch) {
// 				if (err) throw err;
// 				if (isMatch) {
// 					return done(null, admin);
// 				} else {
// 					return done(null, false, { message: 'Invalid password' });
// 				}
// 			});
// 		});
// 	}));

// passport.serializeUser(function (admin, done) {
// 	done(null, admin.id);
// });

// passport.deserializeUser(function (id, done) {
// 	Admin.getUserById(id, function (err, admin) {
// 		done(err, admin);
// 	});
// });
// function ensureAuthenticated(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//     req.flash('danger', 'Please login');
//     res.redirect('/adminauth/adminlogin');
//   }
// }
// function ensureAuthenticated(req, res, next){
//   // if(req.isAuthenticated()){
//   //   return next();
//   // }
//   Admin.find(function(err, admin){
//     if(admin.verify == 'true'){
//         return next();
//        }
//       if (admin.verify =='false'){
//         req.flash('danger', 'Please login');
//         res.redirect('/adminauth/adminlogin');
//       }
//   });
   
// }
// function ensureOnlyUser(req, res, next) {
//     if (req.admin) { return next(); }
//     else {
//             req.flash('error_msg', 'Please log in to view that resource');
//             res.redirect('/adminauth/adminlogin');
//           }
//   }
// router.post('/adminlogin', passport.authenticate('admin', {
//   successRedirect : '/adminauth/admin-dashboards', // redirect to the secure profile section
//   failureRedirect : '/adminauth/adminlogin', // redirect back to the signup page if there is an error
//   failureFlash : true // allow flash messages;
// }));

// router.get('/admin-dashboards', function(req, res) {
//   // Admin.find(function(err, admin){
//   //   admin.verify = 'true';
   
//   //      };
//   // Admin.find(function(err, admin){
//   //   var id =req.admin.id;
//   // var query = {"_id": id}; 
//   //   var verify ='true';
//   //   var update = {verify:verify};
//   //   var options = {new: true};
//   //   Admin.findOneAndUpdate(query, update, options, function(err, admin){
//   //     console.log(admin)
//   //     res.render(
//   //       'admin-dashboard',{title : 'Profile', Admin : admin});
//   //   });
//   // });
//   Admin.find(function(err, admin){
//     if (req.admin.verify=='true')
//   {
//     res.render('admin-dashboard',{title : 'dashboard', Admin :admin});
//   }
//   if (req.admin.verify=='false'){
//     res.send(`<h1>Failed to login</h1>`);
//   }
    
//   });
  
// });
// router.get('/logout', function (req, res) {
// 	req.logout();

// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('adminlogin');
// });

// router.get('/logt', function (req, res) {
// 	req.logout();

// 	//req.flash('success_msg', 'You are logged out');

// 	res.json('Log Out Successfully');
// });

module.exports = router;
