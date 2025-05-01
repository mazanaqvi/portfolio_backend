// deploy.js - Simple deployment script
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Function to run shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

// Create .env file for production
fs.writeFileSync(
  path.join(__dirname, ".env"),
  `PORT=5000\nNODE_ENV=production`
);

console.log("Starting deployment...");

// Install dependencies
console.log("Installing dependencies...");
if (!runCommand("npm install --production")) {
  console.error("Failed to install dependencies");
  process.exit(1);
}

// Create necessary directories
console.log("Creating necessary directories...");
const dirs = [
  path.join(__dirname, "data"),
  path.join(__dirname, "public", "images", "portfolio"),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

console.log("Deployment completed successfully!");
console.log("Run the server with: npm start");
