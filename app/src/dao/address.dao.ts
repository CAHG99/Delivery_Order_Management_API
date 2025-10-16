import Address from '../models/address.model';
import { CreateAddressDto, UpdateAddressDto, AddressResponseDto } from '../dtos/address.dto';

export class AddressDAO {
  static async createAddress(data: CreateAddressDto): Promise<AddressResponseDto> {
    const address = await Address.create({ ...data, isActive: true });
    return new AddressResponseDto(address);
  }

  static async findByCustomer(id_customer: number): Promise<AddressResponseDto[]> {
    const addresses = await Address.findAll({ where: { id_customer, isActive: true } });
    return addresses.map((a) => new AddressResponseDto(a));
  }

  static async updateAddress(id: number, data: UpdateAddressDto): Promise<AddressResponseDto | null> {
    const address = await Address.findByPk(id);
    if (!address || !address.isActive) return null;

    await address.update(data);
    return new AddressResponseDto(address);
  }

  static async softDelete(id: number): Promise<boolean> {
    const address = await Address.findByPk(id);
    if (!address || !address.isActive) return false;

    await address.update({ isActive: false });
    return true;
  }
}
