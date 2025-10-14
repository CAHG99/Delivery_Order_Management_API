// src/dao/CustomerDao.ts

import Customer from '../models/customer.model';
import { Op } from 'sequelize';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

class CustomerDao {
  async create(data: CreateCustomerDto): Promise<Customer> {
    return await Customer.create(data);
  }

  async findAll(): Promise<Customer[]> {
    return await Customer.findAll();
  }

  async findById(id_customer: number): Promise<Customer | null> {
    return await Customer.findByPk(id_customer);
  }

  async findByCedula(cedula: string): Promise<Customer | null> {
    return await Customer.findOne({ where: { cedula } });
  }

  async update(id_customer: number, data: UpdateCustomerDto): Promise<Customer | null> {
    const customer = await this.findById(id_customer);
    if (!customer) return null;

    await customer.update(data);
    return customer;
  }

  async delete(id_customer: number): Promise<boolean> {
    const customer = await this.findById(id_customer);
    if (!customer) return false;

    await customer.destroy();
    return true;
  }

  async search(filters: Partial<{ fullname: string; email: string }>): Promise<Customer[]> {
    const where: any = {};

    if (filters.fullname) where.fullname = { [Op.iLike]: `%${filters.fullname}%` };
    if (filters.email) where.email = { [Op.iLike]: `%${filters.email}%` };

    return await Customer.findAll({ where });
  }
}

export default new CustomerDao();
