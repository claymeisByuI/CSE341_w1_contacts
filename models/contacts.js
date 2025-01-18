const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String,
});
module.exports = (mongoose) => {
  return mongoose.model("contact", contactSchema, "Contacts");
};
