/**
 * Order Item DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the order item entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

// src/dto/order_item.dto.ts

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt, IsBoolean,IsNumber } from 'class-validator';

/**
 * Data Transfer Object for creating an order item.
 *
 * @property {number} id_order - ID of the order associated with the item.
 * @property {number} id_product - ID of the product being ordered.
 * @property {number} amount - Quantity of the product ordered.
 * @property {number} price - Price per unit of the product.
 * @property {number} [subtotal] - Subtotal for the order item (amount * price).
 * @property {boolean} isActive - Status of the order item.
 */
export class CreateOrderItemDto {
    @IsInt()
    id_order!: number;

    @IsInt()
    id_product!: number;

    @IsInt()
    amount!: number;

    @IsNumber()
    price!: number;

    @IsNumber()
    @IsOptional()
    subtotal?: number;

    @IsBoolean()
    isActive!: boolean;
}

/**
 * Data Transfer Object for updating an order item.
 *
 * @property {number} [id_order] - ID of the order associated with the item.
 * @property {number} [id_product] - ID of the product being ordered.
 * @property {number} [amount] - Quantity of the product ordered.
 * @property {number} [price] - Price per unit of the product.
 * @property {number} [subtotal] - Subtotal for the order item (amount * price).
 * @property {boolean} [isActive] - Status of the order item.
 */

export class UpdateOrderItemDto {
    @IsInt()
    @IsOptional()
    id_order?: number;

    @IsInt()
    @IsOptional()
    id_product?: number;

    @IsInt()
    @IsOptional()
    amount?: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    subtotal?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

/**
 * Data Transfer Object that represents the response of an order item.
 *
 * @property {number} id_order_item - Unique identifier of the order item.
 * @property {number} id_order - Unique identifier of the order.
 * @property {number} id_product - Unique identifier of the product.
 * @property {number} amount - Quantity of the product ordered.
 * @property {number} price - Price per unit of the product.
 * @property {number} subtotal - Subtotal for the order item (amount * price).
 * @property {boolean} isActive - Status of the order item.
 */
export class OrderItemResponseDto {
    @IsInt()
    id_order_item!: number;

    @IsInt()
    id_order!: number;

    @IsInt()
    id_product!: number;

    @IsInt()
    amount!: number;

    @IsNumber()
    price!: number;

    @IsNumber()
    subtotal!: number;

    @IsBoolean()
    isActive!: boolean;

    createdAt!: Date;
    updatedAt!: Date;

    constructor(order: any) {
        this.id_order_item = order.id;
        this.id_order = order.id_order;
        this.id_product = order.id_product;
        this.amount = order.amount;
        this.price = order.price;
        this.subtotal = order.subtotal;
        this.isActive = order.isActive;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }
}
