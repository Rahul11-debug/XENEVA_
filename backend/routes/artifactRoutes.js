const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
} = require("../controllers/artifactController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `artifact-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()))
      cb(null, true);
    else cb(new Error("Only images allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", getArtifacts);
router.get("/:id", getArtifactById);

router.post("/", protect, adminOnly, upload.single("image"), createArtifact);
router.put("/:id", protect, adminOnly, upload.single("image"), updateArtifact);
router.delete("/:id", protect, adminOnly, deleteArtifact);

module.exports = router;
