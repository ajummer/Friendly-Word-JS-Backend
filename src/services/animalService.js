const Animal = require("../models/Animal.js");
const mongoose = require("mongoose");

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getSingle = (animalId) => {

  const animal = Animal.findById(animalId);
  return animal;
};

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId)
