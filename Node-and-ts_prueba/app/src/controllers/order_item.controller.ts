import { Request, Response } from 'express';
import OrderItemDao from '../dao/order_item.dao';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order_item.dto';

export const createOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateOrderItemDto = req.body;
    const newOrderItem = await OrderItemDao.create(data);
    return res.status(201).json(newOrderItem);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrderItems = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const orderItems = await OrderItemDao.findAll();
    return res.json(orderItems);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrderItemById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_order_item = parseInt(req.params.id_order_item, 10);
    const orderItem = await OrderItemDao.findById(id_order_item);
    if (!orderItem) return res.status(404).json({ error: 'OrderItem not found' });
    return res.json(orderItem);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_order_item = parseInt(req.params.id_order_item, 10);
    const data: UpdateOrderItemDto = req.body;

    const updatedOrderItem = await OrderItemDao.update(id_order_item, data);
    if (!updatedOrderItem) return res.status(404).json({ error: 'OrderItem not found' });

    return res.json(updatedOrderItem);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_order_item = parseInt(req.params.id_order_item, 10);
    const deleted = await OrderItemDao.delete(id_order_item);
    if (!deleted) return res.status(404).json({ error: 'OrderItem not found' });

    return res.json({ message: 'OrderItem deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

