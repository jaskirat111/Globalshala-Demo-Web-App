//bid

const express = require("express");

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();
const mongoose = require("mongoose");
// const User = require( '../models/User' );
require("../models/project");
require("../models/userenrolledforevent");
require("../models/internnexusproject");

let User = require("../models/user");
var Project = mongoose.model("Project");
let Event = require("../models/events");
const Insta = require("instamojo-nodejs");
const url = require("url");
var Userenrolledforevent = mongoose.model("Userenrolledforevent");
var Internnexusproject = mongoose.model("Internnexusproject");
function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

// router.get('/pay',function(req,res){
//     res.redirect('http://127.0.0.1:3000/bid/pay');
// });
// /api/bid/pay

router.post("/pay", (req, res) => {
  Insta.setKeys(
    "test_ac6c027a59cd53e60732eff67fe",
    "test_356206b1bea68d2bf3eedb9261f"
  );

  var data = new Insta.PaymentData();

  Insta.isSandboxMode(true);

  // data.purpose = "Test";            // REQUIRED
  // data.amount = 9;                  // REQUIRED
  // //data.setRedirectUrl(REDIRECT_URL);
  // User.find(function(err, user){

  //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
  //   });
  data.purpose = "Student Yearly Subscription";
  data.amount = 500;
  data.buyer_name = req.user.username;

  data.email = req.user.email;
  data.phone = req.user.phone;
  data.send_email = false;
  data.user_id = req.user.__id;

  data.redirect_url = `https://global-shala.herokuapp.com/bid/callback?user_id=${req.user.id}`;
  //sdata.setRedirectUrl(redirectUrl);
  //data.webhook= '/webhook/';
  data.send_sms = false;
  data.allow_repeated_payments = false;

  // Insta.createPayment(data, function(error, response) {
  //   if (error) {
  //     // some error
  //   } else {
  //     // Payment redirection link at response.payment_request.longurl
  //     console.log(response);
  //   }
  // });

  //const data = new Insta.PaymentData();
  //Insta.isSandboxMode(true);

  // data.purpose =  req.body.purpose;
  // data.amount = req.body.amount;
  // data.buyer_name =  req.body.buyer_name;
  // data.redirect_url =  req.body.redirect_url;
  // data.email =  req.body.email;
  // data.phone =  req.body.phone;
  // data.send_email =  false;
  // data.webhook= 'http://www.example.com/webhook/';
  // data.send_sms= false;
  // data.allow_repeated_payments =  false;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      //Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      const redirectUrl = responseData.payment_request.longurl;
      console.log(redirectUrl);
      console.log(responseData);

      //res.status( 200 ).send( redirectUrl );
      //res.redirect('Location' window.location.href=redirectUrl);
      res.redirect(redirectUrl);
    }
  });
});
router.get("/callback/", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;

  if (responseData.payment_id) {
    let userId = responseData.user_id;
    var applydate = Date.now();
    var expirydate = applydate + 3600000 * 24 * 365; //for  1 year
    var applydate1 = new Date(applydate).toISOString();
    var expirydate1 = new Date(expirydate).toISOString();
    // Save the info that user has purchased the bid.
    const bidData = {};
    bidData.package = "Bid100";
    bidData.bidCountInPack = "1";
    bidData.verifyyearly = "true";
    bidData.applydate = applydate;
    bidData.expirydate = expirydate;
    bidData.applydate1 = applydate1;
    bidData.expirydate1 = expirydate1;
    User.findOneAndUpdate({ _id: userId }, { $set: bidData }, { new: true })
      .then((user) => res.json(user))
      .catch((errors) => res.json(errors));

    // Redirect the user to payment complete page.
    //return res.redirect('http://localhost:3000/payment-complete' );
    return res.redirect("../users/dashboards");
  }
});

