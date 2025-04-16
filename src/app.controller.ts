import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import { get } from 'http';

const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const createProducsBodySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(5).max(20),
  modelo: z.string().min(3).max(10),
  dateManufacture: z.string().date(),
  year: z.number().min(1900).max(2025),
  brand: z.string().min(5).max(20),
  email: z.string().email(),
  cpf: z.string().regex(regex),
})

const updateProductcsBodySchema = z.object({
  name: z.string().min(5).max(20).optional(),
  modelo: z.string().min(3).max(10).optional(),
  dateManufacture: z.string().date().optional(),
  year: z.number().min(1900).max(2025).optional(),
  brand: z.string().min(5).max(20).optional(),
  email: z.string().email().optional(),
  cpf: z.string().regex(regex).optional(),
});

const patchProductStatusSchema = z.object({
  status: z.enum(['disponivel', 'indisponivel']).optional(),
})

const patchProductBodySchema = new ZodValidationPipe(patchProductStatusSchema);

const updateBodyValidationPipe = new ZodValidationPipe(updateProductcsBodySchema);

const bodyValidationPipe = new ZodValidationPipe(createProducsBodySchema);

type PatchProductBodySchema = z.infer<typeof patchProductStatusSchema>;

type CreateProductBodySchema = z.infer<typeof createProducsBodySchema>;

type UpdateProductBodySchema = z.infer<typeof updateProductcsBodySchema>;

@Controller("/product")
export class AppController {

  products: CreateProductBodySchema[] = [];
  constructor() { }

  @Post()
  @HttpCode(201)
  create(@Body(bodyValidationPipe) body: CreateProductBodySchema): string {
    const idExist = this.products.find(product => product.id === body.id);

    if (idExist) {
      return "ID já existe!";
    }

    
    this.products.push(body);
    return "Produto criado com sucesso!";
  }

  @Get()
  findAll(): CreateProductBodySchema[] {
    return this.products;
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    const producrExist = this.products.find(product => product.id === parseInt(id));

    if (producrExist) {
      return producrExist;
    } else {
      return "Produto não encontrado.";
    }
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body(updateBodyValidationPipe) body: UpdateProductBodySchema): string {
    const productId = parseInt(id);
    const productIndex = this.products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
      const updatedProduct = { 
        ...this.products[productIndex],  
        ...body,                         
        id: this.products[productIndex].id  
      };

      this.products[productIndex] = updatedProduct;
      return "Produto atualizado com sucesso!";
    } else {
      return "Produto não encontrado.";
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteById(@Param('id') id: string): string {
    const productId = parseInt(id);
    const productIndex = this.products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {

      this.products.splice(productIndex, 1);
      return "Produto removido com sucesso!";
    } else {

      return "Produto não encontrado.";
    }
  }

  @Patch(':id')
  @HttpCode(200)
  updateStatus(@Param('id') id: string, @Body(patchProductBodySchema) body: PatchProductBodySchema): string {
    const productId = parseInt(id);
    const productIndex = this.products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
      const updatedProduct = { 
        ...this.products[productIndex],  
        ...body,                         
        status: body.status 
      };

      this.products[productIndex] = updatedProduct;
      return "Produto atualizado com sucesso!";
    } else {
      return "Produto não encontrado.";
    }
  }
}
