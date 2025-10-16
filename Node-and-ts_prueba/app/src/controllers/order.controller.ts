import { Request, Response } from 'express';
import OrderDao from '../dao/order.dao';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateOrderDto = req.body;
    const newOrder = await OrderDao.create(data);
    return res.status(201).json(newOrder);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await OrderDao.findAll();
    return res.json(orders);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_order = parseInt(req.params.id_order, 10);
    const order = await OrderDao.findById(id_order);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    return res.json(order);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_order = parseInt(req.params.id_order, 10);
    const data: UpdateOrderDto = req.body;

    const updatedOrder = await OrderDao.update(id_order, data);
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

    return res.json(updatedOrder);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_order = parseInt(req.params.id_order, 10);
    const deleted = await OrderDao.delete(id_order);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });

    return res.json({ message: 'Order deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filters = {
      status: req.query.status as string | undefined,
      id_customer: req.query.id_customer ? Number(req.query.id_customer) : undefined,
    };

    const orders = await OrderDao.search(filters);
    return res.json(orders);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
