import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    const products = this.productsService.findAll();
    return products;
  }

  @Post()
  create(@Body() data: { name: string; price: number; amount: number }) {
    return this.productsService.create(data);
  }

  @Patch(':id')
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
