// app/src/models/index.ts

/**
 * index.ts
 * -----------------
 * Main entry point for Sequelize models.
 *
 * Responsibilities:
 * - Import Sequelize instance from configuration.
 * - Import all models from the application.
 * - Apply associations between models.
 * - Provide a utility function to sync the database.
 * - Export Sequelize instance and all models.
 */

// src/models/index.ts
import { sequelize } from '../config/database';
import { applyAssociations } from './associattions';

import User from './user.model';
import Customer from './customer.model';
import Product from './product.model';
import Order from './order.model';
import OrderItem from './order_item.model';
import Bodega from './bodega.model';
import Address from './address.model';


const models = {
  User,
  Customer,
  Product,
  Order,
  OrderItem,
  Bodega,
  Address
};

export const syncDB = async () => {
  try {
    applyAssociations(); // Establece las relaciones entre modelos
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    await sequelize.sync({ force: true }); // 🔥 Crea todas las tablas
    console.log('✅ Tables synchronized successfully');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    throw error;
  }
};

export default models;
