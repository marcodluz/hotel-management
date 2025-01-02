const { execSync } = require("child_process");
const fs = require("fs");

function updateProgress(step, totalSteps) {
  const progress = Math.round((step / totalSteps) * 100);
  const barLength = 50;
  const filledLength = Math.round((progress / 100) * barLength);
  const bar = "=".repeat(filledLength) + "-".repeat(barLength - filledLength);
  process.stdout.write(`\r[${bar}] ${progress}%`);
}

try {
  console.log("Preparing application. Please wait...");

  const totalSteps = 5;
  let currentStep = 0;

  // Step 1: Install dependencies
  execSync("npm install", { stdio: "ignore" });
  updateProgress(++currentStep, totalSteps);

  // Step 2: Build the project
  execSync("npm run build", { stdio: "ignore" });
  updateProgress(++currentStep, totalSteps);

  // Step 3: Verify build output
  const distFile = "dist/app/index.js";
  if (!fs.existsSync(distFile)) {
    console.error(`\nSetup failed: ${distFile} not found.`);
    process.exit(1);
  }
  updateProgress(++currentStep, totalSteps);

  // Step 4: Make the script executable
  execSync("chmod +x dist/app/index.js");
  updateProgress(++currentStep, totalSteps);

  // Step 5: Create global symlink
  execSync("npm link", { stdio: "ignore" });
  updateProgress(++currentStep, totalSteps);

  console.log("\nSetup complete! You can now run the application using:");
  console.log("  myapp --hotels hotels.json --bookings bookings.json");
} catch (error) {
  console.error("\nAn error occurred during setup. Please try again.");
  process.exit(1);
}
