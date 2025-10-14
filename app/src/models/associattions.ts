import Address from "./address.model";
import Bodega from './bodega.model';
import Customer from './customer.model';
import Order from './order.model';
import OrderItem from './order_item.model';
import Product from './product.model';

export const applyAssociations = () => {
  // --------- Customer ↔ Address (1:N) ---------
  Customer.hasMany(Address, {
    foreignKey: 'id_customer',
    as: 'addresses',
    onDelete: 'RESTRICT', // Evita borrar cliente si tiene direcciones
    onUpdate: 'CASCADE',
  });
  Address.belongsTo(Customer, {
    foreignKey: 'id_customer',
    as: 'customer',
  });

  // --------- Customer ↔ Order (1:N) ---------
  Customer.hasMany(Order, {
    foreignKey: 'id_customer',
    as: 'orders',
    onDelete: 'RESTRICT', // Evita borrar cliente si tiene órdenes
    onUpdate: 'CASCADE',
  });
  Order.belongsTo(Customer, {
    foreignKey: 'id_customer',
    as: 'customer',
  });

  // --------- Address ↔ Order (1:N) ---------
  Address.hasMany(Order, {
    foreignKey: 'id_address',
    as: 'orders',
    onDelete: 'RESTRICT', // Evita borrar dirección si está asociada a órdenes
    onUpdate: 'CASCADE',
  });
  Order.belongsTo(Address, {
    foreignKey: 'id_address',
    as: 'address',
  });

  // --------- Bodega ↔ Order (1:N) ---------
  Bodega.hasMany(Order, {
    foreignKey: 'id_bodega',
    as: 'orders',
    onDelete: 'RESTRICT', // Evita borrar bodega si tiene órdenes
    onUpdate: 'CASCADE',
  });
  Order.belongsTo(Bodega, {
    foreignKey: 'id_bodega',
    as: 'bodega',
  });

  // --------- Order ↔ OrderItem (1:N) ---------
  Order.hasMany(OrderItem, {
    foreignKey: 'id_order',
    as: 'items',
    onDelete: 'RESTRICT', // Evita borrar orden si tiene ítems
    onUpdate: 'CASCADE',
  });
  OrderItem.belongsTo(Order, {
    foreignKey: 'id_order',
    as: 'order',
  });

  // --------- Product ↔ OrderItem (1:N) ---------
  Product.hasMany(OrderItem, {
    foreignKey: 'id_product',
    as: 'orderItems',
    onDelete: 'RESTRICT', // Evita borrar producto si está en ítems de orden
    onUpdate: 'CASCADE',
  });
  OrderItem.belongsTo(Product, {
    foreignKey: 'id_product',
    as: 'product',
  });
};
