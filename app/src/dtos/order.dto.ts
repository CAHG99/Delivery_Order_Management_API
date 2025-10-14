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

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt } from 'class-validator';

/**
 * Data Transfer Object for creating a order.
 *
 * @property {number} id_customer - ID of the customer placing the order.
 * @property {number} id_address - ID of the address for the order.
 * @property {number} id_bodega - ID of the bodega fulfilling the order.
 * @property {Date} CreationDate - Date when the order was created.
 * @property {string} [status] - Status of the order (e.g., 'pending', 'in transit', 'delivered').
 */
export class CreateOrderDto {
    @IsInt()
    id_customer!: number;

    @IsInt()
    id_address!: number;

    @IsInt()
    id_bodega!: number;

    @IsDateString()
    CreationDate!: Date;

    @IsEnum(['pending', 'in transit', 'delivered'])
    @IsOptional()
    status?: 'pending' | 'in transit' | 'delivered';
}


/**
 * Data Transfer Object for updating a order.
 *
 * @property {number} [id_customer] - ID of the customer placing the order.
 * @property {number} [id_address] - ID of the address for the order.
 * @property {number} [id_bodega] - ID of the bodega fulfilling the order.
 * @property {Date} [CreationDate] - Date when the order was created.
 * @property {string} [status] - Status of the order (e.g., 'pending', 'in transit', 'delivered').
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
    CreationDate?: Date;

    @IsEnum(['pending', 'in transit', 'delivered'])
    @IsOptional()
    status?: 'pending' | 'in transit' | 'delivered';
    @IsOptional()
    stock?: number;
}

/**
 * Data Transfer Object that represents the response of a order.
 *
 * @property {number} id_order - Unique identifier of the order.
 * @property {number} id_customer - ID of the customer placing the order.
 * @property {number} id_address - ID of the address for the order.
 * @property {number} id_bodega - ID of the bodega fulfilling the order.
 * @property {Date} CreationDate - Date when the order was created.
 * @property {string} [status] - Status of the order (e.g., 'pending', 'in transit', 'delivered').
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
    CreationDate!: Date;

    @IsEnum(['pending', 'in transit', 'delivered'])
    status!: 'pending' | 'in transit' | 'delivered';
    
    @IsDateString()
    createdAt!: Date;

    @IsDateString()
    updatedAt!: Date;
}
