import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const connectionLogPath = path.join(__dirname, "../logs/connection_log.json");
export const speedLogPath = path.join(__dirname, "../logs/speed_log.json");
