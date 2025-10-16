import { Request, Response } from 'express';
import { ProductDAO } from '../dao/product.dao';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const data: CreateProductDto = req.body;
      const product = await ProductDAO.createProduct(data);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const products = await ProductDAO.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateProductDto = req.body;
      const updated = await ProductDAO.updateProduct(Number(id), data);

      if (!updated) return res.status(404).json({ message: 'Product not found' });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  }

  static async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ProductDAO.softDelete(Number(id));

      if (!deleted) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted (soft)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  }
}
