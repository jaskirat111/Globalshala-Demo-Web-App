//Routes

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Comp = require("../models/comp");
// var Campground = require("../models/campground");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var bcrypt = require("bcryptjs");

// Forgot.js

/////
router.get("/forgot", function (req, res) {
  res.render("forgot");
});

// var isLoggedIn=function(req, res, next){
//       if(req.isAuthenticated()){
//           return next();
//       }
//       req.flash("error", "You must be signed in to do that!");
//       res.redirect("/users/login");
//   }
router.post("/forgot", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash("error", "No account with that email address exists.");
            console.log("no user found");
            return res.redirect("/forgots/forgot");
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "jkrt.ngh69@gmail.com",
            pass: "9999888219",
          },
          // service: 'Mailgun',
          // auth: {
          //   user: 'support@internnexus.com',
          //   pass: '#Saitm7011@'
          // }
          // host: "email-smtp.us-east-1.amazonaws.com",
          // port: 465,
          // secure: true,
          // auth: {
          //   user: "AKIAJHIJZXUJ7VKOCTEA", // generated ethereal user
          //   pass: "BEXatVmt8SxGQ2HT2p8I6eN1LhzVcQvkWNfE0ihgn0ls", // generated ethereal password
          // },
          // auth: {
          //     user: 'sapna@cybernauttech.com',
          //     pass: 'yahoo8130'
          //   }
        });
        var mailOptions = {
          to: user.email,
          from: "jkrt.ngh69@gmail.com",
          subject: "Global Shala Password Reset",
          // from: 'sapna@cybernauttech.com',
          // subject: 'Intern Nexus Password Reset',
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "https://global-shala.herokuapp.com/forgots/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log("mail sent");
          // res.send(`<h1>check your mail id<h1>`)
          res.send(
            `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Please check your Inbox</h1></div></body>`
          );

          req.flash(
            "success",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          );
          done(err, "done");
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/forgots/forgot");
    }
  );
});

router.get("/reset/:token", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgots/forgot");
      }
      res.render("reset", { token: req.params.token, user: req.user });
    }
  );
});

router.post("/reset/:token", function (req, res) {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              console.log("token expired");
              return res.redirect("back");
            }

            if (req.body.password === req.body.confirm) {
              var passwordfinal = req.body.password;
              bcrypt.genSalt(10, function (err, salt1) {
                if (err) return next(err);
                bcrypt.hash(passwordfinal, salt1, function (err, hash1) {
                  if (err) return next(err);
                  passwordfinal = hash1;
                });
              });
              user.setPassword(passwordfinal, function (err) {
                user.password = passwordfinal;
                user.password2 = req.body.confirm;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                  req.logIn(user, function (err) {
                    done(err, user);
                  });
                });
              });
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "jkrt.ngh69@gmail.com",
            pass: "9999888219",
          },
          // service: 'Mailgun',
          // auth: {
          //   user: 'support@www.easexam.com',
          //   pass: '#Saitm7011@'
          // }
          // host: "email-smtp.us-east-1.amazonaws.com",
          // port: 465,
          // secure: true,
          // auth: {
          //   user: "AKIAJHIJZXUJ7VKOCTEA", // generated ethereal user
          //   pass: "BEXatVmt8SxGQ2HT2p8I6eN1LhzVcQvkWNfE0ihgn0ls", // generated ethereal password
          // },
        });
        var mailOptions = {
          to: user.email,
          from: "jkrt.ngh69@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect("/users/dashboards");
    }
  );
});
router.get("/forgotcomp", function (req, res) {
  res.render("forgotcomp");
});
router.post("/forgotcomp", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        Comp.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash("error", "No account with that email address exists.");
            console.log("no user found");
            return res.redirect("/forgots/forgotcomp");
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "jkrt.ngh69@gmail.com",
            pass: "9999888219",
          },
          // service: "Mailgun",
          // auth: {
          //   user: "support@internnexus.com",
          //   pass: "#Saitm7011@",
          // },
          // auth: {
          //     user: 'sapna@cybernauttech.com',
          //     pass: 'yahoo8130'
          //   }
        });
        var mailOptions = {
          to: user.email,
          from: "jkrt.ngh69@gmail.com",
          subject: "Global Shala Password Reset",
          // from: 'sapna@cybernauttech.com',
          // subject: 'Intern Nexus Password Reset',
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "https://global-shala.herokuapp.com/forgots/resetcomp/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log("mail sent");
          // res.send(`<h1>check your mail id<h1>`)
          res.send(
            `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">Please check your Inbox</h1></div></body>`
          );

          req.flash(
            "success",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          );
          done(err, "done");
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/forgots/forgotcomp");
    }
  );
});
router.get("/resetcomp/:token", function (req, res) {
  Comp.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgots/forgotcomp");
      }
      res.render("resetcomp", { token: req.params.token, user: req.user });
    }
  );
});

router.post("/resetcomp/:token", function (req, res) {
  async.waterfall(
    [
      function (done) {
        Comp.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              console.log("token expired");
              return res.redirect("back");
            }

            if (req.body.password === req.body.confirm) {
              var passwordfinal = req.body.password;
              bcrypt.genSalt(10, function (err, salt1) {
                if (err) return next(err);
                bcrypt.hash(passwordfinal, salt1, function (err, hash1) {
                  if (err) return next(err);
                  passwordfinal = hash1;
                });
              });
              user.setPassword(passwordfinal, function (err) {
                user.password = passwordfinal;
                user.password2 = req.body.confirm;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                  req.logIn(user, function (err) {
                    done(err, user);
                  });
                });
              });
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "jkrt.ngh69@gmail.com",
            pass: "9999888219",
          },
          // service: 'Mailgun',
          // auth: {
          //   user: 'support@www.easexam.com',
          //   pass: '#Saitm7011@'
          // }
          // host: "email-smtp.us-east-1.amazonaws.com",
          // port: 465,
          // secure: true,
          // auth: {
          //   user: "AKIAJHIJZXUJ7VKOCTEA", // generated ethereal user
          //   pass: "BEXatVmt8SxGQ2HT2p8I6eN1LhzVcQvkWNfE0ihgn0ls", // generated ethereal password
          // },
        });
        var mailOptions = {
          to: user.email,
          from: "jkrt.ngh69@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect("/users/compdashboards");
    }
  );
});
module.exports = router;
