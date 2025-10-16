// src/routes/user.routes.ts

import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { validateDto } from '../middlewares/validateDto.middleware'; // Validar DTOs
import { authenticate } from '../middlewares/authenticate.middleware'; // Validar JWT
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/user.dto'; // DTOs para validación

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDto'
 *       500:
 *         description: Error interno del servidor
*/
router.get('/', UserController.getUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticate, validateDto(CreateUserDto), UserController.createUser);
/**
 * @swagger
 * /users/{id_user}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_user', authenticate, UserController.getUserById);
/**
 * @swagger
 * /users/{id_user}:
 *   put:
 *     summary: Actualizar usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_user', authenticate, validateDto(UpdateUserDto), UserController.updateUser);
/**
 * @swagger
 * /users/{id_user}:
 *   delete:
 *     summary: Eliminar usuario (soft delete)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id_user', authenticate, UserController.deleteUser);
/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Buscar usuarios con filtros (nombre, email, rol)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtro por nombre
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtro por email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filtro por rol
 *     responses:
 *       200:
 *         description: Resultados de búsqueda de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDto'
 *       500:
 *         description: Error interno del servidor
*/
router.get('/search', authenticate, UserController.searchUsers);

export default router;
