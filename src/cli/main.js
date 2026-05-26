const fs = require("fs");
const path = require("path");
const PricingEngine = require("../models/PricingEngine");
const { COMPONENT_LABELS } = require("../data/parts");

// Read the input file 
const inputFilePath = process.argv[2];

if (!inputFilePath) {
    console.error("Usage: node src/cli/main.js <input.json>");
    console.error("Example: node src/cli/main.js input.json");
    process.exit(1);
}

let input;
try {
    const raw = fs.readFileSync(path.resolve(inputFilePath), "utf-8");
    input = JSON.parse(raw);
} catch (err) {
    console.error("Could not read or parse input file:", err.message);
    process.exit(1);
}

const { date, parts } = input;

if (!date || !parts || !Array.isArray(parts)) {
    console.error('Input file must have a "date" string and a "parts" array.');
    process.exit(1);
}

// Run the engine
const engine = new PricingEngine();
const result = engine.calculate(parts, date);

// Print the breakdown 
const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
});

console.log(`\nCycle Price Breakdown — ${formattedDate}`);
console.log("─".repeat(40));

for (const [component, total] of Object.entries(result.breakdown)) {
    const label = COMPONENT_LABELS[component] || component;
    // Pad label to 22 chars so columns align
    console.log(`${label.padEnd(22)}: ₹${total.toLocaleString("en-IN")}`);
}

console.log("─".repeat(40));
console.log(`${"TOTAL".padEnd(22)}: ₹${result.total.toLocaleString("en-IN")}`);

// Print any errors
if (result.errors.length > 0) {
    console.log("\nWarnings:");
    result.errors.forEach(e => console.log("  ⚠", e));
}

console.log();