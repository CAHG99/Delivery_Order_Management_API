import { Router } from 'express';
import {CustomerController} from '../controllers/customer.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

const router = Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Obtener lista de todos los clientes
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', CustomerController.findAll);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerDto'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerDto'
 *       500:
 *         description: Error al crear el cliente
 */
router.post('/',validateDto(UpdateCustomerDto), CustomerController.create);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Actualizar un cliente existente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerDto'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerDto'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al actualizar el cliente
 */
router.put('/:id',validateDto(UpdateCustomerDto), CustomerController.update);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Eliminar (soft delete) un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado (soft delete)
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al eliminar el cliente
 */
router.delete('/:id', CustomerController.softDelete);

