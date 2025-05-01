const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const upload = require("../imageUpload");

// Get portfolio data
const getPortfolioData = () => {
  const dataPath = path.join(__dirname, "..", "data", "portfolio.json");
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Get all portfolio items
router.get("/", (req, res) => {
  const portfolioData = getPortfolioData();
  res.json(portfolioData);
});

// Get portfolio item by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const portfolioData = getPortfolioData();
  const item = portfolioData.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Portfolio item not found" });
  }

  res.json(item);
});

// Get portfolio items by type
router.get("/type/:type", (req, res) => {
  const type = req.params.type;
  const portfolioData = getPortfolioData();
  const items = portfolioData.filter((item) => item.type === type);

  res.json(items);
});

// Create new portfolio item
// router.post("/", upload.single("image"), (req, res) => {
//   const portfolioData = getPortfolioData();

//   // Get highest id and increment
//   const maxId = Math.max(...portfolioData.map((item) => item.id), 0);
//   const newId = maxId + 1;

//   // Create new item
//   const newItem = {
//     id: newId,
//     imageUrl: req.file ? `/images/portfolio/${req.file.filename}` : null,
//     title: req.body.title,
//     type: req.body.type,
//     // Conditionally add other fields based on type
//     ...(req.body.type === "website" && {
//       url: req.body.url,
//       icon: req.body.icon || "globe",
//     }),
//     ...(req.body.type === "app" && {
//       googlePlayUrl: req.body.googlePlayUrl,
//       appStoreUrl: req.body.appStoreUrl,
//     }),
//     ...(req.body.type === "youtube" && {
//       youtubeUrl: req.body.youtubeUrl,
//     }),
//     ...(req.body.type === "technology" && {
//       technologies: JSON.parse(req.body.technologies || "[]"),
//     }),
//   };

//   // Add to portfolio data
//   portfolioData.push(newItem);
//   savePortfolioData(portfolioData);

//   res.status(201).json(newItem);
// });

// // Update portfolio item
// router.put("/:id", upload.single("image"), (req, res) => {
//   const id = parseInt(req.params.id);
//   const portfolioData = getPortfolioData();
//   const itemIndex = portfolioData.findIndex((item) => item.id === id);

//   if (itemIndex === -1) {
//     return res.status(404).json({ message: "Portfolio item not found" });
//   }

//   // Update item
//   portfolioData[itemIndex] = {
//     ...portfolioData[itemIndex],
//     title: req.body.title || portfolioData[itemIndex].title,
//     type: req.body.type || portfolioData[itemIndex].type,
//     imageUrl: req.file
//       ? `/images/portfolio/${req.file.filename}`
//       : portfolioData[itemIndex].imageUrl,
//     // Update other fields based on type
//     ...(req.body.type === "website" && {
//       url: req.body.url,
//       icon: req.body.icon || "globe",
//     }),
//     ...(req.body.type === "app" && {
//       googlePlayUrl: req.body.googlePlayUrl,
//       appStoreUrl: req.body.appStoreUrl,
//     }),
//     ...(req.body.type === "youtube" && {
//       youtubeUrl: req.body.youtubeUrl,
//     }),
//     ...(req.body.type === "technology" && {
//       technologies: req.body.technologies
//         ? JSON.parse(req.body.technologies)
//         : portfolioData[itemIndex].technologies,
//     }),
//   };

//   savePortfolioData(portfolioData);

//   res.json(portfolioData[itemIndex]);
// });

// // Delete portfolio item
// router.delete("/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const portfolioData = getPortfolioData();
//   const itemIndex = portfolioData.findIndex((item) => item.id === id);

//   if (itemIndex === -1) {
//     return res.status(404).json({ message: "Portfolio item not found" });
//   }

//   // Delete image file if it exists
//   const imageUrl = portfolioData[itemIndex].imageUrl;
//   if (imageUrl) {
//     const imagePath = path.join(__dirname, "..", "public", imageUrl);
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//     }
//   }

//   // Remove item from array
//   portfolioData.splice(itemIndex, 1);
//   savePortfolioData(portfolioData);

//   res.json({ message: "Portfolio item deleted successfully" });
// });

module.exports = router;
