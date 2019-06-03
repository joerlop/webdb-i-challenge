const express = require('express');

const server = express();

server.use(express.json());

// your code here

const db = require("./data/accounts-model")

server.post("/api/accounts/", (req, res) => {
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

server.get("/api/accounts/", (req, res) => {
  db.find()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while retrieving accounts from the database"
      });
    });
});

server.get("/api/accounts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while retrieving the account from the database"
      });
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(number => {
      res.status(200).json(number);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while removing the account from the database"
      });
    });
});

server.put("/api/accounts/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  db.update(id, updates)
    .then(number => {
      res.status(200).json(number);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while updating the account"
      });
    });
});

module.exports = server;