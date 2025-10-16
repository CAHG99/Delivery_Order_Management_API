import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Order from './order.model';
import User from './user.model';

interface BodegaAttributes {
  id_bodega: number;
  name: string;
  location: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BodegaCreationAttributes extends Optional<BodegaAttributes, 'id_bodega'> {}

class Bodega extends Model<BodegaAttributes, BodegaCreationAttributes> implements BodegaAttributes {
  public id_bodega!: number;
  public name!: string;
  public location!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bodega.init(
  {
    id_bodega: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'bodegas',
    timestamps: true,
    paranoid: false,
  }
);

export default Bodega;
