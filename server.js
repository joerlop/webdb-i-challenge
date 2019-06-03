const express = require('express');

const server = express();

// your code here

const db = require("./data/accounts-model")

server.post("/api/acounts/", (req, res) => {
  const account = req.body;

  db.add(account)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the account to the database"
      });
    });
});

server.get("/api/acounts/", (req, res) => {
  db.find()
    .then(accounts => {
      res.status(201).json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while retrieving accounts from the database"
      });
    });
});

server.get("/api/acounts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while retrieving the account from the database"
      });
    });
});

server.delete("/api/acounts/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(number => {
      res.status(201).json(number);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while removing the account from the database"
      });
    });
});

server.put("/api/acounts/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  db.remove(id, updates)
    .then(number => {
      res.status(201).json(number);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while updating the account"
      });
    });
});

module.exports = server;