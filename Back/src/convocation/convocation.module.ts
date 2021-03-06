import { ModelModule } from './../model/model.module';
import { PvModule } from './../pv/pv.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocation } from './convocation.entity';
import { ConvocationServices } from './convocation.service';
import { ConvocationResolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Convocation]), PvModule, ModelModule],
  providers: [...ConvocationResolvers, ConvocationServices],
  exports: [...ConvocationResolvers, ConvocationServices],
})
export class ConvocationModule {}
