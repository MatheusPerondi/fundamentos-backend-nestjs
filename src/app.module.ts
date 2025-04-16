import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateProductController } from './create-product.controller';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [],
})
export class AppModule {}
