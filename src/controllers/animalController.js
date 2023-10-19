const router = require("express").Router();
const animalService = require("../services/animalService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");
router.get("/", async (req, res) => {
  const animals = await animalService.getAll().lean();
  res.render("animals", { animals });
});

router.get("/create", (req, res) => {
  res.render("animals/create");
});

router.post("/create", async (req, res) => {
  const { name, years, kind, image, need, location, description } = req.body;
  try {
    await animalService.create({
      name,
      years: Number(years),
      kind,
      image,
      need,
      location,
      description,
      owner: req.user._id,
    });
    res.redirect("/");
  } catch (err) {
    res.render("animals/create", { err: getErrorMessage(err) });
  }
});

router.get("/details/:animalId", async (req, res) => {
  const animalId = req.params.animalId;
  try {
    const animal = await animalService.getSingle(animalId).lean();
    const isOwner = req.user?._id == animal.owner._id;

    res.render("animals/details", { animal, isOwner });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.get("/details/:animalId/delete", async (req, res) => {
  const animalId = req.params.animalId;

  await animalService.delete(animalId);
  res.redirect(`/animals`);
});

router.get("/details/:animalId/edit", async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const animal = await animalService.getSingle(animalId).lean();
    res.render("animals/edit", { animal });
  } catch (err) {
    res.render("animals/edit", { error: getErrorMessage(err) });
  }
});

router.post("/details/:animalId/edit", async (req, res) => {
  const animalId = req.params.animalId;
  const { name, years, kind, image, need, location, description } = req.body;
  const animal = {
    name: name,
    years: Number(years),
    kind: kind,
    image: image,
    need: need,
    location: location,
    description: description,
  };
  try {
    const updatedAnimal = await animalService.update(animalId, animal);
    await updatedAnimal.save();
    res.redirect(`/animals/details/${animalId}`)
  } catch (err) {
    res.render("animals/edit", { error: getErrorMessage(err) });
  }
});

module.exports = router;
