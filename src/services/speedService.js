import speedTest from "speedtest-net";
import { saveToJson } from "../utils/fileUtils.js";
import { speedLogPath } from "../config/index.js";
import { emit } from "../utils/connectionStatusUtils.js";

export async function measureSpeed() {
  setInterval(async () => {
    const timestamp = new Date().toISOString();
    console.log('aqui começou')

    try {
      const result = await speedTest({ acceptLicense: true });

      const download = (result.download.bandwidth / 125000).toFixed(2); // Convert bytes/s to Mbps
      const upload = (result.upload.bandwidth / 125000).toFixed(2); // Convert bytes/s to Mbps
      const ping = result.ping.latency;

      const logData = {
        timestamp,
        download: `${download} Mbps`,
        upload: `${upload} Mbps`,
        ping: `${ping} ms`,
      };

      saveToJson(speedLogPath, logData);

      if (download < 10) {
        emit(`[${timestamp} - Speed Test] Low Download Speed: Download=${download} Mbps, Upload=${upload} Mbps, Ping=${ping} ms`, 'WARNING');
      } else if (download < 50) {
        emit(`[${timestamp} - Speed Test] Medium Download Speed: Download=${download} Mbps, Upload=${upload} Mbps, Ping=${ping} ms`, 'INFO');
      } else {
        emit(`[${timestamp} - Speed Test] High Download Speed: Download=${download} Mbps, Upload=${upload} Mbps, Ping=${ping} ms`, 'INFO');
      }

    } catch (error) {
      const errorMessage = `Error measuring speed: ${error.message}`;
      const logData = {
        timestamp,
        download: 'N/A',
        upload: 'N/A',
        ping: 'N/A',
        error: errorMessage,
      };

      saveToJson(speedLogPath, logData);

      emit(`[Speed Test Error] ${errorMessage}`, 'ERROR');
    }
  },10 * 60 * 1000); // Run every 10 minutes
}
