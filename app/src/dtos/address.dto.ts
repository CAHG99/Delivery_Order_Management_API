/**
 * User DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the access entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 * */
// src/dto/address.dto.ts

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsInt, IsBoolean } from 'class-validator';

/**
 * Data Transfer Object for creating an address record.
 * @property {number} id_customer - ID of the customer associated with the address.
 * @property {string} address - The address details.
 * @property {boolean} isActive - Status of the address.
 *
 * @example
 * const dto: CreateAddressDto = {
 *   id_customer: 1,
 *   address: "123 Main St, Springfield, IL, 62701, USA"
 * };
 */

export class CreateAddressDto {
    @IsInt()
    id_customer!: number;

    @MinLength(5)
    @IsString()
    address!: string;

    @IsBoolean()
    isActive!: boolean;
}

/**
 * Data Transfer Object for updating an address record.
 *
 * Data Transfer Object for creating an address record.
 * @property {number} id_customer - ID of the customer associated with the address.
 * @property {string} address - The address details.
 * @property {boolean} isActive - Status of the address.
 *
 * @example
 * const dto: UpdateAddressDto = {
 *   id_customer: 1,
 *   address: "456 Elm St, Springfield, IL, 62701, USA"
 * };
 */

export class UpdateAddressDto {
    @IsInt()
    @IsOptional()
    id_customer?: number;

    @IsString()
    @IsOptional()
    address?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}


/**
 * Data Transfer Object that represents the response of an address record.
 *
 * @property {number} id_customer - ID of the customer associated with the address.
 * @property {string} address - The address details.
 * @property {boolean} isActive - Status of the address.
 * @property {Date} createdAt - Timestamp when the record was created.
 * @property {Date} updatedAt - Timestamp when the record was last updated.
 *
 * @example
 * const addressResponse: AddressResponseDto = {
 *  id_customer: 1,
 *  address: "123 Main St, Springfield, IL, 62701, USA",
 *  createdAt: new Date("2023-01-01T00:00:00Z"),
 *  updatedAt: new Date("2023-01-02T00:00:00Z")
 */

export class AddressResponseDto {
    @IsInt()
    id_address!: number;

    @IsInt()
    id_customer!: number;

    @IsString()
    address!: string;

    @IsBoolean()
    isActive!: boolean;

    createdAt!: Date;
    updatedAt!: Date;

    constructor(order: any) {
        this.id_address = order.id;
        this.id_customer = order.id_customer;
        this.address = order.address;
        this.isActive = order.isActive;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
    }
}