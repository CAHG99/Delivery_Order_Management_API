/**
 * Product DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the product entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

// src/dto/product.dto.ts

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt } from 'class-validator';

/**
 * Data Transfer Object for creating a product.
 *
 * @property {string} name - Name of the product.
 * @property {string} description - Description of the product.
 * @property {number} price - Price of the product.
 * @property {number} stock - Stock quantity of the product.
 */
export class CreateProductDto {
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsInt()
    price!: number;

    @IsInt()
    stock!: number;
}

/**
 * Data Transfer Object for updating a product.
 *
 * @property {string} [name] - Name of the product.
 * @property {string} [description] - Description of the product.
 * @property {number} [price] - Price of the product.
 * @property {number} [stock] - Stock quantity of the product.
 */
export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    price?: number;

    @IsInt()
    @IsOptional()
    stock?: number;
}

/**
 * Data Transfer Object that represents the response of a product.
 *
 * @property {number} id_product - Unique identifier of the product.
 * @property {string} name - Name of the product.
 * @property {string} description - Description of the product.
 * @property {number} price - Price of the product.
 * @property {number} stock - Stock quantity of the product.
 */
export class ProductResponseDto {
    @IsInt()
    id_product!: number;

    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsInt()
    price!: number;

    @IsInt()
    stock!: number;
}
