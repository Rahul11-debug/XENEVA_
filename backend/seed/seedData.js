require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

const User = require("../models/User");
const Artifact = require("../models/Artifact");
const Planet = require("../models/Planet");
const Quiz = require("../models/Quiz");
console.log(process.env.MONGO_URI);
const artifacts = [
  {
    name: "Xenon Pulse Emitter",
    description:
      "A hand-held energy device capable of emitting focused plasma bursts. Used by Xenova warriors during the Great Expansion era. The internal crystal matrix still resonates faintly with residual energy.",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500",
    category: "Weapon",
    originPlanet: "Xerath Prime",
    discoveredYear: 2187,
    rarity: "Legendary",
  },
  {
    name: "Stellar Navigation Orb",
    description:
      "A translucent sphere containing a holographic star map of the Xenova galaxy cluster. When activated, it projects real-time stellar positions. Discovered in the ruins of Velthar Station.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    category: "Navigation",
    originPlanet: "Velthar",
    discoveredYear: 2203,
    rarity: "Legendary",
  },
  {
    name: "Neural Resonance Helm",
    description:
      "A bio-neural interface device worn on the cranium. Allowed Xenova scientists to directly interface with their computational networks. The organic components remain partially active.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    category: "Technology",
    originPlanet: "Nexara",
    discoveredYear: 2195,
    rarity: "Rare",
  },
  {
    name: "Ceremonial Soul Vessel",
    description:
      "An ornate container used in Xenova burial rituals. Believed to house the consciousness of the deceased for eternity. Inscribed with glyphs from the ancient Xenova language.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    category: "Ritual",
    originPlanet: "Keth'ara",
    discoveredYear: 2211,
    rarity: "Rare",
  },
  {
    name: "Quantum Communicator",
    description:
      "Enables instantaneous communication across galactic distances using quantum entanglement. The paired unit was never recovered. This device could revolutionize human communication technology.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    category: "Communication",
    originPlanet: "Xerath Prime",
    discoveredYear: 2199,
    rarity: "Legendary",
  },
  {
    name: "Living Metal Symbiont",
    description:
      "A bio-mechanical organism that merges with its host to enhance physical capabilities. The organism is dormant but still biologically active. Handle with extreme caution.",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=500",
    category: "Biology",
    originPlanet: "Morphis IV",
    discoveredYear: 2218,
    rarity: "Legendary",
  },
  {
    name: "Void Crystal Shard",
    description:
      "A fragment from a collapsed dark matter star. The Xenova used these crystals as power sources for their most advanced technology. Emits a faint gravitational anomaly.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500",
    category: "Technology",
    originPlanet: "Unknown",
    discoveredYear: 2224,
    rarity: "Legendary",
  },
  {
    name: "Temporal Echo Device",
    description:
      "A mysterious artifact that replays events from its surrounding area across a 100-year window. The mechanism by which it records temporal data remains completely unknown to modern science.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500",
    category: "Unknown",
    originPlanet: "Keth'ara",
    discoveredYear: 2230,
    rarity: "Legendary",
  },
  {
    name: "Xenova War Banner",
    description:
      "A woven flag made from iridescent bio-silk, displaying the crest of the Xenova High Council. The colors shift depending on viewing angle due to nano-scale optical structures in the fabric.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500",
    category: "Ritual",
    originPlanet: "Xerath Prime",
    discoveredYear: 2191,
    rarity: "Common",
  },
  {
    name: "Acoustic Pulse Cannon",
    description:
      "A sonic weapon that generates destructive resonance frequencies. Can shatter crystalline structures at molecular level. Found in a Xenova military outpost on asteroid belt X-7.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500",
    category: "Weapon",
    originPlanet: "Velthar",
    discoveredYear: 2208,
    rarity: "Rare",
  },
];

