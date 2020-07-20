var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// require('../config/passport')(passport)
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
var methodOverride = require("method-override");
var mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
var async = require("async");
var crypto = require("crypto");
const config = require("../config/database");
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Nexmo = require("nexmo");
const BRAND_NAME = process.env.NEXMO_BRAND_NAME;
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const nexmo = new Nexmo({
  apiKey: "08bc89c4",
  apiSecret: "D7nhE3URsHSGUf5E",
});
// let User = require('../models/user');
// let User1 = require('../models/user1');
let Admin = require("../models/admin");
/* GET home page. */
require("../models/events");
require("../models/query");
require("../models/projectquery");
require("../models/project");
require("../models/reqintern");
require("../models/images");
require("../models/program");
require("../models/suggestion");
require("../models/report");
require("../models/internnexusproject");
var mongoose = require("mongoose");
var Event = mongoose.model("Events");
var Query = mongoose.model("Query");
var Projectquery = mongoose.model("Projectquery");
var Project = mongoose.model("Project");
var Reqintern = mongoose.model("Reqintern");
var Internnexusproject = mongoose.model("Internnexusproject");
var Images = mongoose.model("Images");
var Suggestion = mongoose.model("Suggestion");
var Program = mongoose.model("Program");
var Report = mongoose.model("Report");

router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(methodOverride("_method"));

router.get("/", function (req, res, next) {
  Event.find(function (err, Events) {
    res.render("index", { title: "Admission in University", Events: Events });
  });
});

router.get("/blog", function (req, res, next) {
  res.render("blog");
});

router.get("/startupindex", function (req, res, next) {
  Event.find(function (err, Events) {
    res.render("startupindex", {
      title: "Admission in University",
      Events: Events,
    });
  });
});

router.get("/startupindex1", function (req, res, next) {
  Event.find(function (err, Events) {
    res.render("startupindex1", {
      title: "Admission in University",
      Events: Events,
    });
  });
});
router.get("/tnc", function (req, res, next) {
  res.render("tnc", { title: "Admission in University" });
});
router.get("/aboutus", function (req, res, next) {
  res.render("aboutus", { title: "Admission in University" });
});

// router.get('/resume', function(req, res, next) {
// 	res.render('resume');
//   });

