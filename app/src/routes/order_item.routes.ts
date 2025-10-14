import { Router } from 'express';
import * as OrderItemController from '../controllers/order_item.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order_item.dto';

const router = Router();

/**
 * @swagger
 * /order_items:
 *   get:
 *     summary: Obtener lista de todos los ítems de órdenes
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: Lista de ítems obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItemDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authenticate, OrderItemController.getOrderItems);

/**
 * @swagger
 * /order_items:
 *   post:
 *     summary: Crear un nuevo ítem de orden
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderItemDto'
 *     responses:
 *       201:
 *         description: Ítem de orden creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticate, validateDto(CreateOrderItemDto), OrderItemController.createOrderItem);

/**
 * @swagger
 * /order_items/{id_order_item}:
 *   get:
 *     summary: Obtener ítem de orden por ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id_order_item
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ítem de orden
 *     responses:
 *       200:
 *         description: Ítem de orden obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemDto'
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_order_item', authenticate, OrderItemController.getOrderItemById);

/**
 * @swagger
 * /order_items/{id_order_item}:
 *   put:
 *     summary: Actualizar ítem de orden existente
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id_order_item
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ítem de orden a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderItemDto'
 *     responses:
 *       200:
 *         description: Ítem de orden actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemDto'
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_order_item', authenticate, validateDto(UpdateOrderItemDto), OrderItemController.updateOrderItem);

/**
 * @swagger
 * /order_items/{id_order_item}:
 *   delete:
 *     summary: Eliminar ítem de orden (soft delete)
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id_order_item
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ítem de orden a eliminar
 *     responses:
 *       200:
 *         description: Ítem de orden eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ítem de orden eliminado correctamente
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id_order_item', authenticate, OrderItemController.deleteOrderItem);

export default router;
