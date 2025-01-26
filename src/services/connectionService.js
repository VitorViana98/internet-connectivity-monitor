import os from "os";
import { emit } from "../utils/connectionStatusUtils.js";
import { exec } from "child_process";
import { saveToJson } from "../utils/fileUtils.js";
import { connectionLogPath } from "../config/index.js";

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

export function checkConnection() {
  let retries = 0;

  setInterval(() => {
    const pingCommand =
      os.platform() === "win32" ? "ping -n 1 8.8.8.8" : "ping -c 1 8.8.8.8";

    exec(pingCommand, (error, stdout, stderr) => {
      const timestamp = new Date().toISOString();

      if (error) {
        if (retries < MAX_RETRIES) {
          retries++;
          const retryMessage = `[${timestamp} - Check Connection] Ping failed. Retrying... (${retries}/${MAX_RETRIES})`;
          emit(retryMessage, "WARNING");
          setTimeout(() => {
            checkConnection();
          }, RETRY_DELAY);
        } else {
          const logData = { timestamp, status: "Disconnected", pingTime: "N/A" };
          const errorMessage = `[${timestamp} - Check Connection] Error executing ping: ${
            stderr || error.message
          }`;
          emit(errorMessage, "ERROR");
          saveToJson(connectionLogPath, logData);
        }
      } else {
        retries = 0;
        const pingTimeMatch = stdout.match(/time[<=](\d+(\.\d+)?)/); // Regex para capturar o tempo de resposta
        const pingTime = pingTimeMatch ? pingTimeMatch[1] : "N/A";

        const logData = { timestamp, status: "Connected", pingTime };
        const message = `[${timestamp} - Check Connection] Connection: Connected - Ping: ${pingTime}ms`;
        emit(message, "INFO");
        saveToJson(connectionLogPath, logData);
      }
    });
  }, 5000);
}
