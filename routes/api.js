const routena = require("express").Router();
const Transfiction = require("../models/transaction.js");

routena.post("/api/transaction", ({body}, res) => {
    Transfiction.create(body)
    .then(dbTransfiction => {
      res.json(dbTransfiction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

routena.post("/api/transaction/bulk", ({body}, res) => {
    Transfiction.insertMany(body)
    .then(dbTransfiction => {
      res.json(dbTransfiction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

routena.get("/api/transaction", (req, res) => {
    Transfiction.find({}).sort({date: -1})
    .then(dbTransfiction => {
      res.json(dbTransfiction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = routena;