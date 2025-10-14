/**
 * Real application entrypoint
 * ----------------------------
 * Responsible for:
 * - Loading environment variables
 * - Validating config
 * - Connecting to DB
 * - Running migrations/seeders (optional)
 * - Starting the Express server
*/

import 'dotenv/config';
import app from './server'; // Express app
import { env, validateEnvConfig } from "./config/env.config";
import { syncDB } from "./models/index";
import { runSeeders } from './seeders/seed';

const PORT = env.PORT;

const startServer = async () => {
  try {
    validateEnvConfig();
    // Connect to DB and run migrations
    await syncDB();         // 🔧 Crea tablas
    await runSeeders();     // 🌱 Inserta datos

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
};

startServer();
