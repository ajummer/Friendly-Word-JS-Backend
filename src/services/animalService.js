const Animal = require("../models/Animal.js");
const mongoose = require("mongoose");

exports.create = (animalData) => {
  return Animal.create(animalData);
};

exports.getAll = () => Animal.find();

exports.getSingle = (animalId) => {
  const animal = Animal.findById(animalId);
  return animal;
};

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.update = (animalId, animal) => {
  const animalUpdated = Animal.findByIdAndUpdate(animalId, animal, {
    new: true,
    runValidators: true,
  });
  return animalUpdated;
};

exports.getLastThree = () => Animal.find().limit(3).sort({ _id: -1 });

exports.donate = async (animalId, user) => {
  const animal =  await Animal.findById(animalId);
  animal.donations.push(user)
  return animal.save()
};
