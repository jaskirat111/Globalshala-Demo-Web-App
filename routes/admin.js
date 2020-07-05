//var express = require('express');
//var router = express.Router();
//const bcrypt = require('bcryptjs');
//const passport = require('passport');
//require('../config/passport')(passport)
const bodyParser = require('body-parser');
//const LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override')
//var mongoose = require('mongoose');
const session = require('express-session');
//-------

const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Redone
require('../models/notes');
require('../models/pdfs');
require('../models/events');
require('../models/forum');
require('../models/project');
require('../models/images');
require('../models/program');

var mongoose = require('mongoose');
var Note = mongoose.model('Notes');
var Pdf = mongoose.model('Pdfs');
var Event = mongoose.model('Events');
var Forum = mongoose.model('Forum');
var Project = mongoose.model('Project');
var Images = mongoose.model('Images');
var Program = mongoose.model('Program');


const bcrypt = require('bcryptjs');




// Bring in User Model
//let User = require('../models/admin');

//---------

//let User = require('../models/user');
//let User1 = require('../models/user1');
//let Note= require('../models/notes')
/* GET home page. */

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(methodOverride('_method'));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Internship' });
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

//   router.get('/admin-dashboard', function (req, res) {
//     res.render('admin-dashboard');
//   });
  
//   router.get('/admin-notes', function (req, res) {
//     res.render('admin-notes');
//   });
//   router.get('/admin-notes-test', function (req, res) {
//     res.render('admin-notes-test');
//   });

//   router.get('/admin-pdf', function (req, res) {
//     res.render('admin-pdf');
//   });

//   router.get('/admin-pdf-test', function (req, res) {
//     res.render('admin-pdf-test');
//   });

//   router.get('/admin-events', function (req, res) {
//     res.render('admin-events');
//   });

//   router.get('/admin-events-test', function (req, res) {
//     res.render('admin-events-test');
//   });

//   router.get('/admin-certificate', function (req, res) {
//     res.render('admin-certificate');
//   });

//   router.get('/admin-resume', function (req, res) {
//     res.render('admin-resume');
//   });

//   router.get('/admin-blog', function (req, res) {
//     res.render('admin-blog');
//   });
function isAdmin(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.user) {
		 // if user is admin, go next
		 if (req.user.isAdmin == 'true') {
			 return next();
		 }
	}
	res.redirect('/users/adminlogin');
}
  router.post('/admin-notes',isAdmin, function(req, res) {
    new Note({name : req.body.name, link : req.body.link, category: req.body.category,type:req.body.type}
   
   
)
    .save(function(err, Note) {
      console.log(Note)
      res.redirect('/admin-notes');
    });
  });

  router.post('/admin-pdf',isAdmin, function(req, res) {
    new Pdf({name : req.body.name, link : req.body.link,category: req.body.category,type:req.body.type}
   
   
)
    .save(function(err, Pdf) {
      console.log(Pdf)
      res.redirect('/admin-pdf');
    });
  });

  router.post('/admin-events', isAdmin,function(req, res) {
    new Event({name : req.body.name,seats: req.body.seats, lastdate: req.body.lastdate, link : req.body.link, about : req.body.about, location : req.body.location, date : req.body.date,fees:req.body.fees,category: req.body.category,imagelink:req.body.imagelink}
   
   
)
    .save(function(err, Event) {
      console.log(Event)
      res.redirect('/admin-events');
    });
  });
  router.post('/admin-gallery-program', isAdmin,function(req, res) {
    new Program({name : req.body.name, link : req.body.link, about : req.body.about, location : req.body.location, date : req.body.date,category: req.body.category,imagelink:req.body.imagelink}
   
   
)
    .save(function(err, Program) {
      console.log(Program)
      res.redirect('/admin-gallery-program');
    });
  });
  router.post('/images',isAdmin, function(req, res) {
    new Images({imagesrc:req.body.imagesrc,category:req.body.category}
   
   
)
    .save(function(err, Images) {
      console.log(Images)
      res.redirect('/images');
    });
  });
  router.post('/admin-project',isAdmin, function(req, res) {
    new Project({name : req.body.name,technologyused: req.body.technologyused, date : req.body.date, projectbrief : req.body.projectbrief, fees:req.body.fees,level: req.body.level,duration:req.body.duration,pdflink:req.body.pdflink}
   
   
)
    .save(function(err, Project) {
      console.log(Project)
      res.redirect('/admin-project');
    });
  });
  
  router.post('/admin-forum',isAdmin, function(req, res) {
    new Forum({question : req.body.question,answer: req.body.answer}
   
   
)
    .save(function(err, Forum) {
      console.log(Forum)
      res.redirect('/admin-forum');
    });
  });
 
module.exports = router;
