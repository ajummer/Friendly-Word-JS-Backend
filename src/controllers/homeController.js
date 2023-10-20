const router = require("express").Router();
const animalService = require("../services/animalService.js");

router.get("/", async (req, res) => {
  const lastThreeAnimals = await animalService.getLastThree().lean();
  res.render("home", { lastThreeAnimals });
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", async (req, res) => {
  let searchCriteria = req.query.name;
  let foundAnimals = await animalService.search(searchCriteria);

  if(foundAnimals == undefined){
    foundAnimals = await animalService.getAll().lean()
  }
  console.log(foundAnimals)

  res.render("search", { foundAnimals });
});

module.exports = router;
