import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  ANALYST = 'analista',
}

// Interfaz de atributos del usuario
interface UserAttributes {
  id_user: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'analista' 
  createdAt?: Date;
  updatedAt?: Date;
}

// Interfaz para creación (id es opcional)
interface UserCreationAttributes 
  extends Optional<UserAttributes, 'id_user' | 'role'> {}

// Clase del modelo
class User extends Model<UserAttributes, UserCreationAttributes> 
  implements UserAttributes {
  public id_user!: number;
  public username!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'analista' 
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Método para verificar contraseña
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Inicializar modelo
User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'analista'),
      defaultValue: 'analista',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;