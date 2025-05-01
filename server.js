// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Portfolio data file path
const portfolioFile = path.join(dataDir, "portfolio.json");

// Initialize portfolio.json with your data if it doesn't exist
if (!fs.existsSync(portfolioFile)) {
  const portfolioData = [
    {
      id: 1,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124166/port0_xxrdbo.png",
      title: "CRM Website",
      type: "website",
      url: "https://app.salesbuckets.com/",
      icon: "globe",
    },
    {
      id: 2,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124167/port10_llfiqa.png",
      title: "Eclaim  App",
      type: "app",
      googlePlayUrl:
        "https://play.google.com/store/apps/details?id=com.fujitec.fujitec_eclaim",
      appStoreUrl:
        "https://apps.apple.com/pk/app/engagenova-eclaims/id1556445883",
    },
    {
      id: 3,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124167/port12_bd4bew.png",
      title: "Crypto Website",
      type: "website",
      url: "https://bitbuddy.ai/",
      icon: "globe",
    },
    {
      id: 4,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124168/port11_t2rvsi.png",
      title: "Moshaf ul Quran",
      type: "app",
      googlePlayUrl:
        "https://play.google.com/store/apps/details?id=kw.gov.qsa.quranapp&hl=ur",
      appStoreUrl:
        "https://apps.apple.com/us/app/kuwait-quran-%D9%85%D8%B5%D8%AD%D9%81-%D8%AF%D9%88%D9%84%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA/id1661634739",
    },
    {
      id: 5,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124165/port2_xnqy7f.png",
      title: "Mashrab e Naab",
      type: "app",
      googlePlayUrl:
        "https://play.google.com/store/apps/details?id=com.azaan.mashrabenaab",
      appStoreUrl: "https://apps.apple.com/pk/app/mashrab-e-naab/id6443939739",
    },
    {
      id: 6,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124166/port5_mcdxvm.png",
      title: "My Black Market",
      type: "app",
      googlePlayUrl:
        "https://play.google.com/store/apps/details?id=com.myblackmarkete.cypto_app",
      appStoreUrl: "https://apps.apple.com/pk/app/my-black-market/id6446054554",
    },
    {
      id: 7,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124167/port7_plpilf.png",
      title: "Ski Maps",
      type: "youtube",
      youtubeUrl:
        "https://www.youtube.com/watch?v=EBiEi_3AOkc&ab_channel=AliHamza",
    },
    {
      id: 8,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124166/port4_lvtpja.png",
      title: "Quiz Wizard ",
      type: "technology",
      technologies: ["Flutter", "Material UI Kit"],
    },
    {
      id: 9,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124166/port6_jslxgc.png",
      title: "Qoutes App",
      type: "technology",
      technologies: ["Flutter", "Firebase"],
    },
    {
      id: 10,
      imageUrl:
        "https://res.cloudinary.com/dlmy9i9nn/image/upload/v1746124167/port1_yryzxi.png",
      title: "Hair Tech 360",
      type: "technology",
      technologies: ["Flutter", "Firebase", "Machine Learning API"],
    },
  ];

  // Save to portfolio.json
  fs.writeFileSync(portfolioFile, JSON.stringify(portfolioData, null, 2));
}

// Get portfolio data function
const getPortfolioData = () => {
  const rawData = fs.readFileSync(portfolioFile);
  return JSON.parse(rawData);
};

// Routes
// GET all portfolio items
app.get("/api/portfolio", (req, res) => {
  const portfolioData = getPortfolioData();
  res.json(portfolioData);
});

// GET portfolio item by id
app.get("/api/portfolio/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const portfolioData = getPortfolioData();
  const item = portfolioData.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Portfolio item not found" });
  }

  res.json(item);
});

// GET portfolio items by type
app.get("/api/portfolio/type/:type", (req, res) => {
  const type = req.params.type;
  const portfolioData = getPortfolioData();
  const items = portfolioData.filter((item) => item.type === type);

  res.json(items);
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

// Start the server if not in production (Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
