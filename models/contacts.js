module.exports = (mongoose) => {
  return mongoose.model(
    "contact",
    mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      favoriteColor: String,
      birthday: String,
    }),
    "Contacts",
  );
};
