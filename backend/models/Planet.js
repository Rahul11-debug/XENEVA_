const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    technologyLevel: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    color: {
      type: String,
      default: "#00f3ff",
    },
    radius: {
      type: Number,
      default: 50,
    },
    population: {
      type: String,
      default: "Unknown",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Planet", planetSchema);
