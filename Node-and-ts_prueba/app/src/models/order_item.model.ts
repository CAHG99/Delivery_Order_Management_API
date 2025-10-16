// src/models/order_item.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Product from './product.model';
import Order from './order.model';

interface OrderItemAttributes {
  id_order_item: number;
  id_order: number;
  id_product: number;
  amount: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id_order_item' | 'subtotal'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id_order_item!: number;
  public id_order!: number;
  public id_product!: number;
  public amount!: number;
  public price!: number;
  public subtotal!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id_order_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id_order',
      },
      onDelete: 'CASCADE',
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id_product',
      },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: true,
    hooks: {
      beforeSave: (orderItem: OrderItem) => {
        orderItem.subtotal = orderItem.amount * Number(orderItem.price);
      },
    },
  }
);

export default OrderItem;