const planets = [
  {
    name: "Xerath Prime",
    description:
      "The homeworld of the Xenova civilization. A massive terrestrial planet with a dense atmosphere rich in xenon gas, giving its sky a deep violet hue. Once host to billions, now a desolate archive of their greatest achievements.",
    location: "Sector 1, Galactic Core, Andromeda Spiral",
    technologyLevel: 10,
    color: "#7c3aed",
    radius: 80,
    population: "Extinct (peak: 12 billion)",
  },
  {
    name: "Velthar",
    description:
      "A cold oceanic world covered entirely in liquid xenon seas. The Xenova built vast underwater cities here during the Golden Age. The ruins are still visible from orbit.",
    location: "Sector 2, Outer Rim, Andromeda Spiral",
    technologyLevel: 8,
    color: "#0891b2",
    radius: 65,
    population: "Extinct (peak: 4 billion)",
  },
  {
    name: "Nexara",
    description:
      "A silicon-based world with towering crystal formations that acted as natural quantum processors. The Xenova built their greatest research facilities here, pushing the boundaries of science and consciousness.",
    location: "Sector 3, Mid-Rim, Andromeda Spiral",
    technologyLevel: 9,
    color: "#16a34a",
    radius: 55,
    population: "Extinct (peak: 2 billion)",
  },
  {
    name: "Keth'ara",
    description:
      "A binary star system planet with extreme temperature variations. The Xenova colonized this harsh world during the Expansion era, developing technologies to survive its brutal environment.",
    location: "Sector 5, Binary Star System, Andromeda Spiral",
    technologyLevel: 7,
    color: "#dc2626",
    radius: 45,
    population: "Extinct (peak: 800 million)",
  },
  {
    name: "Morphis IV",
    description:
      "An organic world where the entire biosphere is one interconnected living entity. The Xenova studied its unique biology to develop their bio-mechanical technologies.",
    location: "Sector 6, Outer Nebula, Andromeda Spiral",
    technologyLevel: 6,
    color: "#d97706",
    radius: 50,
    population: "Non-sentient life remains",
  },
  {
    name: "Void Station Omega",
    description:
      "Not a planet but a massive artificial construct built in deep space. This station was the Xenova's last refuge during the Decline era. Its current location is classified.",
    location: "Deep Space, Uncharted Territory",
    technologyLevel: 10,
    color: "#475569",
    radius: 35,
    population: "Unknown",
  },
];

const quizQuestions = [
  {
    question: "What is the homeworld of the Xenova civilization?",
    options: ["Velthar", "Nexara", "Xerath Prime", "Keth'ara"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    question: "During which era did the Xenova civilization reach its peak?",
    options: ["Origin Era", "Expansion Era", "Decline Era", "Golden Age"],
    correctAnswer: 3,
    difficulty: "Easy",
  },
  {
    question: "What type of atmosphere does Xerath Prime have?",
    options: [
      "Oxygen-rich",
      "Dense xenon atmosphere",
      "Nitrogen-methane mix",
      "Carbon dioxide",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    question: "Which Xenova planet is described as an entirely oceanic world?",
    options: ["Morphis IV", "Nexara", "Keth'ara", "Velthar"],
    correctAnswer: 3,
    difficulty: "Medium",
  },
  {
    question:
      "What technology level does Xerath Prime hold on the scale of 1-10?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 3,
    difficulty: "Easy",
  },
  {
    question: "The Quantum Communicator operates using which principle?",
    options: [
      "Radio waves",
      "Quantum entanglement",
      "Tachyon particles",
      "Neural resonance",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    question:
      "What makes the crystal formations on Nexara scientifically significant?",
    options: [
      "They contain diamonds",
      "They are natural quantum processors",
      "They emit light",
      "They are edible",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    question: "What is the rarity classification of the Xenon Pulse Emitter?",
    options: ["Common", "Uncommon", "Rare", "Legendary"],
    correctAnswer: 3,
    difficulty: "Easy",
  },
  {
    question: "Which artifact can replay events from the past 100 years?",
    options: [
      "Neural Resonance Helm",
      "Void Crystal Shard",
      "Temporal Echo Device",
      "Stellar Navigation Orb",
    ],
    correctAnswer: 2,
    difficulty: "Medium",
  },
  {
    question: "What was Void Station Omega used for?",
    options: [
      "Scientific research",
      "Military operations",
      "Last refuge during Decline",
      "Trade hub",
    ],
    correctAnswer: 2,
    difficulty: "Hard",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting database seed...");

    await User.deleteMany({});
    await Artifact.deleteMany({});
    await Planet.deleteMany({});
    await Quiz.deleteMany({});

    await User.create({
      username: "xenova_admin",
      password: "admin123",
      role: "admin",
    });
    console.log(
      "✅ Admin user created: username=xenova_admin, password=admin123",
    );

    await Artifact.insertMany(artifacts);
    console.log(`✅ ${artifacts.length} artifacts seeded`);

    await Planet.insertMany(planets);
    console.log(`✅ ${planets.length} planets seeded`);

    await Quiz.insertMany(quizQuestions);
    console.log(`✅ ${quizQuestions.length} quiz questions seeded`);

    console.log("\n🚀 Database seeded successfully!");
    console.log("Admin credentials: xenova_admin / admin123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();