router.post("/payh", (req, res) => {
  Insta.setKeys(
    "test_ac6c027a59cd53e60732eff67fe",
    "test_356206b1bea68d2bf3eedb9261f"
  );

  var data = new Insta.PaymentData();

  Insta.isSandboxMode(true);

  // data.purpose = "Test";            // REQUIRED
  // data.amount = 9;                  // REQUIRED
  // //data.setRedirectUrl(REDIRECT_URL);
  // User.find(function(err, user){

  //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
  //   });
  data.purpose = "Student Half YearlySubscription";
  data.amount = 300;
  data.buyer_name = req.user.name;

  data.email = req.user.email;
  data.phone = req.user.phone;
  data.send_email = false;
  data.user_id = req.user.__id;

  data.redirect_url = `https://global-shala.herokuapp.com/bid/callbacks?user_id=${req.user.id}`;
  //sdata.setRedirectUrl(redirectUrl);
  //data.webhook= '/webhook/';
  data.send_sms = false;
  data.allow_repeated_payments = false;

  // Insta.createPayment(data, function(error, response) {
  //   if (error) {
  //     // some error
  //   } else {
  //     // Payment redirection link at response.payment_request.longurl
  //     console.log(response);
  //   }
  // });

  //const data = new Insta.PaymentData();
  //Insta.isSandboxMode(true);

  // data.purpose =  req.body.purpose;
  // data.amount = req.body.amount;
  // data.buyer_name =  req.body.buyer_name;
  // data.redirect_url =  req.body.redirect_url;
  // data.email =  req.body.email;
  // data.phone =  req.body.phone;
  // data.send_email =  false;
  // data.webhook= 'http://www.example.com/webhook/';
  // data.send_sms= false;
  // data.allow_repeated_payments =  false;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      //Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      const redirectUrl = responseData.payment_request.longurl;
      console.log(redirectUrl);
      console.log(responseData);

      //res.status( 200 ).send( redirectUrl );
      //res.redirect('Location' window.location.href=redirectUrl);
      res.redirect(redirectUrl);
    }
  });
});
router.get("/callbacks/", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;

  if (responseData.payment_id) {
    let userId = responseData.user_id;

    // Save the info that user has purchased the bid.

    var applydate = Date.now();
    var expirydate = applydate + 3600000 * 24 * 183; //for  1 year
    var applydate1 = new Date(applydate).toISOString();
    var expirydate1 = new Date(expirydate).toISOString();
    // Save the info that user has purchased the bid.
    const bidData = {};
    bidData.package = "Bid100";
    bidData.bidCountInPack = "1";
    bidData.verifyhalfyearly = "true";
    bidData.applydate = applydate;
    bidData.expirydate = expirydate;
    bidData.applydate1 = applydate1;
    bidData.expirydate1 = expirydate1;

    User.findOneAndUpdate({ _id: userId }, { $set: bidData }, { new: true })
      .then((user) => res.json(user))
      .catch((errors) => res.json(errors));

    // Redirect the user to payment complete page.
    //return res.redirect('http://localhost:3000/payment-complete' );
    return res.redirect("../users/dashboards");
  }
});

// /**
//  * @route GET api/bid/callback/
//  * @desc Call back url for instamojo
//  * @access public
//  */
// router.post('/event/:id', function(req, res) {
//     var query = {"_id": req.params.id};
//     Event.findOne(query, function(err, event){
//       console.log(event)
//       res.redirect(301,'http://127.0.0.1:3000/bid/payevent/');
//     });
//   });

