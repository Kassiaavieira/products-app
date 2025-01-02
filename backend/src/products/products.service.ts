import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.product.findMany();
  }

  async create(data: { name: string; price: number; amount: number }) {
    return this.prisma.product.create({ data });
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
