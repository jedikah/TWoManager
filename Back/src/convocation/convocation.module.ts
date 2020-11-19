import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderModule } from '../folder/folder.module';
import { Convocation } from './convocation.entity';
import { ConvocationServices } from './convocation.service';
import { ConvocationResolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Convocation]), FolderModule],
  providers: [...ConvocationResolvers, ConvocationServices],
  exports: [...ConvocationResolvers, ConvocationServices],
})
export class ConvocationModule {}
