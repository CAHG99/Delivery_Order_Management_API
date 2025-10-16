import { Request, Response } from 'express';
import { AddressDAO } from '../dao/address.dao';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';

export class AddressController {
  static async create(req: Request, res: Response) {
    try {
      const data: CreateAddressDto = req.body;
      const address = await AddressDAO.createAddress(data);
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ message: 'Error creating address', error });
    }
  }

  static async findByCustomer(req: Request, res: Response) {
    try {
      const { id_customer } = req.params;
      const addresses = await AddressDAO.findByCustomer(Number(id_customer));
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateAddressDto = req.body;
      const updated = await AddressDAO.updateAddress(Number(id), data);

      if (!updated) return res.status(404).json({ message: 'Address not found' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating address', error });
    }
  }

  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await AddressDAO.softDelete(Number(id));

      if (!deleted) return res.status(404).json({ message: 'Address not found' });
      res.json({ message: 'Address deleted (soft)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting address', error });
    }
  }
}
