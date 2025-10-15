import { Router } from 'express';
import * as CustomerController from '../controllers/customer.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

const router = Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Obtener lista de todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerResponseDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', CustomerController.getCustomers);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
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
 *               $ref: '#/components/schemas/CustomerResponseDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateDto(CreateCustomerDto), CustomerController.createCustomer);

/**
 * @swagger
 * /customers/{id_customer}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id_customer
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponseDto'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_customer', CustomerController.getCustomerById);

/**
 * @swagger
 * /customers/{id_customer}:
 *   put:
 *     summary: Actualizar cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id_customer
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
 *               $ref: '#/components/schemas/CustomerResponseDto'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_customer', validateDto(UpdateCustomerDto), CustomerController.updateCustomer);

/**
 * @swagger
 * /customers/{id_customer}:
 *   delete:
 *     summary: Eliminar cliente (soft delete)
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id_customer
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id_customer', CustomerController.deleteCustomer);

export default router;
