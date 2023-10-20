const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !"],
    minLength: [2, "Name must be at least 2 characters"],
  },
  years: {
    type: Number,
    required: [true, "Years are required"],
    min: [1, "Year must be at least 1"],
    max: [100, "Year can't be greater than 100"],
  },
  kind: {
    type: String,
    required: [true, "Kind is required"],
    minLength: [3, "Kind must be at least 3 characters"],
  },
  image: {
    type: String,
    required: [true, "Image  is required"],
    match: [/^(http|https):\/\//, "Invalid url"],
  },
  need: {
    type: String,
    required: [true, "Need is required"],
    minLength: [3, "Need must be at least 3 characters"],
    maxLength: [20, "Need must be less than 20 characters"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: [5, "Location must be at least 5 characters"],
    maxLength: [15, "Location must be less than 15 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [5, "Description must be at least 5 characters"],
    maxLength: [50, "Need must be less than 50 characters"],
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
