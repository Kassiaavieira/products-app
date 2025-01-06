import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; price: number; amount: number }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        amount: data.amount,
      },
    });
  }

  async update(
    id: number,
    data: { name?: string; price?: number; amount?: number },
  ) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
