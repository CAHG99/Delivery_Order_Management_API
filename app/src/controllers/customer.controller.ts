// src/controllers/customer.controller.ts

/**
 * Customer Controller
 * -------------------
 * Controlador para manejar las peticiones relacionadas con la entidad Customer.
 *
 * Patrón utilizado:
 *  - DTO (Data Transfer Object): para tipar la información entrante.
 *  - DAO (Data Access Object): para abstraer la interacción con la base de datos.
*/

import { Request, Response } from 'express';
import { CustomerDAO } from '../dao/customer.dao';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

export class CustomerController {
  static async create(req: Request, res: Response) {
    try {
      const data: CreateCustomerDto = req.body;
      const customer = await CustomerDAO.createCustomer(data);
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating customer', error });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const customers = await CustomerDAO.findAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching customers', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateCustomerDto = req.body;
      const updated = await CustomerDAO.updateCustomer(Number(id), data);

      if (!updated) return res.status(404).json({ message: 'Customer not found' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating customer', error });
    }
  }

  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await CustomerDAO.softDelete(Number(id));

      if (!deleted) return res.status(404).json({ message: 'Customer not found' });
      res.json({ message: 'Customer deleted (soft)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error });
    }
  }
}
