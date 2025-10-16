// src/seeders/seed.ts
import { sequelize } from '../config/database';
import models from '../models';
import { populateFromCSV } from './populateFromCSV';
import { Model, ModelStatic } from 'sequelize';

interface SeedItem {
  model: ModelStatic<Model>;
  file: string;
}

const seedData: SeedItem[] = [
  { model: models.User, file: './src/seeders/data/users.csv' },
  { model: models.Customer, file: './src/seeders/data/customers.csv' },
  { model: models.Product, file: './src/seeders/data/products.csv' },
  { model: models.Bodega, file: './src/seeders/data/bodegas.csv' },
  { model: models.Address, file: './src/seeders/data/addresses.csv' },
  { model: models.Order, file: './src/seeders/data/orders.csv' },
  { model: models.OrderItem, file: './src/seeders/data/order_items.csv' },
];

export const runSeeders = async () => {
  try {
    for (const { model, file } of seedData) {
      await populateFromCSV(model, file);
    }
    console.log('🌱 All seeders executed successfully');
  } catch (error) {
    console.error('❌ Error running seeders:', error);
    throw error;
  }
};

