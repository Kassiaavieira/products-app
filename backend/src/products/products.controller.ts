import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    const products = this.productsService.findAll();
    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findById(Number(id));
    if (!product) {
      console.error(`Produto com ID ${id} não encontrado`);
    }
    return product;
  }

  @Post()
  create(@Body() data: { name: string; price: number; amount: number }) {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: { name?: string; price?: number; amount?: number },
  ) {
    return this.productsService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}
