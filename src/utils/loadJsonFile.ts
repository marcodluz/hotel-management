import * as fs from "fs";

// Load and parse JSON files
export function loadJson<T>(filePath: string): T {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
