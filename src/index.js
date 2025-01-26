import { checkConnection } from "./services/connectionService.js";
import { measureSpeed } from "./services/speedService.js";
import dotenv from 'dotenv';

dotenv.config();

checkConnection();
measureSpeed();
