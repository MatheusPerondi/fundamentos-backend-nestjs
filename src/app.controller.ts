import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const createProducsBodySchema = z.object({
  name: z.string().min(5).max(20),
  modelo: z.string().min(3).max(10),
  dateManufacture: z.string().date(),
  year: z.number().min(1900).max(2025),
  brand: z.string().min(5).max(20),
  email: z.string().email(),
  cpf: z.string().regex(regex),
})
const bodyValidationPipe = new ZodValidationPipe(createProducsBodySchema);

type CreateProductBodySchema = z.infer<typeof createProducsBodySchema>;

@Controller("/product")
export class AppController {
  constructor() {}

  @Post()
  create(@Body(bodyValidationPipe) Body: CreateProductBodySchema): string {
    return bodyValidationPipe.transform(Body);
  }
}
