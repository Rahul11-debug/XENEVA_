const express = require("express");
const router = express.Router();
const {
  getPlanets,
  getPlanetById,
} = require("../controllers/planetController");

router.get("/", getPlanets);
router.get("/:id", getPlanetById);

module.exports = router;
