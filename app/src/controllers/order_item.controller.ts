// app/src/controllers/order_item.controller.ts

import { Request, Response } from 'express';
import { OrderItemDAO } from '../dao/order_item.dao';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order_item.dto';

export class OrderItemController {
  /**
   * Crear un nuevo item de orden
   */
  static async create(req: Request, res: Response) {
    try {
      const data: CreateOrderItemDto = req.body;
      const item = await OrderItemDAO.createItem(data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order item', error });
    }
  }

  /**
   * Obtener todos los items de una orden
   */
  static async getByOrder(req: Request, res: Response) {
    try {
      const { id_order } = req.params;
      const items = await OrderItemDAO.findByOrder(Number(id_order));
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order items', error });
    }
  }

  /**
   * Actualizar un item de orden
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateOrderItemDto = req.body;

      const updated = await OrderItemDAO.updateItem(Number(id), data);
      if (!updated) {
        return res.status(404).json({ message: 'Order item not found' });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order item', error });
    }
  }

  /**
   * Eliminación lógica (soft delete)
   */
  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await OrderItemDAO.softDelete(Number(id));
      if (!deleted) {
        return res.status(404).json({ message: 'Order item not found' });
      }

      res.json({ message: 'Order item soft-deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order item', error });
    }
  }
}
