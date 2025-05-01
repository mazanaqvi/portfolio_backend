// server.js - Updated with routes
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const portfolioRoutes = require("./routes/portfolio");
const app = express();
const PORT = process.env.PORT || 7900;

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Create public/images/portfolio directory if it doesn't exist
const uploadDir = path.join(__dirname, "public", "images", "portfolio");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Initialize portfolio data if it doesn't exist
const portfolioFile = path.join(dataDir, "portfolio.json");
if (!fs.existsSync(portfolioFile)) {
  // Your initial portfolio data (modified with imageUrl instead of image)
  const initialData = [
    {
      id: 1,
      imageUrl: "/images/portfolio/port0.png",
      title: "CRM Website",
      type: "website",
      url: "https://app.salesbuckets.com/",
      icon: "globe",
    },
    // ...rest of your portfolio items
  ];

  fs.writeFileSync(portfolioFile, JSON.stringify(initialData, null, 2));
}

// Routes
app.use("/api/portfolio", portfolioRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Portfolio API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