router.post("/event/:id", ensureAuthenticated, (req, res) => {
  if (req.body.seats !== "0") {
    var username = req.user.username;
    var eventid = req.body.id;
    Userenrolledforevent.findOne(
      { username: username, eventid: eventid },
      function (err, userenrolledforevent) {
        if (userenrolledforevent) {
          // console.log(userenrolledforevent);
          res.send(
            `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">You have already registered  for this event.</h1></div></body>`
          );
        }
        if (!userenrolledforevent) {
          Insta.setKeys(
            "test_ac6c027a59cd53e60732eff67fe",
            "test_356206b1bea68d2bf3eedb9261f"
          );

          var data = new Insta.PaymentData();

          Insta.isSandboxMode(true);

          // data.purpose = "Test";            // REQUIRED
          // data.amount = 9;                  // REQUIRED
          // //data.setRedirectUrl(REDIRECT_URL);
          // User.find(function(err, user){

          //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
          //   });

          data.purpose = req.body.name;
          data.amount = req.body.fees;
          data.buyer_name = req.user.name;

          data.email = req.user.email;
          data.phone = req.user.phone;
          data.send_email = true;
          //data.__id = req.body.id;

          data.redirect_url = `https://global-shala.herokuapp.com/bid/cb/:id?user_id=${req.user.id}`;
          //sdata.setRedirectUrl(redirectUrl);
          //data.webhook= '/webhook/';
          data.send_sms = true;
          data.allow_repeated_payments = false;
          var query = { _id: req.user.id };
          var eventid = req.body.id;
          var update = { eventid: eventid };
          var options = { new: true };
          User.findOneAndUpdate(query, update, options, function (err, user) {
            console.log(user);
          });

          // Insta.createPayment(data, function(error, response) {
          //   if (error) {
          //     // some error
          //   } else {
          //     // Payment redirection link at response.payment_request.longurl
          //     console.log(response);
          //   }
          // });

          //const data = new Insta.PaymentData();
          //Insta.isSandboxMode(true);

          // data.purpose =  req.body.purpose;
          // data.amount = req.body.amount;
          // data.buyer_name =  req.body.buyer_name;
          // data.redirect_url =  req.body.redirect_url;
          // data.email =  req.body.email;
          // data.phone =  req.body.phone;
          // data.send_email =  false;
          // data.webhook= 'http://www.example.com/webhook/';
          // data.send_sms= false;
          // data.allow_repeated_payments =  false;

          Insta.createPayment(data, function (error, response) {
            if (error) {
              // some error
            } else {
              //Payment redirection link at response.payment_request.longurl
              const responseData = JSON.parse(response);
              const redirectUrl = responseData.payment_request.longurl;
              console.log(redirectUrl);
              console.log(responseData);

              //res.status( 200 ).send( redirectUrl );
              //res.redirect('Location' window.location.href=redirectUrl);
              res.redirect(redirectUrl);
            }
          });
        }
      }
    );
  } else {
    res.send(`<div style="background-color:red"><h1>No Seats Left</h1></div>`);
  }
});
router.get("/cb/:id", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;
  // let occ = event.seats;
  // console.log(occ);

  if (responseData.payment_id) {
    let userId = responseData.user_id;

    // Save the info that user has purchased the bid.
    const bidData = {};
    // bidData.package = 'Bid100';
    // bidData.bidCountInPack = '1';
    //bidData.occ=parseInt(bitData.seats,10);

    // bidData.occm=parseInt('bitData.seats',10);

    //     if(bidData.occu!=bidData.seats){

    //     bidData.occm = bidData.occu +1;
    //    return bidData.occu;
    //    console.log( bidData.occu );
    // }

    // Event.findOneAndUpdate( { _id: userId },{ $inc: { seats: -1 } }, { new: true } )
    //     .then( ( Event ) => res.json( Event ) )
    //     .catch( ( errors ) => res.json( errors ) );

    User.findOne({ _id: userId }, function (err, user) {
      var eventid = user.eventid;
      Event.findOneAndUpdate(
        { _id: eventid },
        { $inc: { seats: -1 } },
        { new: true }
      )
        .then((Event) => res.json(Event))
        .catch((errors) => res.json(errors));

      Event.findOne({ _id: user.eventid }, function (err, event) {
        new Userenrolledforevent({
          userid: userId,
          username: user.username,
          email: user.email,
          phone: user.phone,
          eventid: eventid,
          eventname: event.name,
          about: event.about,
          location: event.location,
          date: event.date,
          link: event.link,
          category: event.category,
          fees: event.fees,
          lastdate: event.lastdate,
          imagelink: event.imagelink,
        }).save(function (err, Userenrolledforevent) {
          console.log(Userenrolledforevent);
        });
      })
        .then((Event) => res.json(Event))
        .catch((errors) => res.json(errors));
    })
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));
    // User.findOneAndUpdate( { _id: req.body.id },{ eventname:responseData.purpose }, { new: true } )
    //     .then( ( User ) => res.json( User ) )
    //     .catch( ( errors ) => res.json( errors ) );

    // Redirect the user to payment complete page.
    //return res.redirect('http://localhost:3000/payment-complete' );
    return res.redirect("../../users/dashboards");
  }

  /////
  // router.put('/update/:id', function(req, res) {
  //     var query = {"_id": req.params.id};
  //     var update = {name : req.body.name, date : req.body.date, time : req.body.time};
  //     var options = {new: true};
  //     Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
  //       console.log(superhero)
  //       res.render(
  //         'update',
  //         {title : 'Superhero API - ' + superhero.name, superhero : superhero}
  //       );
  //     });
  //   });

  /////
});
// router.post( '/project/:id', ( req, res ) => {

