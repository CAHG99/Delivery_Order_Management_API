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

import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsInt } from 'class-validator';

/**
 * Data Transfer Object for creating an address record.
 * @property {number} id_customer - ID of the customer associated with the address.
 * @property {string} address - The address details.
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

    @IsString()
    address!: string;
}

/**
 * Data Transfer Object for updating an address record.
 *
 * Data Transfer Object for creating an address record.
 * @property {number} id_customer - ID of the customer associated with the address.
 * @property {string} address - The address details.
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
}


/**
 * Data Transfer Object that represents the response of an address record.
 *
 * @property {number} id_customer - ID of the customer associated with the address.
 * @property {string} address - The address details.
 * @property {Date} createdAt - Timestamp when the record was created.
 * @property {Date} updatedAt - Timestamp when the record was last updated.
 *
 * @example
 * const addressResponse: AddressResponseDto = {
 *  id_address: 1,
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

    @IsDateString()
    createdAt!: Date;

    @IsDateString()
    updatedAt!: Date;
}