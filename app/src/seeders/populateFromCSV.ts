import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { ModelStatic, Model } from "sequelize";

/**
 * Carga datos desde un archivo CSV y los inserta en la tabla del modelo especificado.
 * Compatible con comillas y valores numéricos.
 */
export const populateFromCSV = async (model: ModelStatic<Model>, filePath: string) => {
  try {
    const absolutePath = path.resolve(filePath);
    const results: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(absolutePath)
        .pipe(csv())
        .on("data", (row) => {
          // 🧹 Limpieza de datos
          const cleanedRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key.trim(),
              value?.toString().trim() || null,
            ])
          );
          results.push(cleanedRow);
        })
        .on("end", () => resolve())
        .on("error", (err) => reject(err));
    });

    if (results.length === 0) {
      console.warn(`⚠️ No se encontraron registros en ${filePath}`);
      return;
    }

    await model.bulkCreate(results);
    console.log(`✅ ${model.name}: ${results.length} registros importados desde ${filePath}`);
  } catch (error) {
    console.error(`❌ Error importando ${model.name}:`, error);
  }
};
