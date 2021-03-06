import { ModelServices } from './model.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './model.entity';
import { modelResolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [...modelResolvers, ModelServices],
  exports: [...modelResolvers, ModelServices],
})
export class ModelModule {}
