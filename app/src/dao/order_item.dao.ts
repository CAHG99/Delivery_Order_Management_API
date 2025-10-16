import OrderItem from '../models/order_item.model';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItemResponseDto } from '../dtos/order_item.dto';

export class OrderItemDAO {
  static async createItem(data: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    const item = await OrderItem.create({ ...data, isActive: true });
    return new OrderItemResponseDto(item);
  }

  static async findByOrder(id_order: number): Promise<OrderItemResponseDto[]> {
    const items = await OrderItem.findAll({ where: { id_order, isActive: true } });
    return items.map((i) => new OrderItemResponseDto(i));
  }

  static async updateItem(id: number, data: UpdateOrderItemDto): Promise<OrderItemResponseDto | null> {
    const item = await OrderItem.findByPk(id);
    if (!item || !item.isActive) return null;

    await item.update(data);
    return new OrderItemResponseDto(item);
  }

  static async softDelete(id: number): Promise<boolean> {
    const item = await OrderItem.findByPk(id);
    if (!item || !item.isActive) return false;

    await item.update({ isActive: false });
    return true;
  }
}
