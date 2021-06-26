const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

db.createCollection("counters")
db.counters.insert({
  "mid":"id",
  "sequence_value": 0
})

function getNextSequenceValue(sequenceName){
  var sequenceDocument = db.counters.findAndModify({
     query:{_id: sequenceName },
     update: {$inc:{sequence_value:1}},
     new:true
  });
  return sequenceDocument.sequence_value;
}
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
    mid:getNextSequenceValue("id"),
    toreceiver: req.body.toreceiver,
    cc: req.body.cc,
    subject: req.body.subject,
    mbody:req.body.mbody,
    schedule:req.body.schedule
  };
  db_connect.collection("maildata").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
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
