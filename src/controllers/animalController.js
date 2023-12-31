const router = require("express").Router();
const animalService = require("../services/animalService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");
const { isAuth } = require("../middlewares/authMiddleware.js");

router.get("/", async (req, res) => {
  const animals = await animalService.getAll().lean();
  res.render("animals", { animals });
});

router.get("/create", isAuth, (req, res) => {
  res.render("animals/create");
});

router.post("/create", isAuth, async (req, res) => {
  try {
    const animalData = await animalService.create({
      ...req.body,
      owner: req.user._id,
    });
    res.redirect("/");
  } catch (err) {
    res.render("animals/create", { error: getErrorMessage(err) });
  }
});

router.get("/details/:animalId", async (req, res) => {
  const animalId = req.params.animalId;
  try {
    const animal = await animalService.getSingle(animalId).lean();
    const isOwner = req.user?._id == animal.owner._id;

    const isDonated = animal.donations.some((x) => x.user == req.user?._id);

    res.render("animals/details", { animal, isOwner, isDonated });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.get("/details/:animalId/delete", isAuth, async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const animal = await animalService.getSingle(animalId).lean();
    if(animal.owner._id == req.user._id){
      await animalService.delete(animalId);
    } else {
      res.redirect("/404")
    }
  } catch (err) {
    res.render(`/animals/details/${animalId}`, {
      error: "Unsuccessfull attempt to delete the post!",
    });
  }
});

router.get("/details/:animalId/edit", isAuth, async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const animal = await animalService.getSingle(animalId).lean();
    if (animal.owner._id == req.user._id) {
      res.render("animals/edit", { animal });
    } else {
      res.redirect("/404");
    }
  } catch (err) {
    res.render("animals/edit", { error: getErrorMessage(err) });
  }
});

router.post("/details/:animalId/edit", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const animal = req.body;

  try {
    const updatedAnimal = await animalService.update(animalId, animal);
    await updatedAnimal.save();
    res.redirect(`/animals/details/${animalId}`);
  } catch (err) {
    console.log(err);
    res.render(`animals/edit`, { animal, error: getErrorMessage(err) });
  }
});

router.get("/details/:animalId/donate", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const user = req.user._id;

  try {
    await animalService.donate(animalId, { user });
    res.redirect(`/animals/details/${animalId}`);
  } catch (err) {
    res.render("animals/details", { error: getErrorMessage(err) });
  }
});

module.exports = router;
