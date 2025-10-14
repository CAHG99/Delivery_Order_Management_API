import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Customer from "./customer.model";
import Address from "./address.model";
import Bodega from "./bodega.model";

interface OrderAttributes {
  id_order: number;
  id_customer: number;
  id_address: number;
  id_bodega: number;
  status: 'pending' | 'in transit' | 'delivered';
  CreationDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id_order' | 'status'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id_order!: number;
  public id_customer!: number;
  public id_address!: number;
  public id_bodega!: number;
  public CreationDate!: Date;
  public status!: 'pending' | 'in transit' | 'delivered';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Customer, key: 'id_customer' },
    },
    id_address: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Address, key: 'id_address' },
    },
    id_bodega: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Bodega, key: 'id_bodega' },
    },
    CreationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in transit', 'delivered'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);

export default Order;
