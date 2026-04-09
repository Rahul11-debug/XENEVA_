const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artifact name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Weapon",
        "Communication",
        "Navigation",
        "Ritual",
        "Technology",
        "Biology",
        "Unknown",
      ],
    },
    originPlanet: {
      type: String,
      required: true,
    },
    discoveredYear: {
      type: Number,
      required: true,
    },
    rarity: {
      type: String,
      enum: ["Common", "Rare", "Legendary"],
      default: "Common",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Artifact", artifactSchema);
