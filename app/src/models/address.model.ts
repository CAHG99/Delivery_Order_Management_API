import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Customer from './customer.model';

interface AddressAttributes {
  id_address: number;
  id_customer: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id_address'> {}

class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id_address!: number;
  public id_customer!: number;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id_address: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: 'id_customer',
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'addresses',
    timestamps: true,
  }
);

export default Address;
