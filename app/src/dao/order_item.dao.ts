import OrderItem from '../models/order_item.model';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order_item.dto';

class OrderItemDao {
  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    return await OrderItem.create(data);
  }

  async findAll(): Promise<OrderItem[]> {
    return await OrderItem.findAll();
  }

  async findById(id_order_item: number): Promise<OrderItem | null> {
    return await OrderItem.findByPk(id_order_item);
  }

  async update(id_order_item: number, data: UpdateOrderItemDto): Promise<OrderItem | null> {
    const item = await this.findById(id_order_item);
    if (!item) return null;

    await item.update(data);
    return item;
  }

  async delete(id_order_item: number): Promise<boolean> {
    const item = await this.findById(id_order_item);
    if (!item) return false;

    await item.destroy();
    return true;
  }

  async findByOrder(id_order: number): Promise<OrderItem[]> {
    return await OrderItem.findAll({ where: { id_order } });
  }
}

export default new OrderItemDao();
