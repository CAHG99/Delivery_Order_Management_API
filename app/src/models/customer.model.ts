import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CustomerAttributes {
  id_customer: number;
  cedula: string;
  fullname: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id_customer'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id_customer!: number;
  public cedula!: string;
  public fullname!: string;
  public phone!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id_customer: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cedula: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
  }
);

export default Customer;
