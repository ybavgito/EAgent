const express = require("express");
const nodemailer = require("nodemailer");
//const schedule= require('node-schedule');
let cron = require('node-cron');


// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

recordRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("user");
 
  let myobj = {
    email: req.body.email,
    pwd: req.body.pwd,
  };
  db_connect.collection("maildata").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });

});

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("smail");
  db_connect
    .collection("maildata")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, res) {
  let db_connect = dbo.getDb("smail");
 
  let myobj = {
    toreceiver: req.body.toreceiver,
    cc: req.body.cc,
    subject: req.body.subject,
    mbody:req.body.mbody,
    schedules:req.body.schedules
  };
  db_connect.collection("maildata").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });


  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'catchtheholic@gmail.com',
          pass: 'highrunner2'
      }
  });

  console.log("schedule: %s", req.body.schedules);
  switch(req.body.schedules) {
    case "Recurring schedule":
      cron.schedule('*/20 * * * *', () => {
        // Send e-mail
      
        // send mail with defined transport object
        let info =  transporter.sendMail({
          from: '', // sender address
          to: req.body.toreceiver, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.mbody, // plain text body
          html: "<b>Mail sent</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
      });
      break;
    case "Weekly schedule":
      cron.schedule('* * * * *', () => {
        // Send e-mail
      
        // send mail with defined transport object
        let info =  transporter.sendMail({
          from: '', // sender address
          to: req.body.toreceiver, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.mbody, // plain text body
          html: "<b>Mail sent</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
      });
      
      break;
      
    case "Monthly schedule":
      cron.schedule('* * * */1 *', () => {
        // Send e-mail
      
        // send mail with defined transport object
        let info =  transporter.sendMail({
          from: '', // sender address
          to: req.body.toreceiver, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.mbody, // plain text body
          html: "<b>Mail sent</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
      });
      
      break;

    case "Yearly schedule":
      cron.schedule('* * * */12 *', () => {
        // Send e-mail
      
        // send mail with defined transport object
        let info =  transporter.sendMail({
          from: '', // sender address
          to: req.body.toreceiver, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.mbody, // plain text body
          html: "<b>Mail sent</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
      });
      
      break;


    default:
      cron.schedule('* * * * *', () => {
        // Send e-mail
      
        // send mail with defined transport object
        let info =  transporter.sendMail({
          from: '', // sender address
          to: req.body.toreceiver, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.mbody, // plain text body
          html: "<b>Mail sent</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
      });
      
  } 
  
    
  
});


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("smail");
  let myquery = { mid: req.body.mid };
  let newvalues = {
    $set: {
      recipient: req.body.recipient,
      cc: req.body.cc,
      subject: req.body.subject,
      mbody:req.body.mbody,
      schedules:req.body.schedules
    },
  };
  db_connect
    .collection("maildata")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});

// This section will help you delete a record
recordRoutes.route("/:mid").delete((req, res) => {
  let db_connect = dbo.getDb("smail");
  var myquery = { id: req.body.id };
  db_connect.collection("maildata").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
});

module.exports = recordRoutes;
