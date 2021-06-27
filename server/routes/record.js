const express = require("express");
const nodemailer = require("nodemailer");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");



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
    schedule:req.body.schedule
  };
  db_connect.collection("maildata").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });

  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'catchtheholic@gmail.com',
          pass: 'highrunner2'
      }
  });
    
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
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
  }
  
  main().catch(console.error);

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
      schedule:req.body.schedule
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
