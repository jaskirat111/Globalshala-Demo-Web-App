// var passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');
// const User1=require('../models/user1')
// var configAuth = require('../config/auth');
// const config = require('../config/database');
// const bcrypt = require('bcryptjs');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// module.exports = function(passport){
//   // Local Strategy
//   passport.use(new LocalStrategy(function(email, password, done){
//     // Match Username
//     let query = {email:email};
//     User.findOne(query, function(err, user){
//       if(err) throw err;
//       if(!user){
//         return done(null, false, {message: 'No user found'});
//       }

//       // Match Password
//       bcrypt.compare(password, user.password, function(err, isMatch){
//         if(err) throw err;
//         if(isMatch){
//           return done (null, user);
//         } else {
//           return done(null, false, {message: 'Wrong password'});
//         }
//       });
//     });
//   }));

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

//   passport.serializeUser(function(user1, done){
// 		done(null, user1.id);
// 	});

// 	passport.deserializeUser(function(id, done){
// 		User1.findById(id, function(err, user1){
// 			done(err, user1);
// 		});
// 	});
//   passport.use(new GoogleStrategy({
//     clientID: configAuth.googleAuth.clientID,
//     clientSecret: configAuth.googleAuth.clientSecret,
//     callbackURL: configAuth.googleAuth.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//       process.nextTick(function(){
//         User1.findOne({'google.id': profile.id}, function(err, user1){
//           if(err)
//             return done(err);
//           if(user1)
//             return done(null, user1);
//           else {
//             var newUser = new User1();
//             newUser.google.id = profile.id;
//             newUser.google.token = accessToken;
//             newUser.google.name = profile.displayName;
//             newUser.google.email = profile.emails[0].value;

//             newUser.save(function(err){
//               if(err)
//                 throw err;
//               return done(null, newUser);
//             })
//             console.log(profile);
//           }
//         });
//       });
//     }

// ));

// }

// // // Use the GoogleStrategy within Passport.
// // //   Strategies in Passport require a `verify` function, which accept
// // //   credentials (in this case, an accessToken, refreshToken, and Google
// // //   profile), and invoke a callback with a user object.
// // passport.use(new GoogleStrategy({
// //   clientID: 297434344590-j53o40m77pda01fp3jnup64qb37squ4g.apps.googleusercontent.com,
// //   clientSecret: mNi2wPIlx1YEk3wYxVXyRY6Z,
// //   callbackURL: "http://localhost:3000/auth/google/callback"
// // },
// // function(accessToken, refreshToken, profile, done) {
// //      User.findOrCreate({ googleId: profile.id }, function (err, user) {
// //        return done(err, user);
// //      });
// // }
// // ));
