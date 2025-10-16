import Address from '../models/address.model';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';

class AddressDao {
  async create(data: CreateAddressDto): Promise<Address> {
    return await Address.create(data);
  }

  async findAll(): Promise<Address[]> {
    return await Address.findAll();
  }

  async findById(id_address: number): Promise<Address | null> {
    return await Address.findByPk(id_address);
  }

  async update(id_address: number, data: UpdateAddressDto): Promise<Address | null> {
    const addr = await this.findById(id_address);
    if (!addr) return null;

    await addr.update(data);
    return addr;
  }

  async delete(id_address: number): Promise<boolean> {
    const addr = await this.findById(id_address);
    if (!addr) return false;

    await addr.destroy();
    return true;
  }

  async findByCustomer(id_customer: number): Promise<Address[]> {
    return await Address.findAll({ where: { id_customer } });
  }
}

export default new AddressDao();
