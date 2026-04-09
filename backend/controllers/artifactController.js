const Artifact = require("../models/Artifact");

const getArtifacts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { originPlanet: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const artifacts = await Artifact.find(query).sort({ createdAt: -1 });
    res.json(artifacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getArtifactById = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.json(artifact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createArtifact = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      category,
      originPlanet,
      discoveredYear,
      rarity,
    } = req.body;

    const artifact = await Artifact.create({
      name,
      description,
      image: image || (req.file ? `/uploads/${req.file.filename}` : ""),
      category,
      originPlanet,
      discoveredYear,
      rarity,
    });

    res.status(201).json(artifact);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
};

const updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true },
    );

    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    res.json(artifact);
  } catch (error) {
    res.status(400).json({ message: "Update error", error: error.message });
  }
};

const deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.json({ message: "Artifact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
};