//     // if(req.body.seats!=='0'){

//     Insta.setKeys('test_ac6c027a59cd53e60732eff67fe', 'test_356206b1bea68d2bf3eedb9261f');

//     var data = new Insta.PaymentData();

//     Insta.isSandboxMode(true);

// // data.purpose = "Test";            // REQUIRED
// // data.amount = 9;                  // 1REQUIRED
// // //data.setRedirectUrl(REDIRECT_URL);
// // User.find(function(err, user){

// //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
// //   });

//     data.purpose = req.body.name;
//     data.amount = req.body.fees;
//     data.buyer_name =  req.user.username;
//     data.email =  req.user.email;
//     data.phone =  req.user.phone;
//     data.send_email =  true;
//     data.__id = req.params.id;
//     // data.__id1=req.params.id;
//     data.redirect_url =  `http://localhost:3000/bid/cbp/:id?user_id=${req.user.id}`;
//     //sdata.setRedirectUrl(redirectUrl);
//     //data.webhook= '/webhook/';
//     data.send_sms= true;
//     data.allow_repeated_payments =  false;
// // Insta.createPayment(data, function(error, response) {
// //   if (error) {
// //     // some error
// //   } else {
// //     // Payment redirection link at response.payment_request.longurl
// //     console.log(response);
// //   }
// // });

//     //const data = new Insta.PaymentData();
//     //Insta.isSandboxMode(true);

//     // data.purpose =  req.body.purpose;
//     // data.amount = req.body.amount;
//     // data.buyer_name =  req.body.buyer_name;
//     // data.redirect_url =  req.body.redirect_url;
//     // data.email =  req.body.email;
//     // data.phone =  req.body.phone;
//     // data.send_email =  false;
//     // data.webhook= 'http://www.example.com/webhook/';
//     // data.send_sms= false;
//     // data.allow_repeated_payments =  false;

//     Insta.createPayment(data, function(error, response) {
//         if (error) {
//             // some error
//         } else {
//             //Payment redirection link at response.payment_request.longurl
//             const responseData = JSON.parse( response );
//            const redirectUrl = responseData.payment_request.longurl;
//            console.log( redirectUrl);
//             console.log( responseData);

//             //res.status( 200 ).send( redirectUrl );
//             //res.redirect('Location' window.location.href=redirectUrl);
//              res.redirect(redirectUrl);
//         }
//     });

// // }
// // else{
// //     res.send(`<div style="background-color:red"><h1>No Seats Left</h1></div>`)
// // }
// } );
// router.get( '/cbp/:id', ( req, res ) => {
//     let url_parts = url.parse( req.url, true),
//         responseData = url_parts.query;
//         // let occ = event.seats;
//         // console.log(occ);
//         console.log(responseData);
//     if ( responseData.payment_id ) {
//         let userId = responseData.user_id;
//         // let projectId=responseData.user_id1;

//         // Save the info that user has purchased the bid.
//         const bidData = {};
//         // bidData.package = 'Bid100';
//         // bidData.bidCountInPack = '1';
//         //bidData.occ=parseInt(bitData.seats,10);

//        // bidData.occm=parseInt('bitData.seats',10);

