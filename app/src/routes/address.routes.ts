// src/routes/address.routes.ts

import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';

const router = Router();

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Crear una nueva dirección
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddressDto'
 *     responses:
 *       201:
 *         description: Dirección creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateDto(CreateAddressDto), AddressController.create);

/**
 * @swagger
 * /addresses/customer/{id_customer}:
 *   get:
 *     summary: Obtener direcciones por ID de cliente
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id_customer
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Direcciones del cliente obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddressResponseDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/customer/:id_customer', AddressController.findByCustomer);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Actualizar una dirección existente
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAddressDto'
 *     responses:
 *       200:
 *         description: Dirección actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponseDto'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', validateDto(UpdateAddressDto), AddressController.update);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Eliminar dirección (soft delete)
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección a eliminar
 *     responses:
 *       200:
 *         description: Dirección eliminada correctamente (soft)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dirección eliminada correctamente
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', AddressController.softDelete);

export default router;
