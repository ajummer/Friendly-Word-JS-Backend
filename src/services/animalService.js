const Animal = require("../models/Animal.js");

exports.create = (animalData) => Animal.create(animalData)

exports.getAll = () => Animal.find()