//     //     if(bidData.occu!=bidData.seats){

//     //     bidData.occm = bidData.occu +1;
//     //    return bidData.occu;
//     //    console.log( bidData.occu );
//     // }

//         User.findOneAndUpdate( { _id: userId },{ $inc: { basicusercounter: +1 } }, { new: true } )
//             .then( ( User ) => res.json( User ) )
//             .catch( ( errors ) => res.json( errors ) );

//         // Redirect the user to payment complete page.
//         //return res.redirect('http://localhost:3000/payment-complete' );
//     return res.redirect('../../users/projectlist');
//     }

//     /////
//     // router.put('/update/:id', function(req, res) {
//     //     var query = {"_id": req.params.id};
//     //     var update = {name : req.body.name, date : req.body.date, time : req.body.time};
//     //     var options = {new: true};
//     //     Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
//     //       console.log(superhero)
//     //       res.render(
//     //         'update',
//     //         {title : 'Superhero API - ' + superhero.name, superhero : superhero}
//     //       );
//     //     });
//     //   });

//     /////

//  } );
router.post("/projectintermediate/:id", (req, res) => {
  // if(req.body.seats!=='0'){
  var username = req.user.username;
  var projectid = req.body.id;
  Internnexusproject.findOne(
    { username: username, projectid: projectid },
    function (err, internnexusproject) {
      if (internnexusproject) {
        // console.log(userenrolledforevent);
        res.send(
          `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">You have already registered  for this Project.</h1></div></body>`
        );
      }
      if (!internnexusproject) {
        Insta.setKeys(
          "test_ac6c027a59cd53e60732eff67fe",
          "test_356206b1bea68d2bf3eedb9261f"
        );

        var data = new Insta.PaymentData();

        Insta.isSandboxMode(true);

        // data.purpose = "Test";            // REQUIRED
        // data.amount = 9;                  // 1REQUIRED
        // //data.setRedirectUrl(REDIRECT_URL);
        // User.find(function(err, user){

        //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
        //   });

        data.purpose = req.body.name;
        data.amount = req.body.fees;
        data.buyer_name = req.user.username;
        data.email = req.user.email;
        data.phone = req.user.phone;
        data.send_email = true;
        data.__id = req.user.id;

        data.redirect_url = `https://global-shala.herokuapp.com/bid/cbintermediate/:id?user_id=${req.user.id}`;
        //sdata.setRedirectUrl(redirectUrl);
        //data.webhook= '/webhook/';
        data.send_sms = true;
        data.allow_repeated_payments = false;
        var query = { _id: req.user.id };
        var projectid = req.body.id;
        var update = { projectid: projectid };
        var options = { new: true };
        User.findOneAndUpdate(query, update, options, function (err, user) {
          console.log(user);
        });
        // Insta.createPayment(data, function(error, response) {
        //   if (error) {
        //     // some error
        //   } else {
        //     // Payment redirection link at response.payment_request.longurl
        //     console.log(response);
        //   }
        // });

        //const data = new Insta.PaymentData();
        //Insta.isSandboxMode(true);

        // data.purpose =  req.body.purpose;
        // data.amount = req.body.amount;
        // data.buyer_name =  req.body.buyer_name;
        // data.redirect_url =  req.body.redirect_url;
        // data.email =  req.body.email;
        // data.phone =  req.body.phone;
        // data.send_email =  false;
        // data.webhook= 'http://www.example.com/webhook/';
        // data.send_sms= false;
        // data.allow_repeated_payments =  false;

        Insta.createPayment(data, function (error, response) {
          if (error) {
            // some error
          } else {
            //Payment redirection link at response.payment_request.longurl
            const responseData = JSON.parse(response);
            const redirectUrl = responseData.payment_request.longurl;
            console.log(redirectUrl);
            console.log(responseData);

            //res.status( 200 ).send( redirectUrl );
            //res.redirect('Location' window.location.href=redirectUrl);
            res.redirect(redirectUrl);
          }
        });
      }
    }
  );
  // }
  // else{
  //     res.send(`<div style="background-color:red"><h1>No Seats Left</h1></div>`)
  // }
});
router.get("/cbintermediate/:id", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;
  // let occ = event.seats;
  // console.log(occ);

  if (responseData.payment_id) {
    let userId = responseData.user_id;

    // Save the info that user has purchased the bid.
    const bidData = {};
    // bidData.package = 'Bid100';
    // bidData.bidCountInPack = '1';
    //bidData.occ=parseInt(bitData.seats,10);

    // bidData.occm=parseInt('bitData.seats',10);

    //     if(bidData.occu!=bidData.seats){

    //     bidData.occm = bidData.occu +1;
    //    return bidData.occu;
    //    console.log( bidData.occu );
    // }

    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { intermediateusercounter: +1 } },
      { new: true }
    )
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));

    User.findOne({ _id: userId }, function (err, user) {
      var projectid = user.projectid;

      Project.findOne({ _id: user.projectid }, function (err, project) {
        var applydate = Date.now();
        var expirydate = applydate + 3600000 * 24 * 7 * project.duration; //for  1 year
        var applydate1 = new Date(applydate).toISOString();
        var expirydate1 = new Date(expirydate).toISOString();
        new Internnexusproject({
          userid: userId,
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
      })
        .then((Project) => res.json(Project))
        .catch((errors) => res.json(errors));
    })
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));

    // Redirect the user to payment complete page.
    //return res.redirect('http://localhost:3000/payment-complete' );
    return res.redirect("../../users/dashboards");
  }

  /////
  // router.put('/update/:id', function(req, res) {
  //     var query = {"_id": req.params.id};
  //     var update = {name : req.body.name, date : req.body.date, time : req.body.time};
  //     var options = {new: true};
  //     Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
  //       console.log(superhero)
  //       res.render(
  //         'update',
  //         {title : 'Superhero API - ' + superhero.name, superhero : superhero}
  //       );
  //     });
  //   });

  /////
});
router.post("/projectadvance/:id", (req, res) => {
  // if(req.body.seats!=='0'){
  var username = req.user.username;
  var projectid = req.body.id;
  Internnexusproject.findOne(
    { username: username, projectid: projectid },
    function (err, internnexusproject) {
      if (internnexusproject) {
        // console.log(userenrolledforevent);
        res.send(
          `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">You have already registered  for this Project.</h1></div></body>`
        );
      }
      if (!internnexusproject) {
        Insta.setKeys(
          "test_ac6c027a59cd53e60732eff67fe",
          "test_356206b1bea68d2bf3eedb9261f"
        );

        var data = new Insta.PaymentData();

        Insta.isSandboxMode(true);

        // data.purpose = "Test";            // REQUIRED
        // data.amount = 9;                  // 1REQUIRED
        // //data.setRedirectUrl(REDIRECT_URL);
        // User.find(function(err, user){

        //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
        //   });

        data.purpose = req.body.name;
        data.amount = req.body.fees;
        data.buyer_name = req.user.username;
        data.email = req.user.email;
        data.phone = req.user.phone;
        data.send_email = true;
        data.__id = req.user.id;

        data.redirect_url = `https://global-shala.herokuapp.com/bid/cbadvance/:id?user_id=${req.user.id}`;
        //sdata.setRedirectUrl(redirectUrl);
        //data.webhook= '/webhook/';
        data.send_sms = true;
        data.allow_repeated_payments = false;
        var query = { _id: req.user.id };
        var projectid = req.body.id;
        var update = { projectid: projectid };
        var options = { new: true };
        User.findOneAndUpdate(query, update, options, function (err, user) {
          console.log(user);
        });
        // Insta.createPayment(data, function(error, response) {
        //   if (error) {
        //     // some error
        //   } else {
        //     // Payment redirection link at response.payment_request.longurl
        //     console.log(response);
        //   }
        // });

        //const data = new Insta.PaymentData();
        //Insta.isSandboxMode(true);

        // data.purpose =  req.body.purpose;
        // data.amount = req.body.amount;
        // data.buyer_name =  req.body.buyer_name;
        // data.redirect_url =  req.body.redirect_url;
        // data.email =  req.body.email;
        // data.phone =  req.body.phone;
        // data.send_email =  false;
        // data.webhook= 'http://www.example.com/webhook/';
        // data.send_sms= false;
        // data.allow_repeated_payments =  false;

        Insta.createPayment(data, function (error, response) {
          if (error) {
            // some error
          } else {
            //Payment redirection link at response.payment_request.longurl
            const responseData = JSON.parse(response);
            const redirectUrl = responseData.payment_request.longurl;
            console.log(redirectUrl);
            console.log(responseData);

            //res.status( 200 ).send( redirectUrl );
            //res.redirect('Location' window.location.href=redirectUrl);
            res.redirect(redirectUrl);
          }
        });
      }
    }
  );
  // }
  // else{
  //     res.send(`<div style="background-color:red"><h1>No Seats Left</h1></div>`)
  // }
});
router.get("/cbadvance/:id", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;
  // let occ = event.seats;
  // console.log(occ);

  if (responseData.payment_id) {
    let userId = responseData.user_id;

    // Save the info that user has purchased the bid.
    const bidData = {};
    // bidData.package = 'Bid100';
    // bidData.bidCountInPack = '1';
    //bidData.occ=parseInt(bitData.seats,10);

    // bidData.occm=parseInt('bitData.seats',10);

    //     if(bidData.occu!=bidData.seats){

    //     bidData.occm = bidData.occu +1;
    //    return bidData.occu;
    //    console.log( bidData.occu );
    // }

    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { advanceusercounter: +1 } },
      { new: true }
    )
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));
    User.findOne({ _id: userId }, function (err, user) {
      var projectid = user.projectid;

      Project.findOne({ _id: user.projectid }, function (err, project) {
        var applydate = Date.now();
        var expirydate = applydate + 3600000 * 24 * 7 * project.duration; //for  1 year
        var applydate1 = new Date(applydate).toISOString();
        var expirydate1 = new Date(expirydate).toISOString();
        new Internnexusproject({
          userid: userId,
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
      })
        .then((Project) => res.json(Project))
        .catch((errors) => res.json(errors));
    })
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));

    // Redirect the user to payment complete page.
    //return res.redirect('http://localhost:3000/payment-complete' );
    return res.redirect("../../users/dashboards");
  }

  /////
  // router.put('/update/:id', function(req, res) {
  //     var query = {"_id": req.params.id};
  //     var update = {name : req.body.name, date : req.body.date, time : req.body.time};
  //     var options = {new: true};
  //     Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
  //       console.log(superhero)
  //       res.render(
  //         'update',
  //         {title : 'Superhero API - ' + superhero.name, superhero : superhero}
  //       );
  //     });
  //   });

  /////
});
router.post("/projecthot/:id", (req, res) => {
  // if(req.body.seats!=='0'){
  var username = req.user.username;
  var projectid = req.body.id;
  Internnexusproject.findOne(
    { username: username, projectid: projectid },
    function (err, internnexusproject) {
      if (internnexusproject) {
        // console.log(userenrolledforevent);
        res.send(
          `<body style="background-color:black;" ><div style="margin-top:20rem;"><h1 style="text-align:center; margin-tosubject:subject,p: 400px; background-color:black; color:red;">You have already registered  for this Project.</h1></div></body>`
        );
      }
      if (!internnexusproject) {
        Insta.setKeys(
          "test_ac6c027a59cd53e60732eff67fe",
          "test_356206b1bea68d2bf3eedb9261f"
        );

        var data = new Insta.PaymentData();

        Insta.isSandboxMode(true);

        // data.purpose = "Test";            // REQUIRED
        // data.amount = 9;                  // 1REQUIRED
        // //data.setRedirectUrl(REDIRECT_URL);
        // User.find(function(err, user){

        //     res.render('dashboard',{title : 'dashboard', User : user,username:req.user.email});
        //   });

        data.purpose = req.body.name;
        data.amount = req.body.fees;
        data.buyer_name = req.user.username;
        data.email = req.user.email;
        data.phone = req.user.phone;
        data.send_email = true;
        data.__id = req.user.id;

        data.redirect_url = `https://global-shala.herokuapp.com/bid/cbhot/:id?user_id=${req.user.id}`;
        //sdata.setRedirectUrl(redirectUrl);
        //data.webhook= '/webhook/';
        data.send_sms = true;
        data.allow_repeated_payments = false;
        var query = { _id: req.user.id };
        var projectid = req.body.id;
        var update = { projectid: projectid };
        var options = { new: true };
        User.findOneAndUpdate(query, update, options, function (err, user) {
          console.log(user);
        });
        // Insta.createPayment(data, function(error, response) {
        //   if (error) {
        //     // some error
        //   } else {
        //     // Payment redirection link at response.payment_request.longurl
        //     console.log(response);
        //   }
        // });

        //const data = new Insta.PaymentData();
        //Insta.isSandboxMode(true);

        // data.purpose =  req.body.purpose;
        // data.amount = req.body.amount;
        // data.buyer_name =  req.body.buyer_name;
        // data.redirect_url =  req.body.redirect_url;
        // data.email =  req.body.email;
        // data.phone =  req.body.phone;
        // data.send_email =  false;
        // data.webhook= 'http://www.example.com/webhook/';
        // data.send_sms= false;
        // data.allow_repeated_payments =  false;

        Insta.createPayment(data, function (error, response) {
          if (error) {
            // some error
          } else {
            //Payment redirection link at response.payment_request.longurl
            const responseData = JSON.parse(response);
            const redirectUrl = responseData.payment_request.longurl;
            console.log(redirectUrl);
            console.log(responseData);

            //res.status( 200 ).send( redirectUrl );
            //res.redirect('Location' window.location.href=redirectUrl);
            res.redirect(redirectUrl);
          }
        });
      }
    }
  );
  // }
  // else{
  //     res.send(`<div style="background-color:red"><h1>No Seats Left</h1></div>`)
  // }
});
router.get("/cbhot/:id", (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;
  // let occ = event.seats;
  // console.log(occ);

  if (responseData.payment_id) {
    let userId = responseData.user_id;

    // Save the info that user has purchased the bid.
    const bidData = {};
    // bidData.package = 'Bid100';
    // bidData.bidCountInPack = '1';
    //bidData.occ=parseInt(bitData.seats,10);

    // bidData.occm=parseInt('bitData.seats',10);

    //     if(bidData.occu!=bidData.seats){

    //     bidData.occm = bidData.occu +1;
    //    return bidData.occu;
    //    console.log( bidData.occu );
    // }

    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { hotusercounter: +1 } },
      { new: true }
    )
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));
    User.findOne({ _id: userId }, function (err, user) {
      var projectid = user.projectid;

      Project.findOne({ _id: user.projectid }, function (err, project) {
        var applydate = Date.now();
        var expirydate = applydate + 3600000 * 24 * 7 * project.duration; //for  1 year
        var applydate1 = new Date(applydate).toISOString();
        var expirydate1 = new Date(expirydate).toISOString();
        new Internnexusproject({
          userid: userId,
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
      })
        .then((Project) => res.json(Project))
        .catch((errors) => res.json(errors));
    })
      .then((User) => res.json(User))
      .catch((errors) => res.json(errors));

    // Redirect the user to payment complete page.
    //return res.redirect('http://localhost:3000/payment-complete' );
    return res.redirect("../../users/dashboards");
  }

  /////
  // router.put('/update/:id', function(req, res) {
  //     var query = {"_id": req.params.id};
  //     var update = {name : req.body.name, date : req.body.date, time : req.body.time};
  //     var options = {new: true};
  //     Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
  //       console.log(superhero)
  //       res.render(
  //         'update',
  //         {title : 'Superhero API - ' + superhero.name, superhero : superhero}
  //       );
  //     });
  //   });

  /////
});

// We export the router so that the server.js file can pick it up
module.exports = router;
