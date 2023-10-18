const router = require("express").Router();

router.get("/" ,(req,res) => {
    res.render("animals")
})

module.exports = router;
