// src/controllers/customer.controller.ts

/**
 * Customer Controller
 * -------------------
 * Controlador para manejar las peticiones relacionadas con la entidad Customer.
 *
 * Patrón utilizado:
 *  - DTO (Data Transfer Object): para tipar la información entrante.
 *  - DAO (Data Access Object): para abstraer la interacción con la base de datos.
 *
 * Controladores definidos:
 *  - createCustomer: Crear un nuevo cliente.
 *  - getCustomers: Obtener todos los clientes.
 *  - getCustomerById: Obtener un cliente por su ID.
 *  - updateCustomer: Actualizar un cliente existente.
 *  - deleteCustomer: Eliminar un cliente.
 *  - searchCustomers: Buscar clientes por filtros.
 */

import { Request, Response } from 'express';
import CustomerDao from '../dao/customer.dao';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

/**
 * Crear un nuevo cliente.
 */
export const createCustomer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateCustomerDto = req.body;
    const newCustomer = await CustomerDao.create(data);
    return res.status(201).json(newCustomer);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener todos los clientes.
 */
export const getCustomers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const customers = await CustomerDao.findAll();
    return res.json(customers);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener un cliente por ID.
 */
export const getCustomerById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_customer = parseInt(req.params.id_customer, 10);
    const customer = await CustomerDao.findById(id_customer);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    return res.json(customer);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Actualizar un cliente existente.
 */
export const updateCustomer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_customer = parseInt(req.params.id_customer, 10);
    const data: UpdateCustomerDto = req.body;

    const updatedCustomer = await CustomerDao.update(id_customer, data);
    if (!updatedCustomer) return res.status(404).json({ error: 'Customer not found' });

    return res.json(updatedCustomer);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Eliminar un cliente.
 */
export const deleteCustomer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_customer = parseInt(req.params.id_customer, 10);
    const deleted = await CustomerDao.delete(id_customer);
    if (!deleted) return res.status(404).json({ error: 'Customer not found' });

    return res.json({ message: 'Customer deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar clientes por filtros (fullname, email).
 */
export const searchCustomers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filters = {
      fullname: req.query.fullname as string | undefined,
      email: req.query.email as string | undefined,
    };

    const customers = await CustomerDao.search(filters);
    return res.json(customers);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

