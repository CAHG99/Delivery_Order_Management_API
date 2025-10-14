import { Request, Response } from 'express';
import ProductDao from '../dao/product.dao';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: CreateProductDto = req.body;
    const newProduct = await ProductDao.create(data);
    return res.status(201).json(newProduct);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const products = await ProductDao.findAll();
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_product = parseInt(req.params.id_product, 10);
    const product = await ProductDao.findById(id_product);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_product = parseInt(req.params.id_product, 10);
    const data: UpdateProductDto = req.body;

    const updatedProduct = await ProductDao.update(id_product, data);
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    return res.json(updatedProduct);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_product = parseInt(req.params.id_product, 10);
    const deleted = await ProductDao.delete(id_product);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    return res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filters = {
      name: req.query.name as string | undefined,
      description: req.query.description as string | undefined,
    };

    const products = await ProductDao.search(filters);
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
