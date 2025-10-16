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

// src/dto/bodega.dto.ts

import {IsEnum, IsOptional, IsString, IsInt, IsBoolean, MinLength } from 'class-validator';

/**
 * Data Transfer Object for creating a bodega.
 *
 * @property {string} name - Name of the bodega.
 * @property {string} location - Location of the bodega.
 * @property {boolean} isActive - Status of the bodega.
 */
export class CreateBodegaDto {
    @IsString()
    @MinLength(3)
    name!: string;

    @IsString()
    @MinLength(3)
    location!: string;

    @IsBoolean()
    isActive!: boolean;
}

/**
 * Data Transfer Object for updating a bodega.
 *
 * @property {string} [name] - Name of the bodega.
 * @property {string} [location] - Location of the bodega.
 * @property {boolean} [isActive] - Status of the bodega.
 */
export class UpdateBodegaDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

/**
 * Data Transfer Object that represents the response of a bodega.
 *
 * @property {number} id_bodega - Unique identifier of the bodega.
 * @property {string} name - Name of the bodega.
 * @property {string} location - Location of the bodega.
 * @property {boolean} isActive - Status of the bodega.
 */

export class BodegaResponseDto {
    @IsInt()
    id_bodega!: number;

    @IsString()
    name!: string;

    @IsString()
    location!: string;

    @IsBoolean()
    isActive!: boolean;

    createdAt!: Date;
    updatedAt!: Date;

    constructor(order: any) {
        this.id_bodega = order.id;
        this.name = order.name;
        this.location = order.location;
        this.isActive = order.isActive;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }
}
