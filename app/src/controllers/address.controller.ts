import { Request, Response } from 'express';
import AddressDao from '../dao/address.dao';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';

export const createAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateAddressDto = req.body;
    const newAddress = await AddressDao.create(data);
    return res.status(201).json(newAddress);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAddresses = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const addresses = await AddressDao.findAll();
    return res.json(addresses);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAddressById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_address = parseInt(req.params.id_address, 10);
    const address = await AddressDao.findById(id_address);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    return res.json(address);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_address = parseInt(req.params.id_address, 10);
    const data: UpdateAddressDto = req.body;

    const updatedAddress = await AddressDao.update(id_address, data);
    if (!updatedAddress) return res.status(404).json({ error: 'Address not found' });

    return res.json(updatedAddress);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_address = parseInt(req.params.id_address, 10);
    const deleted = await AddressDao.delete(id_address);
    if (!deleted) return res.status(404).json({ error: 'Address not found' });

    return res.json({ message: 'Address deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
