import fs from "fs";

// Function to save data to a JSON file
export function saveToJson(filePath, data) {
  const currentData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
  currentData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
}
