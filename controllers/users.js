﻿const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("Contacts").find();
  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .find({ _id: userId });
  result
    .toArray()
    .then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
};

module.exports = { getAll, getSingle };
