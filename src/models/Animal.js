const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !"],
  },
  years: {
    type: Number,
    required: [true, "Years are required"],
  },
  kind: {
    type: String,
    required: [true, "Kind is required"],
  },
  image: {
    type: String,
    required: [true, "Image  is required"],
  },
  need: {
    type: String,
    required: [true, "Need is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  donations: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
