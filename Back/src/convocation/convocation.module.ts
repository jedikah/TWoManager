import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocation } from './convocation.entity';
import { ConvocationServices } from './convocation.service';
import { ConvocationResolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Convocation])],
  providers: [...ConvocationResolvers, ConvocationServices],
  exports: [...ConvocationResolvers, ConvocationServices],
})
export class ConvocationModule {}
