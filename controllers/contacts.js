const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const Contact = db.contacts;

const createContact = async (req, res) => {
  /*
     #swagger.tags = ['contacts']
     #swagger.summary = 'Create a new User'
    */
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });
  // Save Temple in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};
const updateContact = async (req, res) => {
  /*
      #swagger.tags = ['contacts']
      #swagger.summary = 'Updates an existing user'
      */
  if (isEmptyObject(req.body)) {
    res
      .status(400)
      .send({ message: "No Body Content.  Body can not be empty!" });
    return;
  }
  const contact = new Contact({
    _id: new ObjectId(req.body._id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });
  //
  const id = req.params.id;
  Contact.findByIdAndUpdate(id, contact, {})
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({ message: "Contact Updated Successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some error occurred while updating Contact. with id ${id}. Maybe Contact was not found! Error: ${err}`,
      });
    });
};
const deleteContact = async (req, res) => {
  // #swagger.summary = 'Remove an existing user'
  // #swagger.tags = ['contacts']
  const id = req.params.id;
  Contact.findByIdAndDelete(id, {})
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({ message: "Contact Removed!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some error occurred while deleting Contact with id ${id}. Maybe Contact was not found! Error: ${err}`,
      });
    });
};

const getAll = (req, res) => {
  // #swagger.tags = ['contacts']
  // #swagger.description = 'NO API KEY YET'
  Contact.find(
    {},
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      favoriteColor: 1,
      birthday: 1,
      _id: 1,
    },
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error ocurred while retrieving contacts",
      });
    });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['contacts']
  const contactId = new ObjectId(req.params.id);
  Contact.find(
    { _id: contactId },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      favoriteColor: 1,
      birthday: 1,
      _id: 1,
    },
  )
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "No contacts found with id:" + contactId });
      } else {
        res.status(200).send({ data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error ocurred while retrieving contacts",
      });
    });
};

module.exports = {
  getAll,
  getSingle,
  createContact: createContact,
  updateContact: updateContact,
  deleteContact: deleteContact,
};
function isEmptyObject(obj) {
  // First, ensure `obj` is indeed an object before checking its keys
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }
  return false;
}
