const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

// Get the sheet name from the command-line arguments
const sheetName = process.argv[2];

if (!sheetName) {
  console.error("Please provide a sheet name as an argument.");
  process.exit(1); // Exit with error code
}

const dataPathExcel = "cypress/fixtures/test-data.xlsx";
const workbook = xlsx.readFile(dataPathExcel);

if (!workbook.SheetNames.includes(sheetName)) {
  console.error(`Sheet "${sheetName}" not found in the workbook.`);
  process.exit(1);
}

const sheetData = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(sheetData); // Convert specified sheet to JSON

const outputFilePath = path.join("cypress/fixtures", `${sheetName}.json`); // Output file name

// Write JSON to a file
fs.writeFile(
  outputFilePath,
  JSON.stringify(jsonData, null, 2), // Format with indents for readability
  (err) => {
    if (err) {
      console.error(`Error writing JSON for sheet "${sheetName}":`, err);
      process.exit(1); // Exit with error code
    } else {
      console.log(`${sheetName}.json file is created.`);
    }
  }
);
