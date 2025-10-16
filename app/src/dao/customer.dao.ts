import Customer from '../models/customer.model';
import Address from '../models/address.model';
import { CreateCustomerDto, UpdateCustomerDto, CustomerResponseDto } from '../dtos/customer.dto';

export class CustomerDAO {
  static async createCustomer(data: CreateCustomerDto): Promise<CustomerResponseDto> {
    const customer = await Customer.create({ ...data, isActive: true });
    return new CustomerResponseDto(customer);
  }

  static async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await Customer.findAll({ where: { isActive: true }, include: [Address] });
    return customers.map((c) => new CustomerResponseDto(c));
  }

  static async findById(id: number): Promise<CustomerResponseDto | null> {
    const customer = await Customer.findByPk(id, { include: [Address] });
    return customer && customer.isActive ? new CustomerResponseDto(customer) : null;
  }

  static async updateCustomer(id_customer: number, data: UpdateCustomerDto): Promise<CustomerResponseDto | null> {
    const customer = await Customer.findByPk(id_customer);
    if (!customer || !customer.isActive) return null;

    await customer.update(data);
    return new CustomerResponseDto(customer);
  }

  static async softDelete(id: number): Promise<boolean> {
    const customer = await Customer.findByPk(id);
    if (!customer || !customer.isActive) return false;

    await customer.update({ isActive: false });
    return true;
  }
}
