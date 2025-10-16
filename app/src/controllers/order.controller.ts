import { Request, Response } from 'express';
import { OrderDAO } from '../dao/order.dao';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { OrderStatus } from '../models/order.model';

export class OrderController {
  /**
   * Crea una nueva orden
   */
  static async create(req: Request, res: Response) {
    try {
      const data: CreateOrderDto = req.body;
      const order = await OrderDAO.createOrder(data);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  }

  /**
   * Obtiene todas las órdenes activas
   */
  static async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderDAO.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  }

  /**
   * Obtiene las órdenes de un cliente específico
   */
  static async findByCustomer(req: Request, res: Response) {
    try {
      const { id_customer } = req.params;
      const orders = await OrderDAO.findByCustomer(Number(id_customer));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  }

  /**
   * Obtiene una orden por su ID
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id_order } = req.params;
      const order = await OrderDAO.findById(Number(id_order));
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order', error });
    }
  }

  /**
   * Actualiza una orden existente
   */
  static async update(req: Request, res: Response) {
    try {
      const { id_order } = req.params;
      const data: UpdateOrderDto = req.body;
      const updated = await OrderDAO.updateOrder(Number(id_order), data);

      if (!updated) return res.status(404).json({ message: 'Order not found' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
    }
  }

  /**
   * Cambia el estado de una orden
   */
  static async changeStatus(req: Request, res: Response) {
    try {
      const { id_order } = req.params;
      const { status } = req.body;

      if (!Object.values(OrderStatus).includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }

      const updated = await OrderDAO.changeStatus(Number(id_order), status as OrderStatus);
      if (!updated) return res.status(404).json({ message: 'Order not found' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error changing order status', error });
    }
  }

  /**
   * Borrado lógico (soft delete) de una orden
   */
  static async softDelete(req: Request, res: Response) {
    try {
      const { id_order } = req.params;
      const deleted = await OrderDAO.softDelete(Number(id_order));

      if (!deleted) return res.status(404).json({ message: 'Order not found' });
      res.json({ message: 'Order deleted (soft)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error });
    }
  }
}
