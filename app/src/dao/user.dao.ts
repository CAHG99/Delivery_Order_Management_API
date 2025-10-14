// src/dao/UserDao.ts

import User from '../models/user.model'; // Modelo Sequelize del usuario
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto'; // DTOs que definen la forma esperada de los datos
import { Op } from 'sequelize'; // Para operadores de búsqueda avanzada

/**
 * UserDao encapsula toda la lógica de acceso a la base de datos
 * relacionada con usuarios.
 */
class UserDao {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param data - Objeto que sigue la estructura de CreateUserDto
   * @returns El modelo de usuario creado (instancia Sequelize)
   */
  async create(data: CreateUserDto): Promise<User> {
  return await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || 'analista'
  });
}

  /**
   * Retorna todos los usuarios de la base de datos.
   * @returns Un arreglo de instancias del modelo User
   */
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  /**
   * Busca un usuario por su ID.
   * @param id_user - ID del usuario a buscar
   * @returns El usuario si existe, o null si no se encuentra
   */
  async findById(id_user: number): Promise<User | null> {
    return await User.findByPk(id_user);
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - Email del usuario
   * @returns El usuario si existe, o null
   */
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  /**
   * Actualiza un usuario existente.
   * @param id_user - ID del usuario a actualizar
   * @param data - Datos parciales para actualizar, siguiendo UpdateUserDto
   * @returns El usuario actualizado o null si no existe
   */
  async update(id_user: number, data: UpdateUserDto): Promise<User | null> {
    const user = await this.findById(id_user);
    if (!user) return null;

    await user.update(data);
    return user;
  }

  /**
   * Elimina un usuario por su ID.
   * @param id_user - ID del usuario a eliminar
   * @returns true si fue eliminado, false si no existía
   */
  async delete(id_user: number): Promise<boolean> {
    const user = await this.findById(id_user);
    if (!user) return false;

    await user.destroy();
    return true;
  }

  /**
   * Valida las credenciales de login de un usuario.
   * @param email - Email del usuario
   * @param plainPassword - Contraseña sin encriptar
   * @returns El usuario si la contraseña es válida, o null
   */
  async validateLogin(email: string, plainPassword: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await user.validatePassword(plainPassword);
    return isValid ? user : null;
  }

  /**
   * Retorna todos los usuarios con un rol específico.
   * @param role - Rol a filtrar: 'admin', 'analista'
   * @returns Un arreglo de usuarios con ese rol
   */
  async findByRole(role: 'admin' | 'analista' ): Promise<User[]> {
    return await User.findAll({ where: { role } });
  }

  /**
   * Permite buscar usuarios aplicando filtros dinámicos.
   * @param filters - Filtros opcionales por nombre, email o rol
   * @returns Lista de usuarios que coincidan con los filtros
   */
  async search(filters: Partial<{ name: string; email: string; role: string }>): Promise<User[]> {
    const where: any = {};

    // Filtra por nombre si se proporciona
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };

    // Filtra por email si se proporciona
    if (filters.email) where.email = { [Op.iLike]: `%${filters.email}%` };

    // Filtra por rol si se proporciona
    if (filters.role) where.role = filters.role;

    return await User.findAll({ where });
  }
}

// Exportamos una instancia del DAO para reutilizar
export default new UserDao();
