const Planet = require("../models/Planet");

const getPlanets = async (req, res) => {
  try {
    const planets = await Planet.find().sort({ technologyLevel: -1 });
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) return res.status(404).json({ message: "Planet not found" });
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getPlanets, getPlanetById };
