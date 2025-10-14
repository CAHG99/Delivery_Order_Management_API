import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

const router = Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener lista de todas las órdenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authenticate, OrderController.getOrders);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderDto'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticate, validateDto(CreateOrderDto), OrderController.createOrder);

/**
 * @swagger
 * /orders/{id_order}:
 *   get:
 *     summary: Obtener orden por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_order
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDto'
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_order', authenticate, OrderController.getOrderById);

/**
 * @swagger
 * /orders/{id_order}:
 *   put:
 *     summary: Actualizar orden existente
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_order
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderDto'
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDto'
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_order', authenticate, validateDto(UpdateOrderDto), OrderController.updateOrder);

/**
 * @swagger
 * /orders/{id_order}:
 *   delete:
 *     summary: Eliminar orden (soft delete)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_order
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden a eliminar
 *     responses:
 *       200:
 *         description: Orden eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Orden eliminada correctamente
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id_order', authenticate, OrderController.deleteOrder);

export default router;
