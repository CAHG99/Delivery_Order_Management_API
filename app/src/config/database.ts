  /**
   * Sequelize configuration for PostgreSQL
   * -------------------------------------
   * This module initializes and exports a Sequelize instance,
   * configured with environment variables defined in `.env` or `docker-compose`.
   *
   * Main usage:
   *  - Establish connection to the PostgreSQL database.
   *  - To be imported by models and utilities that need to interact with Sequelize.
   *
   * Environment variables used:
   *  - POSTGRES_DB: Database name.
   *  - POSTGRES_USER: Database user.
   *  - POSTGRES_PASSWORD: Database user password.
   *  - POSTGRES_HOST: Database host (default is `db` for docker-compose).
   *  - POSTGRES_PORT: Connection port (default is `5432`).
   */

  // import { Sequelize } from "sequelize";
  // /**
  //  * Sequelize instance configured for PostgreSQL.
  //  * Connects using credentials and parameters defined in environment variables.
  //  */

  // const sequelize = new Sequelize(
  //     process.env.POSTGRES_DB as string,
  //     process.env.POSTGRES_USER as string,
  //     process.env.POSTGRES_PASSWORD as string,
  //     {
  //         host: process.env.POSTGRES_HOST || "db",
  //         port:parseInt(process.env.POSTGRES_PORT || "5432", 10),
  //         dialect: "postgres",
  //         logging: false,
  //     }
  // );

 /**
 * Database configuration (PostgreSQL + Sequelize)
 * -----------------------------------------------
 * This module initializes Sequelize using the validated environment variables
 * defined in `env.config.ts`.
 */

import { Sequelize } from "sequelize";
import { env } from "./env.config"; // 👈 importa tu configuración validada

// Crear instancia de Sequelize
export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);
// Función para conectar a la base de datos
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a PostgreSQL establecida correctamente.");

    if (env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("📊 Modelos sincronizados con la base de datos.");
    }
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
};
