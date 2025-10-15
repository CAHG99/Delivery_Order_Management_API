import { Router } from 'express';
import * as OrderItemController from '../controllers/order_item.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order_item.dto';

const router = Router();

/**
 * @swagger
 * /orderitems:
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
 *                 $ref: '#/components/schemas/OrderItemResponseDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', OrderItemController.getOrderItems);

/**
 * @swagger
 * /orderitems:
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
 *               $ref: '#/components/schemas/OrderItemResponseDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateDto(CreateOrderItemDto), OrderItemController.createOrderItem);

/**
 * @swagger
 * /orderitems/{id_order_item}:
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
 *               $ref: '#/components/schemas/OrderItemResponseDto'
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_order_item', OrderItemController.getOrderItemById);

/**
 * @swagger
 * /orderitems/{id_order_item}:
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
 *               $ref: '#/components/schemas/OrderItemResponseDto'
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_order_item', validateDto(UpdateOrderItemDto), OrderItemController.updateOrderItem);

/**
 * @swagger
 * /orderitems/{id_orderitem}:
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
router.delete('/:id_order_item', OrderItemController.deleteOrderItem);

export default router;
