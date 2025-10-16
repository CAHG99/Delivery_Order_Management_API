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

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt } from 'class-validator';

/**
 * Data Transfer Object for creating an order item.
 *
 * @property {number} id_order - ID of the order associated with the item.
 * @property {number} id_product - ID of the product being ordered.
 * @property {number} amount - Quantity of the product ordered.
 * @property {number} price - Price per unit of the product.
 * @property {number} [subtotal] - Subtotal for the order item (amount * price).
 */
export class CreateOrderItemDto {
    @IsInt()
    id_order!: number;

    @IsInt()
    id_product!: number;

    @IsInt()
    amount!: number;

    @IsInt()
    price!: number;

    @IsInt()
    @IsOptional()
    subtotal?: number;
}

/**
 * Data Transfer Object for updating an order item.
 *
 * @property {number} [id_order] - ID of the order associated with the item.
 * @property {number} [id_product] - ID of the product being ordered.
 * @property {number} [amount] - Quantity of the product ordered.
 * @property {number} [price] - Price per unit of the product.
 * @property {number} [subtotal] - Subtotal for the order item (amount * price).
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

    @IsInt()
    @IsOptional()
    price?: number;

    @IsInt()
    @IsOptional()
    subtotal?: number;
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

    @IsInt()
    price!: number;

    @IsInt()
    subtotal!: number;
}
