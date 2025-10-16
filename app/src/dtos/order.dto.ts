/**
 * Order DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the order entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

// src/dto/order.dto.ts

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt, IsBoolean } from 'class-validator';

/**
 * Data Transfer Object for creating a order.
 *
 * @property {number} id_customer - ID of the customer placing the order.
 * @property {number} id_address - ID of the address for the order.
 * @property {number} id_bodega - ID of the bodega fulfilling the order.
 * @property {Date} creationDate - Date when the order was created.
 * @property {string} [status] - Status of the order (e.g., 'pending', 'in transit', 'delivered').
 * @property {boolean} isActive - Status of the order.
 */

export enum OrderStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered'
}

export class CreateOrderDto {
    @IsInt()
    id_customer!: number;

    @IsInt()
    id_address!: number;

    @IsInt()
    id_bodega!: number;

    @IsDateString()
    creationDate!: Date;

    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @IsBoolean()
    isActive!: boolean;
}


/**
 * Data Transfer Object for updating a order.
 *
 * @property {number} [id_customer] - ID of the customer placing the order.
 * @property {number} [id_address] - ID of the address for the order.
 * @property {number} [id_bodega] - ID of the bodega fulfilling the order.
 * @property {Date} [creationDate] - Date when the order was created.
 * @property {string} [status] - Status of the order (e.g., 'pending', 'in transit', 'delivered').
 * @property {boolean} [isActive] - Status of the order.
 */
export class UpdateOrderDto {
    @IsInt()
    @IsOptional()
    id_customer?: number;

    @IsInt()
    @IsOptional()
    id_address?: number;

    @IsInt()
    @IsOptional()
    id_bodega?: number;

    @IsDateString()
    @IsOptional()
    creationDate?: Date;

    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

/**
 * Data Transfer Object that represents the response of a order.
 *
 * @property {number} id_order - Unique identifier of the order.
 * @property {number} id_customer - ID of the customer placing the order.
 * @property {number} id_address - ID of the address for the order.
 * @property {number} id_bodega - ID of the bodega fulfilling the order.
 * @property {Date} creationDate - Date when the order was created.
 * @property {string} [status] - Status of the order (e.g., 'pending', 'in transit', 'delivered').
 * @property {boolean} isActive - Status of the order.
 */
export class OrderResponseDto {
    @IsInt()
    id_order!: number;

    @IsInt()
    id_customer!: number;
    
    @IsInt()
    id_address!: number;    

    @IsInt()
    id_bodega!: number;

    @IsDateString()
    creationDate!: Date;

    @IsEnum(OrderStatus)
    status!: OrderStatus;

    @IsBoolean()
    isActive!: boolean;
    
    createdAt!: Date;
    updatedAt!: Date;

    constructor(order: any) {
        this.id_order = order.id;
        this.id_customer = order.id_customer;
        this.id_address = order.id_address;
        this.id_bodega = order.id_bodega;
        this.creationDate = order.creationDate;
        this.status = order.status;
        this.isActive = order.isActive;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }
}
