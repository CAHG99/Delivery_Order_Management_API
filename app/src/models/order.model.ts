import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Customer from "./customer.model";
import Address from "./address.model";
import Bodega from "./bodega.model";

export enum OrderStatus {
  PENDING = "pending",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
}

export interface OrderAttributes {
  id_order: number;
  id_customer: number;
  id_address: number;
  id_bodega: number;
  status: OrderStatus;
  isActive: boolean;
  creationDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// para que Sequelize los pueda autocompletar.
export interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    "id_order" | "status" | "isActive" | "creationDate"
  > {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id_order!: number;
  public id_customer!: number;
  public id_address!: number;
  public id_bodega!: number;
  public creationDate!: Date;
  public status!: OrderStatus;
  public isActive!: boolean;

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
      references: { model: Customer, key: "id_customer" },
    },
    id_address: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Address, key: "id_address" },
    },
    id_bodega: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Bodega, key: "id_bodega" },
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.PENDING, 
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
    paranoid: false, // 
  }
);

export default Order;
