import Product from '../models/product.model';
import { Op } from 'sequelize';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

class ProductDao {
  async create(data: CreateProductDto): Promise<Product> {
    return await Product.create(data);
  }

  async findAll(): Promise<Product[]> {
    return await Product.findAll();
  }

  async findById(id_product: number): Promise<Product | null> {
    return await Product.findByPk(id_product);
  }

  async update(id_product: number, data: UpdateProductDto): Promise<Product | null> {
    const product = await this.findById(id_product);
    if (!product) return null;

    await product.update(data);
    return product;
  }

  async delete(id_product: number): Promise<boolean> {
    const product = await this.findById(id_product);
    if (!product) return false;

    await product.destroy();
    return true;
  }

  async search(filters: Partial<{ name: string }>): Promise<Product[]> {
    const where: any = {};

    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };

    return await Product.findAll({ where });
  }
}

export default new ProductDao();