router.get("/eventshome", function (req, res) {
  Event.find(function (err, Events) {
    console.log(Events);
    Images.find(function (err, image) {
      res.render("eventshome", {
        title: "Globalshala",
        Events: Events,
        Images: image,
      });
    });
  });
});
router.get("/galleryhome", function (req, res) {
  Program.find(function (err, program) {
    res.render("galleryhome", { title: "Gallery", Program: program });
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
router.get("/admin-notes", isAdmin, function (req, res) {
  res.render("admin-notes");
});
router.get("/admin-dashboard", isAdmin, function (req, res) {
  res.render("admin-dashboard");
});
router.get("/admin-notes-test", isAdmin, function (req, res) {
  res.render("admin-notes-test");
});

router.get("/admin-pdf", isAdmin, function (req, res) {
  res.render("admin-pdf");
});

router.get("/admin-pdf-test", isAdmin, function (req, res) {
  res.render("admin-pdf-test");
});

router.get("/admin-events", isAdmin, function (req, res) {
  Event.find(function (err, event) {
    res.render("admin-events", { title: "Admin Event", Event: event });
  });
});
router.get("/admin-suggestion", isAdmin, function (req, res) {
  Suggestion.find(function (err, suggestion) {
    res.render("admin-suggestion", {
      title: "User Suggestion",
      Suggestion: suggestion,
    });
  });
});
router.get("/admin-report", isAdmin, function (req, res) {
  Report.find(function (err, report) {
    res.render("admin-report", { title: "User Reports", Report: report });
  });
});
router.get("/admin-gallery-program", isAdmin, function (req, res) {
  Program.find(function (err, program) {
    res.render("admin-gallery-program", {
      title: "Admin Gallery Program",
      Program: program,
    });
  });
});
router.get("/images", isAdmin, function (req, res) {
  res.render("images", { title: "Image Upload" });
});
router.get("/internrequestrecord", isAdmin, function (req, res) {
  Reqintern.find(function (err, reqintern) {
    res.render("internrequestrecord", {
      title: "Student Request Record",
      Reqintern: reqintern,
    });
  });
});
router.get("/admin-query-status/:id", isAdmin, function (req, res) {
  var id = req.params.id;

  Reqintern.find(function (err, reqintern) {
    res.render("admin-query-status", {
      title: "Employee Response to the Student Request ",
      Reqintern: reqintern,
      id: id,
    });
  });
});
router.put("/admin-query-status/:id", isAdmin, function (req, res) {
  // var id =req.params.id;
  var query = { _id: req.params.id };
  // var id= req.params.id;
  var id = req.params.id;
  if (req.body.statusreason == "1") {
    var status = "confirm";
  }
  if (req.body.statusreason == "2") {
    var status = "denied";
  }
  var update = { statusreason: req.body.statusreason, status: status };
  var options = { new: true };
  Reqintern.findOneAndUpdate(query, update, options, function (err, reqintern) {
    console.log(reqintern);

    res.render("admin-query-status-update", {
      title: "Employee Successfully Changed the Status",
      reqintern,
    });
  });
});

router.get("/admin-query-confirmed/:id", isAdmin, function (req, res) {
  var id = req.params.id;

  Reqintern.find(function (err, reqintern) {
    res.render("admin-query-confirmed", {
      title: "Employee Confirmed the Student Request ",
      Reqintern: reqintern,
      id: id,
    });
  });
});
router.get("/admin-query-denied/:id", isAdmin, function (req, res) {
  var id = req.params.id;

  Reqintern.find(function (err, reqintern) {
    res.render("admin-query-denied", {
      title: "Employee Denied the Student Request ",
      Reqintern: reqintern,
      id: id,
    });
  });
});

router.get("/admin-query-close/:id", isAdmin, function (req, res) {
  var id = req.params.id;

  Reqintern.find(function (err, reqintern) {
    res.render("admin-query-close", {
      title: "University Request to close the Query  ",
      Reqintern: reqintern,
      id: id,
    });
  });
});

router.get("/moreintern1/:id", isAdmin, function (req, res) {
  var id = req.params.id;

  Reqintern.find(function (err, reqintern) {
    res.render("moreintern1", {
      title: "Student Request of a University",
      Reqintern: reqintern,
      id: id,
    });
  });
});
router.get("/admin-events-test", isAdmin, function (req, res) {
  res.render("admin-events-test");
});

router.get("/admin-certificate", isAdmin, function (req, res) {
  res.render("admin-certificate");
});

router.get("/admin-resume", isAdmin, function (req, res) {
  res.render("admin-resume");
});

router.get("/admin-blog", isAdmin, function (req, res) {
  res.render("admin-blog");
});
router.get("/admin-forum", isAdmin, function (req, res) {
  res.render("admin-forum");
});
router.get("/admin-query", isAdmin, function (req, res) {
  Query.find(function (err, query) {
    res.render("admin-query", { title: "User Queries", Query: query });
  });
});
router.get("/admin-internnexusprojectlist", isAdmin, function (req, res) {
  Internnexusproject.find(function (err, internnexusproject) {
    res.render("admin-internnexusprojectlist", {
      title: "User Project Record",
      Internnexusproject: internnexusproject,
    });
  });
});

router.get("/admin-project", isAdmin, function (req, res) {
  res.render("admin-project", { title: "Admin Project" });
});
router.get("/admin-query-answer/:id", isAdmin, function (req, res) {
  var id = req.params.id;
  Query.find(function (err, query) {
    res.render("admin-query-answer", {
      title: "Query Answer",
      Query: query,
      id: id,
    });
  });
});
router.get("/admin-update-event/:id", isAdmin, function (req, res) {
  var id = req.params.id;
  Event.find(function (err, event) {
    res.render("admin-update-event", {
      title: "Admin Update Event",
      Event: event,
      id: id,
    });
  });
});
router.delete("/admin-delete-event/:id", isAdmin, function (req, res) {
  // var id= req.params.id;
  var query = { _id: req.params.id };
  Event.findOneAndRemove(query, function (err, event) {
    console.log(event);
    res.render("admin-delete-event-success", {
      title: "Admin Delete Event",
      name: event.name,
    });
  });
});

router.put("/admin-update-event/:id", isAdmin, function (req, res) {
  // var id =req.params.id;
  var query = { _id: req.params.id };
  // var id= req.params.id;
  var id = req.params.id;
  var update = {
    name: req.body.name,
    seats: req.body.seats,
    lastdate: req.body.lastdate,
    link: req.body.link,
    about: req.body.about,
    location: req.body.location,
    date: req.body.date,
    fees: req.body.fees,
    category: req.body.category,
    imagelink: req.body.imagelink,
  };
  var options = { new: true };
  Event.findOneAndUpdate(query, update, options, function (err, event) {
    console.log(event);
    res.render("admin-update-event-success", {
      title: "Event Update",
      name: event.name,
    });
  });
});

router.post("/admin-query-answer/:id", isAdmin, function (req, res) {
  var reviewcount = 1;
  // var id =req.params.id;
  var query = { _id: req.params.id };
  // var id= req.params.id;

  var update = { answer: req.body.answer, reviewcount: reviewcount };
  var options = { new: true };
  Query.findOneAndUpdate(query, update, options, function (err, queries) {
    console.log(queries);
    res.render("admin-query-answer", { title: "User Queries", Query: queries });
  });
});
router.get("/adminprojectstatusnotverified/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };
  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("adminprojectstatusnotverified", {
      title: "Guide Assign",
      internnexusproject: internnexusproject,
    });
  });
});

router.post("/adminprojectstatusnotverified/:id", isAdmin, function (req, res) {
  var guideverify = "true";
  // var id =req.params.id;
  var query = { _id: req.params.id };
  // var id= req.params.id;

  var update = {
    guide: req.body.guide,
    guideemail: req.body.guideemail,
    guideverify: guideverify,
  };
  var options = { new: true };
  Internnexusproject.findOneAndUpdate(query, update, options, function (
    err,
    internnexusproject
  ) {
    console.log(internnexusproject);
    res.render("guideassignedsuccessfully", {
      title: "Guide Assigned",
      internnexusproject: internnexusproject,
    });
  });
});
router.get("/guideassignedsuccessfully/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };
  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("guideassignedsuccessfully", {
      title: "Guide Assigned",
      internnexusproject: internnexusproject,
    });
  });
});
router.get("/admin-submitproject/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };
  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("admin-submitproject", {
      title: "User Project Submit",
      internnexusproject: internnexusproject,
    });
  });
});

