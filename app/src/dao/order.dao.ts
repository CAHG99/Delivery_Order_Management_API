import Order, { OrderStatus } from '../models/order.model';
import OrderItem from '../models/order_item.model';
import Bodega from '../models/bodega.model';
import Customer from '../models/customer.model';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../dtos/order.dto';

export class OrderDAO {
  /**
   * Crea una nueva orden
   */
  static async createOrder(data: CreateOrderDto): Promise<OrderResponseDto> {
    const order = await Order.create({
      ...data,
      isActive: true,
      creationDate: new Date(),
    });
    return new OrderResponseDto(order);
  }

  /**
   * Obtiene todas las órdenes activas de un cliente
   */
  static async findByCustomer(id_customer: number): Promise<OrderResponseDto[]> {
    const orders = await Order.findAll({
      where: { id_customer, isActive: true },
      include: [OrderItem, Bodega],
    });
    return orders.map((o) => new OrderResponseDto(o));
  }

  /**
   * Busca una orden por su ID
   */
  static async findById(id_order: number): Promise<OrderResponseDto | null> {
    const order = await Order.findOne({
      where: { id_order, isActive: true },
      include: [Customer, OrderItem, Bodega],
    });
    return order ? new OrderResponseDto(order) : null;
  }

    static async getAll(): Promise<OrderResponseDto[]> {
    const orders = await Order.findAll({
      where: { isActive: true },
      include: [Customer, OrderItem, Bodega],
      order: [['createdAt', 'DESC']], // opcional: ordenadas por fecha
    });
    return orders.map((o) => new OrderResponseDto(o));
  }
  
  /**
   * Actualiza una orden existente
   */
  static async updateOrder(id_order: number, data: UpdateOrderDto): Promise<OrderResponseDto | null> {
    const order = await Order.findOne({ where: { id_order, isActive: true } });
    if (!order) return null;

    await order.update(data);
    return new OrderResponseDto(order);
  }

  static async changeStatus(id_order: number, status: OrderStatus): Promise<OrderResponseDto | null> {
    const order = await Order.findOne({ where: { id_order, isActive: true } });
    if (!order) return null;

    await order.update({ status });
    return new OrderResponseDto(order);
  }

  /**
   * Borrado lógico de una orden
   */
  static async softDelete(id_order: number): Promise<boolean> {
    const order = await Order.findOne({ where: { id_order, isActive: true } });
    if (!order) return false;

    await order.update({ isActive: false });
    return true;
  }
}


