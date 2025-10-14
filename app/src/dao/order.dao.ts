import Order from '../models/order.model';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Op } from 'sequelize';

class OrderDao {
  async create(data: CreateOrderDto): Promise<Order> {
    return await Order.create(data);
  }

  async findAll(): Promise<Order[]> {
    return await Order.findAll();
  }

  async findById(id_order: number): Promise<Order | null> {
    return await Order.findByPk(id_order);
  }

  async update(id_order: number, data: UpdateOrderDto): Promise<Order | null> {
    const order = await this.findById(id_order);
    if (!order) return null;

    await order.update(data);
    return order;
  }

  async delete(id_order: number): Promise<boolean> {
    const order = await this.findById(id_order);
    if (!order) return false;

    await order.destroy();
    return true;
  }

  async search(filters: Partial<{ status: string }>): Promise<Order[]> {
    const where: any = {};

    if (filters.status) where.status = filters.status;

    return await Order.findAll({ where });
  }
}

export default new OrderDao();
