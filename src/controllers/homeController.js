const router = require("express").Router();
const animalService = require("../services/animalService.js");

router.get("/", async (req, res) => {
  const lastThreeAnimals = await animalService.getLastThree().lean();
  res.render("home", { lastThreeAnimals });
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