router.get("/admin-submitprojectdone/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };
  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("admin-submitprojectdone", {
      title: "User Project Submit",
      internnexusproject: internnexusproject,
    });
  });
});
router.get("/adminsubmitprojectnotverified/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };

  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("adminsubmitprojectnotverified", {
      title: "Project Id Assign",
      internnexusproject: internnexusproject,
    });
  });
});
router.post("/adminsubmitprojectnotverified/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };
  Internnexusproject.findOne(query, function (err, internnexusproject1) {
    if (internnexusproject1.submitproject == "true") {
      var submitprojectverified = "true";
      // var id =req.params.id;

      // var id= req.params.id;

      var update = {
        projectid1: req.body.projectid1,
        submitprojectverified: submitprojectverified,
        guidereview: req.body.guidereview,
      };
      var options = { new: true };
      Internnexusproject.findOneAndUpdate(query, update, options, function (
        err,
        internnexusproject
      ) {
        console.log(internnexusproject);
        res.render("projectidsuccess", {
          title: "Project Id Assigned ",
          internnexusproject: internnexusproject,
        });
      });
    }
    if (internnexusproject1.submitproject == "false") {
      res.send(
        `<h1>User has not Submitted the Project . You Cann't Assign Project Id until and unless the User hasn't submitted the project</h1>`
      );
    }
  });
});

router.get("/adminsubmitprojectverified/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };

  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("projectidsuccess", {
      title: "Project Id Assigned",
      internnexusproject: internnexusproject,
    });
  });
});

router.get("/adminfinalproject/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };

  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("adminfinalproject", {
      title: "Final Project Not Submitted",
      internnexusproject: internnexusproject,
    });
  });
});
router.get("/adminfinalprojectsubmitted/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };

  Internnexusproject.findOne(query, function (err, internnexusproject) {
    res.render("adminfinalprojectsubmitted", {
      title: "Final Project Submitted",
      internnexusproject: internnexusproject,
    });
  });
});

router.get("/admin-projectquery/:id", isAdmin, function (req, res) {
  var query = { _id: req.params.id };

  Internnexusproject.findOne(query, function (err, internnexusproject) {

    Projectquery.find(function (err, projectquery) {
      res.render("admin-projectquery", {
        title: "Project Queries",
        Projectquery: projectquery,
	internnexusprojectid: req.params.id
      });
    });
  });
});

router.post("/admin-project-query-answer/:id", isAdmin, function (req, res) {
  var reviewcount = 1;
  
  var query = { _id: req.params.id };
  // var id= req.params.id;

  var update = { answer: req.body.answer, reviewcount: reviewcount };
  var options = { new: true };
  Projectquery.findOneAndUpdate(query, update, options, function (
    err,
    projectquery
  ) {
    console.log(projectquery);
    res.render("adminreviewprojectsuccess", {
      title: "Query Answered Successfully",
      projectquery: projectquery,
    });
  });
});

router.get("/admin-project-query-answer/:id", isAdmin, function (req, res) {
  var id = req.params.id;
  Projectquery.find(function (err, projectquery) {
    res.render("admin-project-query-answer", {
      title: "Query Answer",
      Projectquery: projectquery,
      id: id,
    });
  });
});
// router.get('/adminregister', function (req, res) {
// 	res.render('adminregister');
// });
// router.get('/adminlogin', function (req, res) {
// 	res.render('adminlogin');
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
// // function ensureAuthenticated(req, res, next){
// //   if(req.isAuthenticated()){
// //     return next();
// //   } else {
// //     req.flash('danger', 'Please login');
// //     res.redirect('/adminlogin');
// //   }
// // }
// router.post('/adminlogin', passport.authenticate('admin', {
//   successRedirect : '/admin-dashboards', // redirect to the secure profile section
//   failureRedirect : '/adminlogin', // redirect back to the signup page if there is an error
//   failureFlash : true // allow flash messages;
// }));

// router.get('/admin-dashboards', function(req, res) {
//   res.render('admin-dashboard');
// });
// router.get("/logout", function (req, res) {
//   req.logout();

//   req.flash("success_msg", "You are logged out");

//   res.redirect("/users/adminlogin");
// });
// router.get("/logout", function (req, res) {
//   if (req.isAuthenticated()) {
//     req.logOut();
//     return res.redirect("/users/adminlogin"); // Handle valid logout
//   }

//   return res.status(401); // Handle unauthenticated response
// });

// router.get('/logt', function (req, res) {
// 	req.logout();

// 	//req.flash('success_msg', 'You are logged out');

// 	res.json('Log Out Successfully');
// });

module.exports = router;
