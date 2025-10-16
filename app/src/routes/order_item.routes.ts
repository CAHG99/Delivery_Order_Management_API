import { Router } from 'express';
import { OrderItemController } from '../controllers/order_item.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order_item.dto';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Gestión de los ítems de las órdenes
 */

/**
 * @swagger
 * /order-items:
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
 *         description: Ítem creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemResponseDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateDto(CreateOrderItemDto), OrderItemController.create);

/**
 * @swagger
 * /order-items/order/{id_order}:
 *   get:
 *     summary: Obtener ítems activos de una orden específica
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id_order
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Lista de ítems obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItemResponseDto'
 *       404:
 *         description: No se encontraron ítems o la orden no existe
 *       500:
 *         description: Error interno del servidor
 */
router.get('/order/:id_order', OrderItemController.getByOrder);

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Actualizar un ítem de orden existente
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ítem a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderItemDto'
 *     responses:
 *       200:
 *         description: Ítem actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemResponseDto'
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', validateDto(UpdateOrderItemDto), OrderItemController.update);

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Eliminar ítem (soft delete)
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ítem a eliminar
 *     responses:
 *       200:
 *         description: Ítem eliminado correctamente (soft delete)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ítem eliminado correctamente
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', OrderItemController.softDelete);

export default router;
